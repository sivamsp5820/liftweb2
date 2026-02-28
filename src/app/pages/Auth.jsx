import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Building2, ArrowRight, User, Mail, Lock, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, authentication logic would go here
        navigate("/");
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex bg-background">
            {/* Visual Section - Elevator Animations */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-white items-center justify-center p-12 border-r border-border">
                {/* Background Grid Pattern - Very Light */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-80" />

                <div className="relative z-0 flex items-center justify-center w-full h-full max-w-sm">
                    {/* Shaft styling (Subtle stroke) */}
                    <div className="absolute inset-0 border-x border-slate-200 bg-transparent -my-24 shadow-inner opacity-40" />

                    {/* Floor line */}
                    <div className="absolute inset-x-0 top-1/2 h-px bg-slate-300 w-full z-10" />

                    {isLogin ? (
                        /* LOGIN ANIMATION: Elegant Mechanical Doors */
                        <motion.div
                            key="login-anim"
                            className="w-64 h-80 relative flex items-center justify-center mx-auto z-20"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Outer Frame - Dark Line Art */}
                            <div className="absolute inset-x-2 top-2 bottom-0 border-[1.5px] border-slate-800 pointer-events-none rounded-t-sm" />
                            <div className="absolute inset-x-0 top-0 bottom-0 border-[1.5px] border-slate-900 pointer-events-none rounded-t-md" />
                            <div className="absolute top-0 inset-x-12 h-2 border-b-[1.5px] border-x-[1.5px] border-slate-800 bg-slate-100" />

                            {/* Top Indicator Panel - Dark */}
                            <div className="absolute top-4 inset-x-16 border-[1.5px] border-slate-800 h-6 flex items-center justify-between px-4 bg-slate-50">
                                <div className="w-2 h-2 rounded-full bg-slate-800" />
                                <div className="flex gap-1">
                                    <motion.div className="w-1 h-3 bg-slate-800" animate={{ height: ["12px", "4px", "12px", "12px"] }} transition={{ duration: 4, repeat: Infinity, times: [0, 0.4, 0.5, 1] }} />
                                    <motion.div className="w-1 h-3 bg-slate-800" animate={{ height: ["4px", "12px", "12px", "4px"] }} transition={{ duration: 4, repeat: Infinity, times: [0, 0.4, 0.5, 1] }} />
                                </div>
                                <div className="w-2 h-2 border-[1.5px] border-slate-800 rounded-full" />
                            </div>

                            {/* Elevator Cabin Interior (Visible when doors open) */}
                            <div className="absolute inset-x-4 top-14 bottom-2 border-x-[1.5px] border-t-[1.5px] border-slate-800 bg-white flex flex-col justify-end p-4 overflow-hidden">
                                {/* Back wall detailing */}
                                <div className="w-full h-full border border-slate-300 flex justify-between px-6 opacity-40">
                                    <div className="w-px h-full bg-slate-400" />
                                    <div className="w-px h-full bg-slate-400" />
                                </div>
                                {/* Handrail */}
                                <div className="absolute bottom-24 inset-x-8 h-1 border-y border-slate-500" />
                            </div>

                            {/* Left Door - Detailed Mechanism - Dark */}
                            <motion.div
                                className="absolute left-4 top-14 bottom-2 bg-slate-50 border-r-[1.5px] border-slate-800 z-10 overflow-hidden"
                                animate={{ width: ["112px", "112px", "16px", "16px", "112px"] }}
                                transition={{ duration: 8, repeat: Infinity, times: [0, 0.2, 0.4, 0.6, 0.8], ease: "easeInOut" }}
                            >
                                {/* Door Panel Detailing */}
                                <div className="absolute right-2 top-0 bottom-0 w-px bg-slate-300" />
                                <div className="absolute right-4 top-0 bottom-0 w-px bg-slate-200" />
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-24 border border-slate-400 rounded-sm" />
                            </motion.div>

                            {/* Right Door - Detailed Mechanism - Dark */}
                            <motion.div
                                className="absolute right-4 top-14 bottom-2 bg-slate-50 border-l-[1.5px] border-slate-800 z-10 overflow-hidden"
                                animate={{ width: ["112px", "112px", "16px", "16px", "112px"] }}
                                transition={{ duration: 8, repeat: Infinity, times: [0, 0.2, 0.4, 0.6, 0.8], ease: "easeInOut" }}
                            >
                                {/* Door Panel Detailing */}
                                <div className="absolute left-2 top-0 bottom-0 w-px bg-slate-300" />
                                <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-200" />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-24 border border-slate-400 rounded-sm" />
                            </motion.div>

                            {/* Center meeting line when closed */}
                            <motion.div
                                className="absolute left-1/2 top-14 bottom-2 w-px bg-slate-800 z-20"
                                animate={{ opacity: [1, 1, 0, 0, 1] }}
                                transition={{ duration: 8, repeat: Infinity, times: [0, 0.15, 0.2, 0.8, 0.85] }}
                            />
                        </motion.div>
                    ) : (
                        /* SIGNUP ANIMATION: Elegant Architectural Drafting */
                        <motion.div
                            key="signup-anim"
                            className="w-64 h-80 relative flex items-center justify-center mx-auto z-20"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Fine Grid Background for Drafting */}
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:0.5rem_0.5rem] opacity-30 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]" />

                            {/* Animated SVG Path Tracing - Blueprint Lines (Dark) */}
                            <svg className="absolute inset-0 w-full h-full stroke-slate-900 stroke-[1.5px] fill-transparent" strokeDasharray="1500" strokeDashoffset="1500">
                                {/* Outer Frame */}
                                <motion.rect
                                    x="4" y="4" width="248" height="312"
                                    animate={{ strokeDashoffset: [1500, 0, 0, 1500] }}
                                    transition={{ duration: 10, repeat: Infinity, times: [0, 0.3, 0.8, 1], ease: "easeInOut" }}
                                />
                                {/* Cross Beams */}
                                <motion.line x1="4" y1="40" x2="252" y2="40" animate={{ strokeDashoffset: [1500, 0, 0, 1500] }} transition={{ duration: 10, repeat: Infinity, times: [0.1, 0.4, 0.8, 1], ease: "easeInOut" }} />
                                <motion.line x1="4" y1="280" x2="252" y2="280" animate={{ strokeDashoffset: [1500, 0, 0, 1500] }} transition={{ duration: 10, repeat: Infinity, times: [0.2, 0.5, 0.8, 1], ease: "easeInOut" }} />
                                {/* Vertical Guide Lines */}
                                <motion.line x1="64" y1="4" x2="64" y2="316" animate={{ strokeDashoffset: [1500, 0, 0, 1500] }} transition={{ duration: 10, repeat: Infinity, times: [0.3, 0.6, 0.8, 1], ease: "easeInOut" }} />
                                <motion.line x1="192" y1="4" x2="192" y2="316" animate={{ strokeDashoffset: [1500, 0, 0, 1500] }} transition={{ duration: 10, repeat: Infinity, times: [0.3, 0.6, 0.8, 1], ease: "easeInOut" }} />
                            </svg>

                            {/* Measurement Nodes */}
                            <motion.div className="absolute top-[40px] left-[64px] w-2 h-2 border-[1.5px] border-slate-900 rounded-full bg-white -translate-x-1/2 -translate-y-1/2" animate={{ scale: [0, 1, 1, 0] }} transition={{ duration: 10, repeat: Infinity, times: [0, 0.4, 0.7, 1] }} />
                            <motion.div className="absolute top-[40px] right-[64px] w-2 h-2 border-[1.5px] border-slate-900 rounded-full bg-white translate-x-1/2 -translate-y-1/2" animate={{ scale: [0, 1, 1, 0] }} transition={{ duration: 10, repeat: Infinity, times: [0, 0.4, 0.7, 1] }} />
                            <motion.div className="absolute bottom-[40px] left-[64px] w-2 h-2 border-[1.5px] border-slate-900 rounded-full bg-white -translate-x-1/2 translate-y-1/2" animate={{ scale: [0, 1, 1, 0] }} transition={{ duration: 10, repeat: Infinity, times: [0, 0.5, 0.7, 1] }} />
                            <motion.div className="absolute bottom-[40px] right-[64px] w-2 h-2 border-[1.5px] border-slate-900 rounded-full bg-white translate-x-1/2 translate-y-1/2" animate={{ scale: [0, 1, 1, 0] }} transition={{ duration: 10, repeat: Infinity, times: [0, 0.5, 0.7, 1] }} />

                            {/* Central Drafting Square - representing the cabin */}
                            <motion.div
                                className="absolute border-[1.5px] border-slate-800 bg-slate-50/80"
                                initial={{ left: "50%", right: "50%", top: "50%", bottom: "50%", opacity: 0 }}
                                animate={{
                                    left: ["50%", "15%", "15%", "50%"],
                                    right: ["50%", "15%", "15%", "50%"],
                                    top: ["50%", "20%", "20%", "50%"],
                                    bottom: ["50%", "20%", "20%", "50%"],
                                    opacity: [0, 1, 1, 0]
                                }}
                                transition={{ duration: 10, repeat: Infinity, times: [0, 0.4, 0.7, 1], ease: "anticipate" }}
                            >
                                {/* Diagonal blueprint lines */}
                                <div className="absolute inset-0 border-t-[1.5px] border-l-[1.5px] border-slate-800 pointer-events-none opacity-40" style={{ transform: 'rotate(45deg) scale(1.4)' }} />
                                <div className="absolute inset-0 border-t-[1.5px] border-r-[1.5px] border-slate-800 pointer-events-none opacity-40" style={{ transform: 'rotate(-45deg) scale(1.4)' }} />
                            </motion.div>

                            {/* Scanning Laser Line */}
                            <motion.div
                                className="absolute inset-x-0 h-[1.5px] bg-slate-800 opacity-60 z-30"
                                animate={{ top: ["10%", "90%", "10%"] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                            />
                        </motion.div>
                    )}
                </div>

                {/* Text Overlay Section */}
                <div className="absolute bottom-12 left-12 right-12 z-20 bg-white/90 backdrop-blur-md p-8 rounded-2xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                    <div className="flex items-center gap-2 mb-4 text-slate-800">
                        <Building2 className="w-6 h-6 text-slate-900" />
                        <span className="font-mono text-xl tracking-tight uppercase font-bold text-slate-900">ELEVATE</span>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 mb-2 leading-tight">
                        {isLogin ? "Welcome back to your dashboard." : "Start configuring premium lifts."}
                    </h1>
                    <p className="text-sm text-slate-600">
                        {isLogin
                            ? "Log in to track orders and manage your industrial projects."
                            : "Create an account to access our complete catalog of precision-engineered components."}
                    </p>
                </div>
            </div>

            {/* Form Section */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 xl:p-24 relative">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <Link to="/" className="flex lg:hidden items-center gap-2 mb-12 group">
                        <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                            <Building2 className="w-6 h-6" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-mono tracking-tight text-xl uppercase">ELEVATE</span>
                        </div>
                    </Link>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={isLogin ? "login" : "signup"}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: { staggerChildren: 0.1 }
                                },
                                exit: { opacity: 0, transition: { duration: 0.1 } }
                            }}
                        >
                            <motion.div
                                className="mb-10"
                                variants={{
                                    hidden: { opacity: 0, y: 10 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                                }}
                            >
                                <h2 className="text-3xl font-semibold mb-2 tracking-tight">
                                    {isLogin ? "Welcome back" : "Create an account"}
                                </h2>
                                <p className="text-muted-foreground">
                                    {isLogin
                                        ? "Enter your credentials to access your account."
                                        : "Join us to start configuring your projects."}
                                </p>
                            </motion.div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {!isLogin && (
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <motion.div
                                                className="space-y-2"
                                                variants={{
                                                    hidden: { opacity: 0, x: -10 },
                                                    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
                                                }}
                                            >
                                                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                                    First Name
                                                </label>
                                                <div className="relative">
                                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                    <input
                                                        type="text"
                                                        required
                                                        className="w-full pl-10 pr-4 py-3 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                                        placeholder="Jane"
                                                    />
                                                </div>
                                            </motion.div>
                                            <motion.div
                                                className="space-y-2"
                                                variants={{
                                                    hidden: { opacity: 0, x: 10 },
                                                    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
                                                }}
                                            >
                                                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                                    Last Name
                                                </label>
                                                <div className="relative">
                                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                    <input
                                                        type="text"
                                                        required
                                                        className="w-full pl-10 pr-4 py-3 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                                        placeholder="Doe"
                                                    />
                                                </div>
                                            </motion.div>
                                        </div>

                                        <motion.div
                                            className="space-y-2"
                                            variants={{
                                                hidden: { opacity: 0, y: 10 },
                                                visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
                                            }}
                                        >
                                            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                                Company Name
                                            </label>
                                            <div className="relative">
                                                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                <input
                                                    type="text"
                                                    required
                                                    className="w-full pl-10 pr-4 py-3 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                                    placeholder="Acme Elevators Ltd."
                                                />
                                            </div>
                                        </motion.div>
                                    </div>
                                )}

                                <div className="space-y-4">
                                    <motion.div
                                        className="space-y-2"
                                        variants={{
                                            hidden: { opacity: 0, y: 10 },
                                            visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
                                        }}
                                    >
                                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <input
                                                type="email"
                                                required
                                                className="w-full pl-10 pr-4 py-3 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                                placeholder="name@company.com"
                                            />
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        className="space-y-2"
                                        variants={{
                                            hidden: { opacity: 0, y: 10 },
                                            visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
                                        }}
                                    >
                                        <div className="flex items-center justify-between">
                                            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                                Password
                                            </label>
                                            {isLogin && (
                                                <a href="#" className="text-xs font-medium text-primary hover:underline">
                                                    Forgot password?
                                                </a>
                                            )}
                                        </div>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <input
                                                type="password"
                                                required
                                                className="w-full pl-10 pr-4 py-3 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                                placeholder="••••••••"
                                            />
                                        </div>
                                    </motion.div>
                                </div>

                                <motion.button
                                    type="submit"
                                    variants={{
                                        hidden: { opacity: 0, y: 10 },
                                        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
                                    }}
                                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
                                >
                                    {isLogin ? "Sign In" : "Create Account"}
                                    <ArrowRight className="w-4 h-4" />
                                </motion.button>
                            </form>

                            <motion.div
                                className="mt-8 text-center text-sm text-muted-foreground"
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: { opacity: 1, transition: { duration: 0.5, delay: 0.2 } }
                                }}
                            >
                                {isLogin ? "New customer?" : "Already have an account?"}{" "}
                                <button
                                    onClick={() => setIsLogin(!isLogin)}
                                    className="font-semibold text-primary hover:underline transition-all"
                                >
                                    {isLogin ? "Sign up for an account" : "Sign in here"}
                                </button>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
