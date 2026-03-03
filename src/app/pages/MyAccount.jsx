import { useState } from "react";
import { Link } from "react-router";
import {
    User,
    Package,
    Settings,
    CreditCard,
    Bell,
    LogOut,
    CheckCircle2,
    Clock,
    Truck,
    MapPin,
    ChevronRight,
    Download,
    Mail,
    Phone,
    Plus,
    Check,
    Lock,
    Eye,
    EyeOff
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function MyAccount() {
    const [activeTab, setActiveTab] = useState("notifications");
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    // Mock Notifications Data
    const [notifications, setNotifications] = useState({
        orderUpdates: true,
        deliveryUpdates: true,
        newsletter: false,
        promotions: true
    });

    // Mock Addresses
    const [addresses, setAddresses] = useState([
        { id: 1, type: "Billing", address: "123 Main St, Suite 400", city: "New York", state: "NY", zip: "10001", country: "USA", isDefault: true },
        { id: 2, type: "Shipping", address: "456 Market St, Floor 2", city: "San Francisco", state: "CA", zip: "94105", country: "USA", isDefault: false }
    ]);

    // Mock Payment Methods
    const [paymentMethods, setPaymentMethods] = useState([
        { id: 1, cardType: "Visa", last4: "4242", expiry: "12/26", isDefault: true },
        { id: 2, cardType: "MasterCard", last4: "8888", expiry: "08/25", isDefault: false }
    ]);

    // Mock User Data
    const user = {
        name: "Alex Thompson",
        email: "alex.thompson@example.com",
        company: "Thompson Engineering",
        phone: "+1 (555) 019-2834",
        joined: "October 2025"
    };

    // Mock Orders Data
    const orders = [
        {
            id: "ORD-2026-8921",
            date: "Mar 01, 2026",
            total: 28450,
            status: "processing", // pending, processing, shipped, delivered
            items: [
                { name: "CORE MD Landing Door", qty: 2, code: "CMD-LD-800" },
                { name: "STELLAR Car Door", qty: 1, code: "STL-CD-900" }
            ],
            progress: 40 // percentage
        },
        {
            id: "ORD-2026-6543",
            date: "Feb 15, 2026",
            total: 15200,
            status: "shipped",
            items: [
                { name: "CORE Landing Door", qty: 4, code: "COR-LD-700" }
            ],
            progress: 80
        },
        {
            id: "ORD-2025-1102",
            date: "Nov 28, 2025",
            total: 42100,
            status: "delivered",
            items: [
                { name: "STELLAR Landing Door", qty: 5, code: "STL-LD-1000" },
                { name: "CORE MD Car Door", qty: 3, code: "CMD-CD-800" }
            ],
            progress: 100
        }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'text-yellow-600 bg-yellow-600/10 border-yellow-600/20';
            case 'processing': return 'text-blue-600 bg-blue-600/10 border-blue-600/20';
            case 'shipped': return 'text-indigo-600 bg-indigo-600/10 border-indigo-600/20';
            case 'delivered': return 'text-green-600 bg-green-600/10 border-green-600/20';
            default: return 'text-muted-foreground bg-secondary/50 border-border';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending': return <Clock className="w-4 h-4" />;
            case 'processing': return <Settings className="w-4 h-4 animate-spin-slow" />;
            case 'shipped': return <Truck className="w-4 h-4" />;
            case 'delivered': return <CheckCircle2 className="w-4 h-4" />;
            default: return <Package className="w-4 h-4" />;
        }
    };

    const renderProgressBar = (progress, status) => {
        const steps = [
            { label: "Order Placed", threshold: 10 },
            { label: "Processing", threshold: 40 },
            { label: "Shipped", threshold: 80 },
            { label: "Delivered", threshold: 100 }
        ];

        return (
            <div className="mt-6 pt-6 border-t border-border">
                <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Fulfillment Tracking</span>
                    <span className="text-sm font-mono text-muted-foreground">{progress}%</span>
                </div>

                {/* Progress Bar Container */}
                <div className="relative h-2 w-full bg-secondary rounded-full overflow-hidden mb-6">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className={`absolute top-0 left-0 h-full rounded-full ${status === 'delivered' ? 'bg-green-500' : 'bg-primary'}`}
                    />
                </div>

                {/* Tracking Steps */}
                <div className="flex justify-between relative">
                    {steps.map((step, idx) => {
                        const isCompleted = progress >= step.threshold;
                        const isCurrent = progress < step.threshold && (idx === 0 || progress >= steps[idx - 1].threshold);

                        return (
                            <div key={step.label} className="flex flex-col items-center w-1/4 relative z-10">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs mb-2 transition-colors ${isCompleted ? 'bg-primary text-primary-foreground' :
                                    isCurrent ? 'bg-background border-2 border-primary text-primary' :
                                        'bg-secondary text-muted-foreground'
                                    }`}>
                                    {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                                </div>
                                <span className={`text-xs text-center font-medium ${isCompleted || isCurrent ? 'text-foreground' : 'text-muted-foreground'}`}>
                                    {step.label}
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    };

    return (
        <div className="w-full min-h-screen bg-secondary/30 pb-20">
            {/* Header Banner */}
            <div className="bg-card border-b border-border py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end gap-6 justify-between">
                        <div className="flex items-center gap-6">
                            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 flex-shrink-0">
                                <User className="w-10 h-10 text-primary" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-semibold mb-1 tracking-tight">{user.name}</h1>
                                <p className="text-muted-foreground">{user.company}</p>
                                <div className="mt-3 flex gap-4 text-xs font-medium text-muted-foreground">
                                    <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> New York, NY</span>
                                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Member since {user.joined}</span>
                                </div>
                            </div>
                        </div>
                        <button className="self-start md:self-auto flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors text-sm font-medium">
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar Nav */}
                    <aside className="lg:col-span-1">
                        <div className="bg-card border border-border rounded-xl p-4 sticky top-24">
                            <nav className="space-y-1">
                                {[
                                    { id: 'orders', label: 'My Orders', icon: Package },
                                    { id: 'profile', label: 'Profile Details', icon: User },
                                    { id: 'payment', label: 'Payment Methods', icon: CreditCard },
                                    { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
                                    { id: 'notifications', label: 'Notifications', icon: Bell },
                                    { id: 'settings', label: 'Account Settings', icon: Settings },
                                    { id: 'support', label: 'Help & Support', icon: Phone },
                                    { id: 'returns', label: 'Returns & Refunds', icon: Check },
                                ].map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === tab.id
                                            ? 'bg-primary text-primary-foreground shadow-sm'
                                            : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                                            }`}
                                    >
                                        <tab.icon className="w-4 h-4" />
                                        {tab.label}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <main className="lg:col-span-3">
                        <AnimatePresence mode="wait">
                            {/* ORDERS TAB */}
                            {activeTab === 'orders' && (
                                <motion.div
                                    key="orders"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="space-y-6"
                                >
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-2xl font-semibold">Order History</h2>
                                        <div className="bg-card border border-border rounded-lg flex items-center p-1">
                                            <button className="px-3 py-1.5 text-xs font-medium rounded-md bg-secondary text-foreground">All Orders</button>
                                            <button className="px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground">Active</button>
                                            <button className="px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground">Completed</button>
                                        </div>
                                    </div>

                                    {orders.map((order, index) => (
                                        <div key={order.id} className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                            {/* Order Header */}
                                            <div className="flex flex-wrap md:flex-nowrap items-start justify-between gap-4 mb-6">
                                                <div>
                                                    <div className="flex items-center gap-3 mb-1">
                                                        <h3 className="text-lg font-mono font-bold tracking-tight">{order.id}</h3>
                                                        <div className={`px-2.5 py-1 text-[10px] uppercase tracking-widest font-bold rounded-full border flex items-center gap-1.5 ${getStatusColor(order.status)}`}>
                                                            {getStatusIcon(order.status)}
                                                            {order.status}
                                                        </div>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground">Placed on {order.date}</p>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-sm text-muted-foreground mb-0.5">Total Amount</div>
                                                    <div className="text-xl font-mono font-bold">${order.total.toLocaleString()}</div>
                                                </div>
                                            </div>

                                            {/* Order Items */}
                                            <div className="bg-secondary/30 rounded-lg p-4 mb-2">
                                                <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">Items in this order</div>
                                                <ul className="space-y-3">
                                                    {order.items.map((item, i) => (
                                                        <li key={i} className="flex items-center justify-between text-sm">
                                                            <div className="flex items-center gap-3">
                                                                <span className="w-6 h-6 rounded bg-primary/10 text-primary flex items-center justify-center text-xs font-mono font-bold">
                                                                    {item.qty}x
                                                                </span>
                                                                <span className="font-medium">{item.name}</span>
                                                            </div>
                                                            <span className="font-mono text-muted-foreground text-xs">{item.code}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Progress Tracking */}
                                            {status !== 'delivered' && renderProgressBar(order.progress, order.status)}

                                            {/* Actions */}
                                            <div className="mt-6 pt-4 border-t border-border flex justify-end gap-3">
                                                <button className="px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-secondary transition-colors flex items-center gap-2">
                                                    <Download className="w-4 h-4" />
                                                    Invoice
                                                </button>
                                                <Link to={`/checkout`} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
                                                    View Details
                                                    <ChevronRight className="w-4 h-4" />
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            )}

                            {/* PROFILE TAB */}
                            {activeTab === 'profile' && (
                                <motion.div
                                    key="profile"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="space-y-6"
                                >
                                    <h2 className="text-2xl font-semibold mb-6">Profile Details</h2>

                                    <div className="bg-card border border-border rounded-xl p-6 md:p-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-5">
                                                <div>
                                                    <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Full Name</label>
                                                    <input
                                                        type="text"
                                                        defaultValue={user.name}
                                                        className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-base"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Email Address</label>
                                                    <input
                                                        type="email"
                                                        defaultValue={user.email}
                                                        className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-base"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-5">
                                                <div>
                                                    <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Company Name</label>
                                                    <input
                                                        type="text"
                                                        defaultValue={user.company}
                                                        className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-base"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Phone Number</label>
                                                    <input
                                                        type="tel"
                                                        defaultValue={user.phone}
                                                        className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-base"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-8 pt-6 border-t border-border flex justify-end gap-4">
                                            <button className="px-6 py-2.5 border border-border rounded-lg font-medium hover:bg-secondary transition-colors">
                                                Cancel
                                            </button>
                                            <button className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity">
                                                Save Changes
                                            </button>
                                        </div>
                                    </div>


                                </motion.div>
                            )}

                            {/* PAYMENT METHODS */}
                            {activeTab === 'payment' && (
                                <motion.div
                                    key="payment"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="space-y-6"
                                >
                                    <h2 className="text-2xl font-semibold mb-6">Payment Methods</h2>
                                    <div className="bg-card border border-border rounded-xl p-6 md:p-8">
                                        <div className="space-y-4">
                                            {paymentMethods.map((method) => (
                                                <div key={method.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-10 bg-secondary rounded flex items-center justify-center font-bold text-muted-foreground">
                                                            {method.cardType === 'Visa' ? 'VISA' : 'MC'}
                                                        </div>
                                                        <div>
                                                            <p className="font-medium">•••• •••• •••• {method.last4}</p>
                                                            <p className="text-sm text-muted-foreground">Expires {method.expiry}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        {method.isDefault && (
                                                            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Default</span>
                                                        )}
                                                        <button className="text-sm font-medium text-destructive hover:text-destructive/80 transition-colors">
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}

                                            <button className="w-full mt-4 flex items-center justify-center gap-2 py-4 border border-dashed border-border rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-all">
                                                <Plus className="w-4 h-4" />
                                                Add New Payment Method
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* SAVED ADDRESSES */}
                            {activeTab === 'addresses' && (
                                <motion.div
                                    key="addresses"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="space-y-6"
                                >
                                    <h2 className="text-2xl font-semibold mb-6">Saved Addresses</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {addresses.map((addr) => (
                                            <div key={addr.id} className="bg-card border border-border rounded-xl p-6 relative">
                                                {addr.isDefault && (
                                                    <span className="absolute top-4 right-4 text-xs bg-primary/10 text-primary px-2 py-1 rounded">Default</span>
                                                )}
                                                <h3 className="font-semibold text-lg mb-2">{addr.type} Address</h3>
                                                <div className="text-muted-foreground space-y-1 text-sm">
                                                    <p>{user.name}</p>
                                                    <p>{addr.address}</p>
                                                    <p>{addr.city}, {addr.state} {addr.zip}</p>
                                                    <p>{addr.country}</p>
                                                </div>
                                                <div className="mt-6 flex gap-4">
                                                    <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">Edit</button>
                                                    <button className="text-sm font-medium text-destructive hover:text-destructive/80 transition-colors">Remove</button>
                                                </div>
                                            </div>
                                        ))}

                                        <button className="flex flex-col items-center justify-center gap-3 bg-secondary/20 border border-dashed border-border rounded-xl p-6 hover:bg-secondary hover:border-solid hover:text-foreground transition-all text-muted-foreground min-h-[200px]">
                                            <div className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center">
                                                <Plus className="w-5 h-5" />
                                            </div>
                                            <span className="font-medium">Add New Address</span>
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* NOTIFICATIONS TAB */}
                            {activeTab === 'notifications' && (
                                <motion.div
                                    key="notifications"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="space-y-6"
                                >
                                    <h2 className="text-2xl font-semibold mb-6">Notification Preferences</h2>
                                    <div className="bg-card border border-border rounded-xl p-6 md:p-8 space-y-6">
                                        <p className="text-muted-foreground max-w-2xl text-sm">
                                            Choose what kinds of notifications you receive about your orders and Wittur updates.
                                        </p>

                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between py-3 border-b border-border">
                                                <div>
                                                    <h3 className="font-medium">Order Updates</h3>
                                                    <p className="text-sm text-muted-foreground">Receive updates on your order confirmations, processing, and shipping.</p>
                                                </div>
                                                <button
                                                    onClick={() => setNotifications({ ...notifications, orderUpdates: !notifications.orderUpdates })}
                                                    className={`w-12 h-6 rounded-full relative transition-colors ${notifications.orderUpdates ? 'bg-primary' : 'bg-secondary'}`}
                                                >
                                                    <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${notifications.orderUpdates ? 'left-7' : 'left-1'}`} />
                                                </button>
                                            </div>

                                            <div className="flex items-center justify-between py-3 border-b border-border">
                                                <div>
                                                    <h3 className="font-medium">Delivery Reminders</h3>
                                                    <p className="text-sm text-muted-foreground">Get notified when your delivery is arriving soon.</p>
                                                </div>
                                                <button
                                                    onClick={() => setNotifications({ ...notifications, deliveryUpdates: !notifications.deliveryUpdates })}
                                                    className={`w-12 h-6 rounded-full relative transition-colors ${notifications.deliveryUpdates ? 'bg-primary' : 'bg-secondary'}`}
                                                >
                                                    <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${notifications.deliveryUpdates ? 'left-7' : 'left-1'}`} />
                                                </button>
                                            </div>

                                            <div className="flex items-center justify-between py-3 border-b border-border">
                                                <div>
                                                    <h3 className="font-medium">Wittur Newsletter</h3>
                                                    <p className="text-sm text-muted-foreground">Receive our monthly newsletter with company updates and news.</p>
                                                </div>
                                                <button
                                                    onClick={() => setNotifications({ ...notifications, newsletter: !notifications.newsletter })}
                                                    className={`w-12 h-6 rounded-full relative transition-colors ${notifications.newsletter ? 'bg-primary' : 'bg-secondary'}`}
                                                >
                                                    <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${notifications.newsletter ? 'left-7' : 'left-1'}`} />
                                                </button>
                                            </div>

                                            <div className="flex items-center justify-between py-3">
                                                <div>
                                                    <h3 className="font-medium">Promotions & Offers</h3>
                                                    <p className="text-sm text-muted-foreground">Hear about discounts, new product releases, and exclusive offers.</p>
                                                </div>
                                                <button
                                                    onClick={() => setNotifications({ ...notifications, promotions: !notifications.promotions })}
                                                    className={`w-12 h-6 rounded-full relative transition-colors ${notifications.promotions ? 'bg-primary' : 'bg-secondary'}`}
                                                >
                                                    <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${notifications.promotions ? 'left-7' : 'left-1'}`} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* SETTINGS TAB */}
                            {activeTab === 'settings' && (
                                <motion.div
                                    key="settings"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="space-y-6"
                                >
                                    <h2 className="text-2xl font-semibold mb-6">Account Settings</h2>

                                    <div className="bg-card border border-border rounded-xl p-6 md:p-8 space-y-8">
                                        {/* Security */}
                                        <div>
                                            <h3 className="text-lg font-medium mb-4">Security</h3>
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Current Password</label>
                                                    <div className="relative">
                                                        <input
                                                            type={showPassword ? "text" : "password"}
                                                            className="w-full pl-10 pr-12 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-base"
                                                        />
                                                        <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                                        >
                                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                        </button>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="text-sm font-medium text-muted-foreground mb-1.5 block">New Password</label>
                                                    <div className="relative">
                                                        <input
                                                            type={showNewPassword ? "text" : "password"}
                                                            className="w-full pl-10 pr-12 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-base"
                                                        />
                                                        <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                                        >
                                                            {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                        </button>
                                                    </div>
                                                </div>
                                                <button className="px-6 py-2 bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground rounded-lg transition-colors font-medium text-sm">
                                                    Update Password
                                                </button>
                                            </div>
                                        </div>

                                        <hr className="border-border" />

                                        {/* Preferences */}
                                        <div>
                                            <h3 className="text-lg font-medium mb-4">Preferences</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Language</label>
                                                    <select className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-base">
                                                        <option>English (US)</option>
                                                        <option>German</option>
                                                        <option>French</option>
                                                        <option>Italian</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Currency</label>
                                                    <select className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-base">
                                                        <option>USD ($)</option>
                                                        <option>EUR (€)</option>
                                                        <option>GBP (£)</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <hr className="border-border" />

                                        {/* Danger Zone */}
                                        <div>
                                            <h3 className="text-lg font-medium text-destructive mb-2">Danger Zone</h3>
                                            <p className="text-sm text-muted-foreground mb-4">Permanently delete your account and all associated data.</p>
                                            <button className="px-6 py-2 border border-destructive/30 text-destructive bg-destructive/5 hover:bg-destructive hover:text-white rounded-lg transition-colors font-medium text-sm">
                                                Delete Account
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                            {/* SUPPORT TAB */}
                            {activeTab === 'support' && (
                                <motion.div
                                    key="support"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="space-y-6"
                                >
                                    <h2 className="text-2xl font-semibold mb-6">Help & Support</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-card border border-border rounded-xl p-6">
                                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                                <Phone className="w-6 h-6 text-primary" />
                                            </div>
                                            <h3 className="text-lg font-medium mb-2">Call Us</h3>
                                            <p className="text-muted-foreground text-sm mb-4">Available 24/7 for technical support and emergency assistance.</p>
                                            <p className="font-mono font-medium text-lg">+1 (800) 123-4567</p>
                                        </div>
                                        <div className="bg-card border border-border rounded-xl p-6">
                                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                                <Mail className="w-6 h-6 text-primary" />
                                            </div>
                                            <h3 className="text-lg font-medium mb-2">Email Support</h3>
                                            <p className="text-muted-foreground text-sm mb-4">Send us a detailed message and we'll respond within 24 hours.</p>
                                            <button className="px-4 py-2 bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground rounded-lg transition-colors font-medium text-sm">
                                                Contact Support
                                            </button>
                                        </div>
                                    </div>

                                    <div className="bg-card border border-border rounded-xl p-6 mt-6">
                                        <h3 className="text-lg font-medium mb-4">Recent Support Tickets</h3>
                                        <div className="space-y-4 text-sm">
                                            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                                                <div>
                                                    <span className="font-mono text-xs text-muted-foreground">#TKT-8910</span>
                                                    <p className="font-medium mt-1">Installation Guide for CORE MD</p>
                                                </div>
                                                <span className="px-3 py-1 bg-green-500/10 text-green-600 rounded-full text-xs font-medium">Resolved</span>
                                            </div>
                                            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                                                <div>
                                                    <span className="font-mono text-xs text-muted-foreground">#TKT-8914</span>
                                                    <p className="font-medium mt-1">Missing parts inquiry (ORD-2026-6543)</p>
                                                </div>
                                                <span className="px-3 py-1 bg-yellow-500/10 text-yellow-600 rounded-full text-xs font-medium">Pending Response</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* RETURNS TAB */}
                            {activeTab === 'returns' && (
                                <motion.div
                                    key="returns"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="space-y-6"
                                >
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-2xl font-semibold">Returns & Refunds</h2>
                                        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:opacity-90 transition-opacity">
                                            Start New Return
                                        </button>
                                    </div>

                                    <div className="bg-card border border-border rounded-xl p-6 text-center py-16">
                                        <div className="w-16 h-16 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Package className="w-8 h-8 text-muted-foreground" />
                                        </div>
                                        <h3 className="text-lg font-medium mb-2">No active returns</h3>
                                        <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                                            You don't have any pending returns or refunds at the moment.
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </main>
                </div>
            </div>
        </div>
    );
}
