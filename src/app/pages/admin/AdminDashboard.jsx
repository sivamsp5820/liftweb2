import React from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Users, Activity, Package, ShieldCheck, ArrowUpRight, Globe, Zap, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export function AdminDashboard() {
    const stats = [
        { name: 'Global Agents', value: '42', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { name: 'System Load', value: '18%', icon: Activity, color: 'text-green-500', bg: 'bg-green-500/10' },
        { name: 'Pending Approvals', value: '5', icon: ShieldCheck, color: 'text-purple-500', bg: 'bg-purple-500/10' },
        { name: 'Active Orders', value: '128', icon: Package, color: 'text-[#1CA7A6]', bg: 'bg-[#1CA7A6]/10' },
    ];

    return (
        <DashboardLayout type="admin">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">System Overview</h1>
                    <p className="text-muted-foreground">Manage global configurations and agent access.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-card border border-border p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <div className="flex items-center text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                                    <ArrowUpRight className="w-3 h-3 mr-1" />
                                    +12%
                                </div>
                            </div>
                            <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
                            <p className="text-3xl font-bold mt-1 tracking-tight">{stat.value}</p>
                        </motion.div>
                    ))}
                </div>

                {/* AI & Analytics Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* AI Predictive Panel */}
                    <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Zap className="w-32 h-32 text-primary" />
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-4 text-primary font-black uppercase tracking-[0.2em] text-[10px]">
                                <ShieldCheck className="w-4 h-4" /> AI Predictive Analysis
                            </div>
                            <h3 className="text-xl font-bold mb-2 italic">Projected Q2 Growth</h3>
                            <p className="text-4xl font-black text-primary tracking-tighter">+24.8%</p>
                            <p className="text-sm text-muted-foreground mt-4 max-w-[200px]">
                                AI models suggest a peak demand phase starting <span className="text-foreground font-bold italic">April 12th</span>.
                            </p>
                            <div className="mt-8 flex gap-2">
                                <div className="h-1 flex-1 bg-primary/20 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: '75%' }}
                                        className="h-full bg-primary"
                                    />
                                </div>
                                <span className="text-[10px] font-bold opacity-60">Confidence Level: 88%</span>
                            </div>
                        </div>
                    </div>

                    {/* SVG Velocity Chart */}
                    <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6 shadow-sm overflow-hidden flex flex-col">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold flex items-center gap-2">
                                <Activity className="w-5 h-5 text-[#1CA7A6]" />
                                Order Velocity (Real-time)
                            </h3>
                            <div className="flex gap-2">
                                <span className="px-2 py-1 bg-secondary rounded text-[8px] font-bold uppercase">7 Days</span>
                                <span className="px-2 py-1 border border-border rounded text-[8px] font-bold uppercase opacity-50">30 Days</span>
                            </div>
                        </div>
                        <div className="flex-1 min-h-[140px] relative">
                            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
                                <defs>
                                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="#1CA7A6" stopOpacity="0.2" />
                                        <stop offset="100%" stopColor="#1CA7A6" stopOpacity="0" />
                                    </linearGradient>
                                </defs>
                                <motion.path
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 1 }}
                                    transition={{ duration: 2, ease: "easeInOut" }}
                                    fill="none"
                                    stroke="#1CA7A6"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    d="M0,100 C50,80 100,120 150,60 C200,0 250,80 300,50 C350,20 400,90 450,40 C500,-10 550,60 600,20"
                                    className="w-full"
                                    vectorEffect="non-scaling-stroke"
                                />
                                <motion.path
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1 }}
                                    fill="url(#gradient)"
                                    d="M0,100 C50,80 100,120 150,60 C200,0 250,80 300,50 C350,20 400,90 450,40 C500,-10 550,60 600,20 L600,200 L0,200 Z"
                                    vectorEffect="non-scaling-stroke"
                                />
                                {/* Data Points */}
                                <circle cx="150" cy="60" r="4" fill="#1CA7A6" stroke="white" strokeWidth="2" />
                                <circle cx="450" cy="40" r="4" fill="#1CA7A6" stroke="white" strokeWidth="2" />
                            </svg>
                        </div>
                        <div className="mt-4 flex justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-2">
                            <span>Mon</span>
                            <span>Wed</span>
                            <span>Fri</span>
                            <span>Sun</span>
                        </div>
                    </div>
                </div>

                {/* Branch & Health Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <div className="lg:col-span-2 bg-card border border-border rounded-3xl p-8 shadow-sm relative overflow-hidden h-[400px]">
                        <div className="absolute inset-0 bg-primary/[0.02]" />
                        <div className="relative z-10 h-full flex flex-col">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xl font-bold flex items-center gap-2">
                                    <Globe className="w-6 h-6 text-primary" />
                                    Global Command Center
                                </h3>
                                <div className="flex gap-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">3 Major Nodes Active</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 relative">
                                {/* Stylized SVG Map Representation */}
                                <svg className="w-full h-full opacity-30" viewBox="0 0 800 400">
                                    <path
                                        d="M150,150 Q200,100 250,150 T350,150 T450,150 T550,150"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1"
                                        strokeDasharray="4 4"
                                    />
                                    {/* Connection Waves */}
                                    <motion.circle
                                        cx="200" cy="180" r="20"
                                        stroke="var(--primary)" strokeWidth="1" fill="none"
                                        animate={{ r: [20, 100], opacity: [0.5, 0] }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                    />
                                    <motion.circle
                                        cx="400" cy="120" r="20"
                                        stroke="var(--primary)" strokeWidth="1" fill="none"
                                        animate={{ r: [20, 100], opacity: [0.5, 0] }}
                                        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                                    />
                                </svg>

                                {/* Interactive Node Cards (Positioned Absolutely) */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="absolute top-[20%] left-[15%] p-4 bg-card border border-border/80 rounded-2xl shadow-xl backdrop-blur-md"
                                >
                                    <p className="text-[10px] font-black text-primary uppercase mb-1">New York</p>
                                    <p className="text-lg font-bold">Operational</p>
                                    <div className="mt-2 flex items-center gap-3">
                                        <span className="text-xs font-mono">$1.2M</span>
                                        <span className="text-[10px] text-green-500 font-bold">+8%</span>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="absolute top-[10%] right-[30%] p-4 bg-card border border-border/80 rounded-2xl shadow-xl backdrop-blur-md"
                                >
                                    <p className="text-[10px] font-black text-[#1CA7A6] uppercase mb-1">London</p>
                                    <p className="text-lg font-bold">Peak Load</p>
                                    <div className="mt-2 flex items-center gap-3">
                                        <span className="text-xs font-mono">$850K</span>
                                        <span className="text-[10px] text-primary font-bold">+15%</span>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="absolute bottom-[15%] right-[10%] p-4 bg-card border border-border/80 rounded-2xl shadow-xl backdrop-blur-md"
                                >
                                    <p className="text-[10px] font-black text-amber-500 uppercase mb-1">Berlin</p>
                                    <p className="text-lg font-bold">Operational</p>
                                    <div className="mt-2 flex items-center gap-3">
                                        <span className="text-xs font-mono">$620K</span>
                                        <span className="text-[10px] text-green-500 font-bold">+4%</span>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-card border border-border rounded-3xl p-8 shadow-sm flex flex-col">
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <Zap className="w-5 h-5 text-yellow-500" />
                            Infrastructure
                        </h3>
                        <div className="flex-1 space-y-6">
                            {[
                                { label: 'API Gateway', value: '99.99%', status: 'Healthy', load: 45 },
                                { label: 'DB Cluster', value: '14ms', status: 'Healthy', load: 12 },
                                { label: 'S3 Sync', value: 'Online', status: 'Warning', load: 88 },
                            ].map((h) => (
                                <div key={h.label} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-bold">{h.label}</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-mono text-muted-foreground">{h.value}</span>
                                            <div className={`w-2 h-2 rounded-full ${h.status === 'Healthy' ? 'bg-green-500' : 'bg-yellow-500'} animate-pulse`} />
                                        </div>
                                    </div>
                                    <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
                                        <div className={`h-full ${h.status === 'Healthy' ? 'bg-primary' : 'bg-amber-500'} transition-all`} style={{ width: `${h.load}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="pt-6 border-t border-border mt-6">
                            <button className="w-full py-3 text-[10px] font-black uppercase tracking-[0.2em] bg-secondary hover:bg-border transition-colors rounded-xl">
                                Run Diagnostic Scan
                            </button>
                        </div>
                    </div>
                </div>

                {/* Quick Actions & Recent Logs */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6 shadow-sm">
                        <h3 className="text-lg font-bold mb-6">Recent System Activity</h3>
                        <div className="space-y-4">
                            {[1, 2, 3, 4].map((log) => (
                                <div key={log} className="flex items-center justify-between p-4 bg-secondary/20 rounded-xl border border-border/50">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                            <ShieldCheck className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold">Agent Access Granted</p>
                                            <p className="text-xs text-muted-foreground">User 'John Doe' authorized for Management Portal</p>
                                        </div>
                                    </div>
                                    <span className="text-[10px] uppercase font-bold text-muted-foreground">12m ago</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-primary text-primary-foreground rounded-2xl p-6 shadow-xl shadow-primary/20 flex flex-col justify-between">
                        <div>
                            <h3 className="text-xl font-bold mb-2">System Config</h3>
                            <p className="text-sm opacity-80 mb-6">Update global pricing, rules, and system behavior across the entire platform.</p>
                            <button className="w-full py-3 bg-white text-primary rounded-xl font-bold hover:bg-opacity-90 transition-all flex items-center justify-center gap-2">
                                Configure Global Rules
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="mt-8 pt-8 border-t border-white/20">
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-[10px] uppercase font-bold tracking-widest opacity-60">Last Backup</p>
                                    <p className="font-mono text-xs">2026-03-10 14:00</p>
                                </div>
                                <div className="h-10 w-10 flex items-center justify-center bg-white/10 rounded-full">
                                    <Activity className="w-5 h-5" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
