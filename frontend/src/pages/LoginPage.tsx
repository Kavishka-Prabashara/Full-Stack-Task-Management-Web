import AuthWrapper from '../components/AuthWrapper';
import { useAppDispatch } from '../redux/hook';
import { useState, useEffect } from 'react';
import { loginUser } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';

export default function LoginPage() {
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validationError, setValidationError] = useState('');
    const navigate = useNavigate();
    const { user, loading, error } = useSelector((state: RootState) => state.auth);

    const validateInputs = () => {
        if (!email || !password) {
            setValidationError('Email and Password are required');
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setValidationError('Invalid email format');
            return false;
        }
        setValidationError('');
        return true;
    };

    const handleLogin = () => {
        if (!validateInputs()) return;
        dispatch(loginUser({ email, password }));
    };

    useEffect(() => {
        if (user) {
            alert('Login successful!');
            navigate('/dashboard/tasks');
        }
    }, [user, navigate]);

    return (
        <AuthWrapper>
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
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
            {(validationError || error) && (
                <p className="text-red-400 text-sm text-center mb-2">
                    {validationError || error}
                </p>
            )}
            <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded mb-4"
            >
                {loading ? 'Logging in...' : 'Login'}
            </button>
            <p className="text-sm text-center">
                Don't have an account?{' '}
                <button className="underline" onClick={() => navigate('/signup')}>
                    Sign Up
                </button>
            </p>
        </AuthWrapper>
    );
}
