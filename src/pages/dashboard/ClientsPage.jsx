import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { motion as Motion } from 'framer-motion';
import { UserPlus, Mail, TrendingUp, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ClientsPage = () => {
    const { user } = useContext(AuthContext);
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAndProcessClients = async () => {
            try {
                const response = await fetch(`https://legally-simple-server.vercel.app/contracts?email=${user?.email}`);
                const contracts = await response.json();

                // Grouping contracts by Client Email
                const clientMap = contracts.reduce((acc, curr) => {
                    const email = curr.clientEmail;
                    if (!acc[email]) {
                        acc[email] = {
                            email: email,
                            totalRevenue: 0,
                            ongoingCount: 0,
                            projects: []
                        };
                    }
                    acc[email].totalRevenue += Number(curr.totalAmount || 0);
                    if (curr.status === 'Active' || curr.status === 'Pending Signature') {
                        acc[email].ongoingCount += 1;
                    }
                    acc[email].projects.push(curr.projectName);
                    return acc;
                }, {});

                setClients(Object.values(clientMap));
            } catch (error) {
                console.error("Client Ledger Error:", error);
            } finally {
                setLoading(false);
            }
        };

        if (user?.email) fetchAndProcessClients();
    }, [user]);

    return (
        <div className="max-w-7xl mx-auto py-12 px-6">
            {/* --- HEADER --- */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div>
                    <h1 className="text-4xl font-black uppercase tracking-tighter dark:text-white">Client <span className="text-[#4f46e5]">Directory</span></h1>
                    <p className="text-zinc-500 text-sm mt-2 font-medium uppercase tracking-widest">Revenue and relationship tracking</p>
                </div>
                <Link to="/dashboard/create" className="flex items-center gap-2 px-6 py-4 bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest dark:text-white hover:border-[#4f46e5] transition-all">
                    <UserPlus size={14} /> Add New Client
                </Link>
            </div>

            {/* --- CLIENT GRID --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clients.map((client, index) => (
                    <Motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        key={client.email}
                        className="group bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/5 rounded-[2.5rem] p-8 hover:border-[#4f46e5]/50 transition-all shadow-xl"
                    >
                        <div className="flex justify-between items-start mb-8">
                            <div className="w-12 h-12 bg-zinc-100 dark:bg-white/5 rounded-2xl flex items-center justify-center text-[#4f46e5]">
                                <Mail size={20} />
                            </div>
                            <div className="text-right">
                                <span className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest ${client.ongoingCount > 0 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-zinc-100 text-zinc-400'}`}>
                                    {client.ongoingCount > 0 ? 'Active Relationship' : 'Inactive'}
                                </span>
                            </div>
                        </div>

                        <h3 className="text-lg font-black dark:text-white truncate mb-1">{client.email.split('@')[0]}</h3>
                        <p className="text-[10px] text-zinc-500 font-mono uppercase mb-8">{client.email}</p>

                        <div className="grid grid-cols-2 gap-4 border-t border-zinc-100 dark:border-white/5 pt-6">
                            <div>
                                <p className="text-[8px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-1">Total Revenue</p>
                                <p className="text-lg font-black dark:text-white">${client.totalRevenue.toLocaleString()}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[8px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-1">Ongoing</p>
                                <p className="text-lg font-black dark:text-white">{client.ongoingCount} <span className="text-[10px] text-zinc-500">Contracts</span></p>
                            </div>
                        </div>

                        <Link 
                            to={`/dashboard/contracts?client=${client.email}`}
                            className="mt-8 w-full py-4 bg-zinc-50 dark:bg-white/5 rounded-2xl flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-widest dark:text-zinc-400 group-hover:bg-[#4f46e5] group-hover:text-white transition-all"
                        >
                            View All Agreements <ChevronRight size={12} />
                        </Link>
                    </Motion.div>
                ))}
            </div>

            {/* --- EMPTY STATE --- */}
            {!loading && clients.length === 0 && (
                <div className="text-center py-24 bg-zinc-50 dark:bg-white/5 rounded-[3rem] border border-dashed border-zinc-200 dark:border-white/10">
                    <TrendingUp className="mx-auto text-zinc-300 mb-4" size={48} />
                    <h2 className="text-xl font-black dark:text-white uppercase">No Client Data Found</h2>
                    <p className="text-zinc-500 text-sm mt-2">Initialize your first contract to begin tracking revenue.</p>
                </div>
            )}
        </div>
    );
};

export default ClientsPage;