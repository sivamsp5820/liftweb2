import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { liftCategories } from "../data/lifts";
import { motion } from "motion/react";

export function Categories() {
  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-secondary/30 py-16 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground px-4 py-1 border border-border rounded-full mb-6 inline-block">
              Product Catalog
            </span>
            <h1 className="text-4xl md:text-6xl mb-6 tracking-tight">
              Product Categories
            </h1>
            <p className="text-lg text-muted-foreground">
              Select a category to explore our complete range of lift components and systems.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {liftCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Link
                  to={`/category/${category.id}`}
                  className="group block bg-card border border-border rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 h-full"
                >
                  {/* Image Section */}
                  <div className="relative h-80 overflow-hidden bg-muted">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                    {/* Title on Image */}
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <h2 className="text-4xl md:text-5xl text-white mb-2">
                        {category.name}
                      </h2>
                      <div className="text-white/80 text-sm">
                        {category.subcategories.length} Product Lines
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-8">
                    <p className="text-muted-foreground mb-6 text-lg">
                      {category.description}
                    </p>

                    {/* Subcategories Preview */}
                    <div className="mb-6">
                      <div className="text-xs uppercase tracking-wide text-muted-foreground mb-3">
                        Product Lines
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {category.subcategories.map((subcat) => (
                          <div
                            key={subcat}
                            className="px-3 py-1 bg-secondary/50 rounded-full text-sm"
                          >
                            {subcat}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-primary pt-4 border-t border-border">
                      <span className="text-sm uppercase tracking-wide">View All Products</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-mono mb-2">50+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">
                Product Models
              </div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-mono mb-2">24/7</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">
                Technical Support
              </div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-mono mb-2">100%</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">
                Quality Tested
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
