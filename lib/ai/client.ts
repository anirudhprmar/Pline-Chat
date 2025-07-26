'use client'

import { createXai } from '@ai-sdk/xai';
import { createOpenAI } from '@ai-sdk/openai';
import {createGoogleGenerativeAI } from '@ai-sdk/google';
import { useProviderStore } from '@/store/providerStore';

export function getAIProvider(){
    const {getApiKey,selectedProvider} = useProviderStore.getState()
    const apiKey = getApiKey(selectedProvider)

    if(!apiKey){
        throw new Error(`No API Key found for ${selectedProvider}`)
    }

    switch (selectedProvider) {

        case 'xai':
            return createXai({apiKey})

        case 'openai':
            return  createOpenAI({apiKey})
        
        case 'google':
            return createGoogleGenerativeAI({apiKey})
    
        default:
            throw new Error(`Unsupported Provider: ${selectedProvider}`)
    }
}

export function getCurrentModel(){
    const {selectedModel} = useProviderStore.getState()
    return selectedModel

}