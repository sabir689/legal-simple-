import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../contexts/AuthContext'; 
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { motion as Motion } from 'framer-motion';

const Register = () => {
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(null);
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) setPreview(URL.createObjectURL(file));
    };

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            // 1. Host Image on ImgBB
            const formData = new FormData();
            formData.append('image', data.image[0]);
            const res = await fetch(image_hosting_api, { method: 'POST', body: formData });
            const imgData = await res.json();
            
            if (!imgData.success) throw new Error("Image upload failed.");
            const photoURL = imgData.data.display_url;

            // 2. Create User in Firebase
            await createUser(data.email, data.password);
            await updateUserProfile(data.name, photoURL);

            // 3. Save User to MongoDB Registry (Backend Sync)
            const userInfo = {
                name: data.name,
                email: data.email,
                photo: photoURL,
                role: 'client' // Default role for new legal entries
            };

            const backendRes = await fetch('http://localhost:5000/users', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(userInfo)
            });
            const dbData = await backendRes.json();

            if (dbData.insertedId || dbData.message === 'User already exists in registry') {
                await Swal.fire({
                    title: 'PROTOCOL INITIALIZED',
                    text: `Vault secured for ${data.name}. Identity recorded.`,
                    icon: 'success',
                    background: '#0a0a0a',
                    color: '#fff',
                    confirmButtonColor: '#4f46e5',
                    customClass: { popup: 'border border-white/10 rounded-3xl' }
                });

                reset();
                navigate('/');
            }
        } catch (err) {
            const errorMessage = err.message.includes("auth/") 
                ? err.message.split('(')[1].split(')')[0].replace('auth/', '').replace(/-/g, ' ')
                : err.message;

            Swal.fire({ 
                title: 'SECURITY BREACH',
                text: errorMessage.toUpperCase(),
                icon: 'error',
                background: '#0a0a0a',
                color: '#fff'
            });
        } finally {
            setLoading(false);
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
                    <Motion.h2 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-6xl font-black text-white uppercase tracking-tighter leading-none mb-6">
                        Secure The <br /> <span className="text-zinc-900/30">Handshake.</span>
                    </Motion.h2>
                    <p className="text-white/70 max-w-xs font-medium leading-relaxed">
                        Every profile is verified and encrypted. Join the standard for digital legal infrastructure.
                    </p>
                </div>
                <div className="relative z-10 pt-8 border-t border-white/10 flex justify-between items-end">
                   <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                        <span className="text-[10px] font-bold text-white uppercase tracking-widest">Auth Nodes Active</span>
                   </div>
                   <span className="text-4xl font-black text-white/10 leading-none">v2.0</span>
                </div>
            </div>

            {/* RIGHT PANEL: REGISTRATION FORM */}
            <div className="w-full md:w-7/12 flex items-center justify-center p-8 md:p-20 bg-white dark:bg-[#050505]">
                <div className="w-full max-w-md">
                    <header className="mb-10">
                        <h3 className="text-4xl font-black uppercase dark:text-white tracking-tight">Create Account</h3>
                        <p className="text-zinc-500 text-sm mt-2">Enter credentials to generate your private access key.</p>
                    </header>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Avatar Preview */}
                        <div className="flex items-center gap-6 mb-8 p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-100 dark:border-white/5">
                            <div className={`w-20 h-20 rounded-2xl bg-zinc-200 dark:bg-zinc-800 overflow-hidden border-2 ${errors.image ? 'border-red-500' : 'border-[#4f46e5]'}`}>
                                {preview ? (
                                    <img src={preview} className="w-full h-full object-cover" alt="Preview" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-zinc-400">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                    </div>
                                )}
                            </div>
                            <div className="flex-1">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#4f46e5] block mb-2">Identity Photo</label>
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    {...register("image", { required: "Photo is required" })} 
                                    onChange={handleImageChange}
                                    className="text-xs text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-[10px] file:font-black file:uppercase file:bg-[#4f46e5] file:text-white cursor-pointer w-full"
                                />
                                {errors.image && <p className="text-[9px] text-red-500 font-black uppercase mt-1 tracking-widest">{errors.image.message}</p>}
                            </div>
                        </div>

                        <div className="space-y-4">
                            {/* Name Field */}
                            <div>
                                <input 
                                    {...register("name", { required: "Legal name is required" })} 
                                    placeholder="Full Legal Name" 
                                    className={`w-full px-5 py-4 bg-zinc-50 dark:bg-zinc-900 border ${errors.name ? 'border-red-500' : 'border-zinc-200 dark:border-white/5'} rounded-xl text-sm dark:text-white focus:border-[#4f46e5] outline-none transition-all`} 
                                />
                                {errors.name && <p className="text-[9px] text-red-500 font-black uppercase mt-1 ml-2 tracking-widest">{errors.name.message}</p>}
                            </div>

                            {/* Email Field */}
                            <div>
                                <input 
                                    type="email" 
                                    {...register("email", { required: "Email required" })} 
                                    placeholder="Network Email Address" 
                                    className={`w-full px-5 py-4 bg-zinc-50 dark:bg-zinc-900 border ${errors.email ? 'border-red-500' : 'border-zinc-200 dark:border-white/5'} rounded-xl text-sm dark:text-white focus:border-[#4f46e5] outline-none transition-all`} 
                                />
                                {errors.email && <p className="text-[9px] text-red-500 font-black uppercase mt-1 ml-2 tracking-widest">{errors.email.message}</p>}
                            </div>

                            {/* Password Field */}
                            <div>
                                <input 
                                    type="password" 
                                    {...register("password", { 
                                        required: "Password required", 
                                        minLength: { value: 6, message: "Min 6 chars required" } 
                                    })} 
                                    placeholder="Master Password" 
                                    className={`w-full px-5 py-4 bg-zinc-50 dark:bg-zinc-900 border ${errors.password ? 'border-red-500' : 'border-zinc-200 dark:border-white/5'} rounded-xl text-sm dark:text-white focus:border-[#4f46e5] outline-none transition-all`} 
                                />
                                {errors.password && <p className="text-[9px] text-red-500 font-black uppercase mt-1 ml-2 tracking-widest">{errors.password.message}</p>}
                            </div>
                        </div>

                        <button 
                            disabled={loading} 
                            type="submit"
                            className="w-full py-5 bg-[#4f46e5] text-white rounded-xl text-xs font-black uppercase tracking-[0.3em] hover:brightness-110 shadow-xl disabled:opacity-50 active:scale-[0.98] transition-all mt-4"
                        >
                            {loading ? 'Initializing Protocol...' : 'Create Legal Account'}
                        </button>
                    </form>

                    <div className="relative my-10">
                        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-zinc-100 dark:border-white/5"></span></div>
                        <div className="relative flex justify-center text-[10px] uppercase font-black bg-white dark:bg-[#050505] px-4 text-zinc-400 tracking-widest">Access Information</div>
                    </div>

                    <p className="text-center text-sm text-zinc-500 font-medium">
                        Already verified? <Link to="/login" className="text-[#4f46e5] font-black hover:underline ml-1">Login to Vault</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;