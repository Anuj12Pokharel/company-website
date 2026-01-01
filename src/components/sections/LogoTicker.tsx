"use client";

import { CLIENTS } from "@/constants/content";

export function LogoTicker() {
    const duplicated = [...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS];
    
    return (
        <div className="w-full overflow-hidden py-16 border-y border-white/10 bg-card/20">
            <div className="flex">
                <div
                    className="flex gap-16 md:gap-32 pr-16 md:pr-32 whitespace-nowrap"
                    style={{
                        animation: "scroll 40s linear infinite"
                    }}
                >
                    {duplicated.map((client, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded bg-card/50 flex items-center justify-center font-bold text-muted-foreground text-xs">
                                {client.logo}
                            </div>
                            <span className="text-sm font-medium text-muted-foreground">
                                {client.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
