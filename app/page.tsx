"use client"


import dynamic from "next/dynamic"

const ClientOnlyRouter = dynamic(()=>import('../components/ClientOnlyRouter'),{
  ssr:false
})

const App = dynamic(()=>import('../frontend/App'),{
  ssr:false
})


export default function Home() {
  return (
    <ClientOnlyRouter>
      <App/>
    </ClientOnlyRouter>
  )
}
