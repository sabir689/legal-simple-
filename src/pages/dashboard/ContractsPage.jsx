import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Eye, Edit3, Trash2, Filter, Search } from 'lucide-react';
import Swal from 'sweetalert2';

const ContractsPage = () => {
    const { user } = useContext(AuthContext);
    const [contracts, setContracts] = useState([]);
    const [filter, setFilter] = useState('All');
    const [loading, setLoading] = useState(true);

    const categories = ['All', 'Active', 'Pending Signature', 'Completed', 'Disputed'];

    useEffect(() => {
        const fetchContracts = async () => {
            try {
                const response = await fetch(`https://legally-simple-server.vercel.app/contracts?email=${user?.email}&status=${filter}`);
                const data = await response.json();
                setContracts(data);
            } catch (error) {
                console.error("Ledger Fetch Error:", error);
            } finally {
                setLoading(false);
            }
        };

        if (user?.email) fetchContracts();
    }, [user, filter]);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'TERMINATE PROTOCOL?',
            text: "This action cannot be undone. Data will be purged.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#18181b',
            confirmButtonText: 'PURGE',
            background: '#0a0a0a',
            color: '#fff'
        });

        if (result.isConfirmed) {
            await fetch(`https://legally-simple-server.vercel.app/contracts/${id}`, { method: 'DELETE' });
            setContracts(contracts.filter(c => c._id !== id));
            Swal.fire({ title: 'PURGED', icon: 'success', background: '#0a0a0a', color: '#fff' });
        }
    };

    return (
        <div className="max-w-7xl mx-auto py-10 px-6">
            {/* --- HEADER --- */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-black uppercase tracking-tighter dark:text-white">Contract <span className="text-[#4f46e5]">Ledger</span></h1>
                    <p className="text-zinc-500 text-sm mt-1 font-medium">Registry of all cryptographic service agreements.</p>
                </div>
                
                <Link to="/dashboard/create" className="px-8 py-4 bg-[#4f46e5] text-white text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-indigo-500/20 hover:scale-105 transition-all">
                    Initialize Protocol
                </Link>
            </div>

            {/* --- FILTER BAR --- */}
            <div className="flex bg-zinc-100 dark:bg-white/5 p-1.5 rounded-2xl mb-8 overflow-x-auto no-scrollbar max-w-fit">
                {categories.map(cat => (
                    <button 
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-6 py-2.5 text-[9px] font-black uppercase tracking-widest rounded-xl transition-all whitespace-nowrap ${
                            filter === cat 
                            ? 'bg-white dark:bg-zinc-800 dark:text-white shadow-lg' 
                            : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* --- DATA TABLE --- */}
            <div className="bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-zinc-100 dark:border-white/5 bg-zinc-50/50 dark:bg-white/[0.01]">
                                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Project / Client</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Total Value</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Current Phase</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Status</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100 dark:divide-white/5">
                            <AnimatePresence>
                                {contracts.map((contract) => (
                                    <Motion.tr 
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        key={contract._id} 
                                        className="hover:bg-zinc-50/50 dark:hover:bg-white/[0.01] transition-colors group"
                                    >
                                        <td className="p-6">
                                            <p className="font-black dark:text-white uppercase text-xs tracking-tight group-hover:text-[#4f46e5] transition-colors">{contract.projectName}</p>
                                            <p className="text-[10px] text-zinc-500 uppercase tracking-tighter mt-1 font-mono">{contract.clientEmail}</p>
                                        </td>
                                        <td className="p-6">
                                            <span className="font-mono text-sm dark:text-zinc-300 font-bold">
                                                ${contract.totalAmount?.toLocaleString()}
                                            </span>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-16 h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                                    <div className="h-full bg-[#4f46e5]" style={{ width: '25%' }} />
                                                </div>
                                                <span className="text-[9px] font-black dark:text-zinc-500 uppercase tracking-tighter">
                                                    Phase 1/4
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <StatusBadge status={contract.status} />
                                        </td>
                                        <td className="p-6">
                                            <div className="flex justify-end gap-2">
                                                <Link to={`/dashboard/contracts/view/${contract._id}`} className="p-3 bg-zinc-100 dark:bg-white/5 rounded-xl hover:bg-[#4f46e5] hover:text-white transition-all">
                                                    <Eye size={14} />
                                                </Link>
                                                <Link to={`/dashboard/contracts/edit/${contract._id}`} className="p-3 bg-zinc-100 dark:bg-white/5 rounded-xl hover:bg-amber-500 hover:text-white transition-all">
                                                    <Edit3 size={14} />
                                                </Link>
                                                <button onClick={() => handleDelete(contract._id)} className="p-3 bg-zinc-100 dark:bg-white/5 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </Motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>

                {/* --- EMPTY STATE --- */}
                {!loading && contracts.length === 0 && (
                    <div className="py-32 text-center">
                        <div className="inline-flex p-8 rounded-full bg-zinc-50 dark:bg-white/5 mb-6">
                            <Filter className="text-zinc-300 dark:text-zinc-700" size={40} />
                        </div>
                        <h3 className="text-lg font-black dark:text-white uppercase tracking-tighter">No Protocols Stored</h3>
                        <p className="text-zinc-500 text-sm max-w-xs mx-auto mt-2">Adjust your filters or initialize a new cryptographic agreement.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const StatusBadge = ({ status }) => {
    const styles = {
        'Active': 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
        'Pending Signature': 'text-amber-500 bg-amber-500/10 border-amber-500/20',
        'Disputed': 'text-red-500 bg-red-500/10 border-red-500/20',
        'Completed': 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20',
    };

    return (
        <span className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border ${styles[status] || 'bg-zinc-100 text-zinc-500'}`}>
            {status}
        </span>
    );
};

export default ContractsPage;