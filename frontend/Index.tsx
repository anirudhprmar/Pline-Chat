"use client"
import { useEffect,useState } from "react";
import { useNavigate } from "react-router";

export default function Index() {
    const navigate = useNavigate();
    const [mounted,setMounted] = useState(false)

    useEffect(()=>{
        setMounted(true)
    },[])
    
    useEffect(()=>{
        if (mounted) {
            navigate('/chat')
        }
    },[navigate,mounted])

    if (!mounted) return null;

    return null;
}