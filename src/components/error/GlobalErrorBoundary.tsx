"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import Logo from "../ui/neural/Logo";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class GlobalErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        // Here you would log to your telemetry service
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="h-screen w-full bg-[#050505] flex flex-col items-center justify-center p-4 text-center font-mono">
                    <div className="scale-150 mb-8 opacity-50 grayscale">
                        <Logo />
                    </div>
                    <h1 className="text-4xl text-primary font-bold mb-4">SYSTEM_FAILURE</h1>
                    <p className="text-muted-foreground max-w-md mb-8">
                        A critical neural disconnect has occurred. Our self-repair algorithms have been notified.
                    </p>
                    <div className="bg-red-500/10 border border-red-500/20 p-4 rounded text-xs text-red-400 font-mono mb-8 max-w-lg overflow-auto">
                        {this.state.error?.toString()}
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 bg-white/5 border border-white/10 text-white rounded hover:bg-white/10 transition-colors uppercase tracking-widest text-sm"
                    >
                        Reboot System
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
