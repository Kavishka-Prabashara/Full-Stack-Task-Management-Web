import { NavLink, Outlet } from 'react-router-dom';
import React from "react";
import DashBoardWrapper from "../components/DashBoardWrapper.tsx";

export default function Dashboard() {
    return (
        <DashBoardWrapper>
            <h1 className="text-4xl font-extrabold text-left mb-4 text-white">DashBoard</h1>

            <div className="flex flex-col md:flex-row rounded-xl shadow-lg overflow-hidden">
                {/* Sidebar */}
                <div className="md:w-1/4 p-4 border-r border-gray-300 text-white">
                    <div className="space-y-4">
                        <NavLink
                            to="/dashboard/account"
                            className={({ isActive }) =>
                                `block px-4 py-3 rounded-xl border text-center font-mono font-bold ${
                                    isActive ? 'bg-blue-500 text-white' : 'bg-white/20 text-white'
                                }`
                            }
                        >
                            Account_BTN
                        </NavLink>

                        <NavLink
                            to="/dashboard/tasks"
                            className={({ isActive }) =>
                                `block px-4 py-3 rounded-xl border text-center font-mono font-bold ${
                                    isActive ? 'bg-blue-500 text-white' : 'bg-white/20 text-white'
                                }`
                            }
                        >
                            Task_BTN
                        </NavLink>

                        <NavLink
                            to="/dashboard/calendar"
                            className={({ isActive }) =>
                                `block px-4 py-3 rounded-xl border text-center font-mono font-bold ${
                                    isActive ? 'bg-blue-500 text-white' : 'bg-white/20 text-white'
                                }`
                            }
                        >
                            Calender
                        </NavLink>

                        <NavLink
                            to="/logout"
                            className="block px-4 py-3 rounded-xl border text-center font-mono font-bold bg-red-500 text-white"
                        >
                            Logout
                        </NavLink>
                    </div>
                </div>

                {/* Workspace */}
                <div className="md:w-3/4 p-6 text-white">
                    <div className="bg-white/10 backdrop-blur-sm border border-gray-300 rounded-xl p-6 min-h-[400px]">
                        <Outlet />
                    </div>
                </div>
            </div>
        </DashBoardWrapper>
    );
}
