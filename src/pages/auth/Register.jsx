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
    const [selectedRole, setSelectedRole] = useState('client'); // Role State
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
            // 1. Host Image
            const formData = new FormData();
            formData.append('image', data.image[0]);
            const res = await fetch(image_hosting_api, { method: 'POST', body: formData });
            const imgData = await res.json();
            
            if (!imgData.success) throw new Error("Image upload failed.");
            const photoURL = imgData.data.display_url;

            // 2. Firebase Creation
            await createUser(data.email, data.password);
            await updateUserProfile(data.name, photoURL);

            // 3. MongoDB Sync (Now with Dynamic Role)
            const userInfo = {
                name: data.name,
                email: data.email,
                photo: photoURL,
                role: selectedRole // <--- Using the state value
            };

            const backendRes = await fetch('https://legally-simple-server.vercel.app/users', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(userInfo)
            });
            const dbData = await backendRes.json();

            if (dbData.insertedId || dbData.message === 'User already exists in registry') {
                await Swal.fire({
                    title: 'PROTOCOL INITIALIZED',
                    text: `Identity verified as ${selectedRole.toUpperCase()}. Welcome to the Vault.`,
                    icon: 'success',
                    background: '#0a0a0a',
                    color: '#fff',
                    confirmButtonColor: '#4f46e5',
                });

                reset();
                navigate('/dashboard'); // Redirect to dashboard instead of Home
            }
        } catch (err) {
            Swal.fire({ title: 'SECURITY BREACH', text: err.message.toUpperCase(), icon: 'error', background: '#0a0a0a', color: '#fff' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white mt-20 dark:bg-[#050505] flex flex-col md:flex-row font-sans overflow-hidden">
            {/* LEFT PANEL - Left unchanged for brevity */}
            <div className="hidden md:flex md:w-5/12 bg-[#4f46e5] relative p-16 flex-col justify-between overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
                <div className="relative z-10 text-2xl font-black uppercase text-white tracking-tighter">
                    Legally<span className="opacity-80 italic">Simple</span>
                </div>
                <div className="relative z-10">
                    <Motion.h2 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-6xl font-black text-white uppercase tracking-tighter leading-none mb-6">
                        Secure The <br /> <span className="text-zinc-900/30">Handshake.</span>
                    </Motion.h2>
                </div>
                <div className="relative z-10 pt-8 border-t border-white/10 flex justify-between items-end">
                   <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                        <span className="text-[10px] font-bold text-white uppercase tracking-widest">Auth Nodes Active</span>
                   </div>
                   <span className="text-4xl font-black text-white/10 leading-none">v2.0</span>
                </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="w-full md:w-7/12 flex items-center justify-center p-8 md:p-20 bg-white dark:bg-[#050505]">
                <div className="w-full max-w-md">
                    <header className="mb-10">
                        <h3 className="text-4xl font-black uppercase dark:text-white tracking-tight">Create Account</h3>
                        <p className="text-zinc-500 text-sm mt-2">Specify your access level within the network.</p>
                    </header>

                    {/* NEW ROLE SELECTOR UI */}
                    <div className="flex p-1 bg-zinc-100 dark:bg-zinc-900 rounded-2xl mb-8 border border-zinc-200 dark:border-white/5">
                        <button 
                            type="button"
                            onClick={() => setSelectedRole('client')}
                            className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${selectedRole === 'client' ? 'bg-white dark:bg-zinc-800 text-[#4f46e5] shadow-sm' : 'text-zinc-500'}`}
                        >
                            Client
                        </button>
                        <button 
                            type="button"
                            onClick={() => setSelectedRole('freelancer')}
                            className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${selectedRole === 'freelancer' ? 'bg-white dark:bg-zinc-800 text-[#4f46e5] shadow-sm' : 'text-zinc-500'}`}
                        >
                            Freelancer
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Avatar & Inputs - Keeping your existing styles */}
                        <div className="flex items-center gap-6 mb-8 p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-100 dark:border-white/5">
                            <div className={`w-20 h-20 rounded-2xl bg-zinc-200 dark:bg-zinc-800 overflow-hidden border-2 ${errors.image ? 'border-red-500' : 'border-[#4f46e5]'}`}>
                                {preview ? <img src={preview} className="w-full h-full object-cover" alt="Preview" /> : <div className="w-full h-full flex items-center justify-center text-zinc-400">👤</div>}
                            </div>
                            <div className="flex-1">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#4f46e5] block mb-2">Identity Photo</label>
                                <input type="file" accept="image/*" {...register("image", { required: "Photo required" })} onChange={handleImageChange} className="text-xs text-zinc-500 w-full" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <input {...register("name", { required: "Legal name required" })} placeholder="Full Legal Name" className="w-full px-5 py-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-xl text-sm dark:text-white focus:border-[#4f46e5] outline-none" />
                            <input {...register("email", { required: "Email required" })} type="email" placeholder="Network Email" className="w-full px-5 py-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-xl text-sm dark:text-white focus:border-[#4f46e5] outline-none" />
                            <input {...register("password", { required: "Password required", minLength: 6 })} type="password" placeholder="Master Password" className="w-full px-5 py-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-xl text-sm dark:text-white focus:border-[#4f46e5] outline-none" />
                        </div>

                        <button disabled={loading} type="submit" className="w-full py-5 bg-[#4f46e5] text-white rounded-xl text-xs font-black uppercase tracking-[0.3em] hover:brightness-110 shadow-xl disabled:opacity-50 transition-all">
                            {loading ? 'Initializing Protocol...' : `Create ${selectedRole} Account`}
                        </button>
                    </form>

                    <p className="text-center text-sm text-zinc-500 font-medium mt-10">
                        Already verified? <Link to="/login" className="text-[#4f46e5] font-black hover:underline ml-1">Login to Vault</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;