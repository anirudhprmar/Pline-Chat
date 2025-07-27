'use client'

import { useProviderStore } from "@/store/providerStore"
import {PROVIDERS} from '@/lib/providers/config'

function ProviderSelector() {
    const {selectedProvider,selectedModel,setProvider,setModel} = useProviderStore()
    
    const currentProvider = PROVIDERS.find(p => p.id === selectedProvider)

  return (
    <div className="space-y-4">

        {/* select ai provider */}
        <div>
            <label className="font-medium text-sm block mb-2 ">
                AI Provider
            </label>
            <select
            value={selectedProvider}
            onChange={(e)=>setProvider(e.target.value)}
            className="w-full p-2 border rounded-md bg-gray-900"
            required
            >
                {PROVIDERS.map(provider =>(
                    <option key={provider.id} value={provider.id}>
                        {provider.displayName}
                    </option>
                ))}
            </select>
        </div>

            {/* select ai model */}

        {currentProvider && (
            <div>
                <label className="block text-sm font-medium mb-2">
                    Model
                </label>
                <select value={selectedModel}
                onChange={(e)=>setModel(e.target.value)}
                className="w-full p-2 border rounded-md bg-gray-900"
                required
                >
                    {currentProvider.models.map(m => (
                        <option key={m} value={m}>
                            {m}
                        </option>
                    ))}
                </select>
            </div>
        )}
                
    </div>
  )
}


export default ProviderSelector
