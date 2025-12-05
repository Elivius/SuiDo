export function Header() {
    return (
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
            </div>
        </header>
    );
}
