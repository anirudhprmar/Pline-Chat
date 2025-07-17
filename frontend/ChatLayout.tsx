"use client"
import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router";


export default function ChatLayout() {

  return (
    <div className="min-h-screen flex ">
      <div className="w-1/5  p-4 border-r dark:border-gray-50">
        {/* sidebar */}
        <Sidebar/>
      </div>
      <div className="w-full">
        <Outlet/>
      </div>
    </div>
  )
}

