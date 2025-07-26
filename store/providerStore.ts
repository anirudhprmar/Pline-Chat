'use client'

import { PROVIDERS } from '@/lib/providers/config'
import {create} from 'zustand'
import {persist} from 'zustand'

interface ApiKey{
    providerId:string,
    key:string,
    isValid?:boolean
}

interface ProviderStore {
  // State
  selectedProvider: string;
  selectedModel: string;
  apiKeys: ApiKey[];
  
  // Actions
  setProvider: (providerId: string) => void;
  setModel: (model: string) => void;
  saveApiKey: (providerId: string, key: string) => void;
  getApiKey: (providerId: string) => string | null;
  removeApiKey: (providerId: string) => void;
}

export const useProviderStore = create<ProviderStore>(
    persist(
        (set: (arg0: { selectedProvider?: string; selectedModel?: string; apiKeys?: any }) => void,get: () => { apiKeys: any })=>({
            selectedProvider:'google',

            selectedModel:'gemini-2.0-flash-lite',

            apiKeys:[],

            setProvider:(providerId:string)=>{
                const provider = PROVIDERS.find(p => p.id === providerId);
                set({
                    selectedProvider:providerId,
                    selectedModel:provider?.models[0] || ''
                })
            },
            setModel:(model:string) => set({selectedModel:model}),

            saveApiKey:(providerId:string,key:string)=>{
                const {apiKeys} = get()
                const existingIndex = apiKeys.findIndex((k: { providerId: string }) => k.providerId === providerId) //finding index of the api keys that exist
                if (existingIndex >= 0) {
                    apiKeys[existingIndex] = {providerId,key}
                }else{
                    apiKeys.push({providerId,key})
                }

                set({apiKeys:[...apiKeys]})
            },
            getApiKey:(providerId:string)=>{
                const {apiKeys} = get()
                const apiKey = apiKeys.find((k: { providerId: string }) => k.providerId === providerId)
                return apiKey?.key || null
            },
            removeApiKey:(providerId:string)=>{
                const {apiKeys} = get()
                set({apiKeys:apiKeys.filter((k: { providerId: string }) => k.providerId !== providerId)})
            }
        }),
        {
            name:'provider-storage'
        }
    )
)