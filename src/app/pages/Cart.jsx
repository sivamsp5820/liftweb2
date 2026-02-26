import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useCart } from "../context/CartContext";
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ArrowLeft, Package, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function Cart() {
    const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();
    const navigate = useNavigate();
    const [expandedItems, setExpandedItems] = useState(new Set());

    const toggleExpand = (cartId) => {
        setExpandedItems(prev => {
            const next = new Set(prev);
            if (next.has(cartId)) next.delete(cartId);
            else next.add(cartId);
            return next;
        });
    };

    if (cart.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-32 text-center">
                <div className="mb-8 flex justify-center">
                    <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center">
                        <ShoppingBag className="w-12 h-12 text-muted-foreground" />
                    </div>
                </div>
                <h1 className="text-4xl mb-4">Your cart is empty</h1>
                <p className="text-muted-foreground mb-12 max-w-md mx-auto">
                    Looks like you haven't added any lift systems to your configuration yet.
                </p>
                <Link
                    to="/categories"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold"
                >
                    Start Exploring
                    <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
        );
    }

    return (
        <div className="w-full bg-secondary/30 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h1 className="text-4xl mb-2">Shopping Cart</h1>
                        <p className="text-muted-foreground">
                            You have {cartCount} item{cartCount !== 1 ? "s" : ""} in your configuration
                        </p>
                    </div>
                    <Link
                        to="/categories"
                        className="hidden md:flex items-center gap-2 text-primary hover:underline font-medium"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Continue Customizing
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                    {/* Cart Items List */}
                    <div className="lg:col-span-2 space-y-6">
                        <AnimatePresence initial={false}>
                            {cart.map((item) => (
                                <motion.div
                                    key={item.cartId}
                                    layout
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="bg-card border border-border rounded-xl p-6 flex flex-col md:flex-row gap-6 relative group"
                                >
                                    {/* Product Image */}
                                    <div className="w-full md:w-32 h-32 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                                        <img
                                            src={item.model.image}
                                            alt={item.model.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Item Details */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                                                    {item.category.name} → {item.subcategory.name}
                                                </div>
                                                <h3 className="text-xl font-semibold truncate">{item.model.name}</h3>
                                                {item.selectedItem && (
                                                    <p className="text-sm text-primary font-medium mt-1">
                                                        Variant: {item.selectedItem.code}
                                                    </p>
                                                )}
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.cartId)}
                                                className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                                                title="Remove item"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>

                                        <div className="mb-6">
                                            <button
                                                onClick={() => toggleExpand(item.cartId)}
                                                className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-primary font-bold hover:opacity-80 transition-opacity mb-2"
                                            >
                                                <span>{expandedItems.has(item.cartId) ? "Hide Specifications" : "View Specifications"}</span>
                                                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${expandedItems.has(item.cartId) ? "rotate-180" : ""}`} />
                                            </button>

                                            <AnimatePresence>
                                                {expandedItems.has(item.cartId) && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="bg-secondary/30 rounded-lg p-4 mt-2">
                                                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-3">
                                                                {Object.entries(item.selectedSpecs).map(([key, val]) => (
                                                                    <div key={key} className="flex flex-col min-w-0">
                                                                        <span className="text-[11px] uppercase tracking-tight text-muted-foreground/70 font-medium truncate">
                                                                            {key}
                                                                        </span>
                                                                        <span className="text-sm font-bold text-foreground/90 truncate">
                                                                            {val}
                                                                        </span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        <div className="flex items-center justify-between mt-auto">
                                            {/* Quantity Selector */}
                                            <div className="flex items-center bg-secondary/50 rounded-lg p-1 border border-border">
                                                <button
                                                    onClick={() => updateQuantity(item.cartId, -1)}
                                                    className="p-1.5 hover:bg-background rounded-md transition-colors"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="w-12 text-center font-mono font-bold">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.cartId, 1)}
                                                    className="p-1.5 hover:bg-background rounded-md transition-colors"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>

                                            <div className="text-right">
                                                <div className="text-sm text-muted-foreground mb-1">Subtotal</div>
                                                <div className="text-xl font-mono font-bold">
                                                    ${(item.total * item.quantity).toLocaleString()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-1 sticky top-24">
                        <div className="bg-primary text-primary-foreground rounded-2xl p-8 shadow-xl shadow-primary/20">
                            <h2 className="text-2xl mb-8 flex items-center gap-3">
                                <Package className="w-6 h-6" />
                                Summary
                            </h2>

                            <div className="space-y-6 mb-8">
                                <div className="flex justify-between items-center text-primary-foreground/80">
                                    <span>Subtotal</span>
                                    <span className="font-mono text-lg">${cartTotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center text-primary-foreground/80">
                                    <span>Estimated Tax</span>
                                    <span className="font-mono text-lg">TBD</span>
                                </div>
                                <div className="flex justify-between items-center text-primary-foreground/80">
                                    <span>Shipping</span>
                                    <span className="font-mono text-lg italic">Included</span>
                                </div>

                                <div className="pt-6 border-t border-primary-foreground/20">
                                    <div className="flex justify-between items-end">
                                        <div className="text-sm uppercase tracking-widest font-bold">Grand Total</div>
                                        <div className="text-4xl font-mono font-bold">
                                            ${cartTotal.toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate("/checkout")}
                                className="w-full py-5 bg-white text-primary rounded-xl font-bold text-lg hover:bg-opacity-90 transition-all flex items-center justify-center gap-3"
                            >
                                Proceed to Checkout
                                <ArrowRight className="w-5 h-5" />
                            </button>

                            <p className="mt-6 text-xs text-center text-primary-foreground/60 leading-relaxed">
                                By proceeding, you agree to our Terms of Service and Privacy Policy.
                                Taxes will be calculated at checkout based on your installation address.
                            </p>
                        </div>

                        <div className="mt-8 bg-card border border-border rounded-xl p-6">
                            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Need Assistance?</h4>
                            <p className="text-sm text-muted-foreground mb-4">
                                Our specialists are available 24/7 to help with your technical configuration.
                            </p>
                            <button className="w-full py-3 border border-border rounded-lg hover:bg-secondary transition-colors text-sm font-medium">
                                Talk to an Expert
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
