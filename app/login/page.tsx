"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { apiFetch, API_BASE_URL } from '@/lib/api';
import { useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const searchParams = useSearchParams();

  useEffect(() => {
    const errorParam = searchParams.get('error');
    const registeredParam = searchParams.get('registered');

    if (errorParam === 'google_auth_failed') {
      setError('GOOGLE_AUTH_FAILED // UPLINK_REJECTED');
    } else if (errorParam) {
      setError(`CRITICAL_ERROR: ${errorParam.toUpperCase()}`);
    }

    if (registeredParam === 'true') {
      setSuccess('REGISTRATION_COMPLETE // INITIALIZE_SYNC');
    }
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'CONNECTION_TIMEOUT // SYSTEM_OFFLINE');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE_URL}/auth/google`;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden selection:bg-zine-coral selection:text-black">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-zine-coral/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="aether-card max-w-lg w-full p-12 bg-zinc-950 relative z-10 border-zine-coral/20">
        <div className="absolute -top-6 -left-4 bg-zine-coral text-zinc-950 font-display font-black text-2xl px-6 py-2 shadow-[4px_4px_0px_#000] rotate-[-2deg] uppercase tracking-tighter">
           ACCESS_PORTAL
        </div>
        
        <div className="mb-12 border-b-8 border-zinc-900 pb-6">
          <h2 className="text-5xl font-display font-black tracking-tighter text-white uppercase leading-none">INITIALIZE<br/><span className="text-zine-coral italic">SESSION</span></h2>
          <p className="text-[10px] font-display font-bold uppercase tracking-[0.4em] text-zinc-600 mt-4">AETHER_CORE // SECURE_UPLINK</p>
        </div>

        {success && (
          <div className="bg-zine-green/10 border-l-4 border-zine-green p-4 mb-8 text-zine-green font-display font-bold text-[10px] uppercase tracking-widest animate-pulse">
             {success}
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border-l-4 border-red-500 p-4 mb-8 text-red-500 font-display font-bold text-[10px] uppercase tracking-widest">
             {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <label className="font-display text-[10px] tracking-[0.3em] text-zinc-500 uppercase font-black">NODE_IDENTIFIER / EMAIL</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="aether-input h-16 text-lg border-zinc-800"
              placeholder="operator@aether.node"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="font-display text-[10px] tracking-[0.3em] text-zinc-500 uppercase font-black">SECURITY_ENCRYPT / PASSWORD</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="aether-input h-16 text-lg border-zinc-800"
              placeholder="********"
            />
          </div>

          <button type="submit" className="aether-button w-full h-20 text-3xl tracking-[0.2em] border-4 border-black mt-2">
             AUTHORIZE
          </button>
        </form>

        <div className="mt-16 pt-10 border-t-2 border-zinc-900 flex flex-col gap-6">
           <button 
             onClick={handleGoogleLogin}
             className="flex items-center justify-center gap-4 bg-white text-zinc-950 font-display font-black text-xl py-5 hover:bg-zinc-200 transition-all shadow-[6px_6px_0px_#FF6B35] uppercase tracking-tighter"
           >
              SIGN_IN_WITH_GOOGLE
           </button>
        </div>

        <p className="mt-12 text-center text-[10px] font-black font-display tracking-widest text-zinc-600 uppercase">
           NO ACCESS KEY? <a href="/signup" className="text-zine-coral hover:underline transition-all">REGISTER_NEW_NODE</a>
        </p>
      </div>

      {/* Extreme background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30rem] font-display font-black flex opacity-[0.02] pointer-events-none select-none tracking-tighter">
         AETHER
      </div>
    </div>
  );
}
