import { BrowserRouter,Route,Routes } from "react-router";
import Index from "./Index";
import ChatLayout from "./ChatLayout";
import Home from "./Home";
import Chat from "./Chat";

export default function App() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Index/>} />

                <Route path="/chat" element={<ChatLayout/>}>
                    <Route index element={<Home/>} />
                    <Route path="/:id" element={<Chat/>} />
                </Route>
                
                 <Route path="*" element={<p> Not found </p>} />
            </Routes>
        </BrowserRouter>
    )
}