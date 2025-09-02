import { Zap, Wallet, Shield, Sparkles } from "lucide-react";
import { ToastContainer } from "react-toastify";
import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import { TodoMain } from "./components/TodoMain";
import { FloatingStars } from "./components/FloatingStars";


function App() {
  const currentAccount = useCurrentAccount();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>

        <FloatingStars />
      </div>

        {/* Wallet Connection */}
        {currentAccount && (
          <div className="absolute top-8 right-11 z-20">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative">
                <ConnectButton />
              </div>
            </div>
          </div>
        )}
        
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>

      <div className="container mx-auto px-4 py-12 max-w-2xl relative z-10">

        <header className="text-center mb-16 relative">
          {/* Glow effect behind header */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-blue-500/5 blur-3xl rounded-full"></div>
          
          <div className="relative">
            <div className="flex items-center justify-center gap-4 mb-6">
              <img 
                src="/logo.png" 
                alt="Sui Do Logo" 
                className="w-24 h-24 object-contain drop-shadow-2xl translate-y-1"
              />              
              <h1 className="text-6xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-2xl hover:scale-105 transition-transform duration-300 cursor-default">
                Sui Do
              </h1>
            </div>

            <p className="text-gray-300 text-lg font-light tracking-wide max-w-md mx-auto mb-4">
              Web3 task management powered by the
              <span className="block font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-2xl hover:scale-105 transition-transform duration-300 cursor-default mt-2">
                Sui blockchain
              </span>
            </p>

            {/* Connection Status */}
            {currentAccount && (
              <div className="flex items-center justify-center gap-3 mt-6">
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full backdrop-blur-sm">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300 text-sm font-medium">
                    Connected to Sui
                  </span>
                </div>
                
                <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full backdrop-blur-sm">
                  <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
                  <span className="text-purple-300 text-sm font-medium">
                    AI Ready
                  </span>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Main Content */}
        {currentAccount ? (
          <div className="space-y-8 animate-in fade-in duration-700">

            <div className="space-y-4">
              <TodoMain />
            </div>          
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-24 space-y-8 animate-in fade-in duration-1000">
            <div className="relative group">
              <div className="absolute -inset-8 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-blue-500/20 rounded-full blur-3xl opacity-50 animate-pulse"></div>
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-full blur-2xl opacity-30 animate-pulse delay-300"></div>
              
              <div className="relative w-24 h-24 flex items-center justify-center bg-gray-900/80 border border-gray-700/50 rounded-3xl shadow-2xl backdrop-blur-md group-hover:scale-110 transition-all duration-500">
                <Wallet className="w-10 h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" />
              </div>
            </div>

            {/* Message */}
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg hover:scale-105 transition-transform duration-300 cursor-default">
                Connect Your Wallet
              </h2>
              
              <p className="text-gray-400 text-lg font-light max-w-sm mx-auto leading-relaxed">
                Unlock the power of decentralized task management on{" "}
                <span className="text-cyan-400 font-medium">Sui Network</span>
              </p>
              
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-6">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>Secure • Decentralized • AI-Powered</span>
              </div>
            </div>

            {/* Connect Button Container */}
            <div className="relative group mt-8">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative">
                <ConnectButton />
              </div>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-3 gap-6 mt-12 max-w-md">
              <div className="text-center group">
                <div className="w-12 h-12 mx-auto mb-2 bg-green-500/10 rounded-xl flex items-center justify-center group-hover:bg-green-500/20 transition-colors duration-300">
                  <Zap className="w-6 h-6 text-green-400" />
                </div>
                <p className="text-xs text-gray-400">Lightning Fast</p>
              </div>
              
              <div className="text-center group">
                <div className="w-12 h-12 mx-auto mb-2 bg-purple-500/10 rounded-xl flex items-center justify-center group-hover:bg-purple-500/20 transition-colors duration-300">
                  <Shield className="w-6 h-6 text-purple-400" />
                </div>
                <p className="text-xs text-gray-400">Secure</p>
              </div>
              
              <div className="text-center group">
                <div className="w-12 h-12 mx-auto mb-2 bg-cyan-500/10 rounded-xl flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors duration-300">
                  <Sparkles className="w-6 h-6 text-cyan-400" />
                </div>
                <p className="text-xs text-gray-400">AI-Powered</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
    </div>
  );
}

export default App;