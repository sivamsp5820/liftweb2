import { useParams, Link } from "react-router";
import { ArrowRight, LayoutGrid, List } from "lucide-react";
import { liftCategories, liftSubcategories, liftModels } from "../data/lifts";
import { motion, AnimatePresence } from "motion/react";
import { useViewMode } from "../context/ViewModeContext";

export function SubCategory() {
  const { categoryId } = useParams();
  const { viewMode, setViewMode } = useViewMode();

  const category = liftCategories.find((c) => c.id === categoryId);
  const subcategories = liftSubcategories.filter((s) => s.categoryId === categoryId);

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl mb-4">Category not found</h1>
        <Link to="/categories" className="text-primary">
          Back to categories
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <section
        className="relative py-16 md:py-24 border-b border-border overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0.95), rgba(255,255,255,0.98)), url(${category.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8"
          >
            <div className="flex-1">
              <Link
                to="/categories"
                className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-flex items-center gap-2"
              >
                ← Back to Categories
              </Link>
              <h1 className="text-4xl md:text-6xl mb-4 tracking-tight">
                {category.id === 'doors' ? 'Door Systems' : 'Non-Door Components'}
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl">
                {category.description}
              </p>
            </div>

            {/* View Toggle */}
            <div className="flex bg-secondary/50 p-1 rounded-lg border border-border self-start md:self-auto">
              <button
                onClick={() => setViewMode('visual')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${viewMode === 'visual'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="text-sm font-medium">Visual</span>
              </button>
              <button
                onClick={() => setViewMode('technical')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${viewMode === 'technical'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                <List className="w-4 h-4" />
                <span className="text-sm font-medium">Technical</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {viewMode === 'visual' ? (
              <motion.div
                key="visual"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {subcategories.map((subcat, index) => {
                  const targetUrl = category.id === 'doors'
                    ? `/category/${categoryId}/${subcat.id}/structures`
                    : `/product/${liftModels.find(m => m.subcategoryId === subcat.id)?.id || ''}`;

                  return (
                    <motion.div
                      key={subcat.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={targetUrl}
                        className="group block bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all h-full"
                      >
                        <div className="relative h-64 overflow-hidden bg-muted">
                          <img
                            src={subcat.image}
                            alt={subcat.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-mono">
                            {subcat.code}
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="text-2xl mb-3 group-hover:text-primary transition-colors">
                            {subcat.name}
                          </h3>
                          <p className="text-muted-foreground mb-6 line-clamp-3">
                            {subcat.description}
                          </p>

                          <div className="flex items-center gap-2 text-primary font-medium">
                            <span>{category.id === 'doors' ? 'View Structures' : 'View Details'}</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                key="technical"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {subcategories.map((subcat, index) => {
                  const targetUrl = category.id === 'doors'
                    ? `/category/${categoryId}/${subcat.id}/structures`
                    : `/product/${liftModels.find(m => m.subcategoryId === subcat.id)?.id || ''}`;

                  return (
                    <motion.div
                      key={subcat.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        to={targetUrl}
                        className="group flex flex-col md:flex-row md:items-center justify-between p-6 bg-card border border-border rounded-xl hover:border-primary/50 hover:shadow-md transition-all gap-6"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="px-2 py-0.5 bg-secondary text-secondary-foreground rounded font-mono text-xs">
                              {subcat.code}
                            </span>
                            <h3 className="text-xl font-medium group-hover:text-primary transition-colors">
                              {subcat.name}
                            </h3>
                          </div>
                          <p className="text-muted-foreground text-sm line-clamp-2 max-w-2xl">
                            {subcat.description}
                          </p>
                        </div>

                        <div className="flex items-center gap-6">
                          <div className="hidden sm:block text-right">
                            <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Status</div>
                            <div className="text-sm font-medium">Available</div>
                          </div>
                          <div className="flex items-center gap-2 text-primary font-medium text-sm bg-primary/5 px-4 py-2 rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                            <span>{category.id === 'doors' ? 'Configure' : 'Details'}</span>
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
