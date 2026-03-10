import React from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Save, RefreshCcw, DollarSign, Globe, ToggleRight, Zap } from 'lucide-react';

export function SystemConfig() {
    const sections = [
        {
            title: 'Pricing & Tiers',
            icon: DollarSign,
            fields: [
                { label: 'Global Markup %', value: '15', type: 'number' },
                { label: 'VIP Discount %', value: '10', type: 'number' },
                { label: 'Tax Rate (VAT) %', value: '20', type: 'number' },
            ]
        },
        {
            title: 'Regional Settings',
            icon: Globe,
            fields: [
                { label: 'Primary Currency', value: 'USD', type: 'select', options: ['USD', 'EUR', 'GBP'] },
                { label: 'Timezone', value: 'UTC-5', type: 'text' },
            ]
        },
        {
            title: 'Feature Flags',
            icon: Zap,
            fields: [
                { label: 'Batch Upload Feature', value: true, type: 'toggle' },
                { label: 'Real-time Tracking', value: true, type: 'toggle' },
                { label: 'Internal Sandbox Mode', value: false, type: 'toggle' },
            ]
        }
    ];

    return (
        <DashboardLayout type="admin">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">System Configuration</h1>
                        <p className="text-muted-foreground text-sm mt-1">Control global environment variables and business rules.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="p-3 border border-border rounded-xl text-muted-foreground hover:bg-secondary transition-all">
                            <RefreshCcw className="w-5 h-5" />
                        </button>
                        <button className="flex items-center gap-2 px-6 py-3 bg-[#1CA7A6] text-white rounded-xl font-bold shadow-lg shadow-[#1CA7A6]/20 transition-all">
                            <Save className="w-5 h-5" />
                            Save Changes
                        </button>
                    </div>
                </div>

                <div className="space-y-8">
                    {sections.map((section) => (
                        <div key={section.title} className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                            <div className="p-6 border-b border-border bg-secondary/10 flex items-center gap-2">
                                <section.icon className="w-5 h-5 text-primary" />
                                <h3 className="font-bold">{section.title}</h3>
                            </div>
                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                {section.fields.map((field) => (
                                    <div key={field.label} className="space-y-2">
                                        <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">{field.label}</label>
                                        {field.type === 'toggle' ? (
                                            <div className="flex items-center gap-3">
                                                <button className={`w-12 h-6 rounded-full p-1 transition-colors ${field.value ? 'bg-primary' : 'bg-muted'}`}>
                                                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${field.value ? 'translate-x-6' : ''}`} />
                                                </button>
                                                <span className="text-sm font-medium">{field.value ? 'Enabled' : 'Disabled'}</span>
                                            </div>
                                        ) : field.type === 'select' ? (
                                            <select className="w-full px-4 py-3 bg-secondary/30 border border-border rounded-xl focus:outline-none appearance-none">
                                                {field.options.map(opt => <option key={opt}>{opt}</option>)}
                                            </select>
                                        ) : (
                                            <input
                                                type={field.type}
                                                defaultValue={field.value}
                                                className="w-full px-4 py-3 bg-secondary/30 border border-border rounded-xl focus:outline-none font-mono text-sm"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 p-6 bg-red-500/5 border border-red-500/20 rounded-2xl flex items-center justify-between">
                    <div>
                        <h4 className="text-red-600 font-bold mb-1 italic">Danger Zone</h4>
                        <p className="text-xs text-muted-foreground">Flushing the system cache or resetting global config is irreversible.</p>
                    </div>
                    <button className="px-6 py-2 bg-red-500 text-white rounded-lg font-bold text-xs hover:bg-red-600 transition-colors uppercase tracking-widest">
                        Flush All Caches
                    </button>
                </div>
            </div>
        </DashboardLayout>
    );
}
