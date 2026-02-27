import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';

const DashboardHome = () => {
    const [dbUser] = useOutletContext();

    const isFreelancer = dbUser.role === 'freelancer';

    return (
        <div className="space-y-10">
            {/* WELCOME BANNER */}
            <header>
                <Motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-black uppercase tracking-tighter dark:text-white">
                    Protocol <span className="text-[#4f46e5]">Active</span>, {dbUser.name.split(' ')[0]}
                </Motion.h1>
                <p className="text-zinc-500 text-sm mt-2">Here is your legal overview for {new Date().toLocaleDateString()}.</p>
            </header>

            {/* ROLE-SPECIFIC WIDGETS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {isFreelancer ? (
                    <>
                        <StatCard title="Total Earnings" value="$12,450" detail="+12% this month" color="indigo" />
                        <StatCard title="Active Contracts" value="8" detail="3 Pending Signature" color="emerald" />
                        <StatCard title="Escrow Balance" value="$4,200" detail="Locked Security" color="amber" />
                    </>
                ) : (
                    <>
                        <StatCard title="Total Spent" value="$8,120" detail="Across 4 Projects" color="indigo" />
                        <StatCard title="Active Hires" value="3" detail="Verified Talent" color="emerald" />
                        <StatCard title="Payments Due" value="$1,500" detail="Invoice #882" color="red" />
                    </>
                )}
            </div>

            {/* QUICK ACTIONS */}
            <section className="bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/5 rounded-3xl p-8">
                <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-6">Immediate Operations</h2>
                <div className="flex gap-4">
                    {isFreelancer ? (
                        <button className="px-6 py-3 bg-[#4f46e5] text-white text-[10px] font-black uppercase tracking-widest rounded-xl">Create New Contract</button>
                    ) : (
                        <button className="px-6 py-3 bg-[#4f46e5] text-white text-[10px] font-black uppercase tracking-widest rounded-xl">Post New Project</button>
                    )}
                    <button className="px-6 py-3 border border-zinc-200 dark:border-white/10 dark:text-white text-[10px] font-black uppercase tracking-widest rounded-xl">Download Ledger</button>
                </div>
            </section>
        </div>
    );
};

// Reusable Widget Component
const StatCard = ({ title, value, detail, color }) => (
    <div className="bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/5 p-8 rounded-3xl shadow-sm">
        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4">{title}</p>
        <h3 className="text-3xl font-black dark:text-white mb-1">{value}</h3>
        <p className={`text-[9px] font-bold uppercase tracking-tighter ${color === 'red' ? 'text-red-500' : 'text-emerald-500'}`}>{detail}</p>
    </div>
);

export default DashboardHome;