import React from 'react';
import { useAppSelector } from '../redux/hook'; // adjust if your hook is in a different file

export default function AccountPage() {
    const user = useAppSelector((state) => state.auth.user);

    return (
        <div className="text-center">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">My Account</h2>
            {user ? (
                <>
                    <p className="text-gray-700">Username: {user.username}</p>
                    <p className="text-gray-700">Email: {user.email}</p>
                </>
            ) : (
                <p className="text-gray-700">User not logged in.</p>
            )}
        </div>
    );
}
