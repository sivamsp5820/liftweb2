import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { ShoppingBag, Clock, Package, Truck, CheckCircle2, Search, Filter, ArrowUpRight, Eye, X, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function OrderManagement() {
    const [orders, setOrders] = useState([
        { id: 'ELV-1234', customer: 'Acme Corp', date: '2026-03-10', total: 42500, status: 'order_placed', progress: 16, priority: 'Normal' },
        { id: 'ELV-1235', customer: 'Global Build', date: '2026-03-09', total: 12800, status: 'so_created', progress: 33, priority: 'High' },
        { id: 'ELV-1236', customer: 'Lift Services LLC', date: '2026-03-08', total: 8500, status: 'mo_created', progress: 50, priority: 'Normal' },
        { id: 'ELV-1237', customer: 'Metropark', date: '2026-03-07', total: 56000, status: 'dispatch_planned', progress: 66, priority: 'Urgent' },
        { id: 'ELV-1238', customer: 'Skyline Inc', date: '2026-03-06', total: 154000, status: 'invoice', progress: 83, priority: 'Normal' },
    ]);

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [messages, setMessages] = useState([
        { user: 'Sarah Agent', text: 'Spoke with Acme, they need this ASAP.', time: '10:24 AM' },
        { user: 'System AI', text: 'Inventory check complete. Parts allocated.', time: '11:05 AM' },
    ]);

    const [newMessage, setNewMessage] = useState('');

    const statusFlow = [
        'order_placed',
        'so_created',
        'mo_created',
        'dispatch_planned',
        'invoice',
        'out_for_delivery'
    ];

    const handleSendMessage = () => {
        if (!newMessage.trim()) return;
        setMessages([...messages, { user: 'Me (Admin)', text: newMessage, time: 'Just now' }]);
        setNewMessage('');
    };

    const updateOrderStatus = (orderId, newStatus) => {
        const progress = Math.round(((statusFlow.indexOf(newStatus) + 1) / statusFlow.length) * 100);
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus, progress } : o));
        if (selectedOrder?.id === orderId) {
            setSelectedOrder(prev => ({ ...prev, status: newStatus, progress }));
        }
    };

    const getPriorityColor = (p) => {
        switch (p) {
            case 'Urgent': return 'text-red-600 bg-red-100 border-red-200';
            case 'High': return 'text-orange-600 bg-orange-100 border-orange-200';
            default: return 'text-blue-600 bg-blue-100 border-blue-200';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'order_placed': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'so_created': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'mo_created': return 'bg-purple-100 text-purple-700 border-purple-200';
            case 'dispatch_planned': return 'bg-orange-100 text-orange-700 border-orange-200';
            case 'invoice': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
            case 'out_for_delivery': return 'bg-green-100 text-green-700 border-green-200';
            default: return 'bg-secondary text-muted-foreground border-border';
        }
    };

    const getStatusLabel = (status) => {
        return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    return (
        <DashboardLayout type="management">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Order Fulfillment</h1>
                        <p className="text-muted-foreground text-sm mt-1">Track and update the status of incoming lift system orders.</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-6 py-3 bg-secondary text-foreground rounded-xl font-bold hover:bg-border transition-all flex items-center gap-2">
                            Export CSV
                        </button>
                        <button className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold shadow-lg shadow-primary/20 transition-all flex items-center gap-2">
                            New Order Entry
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="md:col-span-2 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input type="text" placeholder="Search orders by ID or customer..." className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl focus:outline-none shadow-sm" />
                    </div>
                    <select className="px-4 py-3 bg-card border border-border rounded-xl focus:outline-none shadow-sm appearance-none">
                        <option>All Statuses</option>
                        {statusFlow.map(s => <option key={s} value={s}>{getStatusLabel(s)}</option>)}
                    </select>
                    <button className="flex items-center justify-center gap-2 px-4 py-3 border border-border bg-card rounded-xl font-medium hover:bg-secondary transition-all shadow-sm">
                        <Filter className="w-4 h-4" />
                        More Filters
                    </button>
                </div>

                {/* Orders Table */}
                <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-secondary/20 border-b border-border">
                                <th className="p-4 text-xs uppercase tracking-widest font-bold text-muted-foreground">Order ID</th>
                                <th className="p-4 text-xs uppercase tracking-widest font-bold text-muted-foreground">Customer</th>
                                <th className="p-4 text-xs uppercase tracking-widest font-bold text-muted-foreground">Date</th>
                                <th className="p-4 text-xs uppercase tracking-widest font-bold text-muted-foreground">Fulfillment</th>
                                <th className="p-4 text-xs uppercase tracking-widest font-bold text-muted-foreground">Total</th>
                                <th className="p-4 text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            {orders.map((order, i) => (
                                <motion.tr
                                    key={order.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    onClick={() => setSelectedOrder(order)}
                                    className="hover:bg-secondary/10 transition-colors group cursor-pointer"
                                >
                                    <td className="p-4">
                                        <span className="font-mono text-sm font-bold text-primary">{order.id}</span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm font-bold">{order.customer}</p>
                                            <span className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter border ${getPriorityColor(order.priority)}`}>
                                                {order.priority}
                                            </span>
                                        </div>
                                        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">B2B Core Account</p>
                                    </td>
                                    <td className="p-4 text-sm text-muted-foreground">
                                        {order.date}
                                    </td>
                                    <td className="p-4">
                                        <div className="flex flex-col gap-1.5 min-w-[160px]">
                                            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-tight">
                                                <span className={getStatusColor(order.status).split(' ')[1]}>{getStatusLabel(order.status)}</span>
                                                <span className="text-muted-foreground">{order.progress}%</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                                                <div className={`h-full bg-primary transition-all duration-500`} style={{ width: `${order.progress}%` }} />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 font-mono font-bold text-[#1CA7A6]">
                                        ${order.total.toLocaleString()}
                                    </td>
                                    <td className="p-4 text-right">
                                        <button className="p-2 hover:bg-primary/10 hover:text-primary rounded-lg text-muted-foreground transition-all">
                                            <Eye className="w-4 h-4" />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Action Drawer */}
            <AnimatePresence>
                {selectedOrder && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedOrder(null)}
                            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-[100]"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-full max-w-md bg-card border-l border-border shadow-2xl z-[101] p-8 overflow-y-auto"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-2xl font-bold">Manage Order</h2>
                                    <p className="text-sm font-mono text-primary font-bold">{selectedOrder.id}</p>
                                </div>
                                <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-secondary rounded-lg transition-colors">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="space-y-8">
                                {/* Status Update section */}
                                <div className="bg-secondary/20 p-6 rounded-2xl border border-border/50">
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Update Fulfillment Status</h3>
                                    <div className="space-y-3">
                                        {statusFlow.map((status) => {
                                            const isCurrent = selectedOrder.status === status;
                                            const isCompleted = statusFlow.indexOf(status) < statusFlow.indexOf(selectedOrder.status);
                                            return (
                                                <button
                                                    key={status}
                                                    onClick={() => updateOrderStatus(selectedOrder.id, status)}
                                                    className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${isCurrent
                                                        ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                                                        : isCompleted
                                                            ? "bg-green-500/10 border-green-500/20 text-green-700"
                                                            : "bg-card border-border hover:border-primary/50"
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                                                        <span className="text-sm font-medium">{getStatusLabel(status)}</span>
                                                    </div>
                                                    {isCurrent && <div className="w-2 h-2 bg-white rounded-full animate-ping" />}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Internal Collaboration section */}
                                <div className="flex flex-col h-[400px]">
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
                                        <MessageSquare className="w-4 h-4 text-primary" /> Internal Collaboration
                                    </h3>
                                    <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 scrollbar-thin scrollbar-thumb-border">
                                        {messages.map((msg, idx) => (
                                            <div key={idx} className={`p-3 rounded-2xl max-w-[85%] ${msg.user.includes('Me') ? 'ml-auto bg-primary text-primary-foreground shadow-md' : 'bg-secondary/40 border border-border/50'}`}>
                                                <p className="text-[8px] font-black uppercase opacity-60 mb-1">{msg.user}</p>
                                                <p className="text-xs leading-relaxed font-medium">{msg.text}</p>
                                                <p className={`text-[8px] mt-1 text-right italic ${msg.user.includes('Me') ? 'opacity-50' : 'text-muted-foreground'}`}>{msg.time}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                            placeholder="Type a team update..."
                                            className="w-full p-4 pr-12 bg-secondary/30 border border-border rounded-2xl focus:outline-none text-sm"
                                        />
                                        <button
                                            onClick={handleSendMessage}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-primary-foreground rounded-xl shadow-lg hover:scale-105 transition-all"
                                        >
                                            <ArrowUpRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Quick Details */}
                                <div className="pt-8 border-t border-border">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-[10px] uppercase font-bold text-muted-foreground">Customer</p>
                                            <p className="text-sm font-bold">{selectedOrder.customer}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase font-bold text-muted-foreground">Order Total</p>
                                            <p className="text-sm font-bold text-[#1CA7A6]">${selectedOrder.total.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </DashboardLayout>
    );
}
