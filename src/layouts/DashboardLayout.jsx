import React, { useState, useEffect, useContext } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Sidebar from '../pages/shared/Sidebar';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [dbUser, setDbUser] = useState(null);
    const location = useLocation();

    useEffect(() => {
        if (user?.email) {
            fetch(`https://legally-simple-server.vercel.app/users/${user.email}`)
                .then(res => res.json())
                .then(data => setDbUser(data));
        }
    }, [user]);

    if (!dbUser) return <div className="h-screen bg-[#050505] flex items-center justify-center text-[#4f46e5] font-black tracking-[0.5em]">SYNCING_VAULT...</div>;

    return (
        <div className="flex h-screen bg-zinc-50 dark:bg-[#050505] overflow-hidden">
            {/* SIDEBAR */}
            <Sidebar role={dbUser.role} />

            <div className="flex-1 flex flex-col overflow-hidden">
                {/* TOP BAR */}
                <header className="h-20 bg-white dark:bg-[#0a0a0a] border-b border-zinc-200 dark:border-white/5 flex items-center justify-between px-10">
                    <div className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                        System / <span className="text-[#4f46e5]">{location.pathname.split('/')[2] || 'Overview'}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-xs font-black dark:text-white leading-none uppercase">{dbUser.name}</p>
                            <p className="text-[9px] text-[#4f46e5] font-bold uppercase tracking-tighter">{dbUser.role}</p>
                        </div>
                        <img src={dbUser.photo} alt="User" className="w-10 h-10 rounded-xl border-2 border-[#4f46e5] object-cover" />
                    </div>
                </header>

                {/* MAIN CONTENT */}
                <main className="flex-1 overflow-y-auto p-10">
                    <Outlet context={[dbUser]} />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;