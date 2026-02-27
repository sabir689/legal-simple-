import React, { useState, useContext } from 'react'; // Added useContext
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Added useNavigate
import { MoreHorizontal, X, LogOut } from 'lucide-react';
import { AuthContext } from '../../contexts/AuthContext';


const Sidebar = ({ role }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    
    // 1. Extract logOut from AuthContext
    const { logOut } = useContext(AuthContext);

    const handleLogout = () => {
        logOut()
            .then(() => {
                console.log("🛡️ PROTOCOL: Session Terminated.");
                navigate('/login'); // Redirect to login page
            })
            .catch(error => console.error("Logout Error:", error));
    };

    const menuItems = {
        freelancer: [
            { name: 'Home', path: '/', icon: '🏠' },
            { name: 'Dashboard', path: '/dashboard', icon: '📊' },
            { name: 'Contracts', path: '/dashboard/contracts', icon: '📜' },
            { name: 'Create Contract', path: '/dashboard/create', icon: '✍️' },
            { name: 'Escrow', path: '/dashboard/escrow', icon: '🔒' },
            { name: 'Clients', path: '/dashboard/clients', icon: '👥' },
        ],
        client: [
            { name: 'Home', path: '/', icon: '🏠' },
            { name: 'Dashboard', path: '/dashboard', icon: '📊' },
            { name: 'Active Contracts', path: '/dashboard/active', icon: '📂' },
            { name: 'Escrow Payments', path: '/dashboard/payments', icon: '💳' },
        ]
    };

    const sharedItems = [
        { name: 'Notifications', path: '/dashboard/notifications', icon: '🔔' },
        { name: 'Settings', path: '/dashboard/settings', icon: '⚙️' },
    ];

    const currentMenu = [...(menuItems[role] || []), ...sharedItems];
    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <>
            {/* --- FLOATING 3-DOT TRIGGER (Mobile Only) --- */}
            <div className="lg:hidden fixed top-4 right-4 z-[60]">
                <button 
                    onClick={toggleSidebar} 
                    className="p-3 bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/10 rounded-full shadow-xl text-zinc-600 dark:text-zinc-400 active:scale-90 transition-transform"
                >
                    {isOpen ? <X size={20} /> : <MoreHorizontal size={20} />}
                </button>
            </div>

            {/* --- BLUR OVERLAY --- */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/40 backdrop-blur-md z-[50] lg:hidden transition-opacity"
                    onClick={toggleSidebar}
                />
            )}

            {/* --- SIDEBAR CONTAINER --- */}
            <aside className={`
                fixed inset-y-0 left-0 z-[55] w-72 bg-white dark:bg-[#0a0a0a] border-r border-zinc-200 dark:border-white/5 
                transform transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1)
                lg:translate-x-0 lg:static lg:inset-0
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                flex flex-col
            `}>
                <div className="p-8 border-b border-zinc-100 dark:border-white/5 hidden lg:block text-xl">
                    <span className="font-black uppercase tracking-tighter text-zinc-900 dark:text-white">
                        VAULT<span className="text-[#4f46e5] italic">CORE</span>
                    </span>
                </div>

                <nav className="flex-1 p-6 space-y-2 mt-4 overflow-y-auto">
                    {currentMenu.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center gap-4 px-4 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                location.pathname === item.path 
                                ? 'bg-[#4f46e5] text-white shadow-lg shadow-indigo-500/30' 
                                : 'text-zinc-500 hover:bg-zinc-50 dark:hover:bg-white/5'
                            }`}
                        >
                            <span className="text-lg">{item.icon}</span>
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Footer / Logout Button Fixed */}
                <div className="p-6 border-t border-zinc-100 dark:border-white/5">
                    <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-4 px-4 py-4 text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 dark:hover:bg-red-500/5 rounded-2xl transition-all"
                    >
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;