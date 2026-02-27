import React, { useState, useContext, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

// 1. Define the Default Template
const DEFAULT_TERMS = (projectName, freelancerName) => `MASTER SERVICE AGREEMENT

1. SCOPE OF WORK: This agreement covers the professional services for "${projectName || 'The Project'}".
2. PAYMENT & ESCROW: Funds will be held in the Vault Escrow system. Release is triggered upon freelancer submission and client approval of each phase.
3. OWNERSHIP: Upon final payment release, all intellectual property rights for work created by ${freelancerName || 'the Freelancer'} transfer to the Client.
4. TERMINATION: Either party may terminate with 7 days notice. Completed and funded phases are non-refundable.
5. REVISIONS: Each phase includes up to two rounds of minor revisions.`;

const CreateContract = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [step, setStep] = useState(1);

    const { register, control, handleSubmit, watch, trigger, setValue, formState: { errors } } = useForm({
        defaultValues: {
            projectName: '',
            clientEmail: '',
            deadline: '',
            terms: '',
            phases: [{ name: 'Initial Deposit / Discovery', amount: '' }]
        }
    });

    const { fields, append, remove } = useFieldArray({ control, name: "phases" });
    const formData = watch();

    // 2. Auto-generate template when Project Name or User changes
    useEffect(() => {
        if (formData.projectName || user?.displayName) {
            const template = DEFAULT_TERMS(formData.projectName, user?.displayName);
            setValue('terms', template);
        }
    }, [formData.projectName, user?.displayName, setValue]);

    const nextStep = async () => {
        let fieldsToValidate = [];
        if (step === 1) fieldsToValidate = ["projectName", "clientEmail", "deadline"];
        if (step === 2) fieldsToValidate = ["phases"];
        if (step === 3) fieldsToValidate = ["terms"];

        const isValid = await trigger(fieldsToValidate);
        if (isValid) setStep(s => s + 1);
    };

    const prevStep = () => setStep(s => s - 1);

    const onSubmit = async (data) => {
        const contractPayload = {
            ...data,
            freelancerEmail: user?.email,
            freelancerName: user?.displayName,
            status: 'Pending Signature',
            escrowStatus: 'Awaiting Funding',
            createdAt: new Date().toISOString(),
            totalAmount: data.phases.reduce((sum, p) => sum + Number(p.amount || 0), 0),
            phases: data.phases.map(p => ({
                ...p,
                status: 'Awaiting Funding',
                id: crypto.randomUUID()
            }))
        };

        try {
            const response = await fetch('https://legally-simple-server.vercel.app/contracts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(contractPayload)
            });

            if (response.ok) {
                await Swal.fire({
                    title: 'PROTOCOL INITIALIZED',
                    text: 'Contract transmitted to client for digital signature.',
                    icon: 'success',
                    background: '#0a0a0a',
                    color: '#fff',
                    confirmButtonColor: '#4f46e5'
                });
                navigate('/dashboard/contracts');
            }
        } catch (error) {
            Swal.fire({ title: 'TRANSMISSION ERROR', text: error.message, icon: 'error' });
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            {/* --- STEPPER --- */}
            <div className="flex justify-between mb-12 relative px-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`z-10 w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs transition-all duration-500 ${step >= i ? 'bg-[#4f46e5] text-white shadow-lg shadow-indigo-500/20' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500'}`}>
                        {i}
                    </div>
                ))}
                <div className="absolute top-5 left-0 w-full h-[2px] bg-zinc-200 dark:bg-zinc-800 -z-0">
                    <div className="h-full bg-[#4f46e5] transition-all duration-700" style={{ width: `${(step - 1) * 33.33}%` }} />
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
                <AnimatePresence mode="wait">
                    
                    {/* STEP 1: METADATA */}
                    {step === 1 && (
                        <Motion.div key="step1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                            <h2 className="text-3xl font-black uppercase tracking-tighter dark:text-white mb-2">Project Metadata</h2>
                            <p className="text-zinc-500 text-sm mb-10">Define the core identity of this service agreement.</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="md:col-span-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3 block">Project Title</label>
                                    <input {...register("projectName", { required: "Project name is required" })} className={`w-full bg-zinc-50 dark:bg-zinc-900/50 p-5 rounded-2xl dark:text-white outline-none border transition-all ${errors.projectName ? 'border-red-500/50' : 'border-transparent focus:border-[#4f46e5]'}`} placeholder="e.g. Branding & Web Infrastructure" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3 block">Client Email</label>
                                    <input {...register("clientEmail", { required: "Email is required" })} className={`w-full bg-zinc-50 dark:bg-zinc-900/50 p-5 rounded-2xl dark:text-white outline-none border transition-all ${errors.clientEmail ? 'border-red-500/50' : 'border-transparent focus:border-[#4f46e5]'}`} placeholder="client@vault.com" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3 block">Deadline</label>
                                    <input type="date" {...register("deadline", { required: "Date is required" })} className={`w-full bg-zinc-50 dark:bg-zinc-900/50 p-5 rounded-2xl dark:text-white outline-none border transition-all ${errors.deadline ? 'border-red-500/50' : 'border-transparent focus:border-[#4f46e5]'}`} />
                                </div>
                            </div>
                        </Motion.div>
                    )}

                    {/* STEP 2: PHASES */}
                    {step === 2 && (
                        <Motion.div key="step2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                            <h2 className="text-3xl font-black uppercase tracking-tighter dark:text-white mb-2">Escrow Phases</h2>
                            <p className="text-zinc-500 text-sm mb-10">Define your milestones and funding amounts.</p>
                            <div className="space-y-4">
                                {fields.map((field, index) => (
                                    <div key={field.id} className="flex flex-col md:flex-row gap-4 items-center bg-zinc-50 dark:bg-white/5 p-6 rounded-[2rem] border border-transparent">
                                        <div className="flex-1 w-full text-left">
                                            <input {...register(`phases.${index}.name`, { required: true })} placeholder="Phase Name" className="bg-transparent w-full dark:text-white text-sm font-bold outline-none" />
                                        </div>
                                        <div className="w-full md:w-32">
                                            <input type="number" {...register(`phases.${index}.amount`, { required: true })} placeholder="0.00" className="bg-transparent w-full dark:text-white text-sm font-bold outline-none" />
                                        </div>
                                        {fields.length > 1 && <button type="button" onClick={() => remove(index)} className="text-red-500 px-2">✕</button>}
                                    </div>
                                ))}
                                <button type="button" onClick={() => append({ name: '', amount: '' })} className="w-full py-4 border-2 border-dashed border-zinc-200 dark:border-white/10 rounded-[2rem] text-[10px] font-black uppercase text-zinc-400">+ Add Phase</button>
                            </div>
                        </Motion.div>
                    )}

                    {/* STEP 3: TERMS & CONDITIONS (TEMPLATED + EDITABLE) */}
                    {step === 3 && (
                        <Motion.div key="step3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="flex justify-between items-end mb-6">
                                <div>
                                    <h2 className="text-3xl font-black uppercase tracking-tighter dark:text-white mb-2">Terms of Service</h2>
                                    <p className="text-zinc-500 text-sm">Review the generated agreement or customize it below.</p>
                                </div>
                                <button 
                                    type="button" 
                                    onClick={() => setValue('terms', DEFAULT_TERMS(formData.projectName, user?.displayName))}
                                    className="text-[9px] font-black uppercase bg-zinc-100 dark:bg-white/5 px-4 py-2 rounded-lg dark:text-zinc-400 hover:text-[#4f46e5] transition-all"
                                >
                                    Reset to Template
                                </button>
                            </div>
                            <textarea 
                                {...register("terms", { required: "Terms are required" })} 
                                rows="12" 
                                className={`w-full bg-zinc-50 dark:bg-zinc-900/50 p-8 rounded-[2rem] dark:text-white text-xs leading-relaxed font-mono outline-none border transition-all ${errors.terms ? 'border-red-500/50 bg-red-500/5' : 'border-transparent focus:border-[#4f46e5]'}`} 
                            />
                        </Motion.div>
                    )}

                    {/* STEP 4: REVIEW */}
                    {step === 4 && (
                        <Motion.div key="step4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                            <h2 className="text-3xl font-black uppercase tracking-tighter dark:text-white mb-2">Final Protocol Review</h2>
                            <p className="text-zinc-500 text-sm mb-10">Verify all data before transmitting to the client.</p>
                            <div className="bg-zinc-50 dark:bg-white/5 p-8 rounded-[2.5rem] space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div><p className="text-[9px] font-black uppercase text-zinc-400 font-mono">Project Name</p><p className="text-sm dark:text-white font-black">{formData.projectName}</p></div>
                                    <div className="text-right"><p className="text-[9px] font-black uppercase text-zinc-400 font-mono">Recipient</p><p className="text-sm dark:text-white font-black">{formData.clientEmail}</p></div>
                                </div>
                                <div className="border-t border-zinc-200 dark:border-white/10 pt-6">
                                    {formData.phases?.map((p, i) => (
                                        <div key={i} className="flex justify-between text-xs dark:text-zinc-300 mb-2">
                                            <span>{p.name}</span><span className="font-black text-white">${Number(p.amount).toLocaleString()}</span>
                                        </div>
                                    ))}
                                    <div className="flex justify-between border-t border-zinc-200 dark:border-white/10 mt-4 pt-4">
                                        <span className="text-[10px] font-black uppercase text-white">Escrow Total</span>
                                        <span className="text-xl font-black text-[#4f46e5]">${formData.phases?.reduce((s, p) => s + Number(p.amount || 0), 0).toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </Motion.div>
                    )}
                </AnimatePresence>

                {/* --- NAV --- */}
                <div className="mt-12 flex justify-between items-center border-t border-zinc-100 dark:border-white/5 pt-10">
                    {step > 1 ? (
                        <button type="button" onClick={prevStep} className="px-10 py-4 text-[10px] font-black uppercase tracking-[0.2em] dark:text-zinc-500">Back</button>
                    ) : <div />}
                    {step < 4 ? (
                        <button type="button" onClick={nextStep} className="px-10 py-5 bg-[#4f46e5] text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl shadow-xl shadow-indigo-500/20">Next Phase</button>
                    ) : (
                        <button type="submit" className="px-12 py-5 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl shadow-xl shadow-emerald-500/20">Transmit Agreement</button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default CreateContract;