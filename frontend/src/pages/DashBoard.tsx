import { NavLink, Outlet } from 'react-router-dom';
import React from "react";
import DashBoardWrapper from "../components/DashBoardWrapper.tsx";

export default function Dashboard() {
    return (
        <DashBoardWrapper>
            <h1 className="text-2xl font-bold text-center mb-4">DashBoard Page</h1>

            <div className="flex rounded-xl shadow-lg overflow-hidden bg-white">
                {/* Sidebar */}
                <div className="w-1/4 bg-gray-100 p-4 border-r border-gray-300">
                    <h2 className="text-xl font-semibold text-center mb-6">SideBar</h2>
                    <div className="space-y-4">
                        <NavLink
                            to="/dashboard/account"
                            className={({ isActive }) =>
                                `block px-4 py-3 rounded-xl border text-center font-mono font-bold ${
                                    isActive ? 'bg-blue-500 text-white' : 'bg-white text-black'
                                }`
                            }
                        >
                            Account_BTN
                        </NavLink>

                        <NavLink
                            to="/dashboard/tasks"
                            className={({ isActive }) =>
                                `block px-4 py-3 rounded-xl border text-center font-mono font-bold ${
                                    isActive ? 'bg-blue-500 text-white' : 'bg-white text-black'
                                }`
                            }
                        >
                            Task_BTN
                        </NavLink>

                        <NavLink
                            to="/dashboard/calendar"
                            className={({ isActive }) =>
                                `block px-4 py-3 rounded-xl border text-center font-mono font-bold ${
                                    isActive ? 'bg-blue-500 text-white' : 'bg-white text-black'
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
                <div className="w-3/4 p-6">
                    <h2 className="text-xl font-semibold text-center mb-4">WorkSpace</h2>
                    <div className="bg-gray-50 border border-gray-300 rounded-xl p-6 min-h-[400px]">
                        <Outlet />
                    </div>
                </div>
            </div>
        </DashBoardWrapper>
    );
}
