import React from 'react';
import { useAppSelector } from '../redux/hook';

export default function AccountPage() {
    const user = useAppSelector((state) => state.auth.user);

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Account Page</h2>
            <div className="flex flex-col md:flex-row">
                {/* Left Side - Image */}
                <div className="md:w-1/2 flex flex-col items-center">
                    <div className="w-60 h-60 flex items-center justify-center relative">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/847/847969.png" // Replace with any avatar URL if needed
                            alt="User"
                            className="w-40 h-40 object-cover rounded-full"
                        />
                    </div>
                </div>

                {/* Right Side - Details */}
                <div className="md:w-1/2 pl-6 pt-4 md:pt-0">
                    {user ? (
                        <>
                            <br/>
                            <br/>
                            <br/>
                            <p className="text-lg font-medium mb-2">
                                <span className="font-bold">Email:</span> {user.email}
                            </p>
                            <p className="text-lg font-medium">
                                <span className="font-bold">Name:</span> {user.username}
                            </p>
                        </>
                    ) : (
                        <p className="text-gray-600">User not logged in.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
