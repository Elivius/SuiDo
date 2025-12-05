import { FloatingStars } from "@/components/ui/FloatingStars";

export function BackgroundEffects() {
    return (
        <>
            {/* Gradient blur orbs */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
                <FloatingStars />
            </div>

            {/* Grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
        </>
    );
}
