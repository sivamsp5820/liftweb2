import React from 'react';
import { Link, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
    LayoutDashboard,
    Users,
    Settings,
    ShoppingBag,
    UsersRound,
    Bell,
    Search,
    ChevronRight,
    LogOut
} from 'lucide-react';

export function DashboardLayout({ children, type = 'admin' }) {
    const location = useLocation();

    const adminLinks = [
        { name: 'Overview', icon: LayoutDashboard, path: '/admin' },
        { name: 'Agents & Managers', icon: Users, path: '/admin/agents' },
        { name: 'System Config', icon: Settings, path: '/admin/config' },
    ];

    const managementLinks = [
        { name: 'Orders', icon: ShoppingBag, path: '/management' },
        { name: 'Customers & CRM', icon: UsersRound, path: '/management/crm' },
        { name: 'Notifications', icon: Bell, path: '/management/notifications' },
    ];

    const links = type === 'admin' ? adminLinks : managementLinks;

    const [searchQuery, setSearchQuery] = React.useState('');
    const [showSearchResults, setShowSearchResults] = React.useState(false);
    const [showPalette, setShowPalette] = React.useState(false);

    const mockSearchResults = [
        { name: 'John Doe', type: 'Agent', path: '/admin/agents' },
        { name: 'ELV-1234', type: 'Order', path: '/management' },
        { name: 'Acme Corp', type: 'Customer', path: '/management/crm' },
    ].filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const commands = [
        { name: 'Go to Admin Dashboard', icon: LayoutDashboard, path: '/admin' },
        { name: 'Manage Agents', icon: Users, path: '/admin/agents' },
        { name: 'System Settings', icon: Settings, path: '/admin/config' },
        { name: 'View Active Orders', icon: ShoppingBag, path: '/management' },
        { name: 'Open CRM', icon: UsersRound, path: '/management/crm' },
    ];

    React.useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setShowPalette(prev => !prev);
            }
            if (e.key === 'Escape') {
                setShowPalette(false);
                setShowSearchResults(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className="flex h-screen bg-secondary/10">
            {/* Command Palette Overlay */}
            <AnimatePresence>
                {showPalette && (
                    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowPalette(false)}
                            className="absolute inset-0 bg-background/80 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: -20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: -20 }}
                            className="relative w-full max-w-2xl bg-card border border-border shadow-2xl rounded-2xl overflow-hidden"
                        >
                            <div className="p-4 border-b border-border flex items-center gap-3">
                                <Search className="w-5 h-5 text-muted-foreground" />
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="Type a command or search..."
                                    className="w-full bg-transparent border-none focus:outline-none text-lg"
                                />
                                <kbd className="hidden sm:inline-flex px-2 py-1 bg-secondary border border-border rounded text-[10px] font-bold text-muted-foreground uppercase">ESC</kbd>
                            </div>
                            <div className="max-h-[60vh] overflow-y-auto p-2">
                                <div className="px-3 py-2 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Quick Navigation</div>
                                {commands.map((cmd) => (
                                    <Link
                                        key={cmd.path}
                                        to={cmd.path}
                                        onClick={() => setShowPalette(false)}
                                        className="flex items-center gap-4 p-4 hover:bg-primary/5 rounded-xl group transition-all"
                                    >
                                        <div className="p-2 bg-secondary rounded-lg group-hover:bg-primary/10 transition-colors">
                                            <cmd.icon className="w-5 h-5 group-hover:text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-bold">{cmd.name}</p>
                                            <p className="text-xs text-muted-foreground">Navigate to {cmd.name.split('Go to ')[1] || cmd.name}</p>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <aside className="w-64 bg-card border-r border-border flex flex-col">
                <div className="p-6 border-b border-border">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <span className="text-primary-foreground font-bold italic">E</span>
                        </div>
                        <span className="text-xl font-bold tracking-tighter">ELEVATE</span>
                    </Link>
                    <div className="mt-4 px-2 py-1 bg-primary/10 rounded-md inline-block">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-primary">
                            {type} Portal
                        </span>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {links.map((link) => {
                        const isActive = location.pathname === link.path;
                        return (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`flex items-center justify-between p-3 rounded-xl transition-all group ${isActive
                                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                    : "hover:bg-secondary text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <link.icon className={`w-5 h-5 ${isActive ? "text-primary-foreground" : "group-hover:text-primary transition-colors"}`} />
                                    <span className="text-sm font-medium">{link.name}</span>
                                </div>
                                {isActive && <ChevronRight className="w-4 h-4" />}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-border">
                    <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all">
                        <LogOut className="w-5 h-5" />
                        <span className="text-sm font-medium">Log Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Topbar */}
                <header className="h-16 bg-card border-b border-border flex items-center justify-between px-8 relative z-50">
                    <div className="relative w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search data, orders, or users..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setShowSearchResults(e.target.value.length > 0);
                            }}
                            className="w-full pl-10 pr-12 py-2 bg-secondary/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1">
                            <kbd className="px-1.5 py-0.5 bg-card border border-border rounded text-[10px] font-bold text-muted-foreground">⌘</kbd>
                            <kbd className="px-1.5 py-0.5 bg-card border border-border rounded text-[10px] font-bold text-muted-foreground">K</kbd>
                        </div>

                        {/* Search Overlay */}
                        <AnimatePresence>
                            {showSearchResults && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute top-12 left-0 w-full bg-card border border-border rounded-xl shadow-2xl p-2 z-[100]"
                                >
                                    {mockSearchResults.length > 0 ? (
                                        mockSearchResults.map((result) => (
                                            <Link
                                                key={result.name}
                                                to={result.path}
                                                onClick={() => setShowSearchResults(false)}
                                                className="flex items-center justify-between p-3 hover:bg-secondary rounded-lg transition-colors group"
                                            >
                                                <span className="text-sm font-medium">{result.name}</span>
                                                <span className="text-[10px] uppercase font-bold text-muted-foreground group-hover:text-primary">{result.type}</span>
                                            </Link>
                                        ))
                                    ) : (
                                        <div className="p-4 text-center text-sm text-muted-foreground">No matches found</div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 hover:bg-secondary rounded-lg transition-colors">
                            <Bell className="w-5 h-5 text-muted-foreground" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full border-2 border-card" />
                        </button>
                        <div className="flex items-center gap-3 pl-4 border-l border-border">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-semibold">Super Admin</p>
                                <p className="text-[10px] text-muted-foreground uppercase">Main Branch</p>
                            </div>
                            <div className="w-10 h-10 bg-secondary rounded-full border border-border overflow-hidden">
                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Avatar" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dynamic Page Content */}
                <div className="flex-1 overflow-y-auto p-8 bg-secondary/5">
                    {children}
                </div>
            </main>
        </div>
    );
}
