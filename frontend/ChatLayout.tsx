"use client"
import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router";


export default function ChatLayout() {

  return (
    <div >
    <div className=" flex min-h-screen ">

        <div className="w-1/5 px-4 pt-8  border-r dark:border-gray-50">
          {/* sidebar */}
          <Sidebar/>
        </div>

        <div className="w-full ">
          <Outlet/>
        </div>

    </div>
    </div>
  )
}

