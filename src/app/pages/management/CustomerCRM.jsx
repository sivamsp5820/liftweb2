import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { UsersRound, Phone, MapPin, Building2, ExternalLink, Mail, MessageSquare, ShoppingBag, ShieldCheck, AlertCircle, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function CustomerCRM() {
    const [activeTab, setActiveTab] = useState(1);
    const customers = [
        {
            id: 1,
            name: 'Acme Corp',
            contact: 'Alice Vance',
            email: 'alice@acme.com',
            location: 'Chicago, IL',
            type: 'Enterprise',
            projects: 12,
            priority: 'High',
            timeline: [
                { date: '2026-03-10', text: 'Order ELV-1234 placed', icon: ShoppingBag },
                { date: '2026-03-08', text: 'Pricing consultation call', icon: Phone },
                { date: '2026-03-05', text: 'Bulk contract renewed', icon: ShieldCheck },
            ]
        },
        {
            id: 2,
            name: 'Global Build',
            contact: 'Bob Builder',
            email: 'bob@global.com',
            location: 'Austin, TX',
            type: 'Standard',
            projects: 4,
            priority: 'Medium',
            timeline: [
                { date: '2026-03-09', text: 'Site survey uploaded', icon: MapPin },
                { date: '2026-03-01', text: 'Inquiry about CORE LD models', icon: MessageSquare },
            ]
        },
        {
            id: 3,
            name: 'Lift Services LLC',
            contact: 'Charlie Day',
            email: 'charlie@lift.com',
            location: 'Philadelphia, PA',
            type: 'Standard',
            projects: 3,
            priority: 'Low',
            timeline: [
                { date: '2026-02-28', text: 'Installation guide downloaded', icon: FileText },
            ]
        },
        {
            id: 4,
            name: 'Metropark',
            contact: 'Diana Prince',
            email: 'diana@metro.com',
            location: 'New York, NY',
            type: 'Enterprise',
            projects: 28,
            priority: 'High',
            timeline: [
                { date: '2026-03-10', text: 'Emergency maintenance request', icon: AlertCircle },
                { date: '2026-03-05', text: 'Fleet wide upgrade proposal sent', icon: Mail },
            ]
        },
    ];

    return (
        <DashboardLayout type="management">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Customer CRM</h1>
                    <p className="text-muted-foreground text-sm mt-1">Strategic overview of business partners and project history.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Sidebar Stats */}
                    <div className="space-y-6">
                        <div className="bg-primary text-primary-foreground p-6 rounded-2xl shadow-xl shadow-primary/20">
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <Building2 className="w-5 h-5" />
                                B2B Performance
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-end border-b border-primary-foreground/20 pb-2">
                                    <span className="text-xs opacity-70">New Leads</span>
                                    <span className="text-2xl font-bold">14</span>
                                </div>
                                <div className="flex justify-between items-end border-b border-primary-foreground/20 pb-2">
                                    <span className="text-xs opacity-70">Active Projects</span>
                                    <span className="text-2xl font-bold">86</span>
                                </div>
                                <div className="flex justify-between items-end">
                                    <span className="text-xs opacity-70">Total Partners</span>
                                    <span className="text-2xl font-bold">156</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-card border border-border p-6 rounded-2xl shadow-sm">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">Urgent Actions</h3>
                            <div className="space-y-3">
                                <div className="p-3 bg-red-500/5 border border-red-500/10 rounded-xl">
                                    <p className="text-xs font-bold text-red-600">Pending Follow-up</p>
                                    <p className="text-xs text-muted-foreground mt-0.5 italic">Acme Corp quote expires in 3h</p>
                                </div>
                                <div className="p-3 bg-amber-500/5 border border-amber-500/10 rounded-xl">
                                    <p className="text-xs font-bold text-amber-600">Site Survey Required</p>
                                    <p className="text-xs text-muted-foreground mt-0.5 italic">Metropark Project #443</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Customer List */}
                    <div className="lg:col-span-2 space-y-4">
                        {customers.map((customer, i) => (
                            <motion.div
                                key={customer.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                onClick={() => setActiveTab(customer.id)}
                                className={`bg-card border p-6 rounded-2xl shadow-sm hover:shadow-md transition-all group relative overflow-hidden cursor-pointer ${activeTab === customer.id ? "border-[#1CA7A6] ring-1 ring-[#1CA7A6]/50" : "border-border"
                                    }`}
                            >
                                <div className={`absolute top-0 right-0 w-2 h-full bg-[#1CA7A6] transition-opacity ${activeTab === customer.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                                    }`} />

                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center border border-border group-hover:bg-primary/5 transition-colors">
                                            <Building2 className={`w-6 h-6 ${activeTab === customer.id ? "text-primary" : "text-muted-foreground text-primary"}`} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h4 className="text-lg font-bold">{customer.name}</h4>
                                                {customer.priority === 'High' && (
                                                    <span className="flex items-center gap-1 text-[8px] font-black uppercase tracking-tighter bg-red-500 text-white px-1.5 py-0.5 rounded animate-pulse">
                                                        <AlertCircle className="w-2.5 h-2.5" /> High Priority
                                                    </span>
                                                )}
                                            </div>
                                            <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-tighter ${customer.type === 'Enterprise' ? 'bg-[#1CA7A6]/10 text-[#1CA7A6]' : 'bg-muted text-muted-foreground'
                                                }`}>
                                                {customer.type} Partner
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        <button className="p-2 border border-border rounded-lg hover:bg-secondary transition-colors" title="Email">
                                            <Mail className="w-4 h-4 text-muted-foreground" />
                                        </button>
                                        <button className="p-2 border border-border rounded-lg hover:bg-secondary transition-colors" title="Message">
                                            <MessageSquare className="w-4 h-4 text-muted-foreground" />
                                        </button>
                                        <button className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg text-xs font-bold hover:bg-border transition-colors">
                                            Profile
                                            <ExternalLink className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {activeTab === customer.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="mt-6 pt-6 border-t border-border/50 grid grid-cols-2 md:grid-cols-4 gap-4">
                                                <div>
                                                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mb-1">Lead Contact</p>
                                                    <p className="text-sm font-medium">{customer.contact}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mb-1">Region</p>
                                                    <p className="text-sm font-medium flex items-center gap-1">
                                                        <MapPin className="w-3 h-3 text-red-500" />
                                                        {customer.location}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mb-1">Total Assets</p>
                                                    <p className="text-sm font-medium">{customer.projects} Lifts</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mb-1">Account Health</p>
                                                    <div className="flex items-center gap-1 mt-1">
                                                        {[1, 2, 3, 4, 5].map(star => (
                                                            <div key={star} className={`w-2 h-2 rounded-full ${star <= 4 ? 'bg-green-500' : 'bg-muted'}`} />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Interaction Timeline */}
                                            <div className="mt-6 pt-6 border-t border-border/50">
                                                <h5 className="text-[10px] uppercase font-black text-primary tracking-[0.2em] mb-4">Interaction Timeline</h5>
                                                <div className="space-y-4 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-secondary">
                                                    {customer.timeline.map((event, idx) => (
                                                        <div key={idx} className="relative pl-8 flex items-center justify-between">
                                                            <div className="absolute left-0 w-6 h-6 rounded-full bg-card border-4 border-secondary flex items-center justify-center">
                                                                <event.icon className="w-2.5 h-2.5 text-[#1CA7A6]" />
                                                            </div>
                                                            <span className="text-sm text-foreground font-medium">{event.text}</span>
                                                            <span className="text-[10px] font-mono text-muted-foreground font-bold">{event.date}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
