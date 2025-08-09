import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthWrapper from '../components/AuthWrapper';

export default function SignupPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validationError, setValidationError] = useState('');
    const navigate = useNavigate();

    const validateInputs = () => {
        if (!username || !email || !password) {
            setValidationError('All fields are required');
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setValidationError('Invalid email format');
            return false;
        }
        if (password.length < 6) {
            setValidationError('Password must be at least 6 characters long');
            return false;
        }
        setValidationError('');
        return true;
    };

    const handleSignup = async () => {
        if (!validateInputs()) return;
        try {
            await axios.post('http://localhost:5000/api/auth/register', {
                username,
                email,
                password,
            });
            alert('Signup successful! Now you can login.');
            navigate('/');
        } catch (err: any) {
            alert(err?.response?.data?.message || 'Signup failed');
        }
    };

    return (
        <AuthWrapper>
            <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
            <input
                className="w-full mb-4 p-2 rounded bg-white/20 text-white placeholder-white"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                className="w-full mb-4 p-2 rounded bg-white/20 text-white placeholder-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                className="w-full mb-4 p-2 rounded bg-white/20 text-white placeholder-white"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            {validationError && (
                <p className="text-red-400 text-sm text-center mb-2">{validationError}</p>
            )}
            <button
                onClick={handleSignup}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
            >
                Sign Up
            </button>
            <p className="text-sm text-center mt-4">
                Back to Login{' '}
                <button className="underline" onClick={() => navigate('/')}>
                    Back
                </button>
            </p>
        </AuthWrapper>
    );
}
