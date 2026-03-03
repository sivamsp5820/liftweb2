import { useParams, Link, useNavigate, useLocation } from "react-router";
import { useState, useRef, useEffect } from "react";
import {
  ArrowLeft,
  Download,
  CheckCircle2,
  Shield,
  Package,
  ChevronRight,
  List,
  Minus,
  Plus,
} from "lucide-react";
import { liftModels, addons, liftCategories, liftSubcategories } from "../data/lifts";
import { motion, AnimatePresence } from "motion/react";
import { CategorySidebar } from "../components/CategorySidebar";
import { useCart } from "../context/CartContext";
import { ShoppingCart, Settings, X } from "lucide-react";

export function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedSpecs, setSelectedSpecs] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [highlightedSpec, setHighlightedSpec] = useState(null);
  const [isMobileSummaryOpen, setIsMobileSummaryOpen] = useState(false);
  const specsContainerRef = useRef(null);
  const specRefs = useRef({});
  const highlightTimeoutRef = useRef(null);

  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const queryParams = new URLSearchParams(location.search);
  const variantCode = queryParams.get("variant");

  const [isConfirmed, setIsConfirmed] = useState(!!variantCode);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    setIsConfirmed(!!variantCode);
    setQuantity(0);
    setIsAdded(false);
  }, [variantCode]);

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
    if (model && model.items && model.items.length > 0) {
      const variant = variantCode
        ? model.items.find(item => item.code === variantCode)
        : model.items[0];
      setSelectedItem(variant || model.items[0]);
    }
  }, [model, variantCode]);
  const subcategory = model ? liftSubcategories.find((s) => s.id === model.subcategoryId) : null;
  const category = subcategory ? liftCategories.find((c) => c.id === subcategory.categoryId) : null;

  if (!model || !subcategory || !category) {
    return (
      <div className="max-w-[1536px] mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl mb-4">Product not found</h1>
        <Link to="/categories" className="text-primary">
          Back to categories
        </Link>
      </div>
    );
  }

  const handleSpecSelect = (key, option) => {
    setSelectedSpecs(prev => ({ ...prev, [key]: option }));
    setHighlightedSpec(key);

    if (highlightTimeoutRef.current) {
      clearTimeout(highlightTimeoutRef.current);
    }
    highlightTimeoutRef.current = setTimeout(() => {
      setHighlightedSpec(null);
    }, 2000);
  };

  useEffect(() => {
    if (highlightedSpec && specRefs.current[highlightedSpec] && specsContainerRef.current) {
      // scroll to it
      specRefs.current[highlightedSpec].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [highlightedSpec, selectedSpecs]);

  const handleAddToCart = () => {
    addToCart({
      model,
      subcategory,
      category,
      selectedSpecs,
      selectedItem,
      selectedAddons: [],
      total: model.price,
      quantity,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart({
      model,
      subcategory,
      category,
      selectedSpecs,
      selectedItem,
      selectedAddons: [],
      total: model.price,
      quantity,
    });
    navigate("/checkout");
  };

  const handleProceedToCheckout = () => {
    handleBuyNow();
  };

  const handleDownloadSpec = () => {
    alert("Spec sheet download wssdfould start here. In production, this would download a PDF plese check make sure it is verfied as the data you have choosed.");
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/categories?category=${categoryId}`);
  };

  const handleSubcategoryClick = (subcategoryId) => {
    const subcat = liftSubcategories.find(s => s.id === subcategoryId);
    const catId = subcat ? subcat.categoryId : "all";
    navigate(`/categories?category=${catId}&subcategory=${subcategoryId}`);
  };

  const handleDoorTypeClick = (type) => {
    navigate(`/categories?category=doors&doorType=${type}`);
  };

  // Dynamic Quick Specs mapping
  const getQuickSpecs = () => {
    const specs = [];

    // Base attributes
    specs.push({ label: "Category", value: category.name });
    specs.push({ label: "Series", value: subcategory.name });
    if (model.capacity) specs.push({ label: "Load Capacity", value: `${model.capacity} kg` });
    if (model.passengers) specs.push({ label: "Passengers", value: model.passengers });
    if (model.speed) specs.push({ label: "Speed", value: model.speed });

    // Map all selected specs to the properties grid
    Object.entries(selectedSpecs).forEach(([key, value]) => {
      let displayValue = Array.isArray(value) ? value.join(", ") : value;
      // Append 'mm' intelligently
      if ((key.toLowerCase().includes('width') || key.toLowerCase().includes('height')) && !String(displayValue).includes('mm')) {
        displayValue = `${displayValue} mm`;
      }

      // Title case labels
      let label = key.replace(/([A-Z])/g, " $1").trim();
      label = label.charAt(0).toUpperCase() + label.slice(1);

      specs.push({
        label: label,
        value: displayValue,
        originalKey: key
      });
    });

    // Always include Base Price
    specs.push({
      label: "Base Price",
      value: `$${model.price.toLocaleString()}`
    });

    return specs;
  };

  const quickSpecs = getQuickSpecs();

  return (
    <div className="w-full flex">
      {/* Sidebar Filter */}
      <CategorySidebar
        selectedCategory={category?.id || "all"}
        selectedSubcategory={subcategory?.id || "all"}
        selectedDoorType={model?.specifications?.doorType || "all"}
        onCategoryClick={handleCategoryClick}
        onSubcategoryClick={handleSubcategoryClick}
        onDoorTypeClick={handleDoorTypeClick}
      />

      <main className="flex-1 w-full bg-background min-h-screen pb-20">
        {/* Breadcrumb */}
        <div className="bg-secondary/30 py-2 border-b border-border">
          <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/categories" className="hover:text-foreground">
                Categories
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link
                to={category.id === 'doors' ? `/categories?category=${category.id}` : `/category/${category.id}`}
                className="hover:text-foreground"
              >
                {category.name}
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link
                to={category.id === 'doors'
                  ? `/categories?category=${category.id}&subcategory=${subcategory.id}`
                  : `/category/${category.id}`
                }
                className="hover:text-foreground"
              >
                {subcategory.name}
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground">{model.name}</span>
            </div>
          </div>
        </div>

        <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Back Button */}
              <div className="flex items-center justify-between">
                <Link
                  to={`/category/${category.id}`}
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to {category.name}
                </Link>
                <div className="flex gap-2">
                  <span className="text-xs uppercase tracking-[0.3em] font-mono bg-primary text-primary-foreground px-2 py-1 rounded">
                    {model.code}
                  </span>
                  <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground px-2 py-1 border border-border rounded">
                    {subcategory.name}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div>
                <h1 className="text-3xl mb-2">{model.name}</h1>
                <p className="text-base text-muted-foreground mb-4">
                  {model.description}
                </p>



                <button
                  onClick={handleDownloadSpec}
                  className="flex items-center gap-2 px-6 py-3 border border-border rounded-lg hover:bg-secondary transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Spec Sheet</span>
                </button>
              </div>


              {variantCode ? (
                <div className="bg-card border border-border rounded-lg p-4 mt-2">
                  <h2 className="text-lg mb-3 flex items-center gap-2">
                    <List className="w-4 h-4" />
                    Technical Specifications
                  </h2>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(model.specifications).map(([key, value]) => (
                      <div key={key} className="p-3 bg-secondary/30 rounded-lg">
                        <div className="text-[10px] text-muted-foreground uppercase tracking-wide mb-1">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </div>
                        <div className="text-lg font-mono leading-tight break-words">
                          {Array.isArray(value) ? value.join(", ") : value}
                          {key.toLowerCase().includes('width') || key.toLowerCase().includes('height') ? ' mm' : ''}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {category.id === 'doors' && (
                    <div className="bg-card border border-border rounded-lg p-4 mt-2 mb-4">
                      <h2 className="text-lg mb-4 flex items-center gap-2">
                        <Package className="w-4 h-4" />
                        Product Configuration
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <div>
                          <div className="text-[11px] text-muted-foreground uppercase tracking-wider mb-2">Category</div>
                          <div className="flex flex-wrap gap-2">
                            {[
                              { id: 'core', name: 'CORE' },
                              { id: 'core-md', name: 'CORE MD' },
                              { id: 'stellar', name: 'STELLAR' }
                            ].map(cat => (
                              <button
                                key={cat.id}
                                onClick={() => {
                                  const isCD = model.id.endsWith('cd') || model.id.includes('-cd');
                                  navigate(`/product/${cat.id}-${isCD ? 'cd' : 'ld'}`);
                                }}
                                className={`px-3 py-1.5 rounded-md border transition-all text-sm font-medium tracking-wide ${subcategory.id === cat.id
                                  ? "border-primary bg-primary/10 text-primary shadow-sm"
                                  : "border-border/50 hover:border-[#1CA7A6] text-muted-foreground hover:text-foreground bg-secondary/10 hover:bg-secondary/30"
                                  }`}
                              >
                                {cat.name}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="text-[11px] text-muted-foreground uppercase tracking-wider mb-2">Structure</div>
                          <div className="flex flex-wrap gap-2">
                            {[
                              { id: 'ld', name: 'Landing Door (LD)' },
                              { id: 'cd', name: 'Car Door (CD)' }
                            ].map(struct => {
                              const isSelected = model.id.endsWith(struct.id) || model.id.includes(`-${struct.id}`);
                              return (
                                <button
                                  key={struct.id}
                                  onClick={() => navigate(`/product/${subcategory.id}-${struct.id}`)}
                                  className={`px-3 py-1.5 rounded-md border transition-all text-sm font-medium tracking-wide ${isSelected
                                    ? "border-primary bg-primary/10 text-primary shadow-sm"
                                    : "border-border/50 hover:border-[#1CA7A6] text-muted-foreground hover:text-foreground bg-secondary/10 hover:bg-secondary/30"
                                    }`}
                                >
                                  {struct.name}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="bg-card border border-border rounded-lg p-4 mt-2">
                    <div className="mb-3">
                      <h2 className="text-lg flex items-center gap-2">
                        <Package className="w-4 h-4" />
                        Customize Specifications
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                      {Object.entries(model.specifications).map(([key, value]) => {
                        if (!Array.isArray(value) || value.length <= 1) {
                          return (
                            <div key={key} className="pb-2 flex flex-col justify-end">
                              <div className="text-[11px] text-muted-foreground uppercase tracking-wider mb-0.5">
                                {key.replace(/([A-Z])/g, " $1").trim()}
                              </div>
                              <div className="font-mono text-[15px] font-medium text-foreground">{Array.isArray(value) ? value[0] : value}</div>
                            </div>
                          );
                        }

                        return (
                          <div key={key} className="space-y-2 pb-3 border-b border-border/20 last:border-0">
                            <div className="text-[11px] text-muted-foreground uppercase tracking-wider">
                              {key.replace(/([A-Z])/g, " $1").trim()}
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {value.map((option) => (
                                <button
                                  key={option}
                                  onClick={() => handleSpecSelect(key, option)}
                                  className={`px-3 py-1.5 rounded-md border transition-all text-sm font-medium tracking-wide ${selectedSpecs[key] === option
                                    ? "border-primary bg-primary/10 text-primary shadow-sm"
                                    : "border-border/50 hover:border-[#1CA7A6] text-muted-foreground hover:text-foreground bg-secondary/10 hover:bg-secondary/30"
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
                </>
              )}
            </div>

            {/* Desktop Price Summary Sidebar - Sticky */}
            <div className="hidden lg:block lg:col-span-5">
              <div className="sticky top-24">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-card/80 backdrop-blur-md border border-border/50 shadow-2xl rounded-2xl p-6 relative overflow-hidden"
                >
                  {/* Decorative background glow */}
                  <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-primary/10 blur-3xl rounded-full pointer-events-none" />

                  <h2 className="text-xl mb-4 flex items-center gap-2 font-medium">
                    <Shield className="w-5 h-5 text-primary" />
                    Summary & Price
                  </h2>

                  <div className="mb-4 pb-4 border-b border-border">
                    <div className="font-semibold text-xl mb-1 text-primary">{selectedItem ? selectedItem.description : model.name}</div>
                    <div className="text-sm font-mono text-muted-foreground mb-4">{selectedItem ? selectedItem.code : subcategory.name}</div>

                    <div
                      ref={specsContainerRef}
                      className="flex flex-wrap gap-2 max-h-[25vh] overflow-y-auto pr-2 pb-2 custom-scrollbar scroll-smooth"
                    >
                      {quickSpecs.filter(s => s.label !== "Base Price").map((spec, idx) => {
                        const isHighlighted = highlightedSpec === spec.originalKey;
                        return (
                          <div
                            key={idx}
                            ref={el => { if (spec.originalKey) specRefs.current[spec.originalKey] = el; }}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border transition-all duration-300 ${isHighlighted
                              ? "bg-primary/20 border-[#1CA7A6] ring-1 ring-[#1CA7A6] ring-offset-1 ring-offset-background/50 scale-110 z-10"
                              : "bg-secondary/50 border-border/50"
                              }`}
                          >
                            <span className={`text-[11px] uppercase tracking-wider transition-colors ${isHighlighted ? "text-primary font-bold" : "text-muted-foreground"}`}>{spec.label}:</span>
                            <span className={`text-xs font-mono font-medium transition-colors ${isHighlighted ? "text-primary" : ""}`}>{spec.value}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div className="space-y-4 mb-6 relative z-10">
                    {/* Base Price */}
                    <div className="flex justify-between pb-3">
                      <div className="text-sm text-muted-foreground font-medium">Base Price</div>
                      <div className="font-mono text-muted-foreground">${model.price.toLocaleString()}</div>
                    </div>

                    <div className="flex justify-between pt-4 border-t border-border/50 relative">
                      {/* Decorative glow on total */}
                      <div className="absolute left-0 bottom-0 w-full h-8 bg-primary/5 blur-xl pointer-events-none" />
                      <div>
                        <div className="text-sm text-foreground uppercase tracking-widest font-bold">
                          Total Price
                        </div>
                      </div>
                      <motion.div
                        key={model.price}
                        initial={{ scale: 1.1, color: "var(--primary)" }}
                        animate={{ scale: 1, color: "var(--foreground)" }}
                        className="text-3xl font-mono font-bold"
                      >
                        ${model.price.toLocaleString()}
                      </motion.div>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-3">
                    {!isConfirmed ? (
                      <button
                        onClick={() => setIsConfirmed(true)}
                        className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                        Confirm Configuration
                      </button>
                    ) : (
                      <>
                        <div className="flex items-center justify-between bg-secondary/30 p-2 rounded-lg border border-border">
                          <span className="text-sm font-medium px-2">Quantity</span>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => {
                                const newQuantity = Math.max(0, quantity - 1);
                                setQuantity(newQuantity);
                                if (newQuantity === 0 && !variantCode) {
                                  // if 0 and base model, do not attempt to add to cart
                                } else {
                                  addToCart({
                                    model,
                                    subcategory,
                                    category,
                                    selectedSpecs,
                                    selectedItem,
                                    selectedAddons: [],
                                    total: model.price,
                                    quantity: newQuantity,
                                    isUpdateOnly: true
                                  });
                                  setIsAdded(true);
                                  setTimeout(() => setIsAdded(false), 2000);
                                }
                              }}
                              className="w-8 h-8 flex items-center justify-center rounded-md bg-background border border-border hover:bg-secondary transition-colors cursor-pointer disabled:opacity-50"
                              disabled={quantity <= 0}
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-mono font-medium w-4 text-center">{quantity}</span>
                            <button
                              onClick={() => {
                                const newQuantity = quantity + 1;
                                setQuantity(newQuantity);
                                addToCart({
                                  model,
                                  subcategory,
                                  category,
                                  selectedSpecs,
                                  selectedItem,
                                  selectedAddons: [],
                                  total: model.price,
                                  quantity: newQuantity,
                                  isUpdateOnly: true
                                });
                                setIsAdded(true);
                                setTimeout(() => setIsAdded(false), 2000);
                              }}
                              className="w-8 h-8 flex items-center justify-center rounded-md bg-background border border-border hover:bg-secondary transition-colors cursor-pointer"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {!!variantCode && (
                            <button
                              onClick={handleAddToCart}
                              disabled={isAdded || quantity === 0}
                              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all text-sm ${isAdded
                                ? "bg-green-600 text-white"
                                : "bg-secondary hover:bg-secondary/80 text-foreground cursor-pointer"
                                } disabled:opacity-50`}
                            >
                              <AnimatePresence mode="wait">
                                {isAdded ? (
                                  <motion.div
                                    key="check"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                  >
                                    <CheckCircle2 className="w-5 h-5" />
                                  </motion.div>
                                ) : (
                                  <motion.div
                                    key="cart"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                  >
                                    <ShoppingCart className="w-5 h-5" />
                                  </motion.div>
                                )}
                              </AnimatePresence>
                              <span className="font-semibold">
                                {isAdded ? "Added to Cart" : "Add to Cart"}
                              </span>
                            </button>
                          )}
                          <button
                            onClick={handleBuyNow}
                            disabled={quantity === 0}
                            className="flex-1 px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold text-sm cursor-pointer disabled:opacity-50"
                          >
                            Buy Now
                          </button>
                        </div>
                      </>
                    )}
                    <button className="w-full px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors text-sm cursor-pointer">
                      Request Quote
                    </button>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border space-y-1.5 text-[13px] text-muted-foreground">
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
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Draggable Mobile Settings Icon */}
        {!isMobileSummaryOpen && (
          <motion.div
            drag
            dragConstraints={{ top: 100, bottom: window.innerHeight - 200, left: 20, right: window.innerWidth - 60 }}
            dragElastic={0.1}
            dragMomentum={false}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed right-4 top-1/2 -translate-y-1/2 z-40 lg:hidden cursor-grab active:cursor-grabbing"
            style={{ touchAction: "none" }}
          >
            <button
              onClick={() => setIsMobileSummaryOpen(true)}
              className="w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-2xl shadow-primary/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
              aria-label="View Order Summary"
            >
              <Settings className="w-6 h-6 animate-[spin_4s_linear_infinite]" />
              <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-background rounded-full" />
            </button>
          </motion.div>
        )}

        {/* Mobile Settings Popup/Overlay */}
        <AnimatePresence>
          {isMobileSummaryOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileSummaryOpen(false)}
                className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 lg:hidden"
              />

              {/* Popup Card */}
              <motion.div
                initial={{ opacity: 0, y: "100%" }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed bottom-0 left-0 right-0 z-50 p-4 pb-8 lg:hidden"
              >
                <div className="bg-card border border-border/50 shadow-2xl rounded-2xl p-6 relative overflow-hidden">
                  {/* Decorative background glow */}
                  <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-primary/10 blur-3xl rounded-full pointer-events-none" />

                  <button
                    onClick={() => setIsMobileSummaryOpen(false)}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <h2 className="text-xl mb-4 flex items-center gap-2 font-medium">
                    <Shield className="w-5 h-5 text-primary" />
                    Summary & Price
                  </h2>

                  <div className="mb-4 pb-4 border-b border-border">
                    <div className="font-semibold text-xl mb-1 text-primary">{selectedItem ? selectedItem.description : model.name}</div>
                    <div className="text-sm font-mono text-muted-foreground mb-4">{selectedItem ? selectedItem.code : subcategory.name}</div>

                    <div
                      className="flex flex-wrap gap-2 max-h-[30vh] overflow-y-auto pr-2 pb-2 custom-scrollbar scroll-smooth"
                    >
                      {quickSpecs.filter(s => s.label !== "Base Price").map((spec, idx) => (
                        <div
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border bg-secondary/50 border-border/50"
                        >
                          <span className="text-[11px] uppercase tracking-wider text-muted-foreground">{spec.label}:</span>
                          <span className="text-xs font-mono font-medium">{spec.value}</span>
                        </div>
                      )
                      )}
                    </div>
                  </div>

                  <div className="space-y-4 mb-6 relative z-10">
                    {/* Base Price */}
                    <div className="flex justify-between pb-2">
                      <div className="text-sm text-muted-foreground font-medium">Base Price</div>
                      <div className="font-mono text-muted-foreground">${model.price.toLocaleString()}</div>
                    </div>

                    <div className="flex justify-between pt-3 border-t border-border/50 relative">
                      <div className="absolute left-0 bottom-0 w-full h-8 bg-primary/5 blur-xl pointer-events-none" />
                      <div>
                        <div className="text-sm text-foreground uppercase tracking-widest font-bold">
                          Total Price
                        </div>
                      </div>
                      <div className="text-3xl font-mono font-bold text-foreground">
                        ${model.price.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-3">
                    {!isConfirmed ? (
                      <button
                        onClick={() => setIsConfirmed(true)}
                        className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                        Confirm Configuration
                      </button>
                    ) : (
                      <>
                        <div className="flex items-center justify-between bg-secondary/30 p-2 rounded-lg border border-border">
                          <span className="text-sm font-medium px-2">Quantity</span>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => {
                                const newQuantity = Math.max(0, quantity - 1);
                                setQuantity(newQuantity);
                                if (newQuantity === 0 && !variantCode) {
                                  // if 0 and base model, do not attempt to add to cart
                                } else {
                                  addToCart({
                                    model,
                                    subcategory,
                                    category,
                                    selectedSpecs,
                                    selectedItem,
                                    selectedAddons: [],
                                    total: model.price,
                                    quantity: newQuantity,
                                    isUpdateOnly: true
                                  });
                                  setIsAdded(true);
                                  setTimeout(() => setIsAdded(false), 2000);
                                }
                              }}
                              className="w-8 h-8 flex items-center justify-center rounded-md bg-background border border-border hover:bg-secondary transition-colors cursor-pointer disabled:opacity-50"
                              disabled={quantity <= 0}
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-mono font-medium w-4 text-center">{quantity}</span>
                            <button
                              onClick={() => {
                                const newQuantity = quantity + 1;
                                setQuantity(newQuantity);
                                addToCart({
                                  model,
                                  subcategory,
                                  category,
                                  selectedSpecs,
                                  selectedItem,
                                  selectedAddons: [],
                                  total: model.price,
                                  quantity: newQuantity,
                                  isUpdateOnly: true
                                });
                                setIsAdded(true);
                                setTimeout(() => setIsAdded(false), 2000);
                              }}
                              className="w-8 h-8 flex items-center justify-center rounded-md bg-background border border-border hover:bg-secondary transition-colors cursor-pointer"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {!!variantCode && (
                            <button
                              onClick={(e) => {
                                handleAddToCart();
                                setTimeout(() => setIsMobileSummaryOpen(false), 2000);
                              }}
                              disabled={isAdded || quantity === 0}
                              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all text-sm ${isAdded
                                ? "bg-green-600 text-white"
                                : "bg-secondary hover:bg-secondary/80 text-foreground cursor-pointer"
                                } disabled:opacity-50`}
                            >
                              <AnimatePresence mode="wait">
                                {isAdded ? (
                                  <motion.div
                                    key="check"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                  >
                                    <CheckCircle2 className="w-5 h-5" />
                                  </motion.div>
                                ) : (
                                  <motion.div
                                    key="cart"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                  >
                                    <ShoppingCart className="w-5 h-5" />
                                  </motion.div>
                                )}
                              </AnimatePresence>
                              <span className="font-semibold">
                                {isAdded ? "Added to Cart" : "Add to Cart"}
                              </span>
                            </button>
                          )}
                          <button
                            onClick={handleBuyNow}
                            disabled={quantity === 0}
                            className="flex-1 px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold text-sm cursor-pointer disabled:opacity-50"
                          >
                            Buy Now
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}