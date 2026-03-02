import { useParams, Link, useNavigate } from "react-router";
import { ArrowLeft, ChevronRight, Plus, Minus } from "lucide-react";
import { liftModels, liftCategories, liftSubcategories } from "../data/lifts";
import { motion, AnimatePresence } from "motion/react";
import { useViewMode } from "../context/ViewModeContext";
import { useCart } from "../context/CartContext";

export function Variants() {
    const { categoryId, subcategoryId, productId } = useParams();
    const navigate = useNavigate();
    const { viewMode, setViewMode } = useViewMode();
    const { cart, addToCart, updateQuantity, removeFromCart } = useCart();

    const category = liftCategories.find((c) => c.id === categoryId);
    const subcategory = liftSubcategories.find((s) => s.id === subcategoryId);
    const model = liftModels.find((m) => m.id === productId);

    if (!category || !subcategory || !model) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <h1 className="text-2xl mb-4">Product not found</h1>
                <Link to="/categories" className="text-primary">
                    Back to Category
                </Link>
            </div>
        );
    }

    const getDefaultSpecs = () => {
        if (!model || !model.specifications) return {};
        const initialSpecs = {};
        Object.entries(model.specifications).forEach(([key, value]) => {
            if (Array.isArray(value) && value.length > 0) {
                initialSpecs[key] = value[0];
            } else {
                initialSpecs[key] = value;
            }
        });
        return initialSpecs;
    };

    const defaultSpecs = getDefaultSpecs();
    const items = model.items || [];

    const getCartItem = (item) => {
        return cart.find((i) =>
            i.model.id === model.id &&
            JSON.stringify(i.selectedSpecs) === JSON.stringify(defaultSpecs) &&
            i.selectedItem?.code === item.code
        );
    };

    return (
        <div className="w-full">
            {/* Breadcrumb */}
            <div className="bg-secondary/30 py-2 border-b border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Link to="/categories" className="hover:text-foreground">
                            Categories
                        </Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link
                            to={`/category/${category.id}`}
                            className="hover:text-foreground"
                        >
                            {category.name}
                        </Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link
                            to={`/category/${category.id}/${subcategory.id}/structures`}
                            className="hover:text-foreground"
                        >
                            {subcategory.name}
                        </Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-foreground">{model.name}</span>
                    </div>
                </div>
            </div>

            {/* Header */}
            <section className="py-8 border-b border-border bg-secondary/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col md:flex-row md:items-center justify-between gap-4 max-w-5xl mx-auto text-center md:text-left"
                    >
                        <div className="flex-1">
                            <h1 className="text-3xl md:text-4xl mb-2 tracking-tight">
                                Select {model.name} Variant
                            </h1>
                            <p className="text-base text-muted-foreground">
                                Choose the specific {model.name} configuration based on your requirements.
                            </p>
                        </div>
                        <div>
                            <Link
                                to={`/product/${model.id}`}
                                className="inline-flex items-center justify-center gap-2 py-2 px-4 bg-primary text-primary-foreground rounded-lg transition-all font-semibold shadow hover:opacity-90 whitespace-nowrap text-sm"
                            >
                                <span>Choose New Combo</span>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Content */}
            <section className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={viewMode}
                            initial={{ opacity: 0, x: viewMode === 'visual' ? -20 : 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: viewMode === 'visual' ? 20 : -20 }}
                            className={viewMode === 'visual' ? "grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto" : "max-w-5xl mx-auto space-y-4"}
                        >
                            {items.map((item, index) => {
                                const cartItem = getCartItem(item);
                                return (
                                    <motion.div
                                        key={item.code}
                                        variants={{
                                            initial: { opacity: 0, y: 20 },
                                            animate: { opacity: 1, y: 0 }
                                        }}
                                        initial="initial"
                                        animate="animate"
                                        whileHover="hover"
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <div className="group flex flex-col md:flex-row md:items-center gap-3">
                                            <div
                                                onClick={() => {
                                                    if (!cartItem) {
                                                        addToCart({
                                                            model,
                                                            subcategory,
                                                            category,
                                                            selectedSpecs: defaultSpecs,
                                                            selectedItem: item,
                                                            selectedAddons: [],
                                                            total: model.price,
                                                        });
                                                    } else {
                                                        updateQuantity(cartItem.cartId, 1);
                                                    }
                                                }}
                                                className="flex-1 flex items-center justify-between gap-4 bg-card border border-border rounded-xl p-4 transition-all duration-300 hover:border-primary/50 hover:shadow-md cursor-pointer"
                                            >
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-medium group-hover:text-primary transition-colors mb-1 line-clamp-2">
                                                        {item.description}
                                                    </h3>
                                                    <div className="text-sm font-mono text-muted-foreground">
                                                        {item.code} • {item.subDescription}
                                                    </div>
                                                </div>

                                                {cartItem ? (
                                                    <div className="flex items-center gap-3 bg-secondary rounded-full p-1" onClick={(e) => e.stopPropagation()}>
                                                        <button
                                                            onClick={() => {
                                                                if (cartItem.quantity > 1) {
                                                                    updateQuantity(cartItem.cartId, -1);
                                                                } else {
                                                                    removeFromCart(cartItem.cartId);
                                                                }
                                                            }}
                                                            className="w-10 h-10 flex items-center justify-center bg-background hover:bg-destructive hover:text-destructive-foreground rounded-full transition-all shadow-sm flex-shrink-0"
                                                        >
                                                            <Minus className="w-4 h-4" />
                                                        </button>
                                                        <span className="w-4 text-center font-medium">
                                                            {cartItem.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => updateQuantity(cartItem.cartId, 1)}
                                                            className="w-10 h-10 flex items-center justify-center bg-primary text-primary-foreground hover:opacity-90 rounded-full transition-all shadow-sm flex-shrink-0"
                                                        >
                                                            <Plus className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            addToCart({
                                                                model,
                                                                subcategory,
                                                                category,
                                                                selectedSpecs: defaultSpecs,
                                                                selectedItem: item,
                                                                selectedAddons: [],
                                                                total: model.price,
                                                            });
                                                        }}
                                                        className="w-12 h-12 flex items-center justify-center bg-secondary hover:bg-primary hover:text-primary-foreground rounded-full transition-all shadow-sm flex-shrink-0"
                                                        title="Add to Cart"
                                                    >
                                                        <Plus className="w-5 h-5" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </motion.div>
                    </AnimatePresence>

                    <div className="mt-8 flex justify-center">
                        <Link
                            to="/categories"
                            className="inline-flex items-center justify-center gap-2 py-3 px-6 bg-primary text-primary-foreground rounded-full transition-all hover:opacity-90 font-semibold shadow-md"
                        >
                            Choose New Lift
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
