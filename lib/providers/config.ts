'use client';

export interface ProviderConfig {
  id: string;
  name: string;
  displayName: string;
  baseUrl?: string;
  models: string[];
  apiKeyLabel: string;
  apiKeyPlaceholder: string;
  requiresApiKey: boolean;
  icon?: string;
}

export const PROVIDERS: ProviderConfig[] = [
  {
    id: 'openai',
    name: 'openai',
    displayName: 'OpenAI',
    models: ['gpt-4.1', 'gpt-4o', 'gpt-3.5-turbo'],
    apiKeyLabel: 'OpenAI API Key',
    apiKeyPlaceholder: 'sk-...',
    requiresApiKey: true,
  },
  {
    id: 'google',
    name: 'google',
    displayName: 'Google',
    models: ['gemini-2.0-flash-lite', 'Gemini 2.0 Flash'],
    apiKeyLabel: 'Google API Key',
    apiKeyPlaceholder: 'sk-ant-...',
    requiresApiKey: true,
  },
  {
    id: 'xai',
    name: 'xai',
    displayName: 'xAI',
    models: ['grok-3-mini', 'grok-3','grok-4-0709'],
    apiKeyLabel: 'xAI API Key',
    apiKeyPlaceholder: 'AIza...',
    requiresApiKey: true,
  },
];