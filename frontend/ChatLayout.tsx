"use client"
import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router";


export default function ChatLayout() {

  return (
    <div className="min-h-screen flex">
      <div className="w-1/5 bg-[#11131A] p-4 border-r">
        {/* sidebar */}
        <span className="text-2xl font-bold">Chat</span> 
        <Sidebar/>
      </div>
      <div className="bg-[#11131A] w-full">
        <Outlet/>
      </div>
    </div>
  )
}

