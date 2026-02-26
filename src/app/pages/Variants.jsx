import { useParams, Link } from "react-router";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { liftModels, liftCategories, liftSubcategories } from "../data/lifts";
import { motion, AnimatePresence } from "motion/react";
import { useViewMode } from "../context/ViewModeContext";

export function Variants() {
    const { categoryId, subcategoryId, productId } = useParams();
    const { viewMode, setViewMode } = useViewMode();

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
                                    <Link
                                        to={`/product/${model.id}?variant=${item.code}`}
                                        className={`group block bg-card border border-border rounded-2xl p-6 hover:border-primary/50 hover:shadow-xl transition-all duration-300 ${viewMode === 'technical' ? 'flex flex-col md:flex-row md:items-center justify-between gap-6' : ''}`}
                                    >
                                        <div className="flex-1">
                                            <div className="text-xs text-muted-foreground uppercase tracking-widest mb-2 font-semibold">
                                                Description
                                            </div>
                                            <h3 className="text-xl md:text-2xl font-medium group-hover:text-primary transition-colors mb-4 line-clamp-2">
                                                {item.description}
                                            </h3>

                                            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-border/50 ${viewMode === 'technical' ? 'mt-0' : 'mt-4'}`}>
                                                <div>
                                                    <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Subassembly Code</div>
                                                    <div className="text-sm font-mono font-bold bg-secondary/50 px-2 py-1 rounded inline-block text-primary">
                                                        {item.code}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Subassembly Description</div>
                                                    <div className="text-sm text-foreground/80 font-medium">
                                                        {item.subDescription}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {viewMode === 'technical' && (
                                            <motion.div
                                                variants={{
                                                    initial: { width: 48 },
                                                    hover: { width: 128 }
                                                }}
                                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                className="h-12 flex items-center justify-center bg-primary/5 rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300 relative overflow-hidden flex-shrink-0"
                                            >
                                                <motion.span
                                                    variants={{
                                                        initial: { opacity: 0, x: 20 },
                                                        hover: { opacity: 1, x: 0 }
                                                    }}
                                                    className="absolute inset-0 flex items-center justify-center font-bold text-sm whitespace-nowrap text-primary-foreground"
                                                >
                                                    Configure {'>'}
                                                </motion.span>
                                                <ChevronRight className="w-5 h-5 group-hover:opacity-0 transition-opacity duration-300" />
                                            </motion.div>
                                        )}
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>
        </div>
    );
}
