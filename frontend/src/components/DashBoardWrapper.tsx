import React from 'react';

interface Props {
    children: React.ReactNode;
    title?: string;
}

export default function DashBoardWrapper({ children }: Props) {
    return (
        <div
            className="min-h-screen bg-cover bg-center relative"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8anVuZ2xlJTIwZm9yZXN0fGVufDB8fDB8fHww')",
            }}
        >
            {/* overlay */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

            {/* main content */}
            <div className="relative z-10 flex items-start justify-center p-6">
                <div className="w-full">{children}</div>
            </div>
        </div>
    );
}
