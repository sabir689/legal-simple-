import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { 
    User, 
    CreditCard, 
    BellRing, 
    Shield, 
    FileText, 
    ExternalLink,
    CheckCircle2,
    Save
} from 'lucide-react';
import Swal from 'sweetalert2';

const SettingsPage = () => {
    const { user } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('Profile');

    const tabs = [
        { id: 'Profile', icon: <User size={16} />, label: 'Identity' },
        { id: 'Payment', icon: <CreditCard size={16} />, label: 'Payments' },
        { id: 'Alerts', icon: <BellRing size={16} />, label: 'Alerts' },
        { id: 'Security', icon: <Shield size={16} />, label: 'Security' },
        { id: 'Legal', icon: <FileText size={16} />, label: 'Templates' },
    ];

    const handleSave = () => {
        Swal.fire({
            title: 'PROTOCOL SAVED',
            text: 'Global settings updated successfully.',
            icon: 'success',
            background: '#0a0a0a',
            color: '#fff',
            confirmButtonColor: '#4f46e5'
        });
    };

    return (
        <div className="max-w-5xl mx-auto py-12 px-6">
            <header className="mb-12">
                <h1 className="text-4xl font-black uppercase tracking-tighter dark:text-white">System <span className="text-[#4f46e5]">Settings</span></h1>
                <p className="text-zinc-500 text-[10px] mt-2 font-black uppercase tracking-[0.3em]">Configure your cryptographic work environment</p>
            </header>

            <div className="flex flex-col md:flex-row gap-12">
                {/* --- SIDEBAR TABS --- */}
                <div className="w-full md:w-64 space-y-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                activeTab === tab.id 
                                ? 'bg-[#4f46e5] text-white shadow-xl shadow-indigo-500/20' 
                                : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-white/5'
                            }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* --- CONTENT AREA --- */}
                <div className="flex-1 bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/5 rounded-[2.5rem] p-10 shadow-2xl">
                    <AnimatePresence mode="wait">
                        <Motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {activeTab === 'Profile' && <ProfileSettings user={user} />}
                            {activeTab === 'Payment' && <PaymentSettings />}
                            {activeTab === 'Alerts' && <NotificationSettings />}
                            {activeTab === 'Security' && <SecuritySettings />}
                            {activeTab === 'Legal' && <LegalTemplates />}
                        </Motion.div>
                    </AnimatePresence>

                    <div className="mt-12 pt-8 border-t border-zinc-100 dark:border-white/5 flex justify-end">
                        <button 
                            onClick={handleSave}
                            className="flex items-center gap-2 px-8 py-4 bg-zinc-900 dark:bg-white dark:text-black text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:scale-105 transition-all"
                        >
                            <Save size={14} /> Commit Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- SUB-COMPONENTS ---

const ProfileSettings = ({ user }) => (
    <div className="space-y-6">
        <h2 className="text-xl font-black dark:text-white uppercase tracking-tighter mb-6">Identity Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest px-1">Display Name</label>
                <input type="text" defaultValue={user?.displayName} className="w-full bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-xl p-4 text-sm dark:text-white focus:outline-none focus:border-[#4f46e5] transition-all" />
            </div>
            <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest px-1">Registry Email</label>
                <input type="email" readOnly value={user?.email} className="w-full bg-zinc-100 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/10 rounded-xl p-4 text-sm text-zinc-500 cursor-not-allowed font-mono" />
            </div>
        </div>
    </div>
);

const PaymentSettings = () => (
    <div className="space-y-6">
        <h2 className="text-xl font-black dark:text-white uppercase tracking-tighter mb-2">Payment Infrastructure</h2>
        <p className="text-zinc-500 text-xs mb-8">Connect your Stripe account to enable automated escrow releases.</p>
        
        <div className="p-8 bg-zinc-50 dark:bg-white/5 rounded-3xl border border-dashed border-zinc-200 dark:border-white/10 text-center">
            <div className="w-16 h-16 bg-white dark:bg-zinc-800 rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#635bff] shadow-xl">
                <CreditCard size={32} />
            </div>
            <h3 className="font-bold dark:text-white text-sm mb-2">Stripe Connect</h3>
            <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-6">Status: Disconnected</p>
            <button className="px-6 py-3 bg-[#635bff] text-white text-[9px] font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-all">
                Authorize Stripe Link
            </button>
        </div>
    </div>
);

const NotificationSettings = () => (
    <div className="space-y-6">
        <h2 className="text-xl font-black dark:text-white uppercase tracking-tighter mb-6">Alert Logic</h2>
        {['Email on Signature', 'Push on Funding', 'Daily Revenue Summary', 'Dispute Critical Alerts'].map((pref) => (
            <div key={pref} className="flex items-center justify-between p-4 hover:bg-zinc-50 dark:hover:bg-white/5 rounded-2xl transition-all">
                <span className="text-[10px] font-black uppercase dark:text-zinc-300 tracking-widest">{pref}</span>
                <input type="checkbox" defaultChecked className="accent-[#4f46e5] w-4 h-4" />
            </div>
        ))}
    </div>
);

const SecuritySettings = () => (
    <div className="space-y-6">
        <h2 className="text-xl font-black dark:text-white uppercase tracking-tighter mb-6">Vault Security</h2>
        <button className="w-full flex items-center justify-between p-4 border border-red-500/20 text-red-500 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-red-500/10 transition-all">
            Reset Private Master Key
            <ExternalLink size={14} />
        </button>
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-3">
            <CheckCircle2 className="text-emerald-500" size={16} />
            <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500">Two-Factor Authentication Active</span>
        </div>
    </div>
);

const LegalTemplates = () => (
    <div className="space-y-6">
        <h2 className="text-xl font-black dark:text-white uppercase tracking-tighter mb-6">Contract Blueprints</h2>
        <div className="grid grid-cols-1 gap-4">
            {['Standard Freelance Agreement', 'Software Development Protocol', 'NDA Extension'].map((t) => (
                <div key={t} className="p-4 bg-zinc-50 dark:bg-white/5 rounded-2xl flex items-center justify-between group">
                    <span className="text-[10px] font-black uppercase tracking-widest dark:text-zinc-300">{t}</span>
                    <button className="text-[8px] font-black text-[#4f46e5] uppercase hover:underline">Edit Template</button>
                </div>
            ))}
        </div>
    </div>
);

export default SettingsPage;