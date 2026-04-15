"use client";
import React, { useState } from 'react';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const res = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      if (res.ok) {
        window.location.href = '/dashboard';
      } else {
        const data = await res.json();
        setError(data.message || 'AUTHENTICATION_FAILED');
      }
    } catch (err) {
      setError('CONNECTION_TIMEOUT // SYSTEM_OFFLINE');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/google';
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Grunge */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      
      <div className="zine-card max-w-lg w-full p-12 bg-zinc-950 relative z-10 border-r-12 -rotate-1">
        <div className="absolute -top-10 -left-6 bg-zine-coral text-zinc-950 font-bebas text-4xl px-4 py-2 -rotate-12 shadow-[4px_4px_0px_black]">
           ACCESS_PORTAL
        </div>

        <h2 className="text-6xl mb-8 border-b-4 border-zinc-800 pb-4">INITIALIZE_SYNC</h2>
        
        {error && (
          <div className="bg-red-500/20 border-l-4 border-red-500 p-4 mb-8 text-red-500 font-mono text-xs uppercase animate-pulse">
             CRITICAL_ERROR: {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <label className="font-bebas text-2xl tracking-widest text-zine-coral uppercase">NODE_IDENTIFIER / EMAIL</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-zinc-900 border-2 border-zinc-800 p-4 font-mono text-zinc-100 focus:border-zine-coral focus:outline-none transition-colors"
              placeholder="user@system.node"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-bebas text-2xl tracking-widest text-zine-coral uppercase">SECURITY_ENCRYPT / PASSWORD</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-zinc-900 border-2 border-zinc-800 p-4 font-mono text-zinc-100 focus:border-zine-coral focus:outline-none transition-colors"
              placeholder="********"
            />
          </div>

          <button type="submit" className="zine-button w-full py-6 mt-4 text-4xl">
             AUTHORIZE_NODE
          </button>
        </form>

        <div className="mt-12 pt-8 border-t-2 border-zinc-800 flex flex-col gap-6">
           <p className="text-center font-bebas text-xl opacity-40 uppercase tracking-widest">OR_SYNC_VIA_EXTERNAL</p>
           
           <button 
             onClick={handleGoogleLogin}
             className="flex items-center justify-center gap-4 bg-white text-zinc-950 font-bebas text-3xl py-4 hover:bg-zinc-200 transition-colors shadow-[6px_6px_0px_#FF6B35]"
           >
              SIGN_IN_WITH_GOOGLE
           </button>
        </div>

        <p className="mt-12 text-center text-xs font-bold font-mono tracking-tighter opacity-50">
           NO ACCESS KEY? <a href="/signup" className="text-zine-coral hover:underline">REGISTER_NEW_NODE</a>
        </p>

        {/* Decorative corner element */}
        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-zine-coral opacity-20" />
      </div>

      {/* Extreme background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30rem] font-zine flex opacity-5 pointer-events-none select-none">
         OS
      </div>
    </div>
  );
}
