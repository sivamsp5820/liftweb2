import { useParams, Link } from "react-router";
import { ArrowRight, ChevronRight } from "lucide-react";
import { liftModels, liftCategories, liftSubcategories } from "../data/lifts";
import { motion, AnimatePresence } from "motion/react";
import { useViewMode } from "../context/ViewModeContext";

export function Structures() {
    const { categoryId, subcategoryId } = useParams();
    const { viewMode, setViewMode } = useViewMode();

    const category = liftCategories.find((c) => c.id === categoryId);
    const subcategory = liftSubcategories.find((s) => s.id === subcategoryId);
    const models = liftModels.filter((m) => m.subcategoryId === subcategoryId);

    if (!category || !subcategory) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <h1 className="text-2xl mb-4">Product not found</h1>
                <Link to="/categories" className="text-primary">
                    Back to categories
                </Link>
            </div>
        );
    }

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
                        <span className="text-foreground">{subcategory.name}</span>
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
                                Structure Options
                            </span>
                            <h1 className="text-4xl md:text-6xl mb-6 tracking-tight">
                                Select Structure for {subcategory.name}
                            </h1>
                            <p className="text-lg text-muted-foreground">
                                Choose the structure configuration that best fits your installation requirements.
                            </p>
                        </div>

                    </motion.div>
                </div>
            </section>

            {/* Content */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatePresence mode="wait">
                        {viewMode === 'visual' ? (
                            <motion.div
                                key="visual"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto"
                            >
                                {models.map((model, index) => (
                                    <motion.div
                                        key={model.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.2 }}
                                    >
                                        <Link
                                            to={model.items && model.items.length > 0
                                                ? `/category/${categoryId}/${subcategoryId}/${model.id}/variants`
                                                : `/product/${model.id}`
                                            }
                                            className="group block bg-card border border-border rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300"
                                        >
                                            <div className="relative h-80 overflow-hidden bg-muted">
                                                <img
                                                    src={model.image}
                                                    alt={model.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                                <div className="absolute bottom-6 left-6">
                                                    <h2 className="text-3xl text-white font-medium">
                                                        {model.name}
                                                    </h2>
                                                </div>
                                            </div>
                                            <div className="p-8">
                                                <p className="text-muted-foreground mb-8 text-lg">
                                                    {model.description}
                                                </p>

                                                {category.id !== "doors" && (
                                                    <div className="grid grid-cols-2 gap-4 mb-8">
                                                        <div className="p-4 bg-secondary/50 rounded-xl">
                                                            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Capacity</div>
                                                            <div className="text-lg font-mono">{model.capacity} kg</div>
                                                        </div>
                                                        <div className="p-4 bg-secondary/50 rounded-xl">
                                                            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Speed</div>
                                                            <div className="text-lg font-mono">{model.speed}</div>
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="flex items-center justify-between pt-6 border-t border-border">
                                                    <div className="absolute right-0 bottom-0 overflow-hidden group/btn translate-x-12 group-hover:translate-x-0 transition-transform duration-500">
                                                        <div className="bg-primary text-primary-foreground font-bold px-6 py-3 flex items-center gap-2 rounded-tl-2xl">
                                                            Configure <ArrowRight className="w-5 h-5" />
                                                        </div>
                                                    </div>
                                                    <div className="text-2xl font-mono">
                                                        ${model.price.toLocaleString()}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="technical"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="max-w-5xl mx-auto space-y-4"
                            >
                                {models.map((model, index) => (
                                    <motion.div
                                        key={model.id}
                                        variants={{
                                            initial: { opacity: 0, x: -20 },
                                            animate: { opacity: 1, x: 0 }
                                        }}
                                        initial="initial"
                                        animate="animate"
                                        whileHover="hover"
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <Link
                                            to={model.items && model.items.length > 0
                                                ? `/category/${categoryId}/${subcategoryId}/${model.id}/variants`
                                                : `/product/${model.id}`
                                            }
                                            className="group flex flex-col md:flex-row md:items-center justify-between p-8 bg-card border border-border rounded-2xl hover:border-primary/50 hover:shadow-lg transition-all gap-8"
                                        >
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-mono text-xs font-semibold">
                                                        {model.code}
                                                    </span>
                                                    <h3 className="text-2xl font-medium group-hover:text-primary transition-colors">
                                                        {model.name}
                                                    </h3>
                                                </div>
                                                <p className="text-muted-foreground text-sm line-clamp-2 max-w-2xl">
                                                    {model.description}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-12">
                                                {category.id !== "doors" && (
                                                    <div className="hidden sm:grid grid-cols-2 gap-8">
                                                        <div>
                                                            <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Capacity</div>
                                                            <div className="text-sm font-mono font-semibold">{model.capacity} kg</div>
                                                        </div>
                                                        <div>
                                                            <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Speed</div>
                                                            <div className="text-sm font-mono font-semibold">{model.speed}</div>
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="flex items-center gap-8">
                                                    <div className="text-right">
                                                        <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Price From</div>
                                                        <div className="text-xl font-mono font-bold">${model.price.toLocaleString()}</div>
                                                    </div>
                                                    <div className="w-12 h-12 flex items-center justify-center bg-primary/5 rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 flex-shrink-0">
                                                        <ArrowRight className="w-5 h-5" />
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>
        </div>
    );
}
