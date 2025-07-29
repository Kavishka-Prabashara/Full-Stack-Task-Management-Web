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
    const navigate = useNavigate();

    const { user, loading, error } = useSelector((state: RootState) => state.auth);

    const handleLogin = () => {
        dispatch(loginUser({ email, password }));
    };

    // ✅ Navigate and show message on successful login
    useEffect(() => {
        if (user) {
            alert('Login successful!');
            navigate('/dashboard'); // replace with your actual route
        }
    }, [user, navigate]);

    return (
        <div>
            <h2>Login</h2>

            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
            />

            <button onClick={handleLogin} disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
            </button>

            {/* ✅ Show login error if any */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <p>
                Don't have an account?{' '}
                <button onClick={() => navigate('/signup')}>Sign Up</button>
            </p>
        </div>
    );
}
