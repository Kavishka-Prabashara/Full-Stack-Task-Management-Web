import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import TaskPage from './pages/TaskPage'; // optional direct route
import Dashboard from './pages/DashBoard';
import AccountPage from './pages/AccountPage';
import TasksPage from './pages/TaskPage';
import CalendarPage from './pages/CalendarPage';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />

                {/* Optional direct route */}
                <Route path="/tasks" element={<TaskPage />} />

                {/* Dashboard Layout with nested routes */}
                <Route path="/dashboard" element={<Dashboard />}>
                    <Route path="account" element={<AccountPage />} />
                    <Route path="tasks" element={<TasksPage />} />
                    <Route path="calendar" element={<CalendarPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
