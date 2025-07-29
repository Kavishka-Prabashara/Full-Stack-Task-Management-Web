// src/components/AuthWrapper.tsx
export default function AuthWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div
            className="min-h-screen bg-cover bg-center relative"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8anVuZ2xlJTIwZm9yZXN0fGVufDB8fDB8fHww')" }} // Replace with your image path
        >
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-8 w-full max-w-md text-white">
                    {children}
                </div>
            </div>
        </div>
    );
}
