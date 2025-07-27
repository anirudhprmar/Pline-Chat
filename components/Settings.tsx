'use client'

import ProviderSelector from "./providers/ProviderSelector"
import ApiKeyManager from "./providers/ApiKeyManager"
import { Button } from "./ui/button"
import { useNavigate } from "react-router"


function Settings() {
  const navigate = useNavigate()
  return (
    <div>
      <div className="max-w-2xl mx-auto p-6 space-y-8  w-full  mt-10 rounded-xl border">
        
        <h1 className="text-2xl font-bold">Put in your Credentials</h1>
        
        <div className=" rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">AI Provider</h2>
          <ProviderSelector/>
        </div>

        <div className=" rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">API Key</h2>
          <ApiKeyManager/>
        </div>

        <div>
          <Button
          size={'lg'}
          variant="default"
          className="w-full bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
          onClick={()=>{
            navigate('/chat')
          }}
          >
            Proceed
          </Button>
        </div>
      </div>

    </div>
  )
}

export default Settings
