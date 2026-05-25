import React, { useState } from "react";
import { User, Lock, AlertCircle, LogIn, Sparkles } from "lucide-react";

interface LoginProps {
  onLoginSuccess: () => void;
}

export default function LoginScreen({ onLoginSuccess }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === "admin" && password === "admin_khmer") {
      setError(false);
      sessionStorage.setItem("moeys_authenticated", "true");
      onLoginSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-teal-950 via-teal-900 to-emerald-950 p-4 font-sans no-print-element text-xs">
      <div className="bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-2xl max-w-md w-full border border-teal-800/20 text-slate-800 space-y-6">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto p-1.5 bg-white rounded-2xl shadow-lg border border-slate-100 flex items-center justify-center transform hover:scale-105 transition-all">
            <img 
              src="https://lh3.googleusercontent.com/d/1L6k3hiIN-0sWPSNGDN3YJTsTYgzYS8Dn" 
              alt="សាលាបឋមសិក្សា ម៉ឹង សំផន" 
              className="w-16 h-16 object-contain rounded-xl" 
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://placehold.co/150x150/0f766e/ffffff?text=%E1%9E%98%E1%9F%8Grid';
              }}
            />
          </div>
          <h2 className="text-lg md:text-xl font-muol text-teal-900 leading-relaxed tracking-wide">ប្រព័ន្ធវាយតម្លៃពិន្ទុសិស្ស</h2>
          <p className="text-sm md:text-base text-slate-600 font-bold">បំណិនសម្បទា និង ចរិយាសម្បទា</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {error && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl font-bold flex items-center gap-2.5">
              <AlertCircle className="w-4.5 h-4.5 shrink-0" />
              <span>ឈ្មោះអ្នកប្រើប្រាស់ ឬលេខកូដសម្ងាត់មិនត្រឹមត្រូវ!</span>
            </div>
          )}
          
          <div className="space-y-1.5 shadow-sm">
            <label className="block font-bold text-slate-700">ឈ្មោះអ្នកប្រើប្រាស់ (Username)</label>
            <div className="relative">
              <input 
                type="text" 
                required 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-bold" 
                placeholder="admin" 
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            </div>
          </div>
          
          <div className="space-y-1.5 shadow-sm">
            <label className="block font-bold text-slate-700">លេខកូដសម្ងាត់ (Password)</label>
            <div className="relative">
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-bold" 
                placeholder="••••••••" 
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            </div>
          </div>
          
          <button 
            type="submit" 
            className="w-full py-3 bg-gradient-to-r from-teal-700 to-emerald-700 hover:from-teal-600 hover:to-emerald-600 text-white rounded-lg font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <LogIn className="w-4 h-4" />
            <span>ចូលប្រើប្រាស់ប្រព័ន្ធ</span>
          </button>
        </form>
        
        <div className="text-center text-[10px] text-slate-400">
          រក្សាសិទ្ធិគ្រប់យ៉ាង © ២០២៦ រៀបរៀងដោយលោកគ្រូ ទេព សាវ៉ែន
        </div>
      </div>
    </div>
  );
}
