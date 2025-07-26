'use client'

import ProviderSelector from "./providers/ProviderSelector"
import ApiKeyManager from "./providers/ApiKeyManager"

function Settings() {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold">Settings</h1>
      
      <div className=" rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">AI Provider</h2>
        <ProviderSelector/>
      </div>

      <div className=" rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">API Key</h2>
        <ApiKeyManager/>
      </div>
    </div>
  )
}

export default Settings
