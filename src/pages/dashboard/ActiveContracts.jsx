import React, { useState, useEffect } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { FileText, User, Calendar, ArrowRight, Activity } from 'lucide-react';

const ActiveContracts = () => {
    const [dbUser] = useOutletContext();
    const [contracts, setContracts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch only contracts where status is 'Active' or 'Signed'
        fetch(`https://legally-simple-server.vercel.app/contracts?email=${dbUser.email}`)
            .then(res => res.json())
            .then(data => {
                const activeOnes = data.filter(c => c.status === 'Active' || c.status === 'Signed');
                setContracts(activeOnes);
                setLoading(false);
            });
    }, [dbUser.email]);

    if (loading) return <div className="p-10 text-zinc-500 animate-pulse uppercase font-black text-[10px] tracking-[0.3em]">Loading active protocols...</div>;

    return (
        <div className="space-y-8">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black uppercase tracking-tighter dark:text-white">
                        Active <span className="text-[#4f46e5]">Contracts</span>
                    </h1>
                    <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mt-2">
                        Currently executing legal & financial nodes
                    </p>
                </div>
                <div className="hidden md:block text-right">
                    <p className="text-[24px] font-black dark:text-white leading-none">{contracts.length}</p>
                    <p className="text-[8px] text-zinc-500 font-black uppercase tracking-widest">Active Nodes</p>
                </div>
            </header>

            <div className="grid grid-cols-1 gap-4">
                {contracts.length === 0 ? (
                    <div className="p-20 border border-zinc-200 dark:border-white/5 rounded-[2.5rem] text-center bg-zinc-50 dark:bg-white/[0.02]">
                        <Activity className="mx-auto mb-4 text-zinc-300" size={40} />
                        <p className="text-zinc-500 font-black uppercase text-[10px] tracking-widest">No Active Executions Found</p>
                    </div>
                ) : (
                    contracts.map((contract) => (
                        <Motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            key={contract._id} 
                            className="group bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/5 p-6 md:p-8 rounded-[2.5rem] hover:border-[#4f46e5]/30 transition-all shadow-sm"
                        >
                            <div className="flex flex-col md:flex-row justify-between gap-6">
                                {/* Project Info */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-indigo-500/10 rounded-2xl text-[#4f46e5]">
                                            <FileText size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black dark:text-white uppercase tracking-tight group-hover:text-[#4f46e5] transition-colors">
                                                {contract.projectName}
                                            </h3>
                                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                                                ID: {contract._id.slice(-8).toUpperCase()}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-6 mt-4">
                                        <div className="flex items-center gap-2">
                                            <User size={14} className="text-zinc-400" />
                                            <span className="text-[10px] font-black uppercase dark:text-zinc-300 tracking-wider">
                                                {contract.freelancerEmail.split('@')[0]}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar size={14} className="text-zinc-400" />
                                            <span className="text-[10px] font-black uppercase dark:text-zinc-300 tracking-wider">
                                                Started: {new Date(contract.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Progress & Action */}
                                <div className="flex flex-col justify-between items-end gap-4">
                                    <div className="text-right">
                                        <p className="text-[8px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-1">Execution Progress</p>
                                        <div className="w-48 h-1.5 bg-zinc-100 dark:bg-white/5 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-[#4f46e5] rounded-full transition-all duration-1000"
                                                style={{ width: `${(contract.phases.filter(p => p.status === 'Released').length / contract.phases.length) * 100}%` }}
                                            />
                                        </div>
                                        <p className="text-[10px] font-black text-[#4f46e5] mt-2 uppercase">
                                            {contract.phases.filter(p => p.status === 'Released').length} / {contract.phases.length} Phases Released
                                        </p>
                                    </div>

                                    <Link 
                                        to="/dashboard/payments" 
                                        className="flex items-center gap-2 px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-black text-[9px] font-black uppercase tracking-widest rounded-2xl hover:gap-4 transition-all"
                                    >
                                        Manage Funds <ArrowRight size={14} />
                                    </Link>
                                </div>
                            </div>
                        </Motion.div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ActiveContracts;