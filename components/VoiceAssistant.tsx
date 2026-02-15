
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { decode, encode, decodeAudioData, floatTo16BitPCM } from '../services/audioUtils';
import { getSystemInstruction } from '../constants';
import { Language } from '../types';

interface VoiceAssistantProps {
  language: Language;
}

const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ language }) => {
  const [isActive, setIsActive] = useState(false);
  const [transcription, setTranscription] = useState<string[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sessionRef = useRef<any>(null);
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const nextStartTimeRef = useRef<number>(0);

  const stopSession = useCallback(() => {
    if (sessionRef.current) {
      sessionRef.current = null;
    }
    if (scriptProcessorRef.current) {
      scriptProcessorRef.current.disconnect();
      scriptProcessorRef.current = null;
    }
    if (inputAudioContextRef.current) {
      inputAudioContextRef.current.close();
      inputAudioContextRef.current = null;
    }
    if (outputAudioContextRef.current) {
      outputAudioContextRef.current.close();
      outputAudioContextRef.current = null;
    }
    sourcesRef.current.forEach(source => source.stop());
    sourcesRef.current.clear();
    setIsActive(false);
    setIsConnecting(false);
  }, []);

  const startSession = async () => {
    try {
      setIsConnecting(true);
      setError(null);
      
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      inputAudioContextRef.current = inputCtx;
      outputAudioContextRef.current = outputCtx;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setIsActive(true);
            setIsConnecting(false);
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            scriptProcessorRef.current = scriptProcessor;

            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmData = floatTo16BitPCM(inputData);
              const pcmBlob = {
                data: encode(pcmData),
                mimeType: 'audio/pcm;rate=16000',
              };
              sessionPromise.then(session => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };

            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (message) => {
            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio) {
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputCtx.currentTime);
              const audioBuffer = await decodeAudioData(decode(base64Audio), outputCtx, 24000, 1);
              const source = outputCtx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(outputCtx.destination);
              source.addEventListener('ended', () => {
                sourcesRef.current.delete(source);
              });
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }

            if (message.serverContent?.outputTranscription) {
              const text = message.serverContent.outputTranscription.text;
              setTranscription(prev => [...prev, `AI: ${text}`]);
            }
            if (message.serverContent?.inputTranscription) {
              const text = message.serverContent.inputTranscription.text;
              setTranscription(prev => [...prev, `You: ${text}`]);
            }
          },
          onerror: (e) => {
            console.error('Session error', e);
            setError("Connection lost. Please check your internet and try again.");
            stopSession();
          },
          onclose: () => {
            stopSession();
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: getSystemInstruction(language.name),
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } }
          },
          inputAudioTranscription: {},
          outputAudioTranscription: {}
        }
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error('Failed to start session', err);
      setError("Microphone access is required for voice interaction.");
      setIsConnecting(false);
    }
  };

  useEffect(() => {
    return () => stopSession();
  }, [stopSession, language]); // Restart if language changes during active state? Better to let user manually toggle.

  const getLocalizedInstruction = () => {
    if (language.code === 'hi') {
      return isActive 
        ? `मैं सुन रही हूँ... हिंदी में बोलें।` 
        : `नमस्ते! हिंदी में बात करने के लिए बटन दबाएं।`;
    }
    return isActive 
      ? `I'm listening in ${language.name}... Speak for help.` 
      : `Tap the button below to start talking in ${language.name}.`;
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-3xl shadow-xl border-4 border-blue-50 max-w-2xl mx-auto min-h-[400px] animate-fadeIn">
      <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6 relative">
        <div className={`absolute inset-0 bg-blue-400 rounded-full opacity-20 ${isActive ? 'animate-ping' : ''}`}></div>
        <i className={`fas fa-microphone text-4xl ${isActive ? 'text-orange-500' : 'text-blue-800'}`}></i>
      </div>

      <h2 className="text-2xl font-bold text-blue-900 mb-2">Voice Assistant ({language.nativeName})</h2>
      <p className="text-slate-600 mb-8 text-center max-w-sm">
        {getLocalizedInstruction()}
      </p>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm flex items-center gap-2">
          <i className="fas fa-exclamation-circle"></i>
          {error}
        </div>
      )}

      <button
        onClick={isActive ? stopSession : startSession}
        disabled={isConnecting}
        className={`w-full max-w-xs py-4 rounded-2xl font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-3 ${
          isActive 
            ? 'bg-red-500 hover:bg-red-600 text-white' 
            : 'bg-orange-500 hover:bg-orange-600 text-white'
        }`}
      >
        {isConnecting ? (
          <>
            <i className="fas fa-spinner animate-spin"></i>
            Connecting...
          </>
        ) : isActive ? (
          <>
            <i className="fas fa-stop"></i>
            {language.code === 'hi' ? 'बोलना बंद करें' : 'Stop Listening'}
          </>
        ) : (
          <>
            <i className="fas fa-play"></i>
            {language.code === 'hi' ? 'बातचीत शुरू करें' : 'Start Speaking'}
          </>
        )}
      </button>

      <div className="mt-8 w-full">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Conversation History</h3>
          <button 
            onClick={() => setTranscription([])}
            className="text-xs text-blue-600 hover:underline"
          >
            Clear
          </button>
        </div>
        <div className="bg-slate-50 rounded-xl p-4 h-48 overflow-y-auto border border-slate-200">
          {transcription.length === 0 ? (
            <p className="text-slate-400 italic text-sm">
              {language.code === 'hi' ? 'अभी तक कोई बातचीत नहीं हुई...' : 'No transcription yet...'}
            </p>
          ) : (
            <div className="space-y-2">
              {transcription.map((line, idx) => (
                <div key={idx} className={`text-sm ${line.startsWith('You:') ? 'text-blue-700' : 'text-slate-700 font-medium'}`}>
                  {line}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant;
