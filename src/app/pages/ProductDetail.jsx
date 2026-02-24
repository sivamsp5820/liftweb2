import { useParams, Link, useNavigate } from "react-router";
import { useState } from "react";
import {
  ArrowLeft,
  Download,
  CheckCircle2,
  Shield,
  Package,
  ChevronRight,
} from "lucide-react";
import { liftModels, addons, liftCategories, liftSubcategories } from "../data/lifts";
import { motion } from "motion/react";

export function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSpecs, setSelectedSpecs] = useState({});

  const model = liftModels.find((m) => m.id === productId);

  // Initialize selectedSpecs with first options
  useState(() => {
    if (model && model.specifications) {
      const initialSpecs = {};
      Object.entries(model.specifications).forEach(([key, value]) => {
        if (Array.isArray(value) && value.length > 0) {
          initialSpecs[key] = value[0];
        } else {
          initialSpecs[key] = value;
        }
      });
      setSelectedSpecs(initialSpecs);
    }
  });
  const subcategory = model ? liftSubcategories.find((s) => s.id === model.subcategoryId) : null;
  const category = subcategory ? liftCategories.find((c) => c.id === subcategory.categoryId) : null;

  if (!model || !subcategory || !category) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl mb-4">Product not found</h1>
        <Link to="/categories" className="text-primary">
          Back to categories
        </Link>
      </div>
    );
  }

  const handleProceedToCheckout = () => {
    // Store configuration in sessionStorage
    sessionStorage.setItem(
      "liftConfiguration",
      JSON.stringify({
        model,
        subcategory,
        category,
        selectedSpecs,
        total: model.price,
      })
    );
    navigate("/checkout");
  };

  const handleDownloadSpec = () => {
    alert("Spec sheet download would start here. In production, this would download a PDF.");
  };

  // Dynamic Quick Specs mapping
  const getQuickSpecs = () => {
    if (category.id !== 'doors') {
      return [
        { label: "Load Capacity", value: `${model.capacity} kg` },
        { label: "Passengers", value: model.passengers },
        { label: "Speed", value: model.speed },
        { label: "Base Price", value: `$${model.price.toLocaleString()}` }
      ];
    }

    const doorSpecs = model.specifications;
    const specs = [];

    // Map common door specs to the properties grid
    if (selectedSpecs.doorOpenType) {
      specs.push({
        label: "Open Type",
        value: selectedSpecs.doorOpenType
      });
    }

    if (selectedSpecs.doorOpeningWidth) {
      specs.push({
        label: "Opening Width",
        value: `${selectedSpecs.doorOpeningWidth} mm`
      });
    }

    if (selectedSpecs.doorHeight) {
      specs.push({
        label: "Door Height",
        value: `${selectedSpecs.doorHeight} mm`
      });
    }

    if (selectedSpecs.grade) {
      specs.push({
        label: "Grade",
        value: selectedSpecs.grade
      });
    }

    if (selectedSpecs.safetyNorms) {
      specs.push({
        label: "Safety Norms",
        value: selectedSpecs.safetyNorms
      });
    }

    if (selectedSpecs.fireCertification) {
      specs.push({
        label: "Fire Rating",
        value: selectedSpecs.fireCertification
      });
    }

    // Always include Base Price
    specs.push({
      label: "Base Price",
      value: `$${model.price.toLocaleString()}`
    });

    return specs;
  };

  const quickSpecs = getQuickSpecs();

  return (
    <div className="w-full pb-20">
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
            <span className="text-foreground">{model.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Back Button */}
            <Link
              to={`/category/${category.id}`}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to {category.name}
            </Link>


            {/* Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="relative h-96 bg-muted">
                  <img
                    src={model.gallery[selectedImage] || model.image}
                    alt={model.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded text-sm font-mono">
                    {model.code}
                  </div>
                  <div className="absolute top-4 right-4 bg-background/90 backdrop-blur px-3 py-1 rounded text-sm">
                    {subcategory.name}
                  </div>
                </div>
                {model.gallery && model.gallery.length > 0 && (
                  <div className="p-4 grid grid-cols-4 gap-2">
                    {model.gallery.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`relative h-20 rounded overflow-hidden border-2 transition-all ${selectedImage === idx
                          ? "border-primary"
                          : "border-transparent hover:border-border"
                          }`}
                      >
                        <img
                          src={img}
                          alt={`View ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Product Info */}
            <div>
              <div className="mb-4">
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground px-3 py-1 border border-border rounded-full">
                  {subcategory.code}
                </span>
              </div>
              <h1 className="text-4xl mb-4">{model.name}</h1>
              <p className="text-lg text-muted-foreground mb-6">
                {model.description}
              </p>

              {/* Quick Specs */}
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
                {quickSpecs.map((spec, idx) => (
                  <div key={idx} className="p-4 bg-secondary/30 rounded-lg">
                    <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      {spec.label}
                    </div>
                    <div className="text-xl font-mono leading-tight break-words">{spec.value}</div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleDownloadSpec}
                className="flex items-center gap-2 px-6 py-3 border border-border rounded-lg hover:bg-secondary transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download Spec Sheet</span>
              </button>
            </div>

            {/* Configuration Options (Selectable Specs) */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-2xl mb-6 flex items-center gap-2">
                <Package className="w-6 h-6" />
                Customize Specifications
              </h2>
              <div className="grid grid-cols-1 gap-8">
                {Object.entries(model.specifications).map(([key, value]) => {
                  if (!Array.isArray(value) || value.length <= 1) {
                    return (
                      <div key={key} className="pb-4 border-b border-border">
                        <div className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </div>
                        <div className="font-mono text-lg">{Array.isArray(value) ? value[0] : value}</div>
                      </div>
                    );
                  }

                  return (
                    <div key={key} className="space-y-4">
                      <div className="text-sm text-muted-foreground uppercase tracking-wide">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {value.map((option) => (
                          <button
                            key={option}
                            onClick={() => setSelectedSpecs(prev => ({ ...prev, [key]: option }))}
                            className={`px-4 py-2 rounded-md border transition-all text-sm font-medium ${selectedSpecs[key] === option
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border hover:border-muted-foreground text-muted-foreground"
                              }`}
                          >
                            {option}
                            {key.toLowerCase().includes('width') || key.toLowerCase().includes('height') ? ' mm' : ''}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Price Summary Sidebar - Sticky */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-xl mb-6 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Price Summary
                </h2>

                <div className="space-y-4 mb-6">
                  {/* Base Price */}
                  <div className="flex justify-between pb-4 border-b border-border">
                    <div>
                      <div className="font-medium">{model.name}</div>
                      <div className="text-sm text-muted-foreground">Base unit</div>
                    </div>
                    <div className="font-mono">${model.price.toLocaleString()}</div>
                  </div>

                  <div className="flex justify-between pt-4 border-t-2 border-primary">
                    <div>
                      <div className="text-sm text-muted-foreground uppercase tracking-wide">
                        Total Price
                      </div>
                    </div>
                    <div className="text-2xl font-mono">${model.price.toLocaleString()}</div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleProceedToCheckout}
                    className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Proceed to Checkout
                  </button>
                  <button className="w-full px-6 py-3 border border-border rounded-lg hover:bg-secondary transition-colors">
                    Request Quote
                  </button>
                </div>

                {/* Info */}
                <div className="mt-6 pt-6 border-t border-border space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-primary" />
                    <span>Professional installation included</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-primary" />
                    <span>5-year manufacturer warranty</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-primary" />
                    <span>24/7 technical support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}