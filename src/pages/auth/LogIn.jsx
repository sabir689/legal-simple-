import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../contexts/AuthContext'; 
import { useNavigate, Link, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { motion as Motion } from 'framer-motion';

const Login = () => {
    const { signIn, googleLogin } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Determine where the user was trying to go before being redirected here
    const from = location.state?.pathname || "/dashboard";

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            await signIn(data.email, data.password);
            
            await Swal.fire({
                title: 'ACCESS GRANTED',
                text: 'Authentication successful. Entering Network...',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false,
                background: '#0a0a0a',
                color: '#fff',
                customClass: { popup: 'border border-white/10 rounded-3xl' }
            });

            // Redirect to the original destination or the dashboard
            navigate(from, { replace: true });
        } catch (err) {
            const errorMessage = err.message.includes("auth/") 
                ? err.message.split('(')[1].split(')')[0].replace('auth/', '').replace(/-/g, ' ')
                : "Invalid credentials. Please verify your private key.";

            Swal.fire({ 
                title: 'ACCESS DENIED',
                text: errorMessage.toUpperCase(),
                icon: 'error',
                background: '#0a0a0a',
                color: '#fff',
                confirmButtonColor: '#4f46e5'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleEntry = async () => {
        try {
            await googleLogin();
            // Google login also respects the 'from' redirect
            navigate(from, { replace: true });
        } catch (error) {
            console.error("Google Auth Failure:", error);
        }
    };

    return (
        <div className="min-h-screen bg-white mt-20 dark:bg-[#050505] flex flex-col md:flex-row font-sans overflow-hidden">
            
            {/* LEFT PANEL */}
            <div className="hidden md:flex md:w-5/12 bg-[#4f46e5] relative p-16 flex-col justify-between overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
                <div className="relative z-10 text-2xl font-black uppercase text-white tracking-tighter">
                    Legally<span className="opacity-80 italic">Simple</span>
                </div>
                <div className="relative z-10">
                    <Motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-6xl font-black text-white uppercase tracking-tighter leading-none mb-6">
                        Access Your <br /> <span className="text-zinc-900/30">Vault.</span>
                    </Motion.h2>
                    <p className="text-white/70 max-w-xs font-medium leading-relaxed">
                        Secure entry for verified legal professionals and clients. 
                    </p>
                </div>
                <div className="relative z-10 pt-8 border-t border-white/10 flex justify-between items-end">
                   <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                        <span className="text-[10px] font-bold text-white uppercase tracking-widest">System Online</span>
                   </div>
                   <span className="text-4xl font-black text-white/10 leading-none tracking-tighter">v2.0</span>
                </div>
            </div>

            {/* RIGHT PANEL: LOGIN FORM */}
            <div className="w-full md:w-7/12 flex items-center justify-center p-8 md:p-20 bg-white dark:bg-[#050505]">
                <div className="w-full max-w-md">
                    <header className="mb-10 text-center md:text-left">
                        <h3 className="text-4xl font-black uppercase dark:text-white tracking-tight">System Entry</h3>
                        <p className="text-zinc-500 text-sm mt-2">Provide your credentials to unlock your session.</p>
                    </header>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div className="space-y-4">
                            {/* EMAIL FIELD */}
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-2 block ml-1">Network Email</label>
                                <input 
                                    type="email" 
                                    {...register("email", { required: "Email Identity is required" })} 
                                    placeholder="name@network.com" 
                                    className={`w-full px-5 py-4 bg-zinc-50 dark:bg-zinc-900 border ${errors.email ? 'border-red-500' : 'border-zinc-200 dark:border-white/5'} rounded-xl text-sm dark:text-white focus:border-[#4f46e5] outline-none transition-all`} 
                                />
                                {errors.email && (
                                    <span className="text-[9px] text-red-500 font-black uppercase tracking-widest mt-1 ml-1 block">
                                        {errors.email.message}
                                    </span>
                                )}
                            </div>

                            {/* PASSWORD FIELD */}
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-2 block ml-1">Master Password</label>
                                <input 
                                    type="password" 
                                    {...register("password", { required: "Master Password is required" })} 
                                    placeholder="••••••••" 
                                    className={`w-full px-5 py-4 bg-zinc-50 dark:bg-zinc-900 border ${errors.password ? 'border-red-500' : 'border-zinc-200 dark:border-white/5'} rounded-xl text-sm dark:text-white focus:border-[#4f46e5] outline-none transition-all`} 
                                />
                                {errors.password && (
                                    <span className="text-[9px] text-red-500 font-black uppercase tracking-widest mt-1 ml-1 block">
                                        {errors.password.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <button 
                            disabled={loading} 
                            type="submit"
                            className="w-full py-5 bg-[#4f46e5] text-white rounded-xl text-xs font-black uppercase tracking-[0.3em] hover:brightness-110 shadow-xl disabled:opacity-50 active:scale-[0.98] transition-all mt-4"
                        >
                            {loading ? 'Authenticating...' : 'Unlock Vault'}
                        </button>
                    </form>

                    <div className="relative my-10">
                        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-zinc-100 dark:border-white/5"></span></div>
                        <div className="relative flex justify-center text-[10px] uppercase font-black bg-white dark:bg-[#050505] px-4 text-zinc-400 tracking-widest">External Gateway</div>
                    </div>

                    <button 
                        type="button" 
                        onClick={handleGoogleEntry}
                        className="w-full py-4 border border-zinc-200 dark:border-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest dark:text-white hover:bg-zinc-50 dark:hover:bg-white/5 transition-all flex items-center justify-center gap-3"
                    >
                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/02-google-right.svg" className="w-4 h-4" alt="Google" />
                        Network Entry via Google
                    </button>

                    <p className="text-center mt-10 text-sm text-zinc-500 font-medium">
                        New to the protocol? <Link to="/register" className="text-[#4f46e5] font-black hover:underline ml-1 uppercase text-xs">Initialize Account</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;