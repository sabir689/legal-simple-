import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { DollarSign, Send, CheckCircle, Clock, ShieldCheck, Inbox } from 'lucide-react';
import Swal from 'sweetalert2';

const EscrowPage = () => {
    const { user } = useContext(AuthContext);
    const [contracts, setContracts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEscrowLedger = async () => {
            try {
                // Initializing protocol fetch
                const response = await fetch(`https://legally-simple-server.vercel.app/contracts?email=${user?.email}`);
                const data = await response.json();
                
                // Filtering out drafts; escrow only handles active/signed protocols
                setContracts(data.filter(c => c.status !== 'Draft'));
            } catch (error) {
                console.error("Escrow Ledger Access Error:", error);
            } finally {
                setLoading(false);
            }
        };
        if (user?.email) fetchEscrowLedger();
    }, [user]);

    const handleUpdatePhase = async (contractId, phaseId, newStatus) => {
        try {
            const updatedContracts = contracts.map(c => {
                if (c._id === contractId) {
                    const updatedPhases = c.phases.map(p => 
                        p.id === phaseId ? { ...p, status: newStatus } : p
                    );
                    return { ...c, phases: updatedPhases };
                }
                return c;
            });

            const targetContract = updatedContracts.find(c => c._id === contractId);
            
            await fetch(`https://legally-simple-server.vercel.app/contracts/${contractId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phases: targetContract.phases })
            });

            setContracts(updatedContracts);
            
            Swal.fire({
                title: 'LEDGER UPDATED',
                text: `Status synchronized: ${newStatus}`,
                icon: 'success',
                background: '#0a0a0a',
                color: '#fff',
                confirmButtonColor: '#4f46e5'
            });
        } catch (error) {
            Swal.fire({ title: 'SYNC ERROR', text: 'Protocol update failed', icon: error });
        }
    };

    return (
        <div className="max-w-6xl mx-auto py-12 px-6">
            <header className="mb-12">
                <h1 className="text-4xl font-black uppercase tracking-tighter dark:text-white flex items-center gap-3">
                    <ShieldCheck className="text-[#4f46e5]" size={36} />
                    Escrow <span className="text-zinc-500 font-light italic">Vault</span>
                </h1>
                <p className="text-zinc-500 text-[10px] mt-2 font-black uppercase tracking-[0.3em]">
                    Financial Milestone Tracking & Liquidity Management
                </p>
            </header>

            <div className="space-y-8">
                {loading ? (
                    // --- SKELETON LOADING STATE ---
                    <div className="space-y-6">
                        {[1, 2].map(n => (
                            <div key={n} className="h-48 w-full bg-zinc-100 dark:bg-white/5 animate-pulse rounded-[2.5rem]" />
                        ))}
                    </div>
                ) : (
                    <AnimatePresence mode="wait">
                        {contracts.length > 0 ? (
                            contracts.map((contract) => (
                                <Motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    key={contract._id} 
                                    className="bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl"
                                >
                                    {/* --- CARD HEADER --- */}
                                    <div className="p-8 border-b border-zinc-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-zinc-50/50 dark:bg-white/[0.01]">
                                        <div>
                                            <h3 className="text-xl font-black dark:text-white uppercase tracking-tighter">{contract.projectName}</h3>
                                            <p className="text-[10px] text-zinc-500 font-mono mt-1 uppercase tracking-widest flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                                Client: {contract.clientEmail}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] font-black text-zinc-400 uppercase mb-1">Total Vault Value</p>
                                            <p className="text-2xl font-black text-[#4f46e5]">${contract.totalAmount?.toLocaleString()}</p>
                                        </div>
                                    </div>

                                    {/* --- PHASES LIST --- */}
                                    <div className="p-8 space-y-4">
                                        {contract.phases.map((phase) => (
                                            <div key={phase.id} className="flex flex-col md:flex-row items-center justify-between p-6 bg-zinc-50 dark:bg-zinc-900/40 rounded-3xl border border-transparent hover:border-zinc-200 dark:hover:border-white/10 transition-all gap-6">
                                                <div className="flex items-center gap-5 flex-1">
                                                    <div className={`p-4 rounded-2xl ${getStatusColor(phase.status)}`}>
                                                        <StatusIcon status={phase.status} />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-black dark:text-white text-sm uppercase tracking-tight">{phase.name}</h4>
                                                        <p className="font-mono text-xs text-zinc-500 mt-1">${Number(phase.amount).toLocaleString()}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-6 w-full md:w-auto">
                                                    <div className="text-right hidden md:block">
                                                        <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Milestone Status</p>
                                                        <p className={`text-[10px] font-black uppercase tracking-tighter ${phase.status === 'Released' ? 'text-emerald-500' : 'text-zinc-400'}`}>
                                                            {phase.status}
                                                        </p>
                                                    </div>

                                                    <div className="flex gap-2 w-full md:w-auto">
                                                        {phase.status === 'Funded' && (
                                                            <button 
                                                                onClick={() => handleUpdatePhase(contract._id, phase.id, 'Submitted')}
                                                                className="flex-1 md:flex-none px-6 py-3 bg-[#4f46e5] text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-xl hover:scale-105 transition-all flex items-center justify-center gap-2"
                                                            >
                                                                <Send size={12} /> Submit Work
                                                            </button>
                                                        )}
                                                        {phase.status === 'Approved' && (
                                                            <button 
                                                                onClick={() => handleUpdatePhase(contract._id, phase.id, 'Released')}
                                                                className="flex-1 md:flex-none px-6 py-3 bg-emerald-500 text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-xl hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                                                            >
                                                                <DollarSign size={12} /> Request Release
                                                            </button>
                                                        )}
                                                        {phase.status === 'Awaiting Funding' && (
                                                            <div className="px-6 py-3 bg-zinc-100 dark:bg-white/5 text-zinc-400 text-[9px] font-black uppercase tracking-widest rounded-xl border border-zinc-200 dark:border-white/5">
                                                                Awaiting Deposit
                                                            </div>
                                                        )}
                                                        {phase.status === 'Released' && (
                                                            <div className="px-6 py-3 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[9px] font-black uppercase tracking-widest rounded-xl flex items-center gap-2">
                                                                <CheckCircle size={12} /> Disbursed
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Motion.div>
                            ))
                        ) : (
                            // --- EMPTY STATE ---
                            <Motion.div 
                                initial={{ opacity: 0 }} 
                                animate={{ opacity: 1 }} 
                                className="text-center py-32 bg-zinc-50 dark:bg-white/5 rounded-[3rem] border-2 border-dashed border-zinc-200 dark:border-white/5"
                            >
                                <div className="inline-flex p-6 rounded-full bg-zinc-100 dark:bg-white/5 mb-6 text-zinc-400">
                                    <Inbox size={40} />
                                </div>
                                <h3 className="text-lg font-black dark:text-white uppercase tracking-tighter">Vault is Empty</h3>
                                <p className="text-zinc-500 text-xs mt-2 uppercase tracking-widest">No active escrow milestones require attention.</p>
                            </Motion.div>
                        )}
                    </AnimatePresence>
                )}
            </div>
        </div>
    );
};

// --- HELPER LOGIC ---

const getStatusColor = (status) => {
    switch (status) {
        case 'Awaiting Funding': return 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400';
        case 'Funded': return 'bg-amber-500/10 text-amber-500';
        case 'Submitted': return 'bg-blue-500/10 text-blue-500';
        case 'Approved': return 'bg-emerald-500/10 text-emerald-500';
        case 'Released': return 'bg-[#4f46e5]/10 text-[#4f46e5]';
        default: return 'bg-zinc-100 text-zinc-400';
    }
};

const StatusIcon = ({ status }) => {
    switch (status) {
        case 'Awaiting Funding': return <Clock size={18} />;
        case 'Funded': return <DollarSign size={18} />;
        case 'Submitted': return <Send size={18} />;
        case 'Approved': return <CheckCircle size={18} />;
        case 'Released': return <ShieldCheck size={18} />;
        default: return <Clock size={18} />;
    }
};

export default EscrowPage;