'use client'

import { PROVIDERS } from "@/lib/providers/config"
import { useProviderStore } from "@/store/providerStore"
import { Check } from "lucide-react"
import { useState } from "react"



function ApiKeyManager() {
    const {selectedProvider,saveApiKey,getApiKey,removeApiKey} = useProviderStore()

    const [inputKey,setInputKey] = useState('')
    const [isValidating,setIsValidating] = useState(false)

    const currentProvider = PROVIDERS.find(p => p.id === selectedProvider)
    const existingKey = getApiKey(selectedProvider)

    const handleSaveKey = async()=>{
        if (!inputKey.trim()) return;

        setIsValidating(true)
        saveApiKey(selectedProvider,inputKey.trim())
        setIsValidating(false)
    }

    const handleRemoveSaveKey = async()=>{
        removeApiKey(selectedProvider)
        setInputKey('')
    }

    if (!currentProvider?.requiresApiKey) return null;

  return (
    <div className="space-x-4 ">
      <div>
        <label className="block text-sm font-medium mb-2">
            {currentProvider.apiKeyLabel}
        </label>
        {existingKey ? (
            <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600"><Check/> Saved API key</span>
                <p className="p-1 border ">{existingKey}</p>
                <button
                onClick={handleRemoveSaveKey}
                className="text-sm text-red-600 hover:underline"
                >Remove</button>
            </div>
        ): <div className="space-y-2">
            <input type="text" value={inputKey} onChange={(e)=>setInputKey(e.target.value)} placeholder={currentProvider.apiKeyPlaceholder}
            className="w-full p-2 border rounded-md"
            />
            <button
            onClick={handleSaveKey}
            disabled={!inputKey.trim() || isValidating}
            className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
            >
                {isValidating ? 'Validating...' : 'Save API key'}
            </button>
        </div>}
      </div>
    </div>
  )
}

export default ApiKeyManager
