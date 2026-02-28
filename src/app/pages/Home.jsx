import { Link } from "react-router";
import { ArrowRight, Shield, Zap, Settings, Award } from "lucide-react";
import { liftCategories } from "../data/lifts";
import { motion } from "motion/react";

export function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background via-background to-secondary py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-block mb-6">
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground px-4 py-1 border border-border rounded-full">
                Since 1985
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl mb-6 tracking-tight">
              Engineering Vertical
              <br />
              <span className="text-muted-foreground">Transportation</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Premium lift solutions for residential, commercial, industrial, and medical applications.
              Built with precision, designed for reliability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/categories"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-border rounded-lg hover:bg-secondary transition-colors">
                <span>Request Quote</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-border bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Years Experience", value: "40+" },
              { label: "Installations", value: "10K+" },
              { label: "Countries", value: "45+" },
              { label: "Uptime Rate", value: "99.8%" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-mono mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl mb-4">Why Choose ELEVATE</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Industry-leading technology and support for every installation
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "Safety First",
                description: "Certified to international standards with multi-layer safety systems",
              },
              {
                icon: Zap,
                title: "Energy Efficient",
                description: "Advanced regenerative drives reduce energy consumption by up to 40%",
              },
              {
                icon: Settings,
                title: "Easy Maintenance",
                description: "Modular design and remote diagnostics simplify servicing",
              },
              {
                icon: Award,
                title: "Quality Assured",
                description: "ISO 9001 certified manufacturing with comprehensive warranty",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 border border-border rounded-lg hover:shadow-lg transition-shadow bg-card"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      {/* <section className="py-20 md:py-32 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl mb-4">Our Product Categories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from our comprehensive range of lift components and systems
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {liftCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  to={`/category/${category.id}`}
                  className="group block bg-card border border-border rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-64 overflow-hidden bg-muted">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-3xl text-white mb-2">{category.name}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-muted-foreground mb-4">
                      {category.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-primary">
                      <span>View Products</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-16 text-center">
            <h2 className="text-3xl md:text-5xl mb-4">Ready to Elevate?</h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Our engineering team is ready to design the perfect lift solution for your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/categories"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-foreground text-primary rounded-lg hover:opacity-90 transition-opacity"
              >
                <span>Browse Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-primary-foreground/30 rounded-lg hover:bg-primary-foreground/10 transition-colors">
                <span>Contact Sales</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}