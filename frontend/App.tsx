"use client"

import { Route,Routes } from "react-router";
// import Index from "./Index";
import ChatLayout from "./ChatLayout";
import Home from "./Home";
import ChatArea from "./ChatArea";
import Settings from "@/components/Settings";

export default function App() {
    return(
            <Routes>
                <Route path="/" element={<Settings/>} />
                {/* <Route path="/" element={<Index/>} /> */}

                <Route path="chat" element={<ChatLayout/>}>  
                    <Route index element={<Home/>} />
                    <Route path=":id" element={<ChatArea/>} />
                </Route>
                
                 <Route path="*" element={<p> Not found </p>} />
            </Routes>
    )
}   