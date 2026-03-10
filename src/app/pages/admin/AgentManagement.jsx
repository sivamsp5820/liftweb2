import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Plus, UserPlus, Mail, Shield, MoreVertical, Search, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function AgentManagement() {
    const [agents, setAgents] = useState([
        { id: 1, name: 'John Doe', email: 'john@elevate.com', role: 'Manager', status: 'Active', branch: 'New York' },
        { id: 2, name: 'Sarah Smith', email: 'sarah@elevate.com', role: 'Agent', status: 'Active', branch: 'London' },
        { id: 3, name: 'Mike Ross', email: 'mike@elevate.com', role: 'Agent', status: 'Inactive', branch: 'Berlin' },
        { id: 4, name: 'Harvey Specter', email: 'harvey@elevate.com', role: 'Manager', status: 'Active', branch: 'New York' },
    ]);

    const [showAddModal, setShowAddModal] = useState(false);

    return (
        <DashboardLayout type="admin">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">Agents & Managers</h1>
                        <p className="text-muted-foreground text-sm mt-1">Manage platform access and assign organizational roles.</p>
                    </div>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:shadow-lg hover:shadow-primary/20 transition-all"
                    >
                        <UserPlus className="w-5 h-5" />
                        Add New Member
                    </button>
                </div>

                {/* Filters bar */}
                <div className="bg-card border border-border p-4 rounded-2xl mb-6 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search by name, email or branch..."
                            className="w-full pl-10 pr-4 py-2 bg-secondary/30 border border-border rounded-lg text-sm focus:outline-none"
                        />
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-secondary transition-colors">
                            <Filter className="w-4 h-4" />
                            Filters
                        </button>
                        <div className="h-8 w-[1px] bg-border hidden md:block" />
                        <p className="text-xs text-muted-foreground font-medium hidden md:block">
                            Showing <span className="text-foreground">{agents.length}</span> team members
                        </p>
                    </div>
                </div>

                {/* Members Table */}
                <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-secondary/20 border-b border-border">
                                <th className="p-4 text-xs uppercase tracking-widest font-bold text-muted-foreground">Member</th>
                                <th className="p-4 text-xs uppercase tracking-widest font-bold text-muted-foreground">Role</th>
                                <th className="p-4 text-xs uppercase tracking-widest font-bold text-muted-foreground">Branch</th>
                                <th className="p-4 text-xs uppercase tracking-widest font-bold text-muted-foreground">Status</th>
                                <th className="p-4 text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            {agents.map((agent, i) => (
                                <motion.tr
                                    key={agent.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="hover:bg-secondary/10 transition-colors group"
                                >
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="relative">
                                                <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center border border-primary/10">
                                                    <span className="text-primary font-bold text-xs">{agent.name.split(' ').map(n => n[0]).join('')}</span>
                                                </div>
                                                <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-card ${agent.status === 'Active' ? 'bg-green-500' : 'bg-muted'}`} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-foreground">{agent.name}</p>
                                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                                    <Mail className="w-3 h-3" /> {agent.email}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-1.5">
                                            <Shield className={`w-3.5 h-3.5 ${agent.role === 'Manager' ? 'text-primary' : 'text-muted-foreground'}`} />
                                            <span className="text-sm font-medium">{agent.role}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm text-foreground">{agent.branch}</span>
                                            <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">Performance: {(90 + i * 2)}%</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex flex-col gap-1">
                                            <span className={`inline-flex items-center w-fit px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-tight ${agent.status === 'Active'
                                                    ? 'bg-green-500/10 text-green-600'
                                                    : 'bg-muted text-muted-foreground'
                                                }`}>
                                                {agent.status}
                                            </span>
                                            <span className="text-[9px] text-muted-foreground/60 italic">Last login: 2h ago</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button className="p-2 hover:bg-secondary rounded-lg text-muted-foreground transition-colors">
                                            <MoreVertical className="w-4 h-4" />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Placeholder Add Modal */}
            <AnimatePresence>
                {showAddModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowAddModal(false)}
                            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-md bg-card border border-border p-8 rounded-2xl shadow-2xl"
                        >
                            <h2 className="text-2xl font-bold mb-4">Add Team Member</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase text-muted-foreground mb-1.5">Full Name</label>
                                    <input type="text" className="w-full px-4 py-2 bg-secondary/30 border border-border rounded-xl focus:outline-none" placeholder="e.g. Rachel Zane" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-muted-foreground mb-1.5">Role</label>
                                    <select className="w-full px-4 py-2 bg-secondary/30 border border-border rounded-xl focus:outline-none appearance-none">
                                        <option>Agent</option>
                                        <option>Manager</option>
                                    </select>
                                </div>
                                <div className="pt-4 flex gap-3">
                                    <button onClick={() => setShowAddModal(false)} className="flex-1 py-3 border border-border rounded-xl font-bold hover:bg-secondary transition-all">Cancel</button>
                                    <button className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl font-bold shadow-lg shadow-primary/20">Add Member</button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </DashboardLayout>
    );
}
