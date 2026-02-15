
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  isAudio?: boolean;
}

export interface Scheme {
  id: string;
  name: string;
  category: 'Government' | 'Healthcare' | 'Education' | 'Skill Development';
  description: string;
  eligibility: string;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
}

export enum AppSection {
  HOME = 'home',
  VOICE = 'voice',
  SCHEMES = 'schemes',
  DASHBOARD = 'dashboard',
  HELP = 'help'
}
