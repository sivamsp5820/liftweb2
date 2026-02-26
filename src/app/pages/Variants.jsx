import { useParams, Link, useNavigate } from "react-router";
import { ArrowLeft, ChevronRight, Plus, Settings } from "lucide-react";
import { liftModels, liftCategories, liftSubcategories } from "../data/lifts";
import { motion, AnimatePresence } from "motion/react";
import { useViewMode } from "../context/ViewModeContext";
import { useCart } from "../context/CartContext";

export function Variants() {
    const { categoryId, subcategoryId, productId } = useParams();
    const navigate = useNavigate();
    const { viewMode, setViewMode } = useViewMode();
    const { addToCart } = useCart();

    const category = liftCategories.find((c) => c.id === categoryId);
    const subcategory = liftSubcategories.find((s) => s.id === subcategoryId);
    const model = liftModels.find((m) => m.id === productId);

    if (!category || !subcategory || !model) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <h1 className="text-2xl mb-4">Product not found</h1>
                <Link to="/categories" className="text-primary">
                    Back to categories
                </Link>
            </div>
        );
    }

    const items = model.items || [];

    return (
        <div className="w-full">
            {/* Breadcrumb */}
            <div className="bg-secondary/30 py-4 border-b border-border">
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
            <section className="py-16 md:py-24 border-b border-border bg-secondary/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col md:flex-row md:items-end justify-between gap-8 max-w-5xl mx-auto text-center md:text-left"
                    >
                        <div className="flex-1">
                            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground px-4 py-1 border border-border rounded-full mb-6 inline-block">
                                Variant Selection
                            </span>
                            <h1 className="text-4xl md:text-6xl mb-6 tracking-tight">
                                Select {model.name} Variant
                            </h1>
                            <p className="text-lg text-muted-foreground">
                                Choose the specific {model.name} configuration based on your requirements.
                            </p>
                        </div>

                    </motion.div>
                </div>
            </section>

            {/* Content */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={viewMode}
                            initial={{ opacity: 0, x: viewMode === 'visual' ? -20 : 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: viewMode === 'visual' ? 20 : -20 }}
                            className={viewMode === 'visual' ? "grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto" : "max-w-5xl mx-auto space-y-4"}
                        >
                            {items.map((item, index) => (
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
                                    <div className="group flex flex-col md:flex-row md:items-center gap-4">
                                        <div className="flex-1 flex items-center justify-between gap-6 bg-card border border-border rounded-2xl p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-xl">
                                            <Link
                                                to={`/product/${model.id}?variant=${item.code}`}
                                                className="flex-1"
                                            >
                                                <div className="text-[10px] text-primary uppercase tracking-[0.2em] font-bold mb-1">
                                                    {subcategory.name}
                                                </div>
                                                <h3 className="text-xl md:text-2xl font-medium group-hover:text-primary transition-colors mb-4 line-clamp-2">
                                                    {item.description}
                                                </h3>
                                                <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1 font-semibold">
                                                    Specifications
                                                </div>
                                                <div className="text-sm font-mono text-muted-foreground">
                                                    ({item.code} / {item.subDescription})
                                                </div>
                                            </Link>

                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    addToCart({
                                                        model,
                                                        subcategory,
                                                        category,
                                                        selectedSpecs: {},
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
                                        </div>

                                        <button
                                            onClick={() => navigate(`/product/${model.id}?variant=${item.code}`)}
                                            className="w-full md:w-auto flex items-center justify-center gap-2 py-3 px-6 bg-primary text-primary-foreground rounded-xl transition-all font-semibold opacity-0 translate-x-4 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 group-hover:pointer-events-auto whitespace-nowrap shadow-lg"
                                        >
                                            <Settings className="w-4 h-4 animate-spin-slow" />
                                            <span>Configure Property</span>
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>
        </div>
    );
}
