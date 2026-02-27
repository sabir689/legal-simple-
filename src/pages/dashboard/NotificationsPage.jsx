import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { 
    Bell, 
    FileSignature, 
    Zap, 
    Unlock, 
    AlertTriangle, 
    CheckCircle2, 
    Trash2,
    Clock
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const NotificationsPage = () => {
    const { user } = useContext(AuthContext);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Logic: In a real app, you'd have a 'notifications' collection.
        // For now, we simulate this by fetching recent contract updates.
        const fetchAlerts = async () => {
            try {
                const response = await fetch(`https://legally-simple-server.vercel.app/contracts?email=${user?.email}`);
                const contracts = await response.json();
                
                // We generate notification objects based on contract states
                const alerts = contracts.flatMap(c => {
                    const logs = [];
                    if (c.status === 'Active') logs.push({ id: `${c._id}-sig`, type: 'SIGN', title: 'Contract Signed', project: c.projectName, date: c.updatedAt || c.createdAt });
                    if (c.status === 'Disputed') logs.push({ id: `${c._id}-disp`, type: 'DISPUTE', title: 'Dispute Opened', project: c.projectName, date: c.updatedAt });
                    
                    // Add phase-specific alerts
                    c.phases.forEach(p => {
                        if (p.status === 'Funded') logs.push({ id: `${p.id}-fund`, type: 'FUND', title: 'Phase Funded', project: c.projectName, detail: p.name, date: c.updatedAt });
                        if (p.status === 'Released') logs.push({ id: `${p.id}-rel`, type: 'RELEASE', title: 'Payment Released', project: c.projectName, detail: p.name, date: c.updatedAt });
                    });
                    return logs;
                });

                setNotifications(alerts.sort((a, b) => new Date(b.date) - new Date(a.date)));
            } catch (error) {
                console.error("Alert Fetch Error:", error);
            } finally {
                setLoading(false);
            }
        };

        if (user?.email) fetchAlerts();
    }, [user]);

    const clearNotification = (id) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    return (
        <div className="max-w-4xl mx-auto py-12 px-6">
            <header className="flex justify-between items-end mb-12">
                <div>
                    <h1 className="text-4xl font-black uppercase tracking-tighter dark:text-white flex items-center gap-3">
                        <Bell className="text-[#4f46e5]" size={32} />
                        System <span className="text-zinc-500">Alerts</span>
                    </h1>
                    <p className="text-zinc-500 text-[10px] mt-2 font-black uppercase tracking-[0.3em]">Real-time protocol activity log</p>
                </div>
                <button 
                    onClick={() => setNotifications([])}
                    className="text-[9px] font-black uppercase tracking-widest text-zinc-400 hover:text-red-500 transition-colors"
                >
                    Clear All Registry
                </button>
            </header>

            <div className="space-y-4">
                {loading ? (
                    [1, 2, 3].map(n => <div key={n} className="h-24 w-full bg-zinc-100 dark:bg-white/5 animate-pulse rounded-3xl" />)
                ) : (
                    <AnimatePresence mode="popLayout">
                        {notifications.length > 0 ? (
                            notifications.map((alert) => (
                                <Motion.div
                                    layout
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    key={alert.id}
                                    className="group relative bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/5 p-6 rounded-[2rem] flex items-center gap-6 hover:border-[#4f46e5]/30 transition-all shadow-lg hover:shadow-indigo-500/5"
                                >
                                    <div className={`p-4 rounded-2xl ${getAlertTheme(alert.type).bg} ${getAlertTheme(alert.type).color}`}>
                                        {getAlertTheme(alert.type).icon}
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-black dark:text-white text-xs uppercase tracking-tight">{alert.title}</h3>
                                            <span className="w-1 h-1 rounded-full bg-zinc-300" />
                                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-tighter">{alert.project}</p>
                                        </div>
                                        <p className="text-[10px] text-zinc-400 font-medium lowercase">
                                            {alert.detail ? `Protocol update: ${alert.detail}` : `Cryptographic signature verified for ${alert.project}`}
                                        </p>
                                    </div>

                                    <div className="flex flex-col items-end gap-3">
                                        <div className="flex items-center gap-1.5 text-zinc-400">
                                            <Clock size={10} />
                                            <span className="text-[9px] font-bold uppercase tracking-tighter">
                                                {formatDistanceToNow(new Date(alert.date))} ago
                                            </span>
                                        </div>
                                        <button 
                                            onClick={() => clearNotification(alert.id)}
                                            className="opacity-0 group-hover:opacity-100 p-2 text-zinc-400 hover:text-red-500 transition-all"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </Motion.div>
                            ))
                        ) : (
                            <Motion.div 
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className="text-center py-32 bg-zinc-50 dark:bg-white/5 rounded-[3rem] border border-dashed border-zinc-200 dark:border-white/10"
                            >
                                <CheckCircle2 className="mx-auto text-zinc-300 mb-4" size={48} />
                                <h2 className="text-lg font-black dark:text-white uppercase tracking-tighter">System Clear</h2>
                                <p className="text-zinc-500 text-[10px] uppercase tracking-widest mt-1">No pending alerts in the registry.</p>
                            </Motion.div>
                        )}
                    </AnimatePresence>
                )}
            </div>
        </div>
    );
};

// --- STYLE HELPERS ---

const getAlertTheme = (type) => {
    switch (type) {
        case 'SIGN': return { icon: <FileSignature size={20} />, bg: 'bg-indigo-500/10', color: 'text-indigo-500' };
        case 'FUND': return { icon: <Zap size={20} />, bg: 'bg-amber-500/10', color: 'text-amber-500' };
        case 'RELEASE': return { icon: <Unlock size={20} />, bg: 'bg-emerald-500/10', color: 'text-emerald-500' };
        case 'DISPUTE': return { icon: <AlertTriangle size={20} />, bg: 'bg-red-500/10', color: 'text-red-500' };
        default: return { icon: <Bell size={20} />, bg: 'bg-zinc-100', color: 'text-zinc-500' };
    }
};

export default NotificationsPage;