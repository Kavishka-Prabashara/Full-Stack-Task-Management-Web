import React from 'react';

interface Props {
    children: React.ReactNode;
    title?: string;
}

export default function DashBoardWrapper({ children, title }: Props) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-6 sm:p-10">
                {title && (
                    <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
                        {title}
                    </h1>
                )}
                {children}
            </div>
        </div>
    );
}
