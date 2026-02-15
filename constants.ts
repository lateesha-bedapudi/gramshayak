
import { Language } from './types';

export const COLORS = {
  primary: '#1e40af', // Blue-800
  secondary: '#ffffff',
  accent: '#f97316',   // Orange-500
  accentHover: '#ea580c', // Orange-600
  background: '#f8fafc',
  text: '#1e293b'
};

export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
];

export const getSystemInstruction = (langName: string) => `
You are GraminSahayak, a friendly and empathetic AI assistant designed for underserved rural and semi-urban communities in India.
Your mission is to provide simplified, easy-to-understand explanations of government schemes, welfare, healthcare, and education resources.

THE USER HAS SELECTED ${langName.toUpperCase()} AS THEIR PREFERRED LANGUAGE.
- You MUST respond in ${langName} if the user speaks to you in that language or if they have selected it.
- If the language is Hindi, use simple, everyday "Khadi Boli" that a rural citizen would understand. Avoid complex technical terms or heavily Sanskritized words.
- Use regional context and simple analogies (e.g., comparing a insurance policy to a "Suraksha Kavach").
- Explain "Eligibility" as "Kaun iska fayda utha sakta hai?" and "Documents" as "Zaroori kagaz".
- Break down complex policy language into simple 1-2-3 steps.
- If you don't know an answer, suggest they visit their local Gram Panchayat or Common Service Center (CSC).
- Always maintain a helpful, patient, and respectful tone.
`;

export const MOCK_SCHEMES = [
  {
    id: '1',
    name: 'Pradhan Mantri Awas Yojana (PMAY)',
    category: 'Government',
    description: 'A social welfare program to provide housing for the rural and urban poor. It offers financial assistance to build new houses or improve existing ones.',
    eligibility: 'Families with no pucca house, low-income groups, and economically weaker sections.'
  },
  {
    id: '2',
    name: 'National Scholarship Portal (NSP)',
    category: 'Education',
    description: 'A one-stop solution for various scholarship schemes provided by Central and State governments to students from Class 1 to PhD.',
    eligibility: 'Students from minority communities, SC/ST categories, and low-income families with good academic records.'
  },
  {
    id: '3',
    name: 'Ayushman Bharat (PM-JAY)',
    category: 'Healthcare',
    description: 'The world\'s largest health insurance scheme, providing a cover of up to 5 lakh rupees per family per year for secondary and tertiary care hospitalization.',
    eligibility: 'Poor and vulnerable families identified based on the SECC database.'
  },
  {
    id: '4',
    name: 'PM-Kisan Samman Nidhi',
    category: 'Government',
    description: 'An initiative by the government to provide income support to all landholding farmers\' families to help them meet their farm related expenses.',
    eligibility: 'Small and marginal farmers with land ownership up to 2 hectares.'
  }
];

export const DASHBOARD_CHART_DATA = [
  { name: 'Schemes', inquiries: 400, resolved: 350 },
  { name: 'Healthcare', inquiries: 300, resolved: 280 },
  { name: 'Education', inquiries: 200, resolved: 190 },
  { name: 'Skills', inquiries: 150, resolved: 140 },
  { name: 'Jobs', inquiries: 100, resolved: 85 },
];
