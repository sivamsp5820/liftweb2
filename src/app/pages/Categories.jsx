import { useState, useMemo, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { ArrowRight, LayoutGrid, List, Plus, Settings, Minus, Search } from "lucide-react";
import { liftCategories, liftSubcategories, liftModels } from "../data/lifts";
import { motion, AnimatePresence } from "motion/react";
import { useViewMode } from "../context/ViewModeContext";
import { useCart } from "../context/CartContext";

export function Categories() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const initialCategory = searchParams.get('category') || "all";
  const initialSubcategory = searchParams.get('subcategory') || "all";
  const initialDoorType = searchParams.get('doorType') || "all";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSubcategory, setSelectedSubcategory] = useState(initialSubcategory);
  const [selectedDoorType, setSelectedDoorType] = useState(initialDoorType);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedGroups, setExpandedGroups] = useState({}); // Track expanded groups
  const { viewMode, setViewMode } = useViewMode();
  const { cart, addToCart, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const toggleGroup = (groupId) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('category')) setSelectedCategory(params.get('category'));
    if (params.get('subcategory')) setSelectedSubcategory(params.get('subcategory'));
    if (params.get('doorType')) setSelectedDoorType(params.get('doorType'));
  }, [location.search]);

  const calculateDefaultSpecs = (model) => {
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

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory("all");
    setSelectedDoorType("all");
  };

  const handleSubcategoryClick = (subcategoryId) => {
    const subcat = liftSubcategories.find(s => s.id === subcategoryId);
    setSelectedCategory(subcat?.categoryId || "all");
    setSelectedSubcategory(subcategoryId);
    setSelectedDoorType("all");
  };

  const handleDoorTypeClick = (type) => {
    setSelectedDoorType(type);
    setSelectedCategory("doors");
    setSelectedSubcategory("all");
  };

  // Flatten products down to the item level (variants) if they exist
  const allProducts = useMemo(() => {
    const products = [];
    liftModels.forEach(model => {
      const subcat = liftSubcategories.find(s => s.id === model.subcategoryId);
      const category = liftCategories.find(c => c.id === subcat?.categoryId);

      if (model.items && model.items.length > 0) {
        model.items.forEach(item => {
          products.push({
            id: `${model.id} -${item.code} `,
            isItem: true,
            item,
            model,
            subcat,
            category
          });
        });
      } else {
        products.push({
          id: model.id,
          isItem: false,
          model,
          subcat,
          category
        });
      }
    });
    return products;
  }, []);

  // Filter the flattened products
  const displayedProducts = allProducts.filter(prod => {
    if (selectedDoorType !== "all") {
      if (!prod.model.specifications || prod.model.specifications.doorType !== selectedDoorType) {
        return false;
      }
    }
    if (selectedSubcategory !== "all") {
      if (prod.model.subcategoryId !== selectedSubcategory) return false;
    }
    if (selectedCategory !== "all") {
      if (prod.category?.id !== selectedCategory) return false;
    }
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      const name = prod.isItem ? (prod.item.description || "") : (prod.model.name || "");
      const code = prod.isItem ? (prod.item.code || "") : (prod.model.code || "");
      const desc = prod.isItem ? (prod.item.subDescription || "") : (prod.model.description || "");
      const searchStr = `${name} ${code} ${desc}`.toLowerCase();
      if (!searchStr.includes(query)) return false;
    }
    return true;
  });

  const getCartItem = (product) => {
    const defaultSpecs = calculateDefaultSpecs(product.model);
    return cart.find((i) =>
      i.model.id === product.model.id &&
      JSON.stringify(i.selectedSpecs) === JSON.stringify(defaultSpecs) &&
      (product.isItem ? i.selectedItem?.code === product.item.code : true)
    );
  };

  const DEFAULT_VISIBLE_COUNT = 3;
  const isAllProductsView = selectedCategory === "all" && selectedSubcategory === "all" && selectedDoorType === "all" && !searchQuery;

  const groupedProducts = useMemo(() => {
    if (!isAllProductsView) return [];
    return liftModels.map(model => {
      const prods = displayedProducts.filter(p => p.model?.id === model.id);
      return { id: model.id, name: model.name, products: prods };
    }).filter(group => group.products.length > 0);
  }, [displayedProducts, isAllProductsView]);

  const renderVisualProduct = (prod, index) => {
    const { model, item, isItem, subcat, category, id } = prod;
    const cartItem = getCartItem(prod);

    const targetUrl = isItem
      ? `/product/${model.id}?variant=${item.code}`
      : `/product/${model.id}`;

    const displayName = isItem ? item.description : model.name;
    const displayCode = isItem ? item.code : model.code;
    const displaySubDesc = isItem ? item.subDescription : model.description;

    return (
      <motion.div
        key={id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
      >
        <div
          onClick={() => navigate(targetUrl)}
          className="group flex flex-col h-full bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all cursor-pointer"
        >
          <div className="relative h-48 overflow-hidden bg-muted">
            <img
              src={model.image}
              alt={displayName}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs font-mono">
              {displayCode}
            </div>
          </div>
          <div className="p-5 flex flex-col flex-1">
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              {subcat?.name} {category?.id === 'doors' ? `(${model.specifications?.doorType || 'Doors'})` : ''}
            </div>
            <h3 className="text-lg font-medium mb-1 group-hover:text-primary transition-colors line-clamp-2">
              {displayName}
            </h3>
            <p className="text-xs font-mono text-muted-foreground line-clamp-2 mb-4">
              {displaySubDesc}
            </p>

            <div className="mt-auto flex justify-between items-center pt-4 border-t border-border">
              <span className="text-lg font-mono font-bold">${model.price.toLocaleString()}</span>

              <div className="flex items-center gap-2">
                {cartItem ? (
                  <div className="flex items-center gap-2 bg-secondary rounded-full p-1" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => {
                        if (cartItem.quantity > 1) updateQuantity(cartItem.cartId, -1);
                        else removeFromCart(cartItem.cartId);
                      }}
                      className="w-7 h-7 flex items-center justify-center bg-background hover:bg-destructive hover:text-destructive-foreground rounded-full transition-all flex-shrink-0"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-4 text-center text-xs font-medium">
                      {cartItem.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(cartItem.cartId, 1)}
                      className="w-7 h-7 flex items-center justify-center bg-primary text-primary-foreground hover:opacity-90 rounded-full transition-all flex-shrink-0"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      addToCart({
                        model,
                        subcategory: subcat,
                        category,
                        selectedSpecs: calculateDefaultSpecs(model),
                        selectedItem: isItem ? item : null,
                        selectedAddons: [],
                        total: model.price,
                      });
                    }}
                    className="w-9 h-9 flex items-center justify-center bg-secondary hover:bg-primary hover:text-primary-foreground rounded-full transition-all flex-shrink-0"
                    title="Add to Cart"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderTechnicalProduct = (prod, index) => {
    const { model, item, isItem, subcat, category, id } = prod;
    const cartItem = getCartItem(prod);

    const targetUrl = isItem
      ? `/product/${model.id}?variant=${item.code}`
      : `/product/${model.id}`;

    const displayName = isItem ? item.description : model.name;
    const displayCode = isItem ? item.code : model.code;
    const displaySubDesc = isItem ? item.subDescription : model.description;

    return (
      <motion.div
        key={id}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
        className="h-full"
      >
        <div
          onClick={() => navigate(targetUrl)}
          className="group flex flex-col h-full p-5 bg-card border border-border rounded-xl hover:border-primary/50 hover:shadow-xl transition-all cursor-pointer"
        >
          <div className="flex-1 text-left mb-4">
            <div className="text-[10px] text-primary uppercase tracking-[0.2em] font-bold mb-2">
              {subcat?.name} {category?.id === 'doors' ? `| ${model.specifications?.doorType || 'Doors'} ` : ''}
            </div>
            <h3 className="text-xl font-medium group-hover:text-primary transition-colors mb-4 line-clamp-2">
              {displayName}
            </h3>
            <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1 font-semibold">
              Specifications
            </div>
            <div className="text-xs font-mono text-muted-foreground line-clamp-2">
              ({displayCode} / {displaySubDesc})
            </div>
          </div>

          <div className="mt-auto flex items-center gap-4 justify-between w-full border-t border-border pt-4">
            <div className="text-left flex flex-col">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Price</span>
              <span className="text-lg font-mono font-bold">${model.price.toLocaleString()}</span>
            </div>

            {cartItem ? (
              <div className="flex items-center gap-2 bg-secondary rounded-full p-1" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => {
                    if (cartItem.quantity > 1) updateQuantity(cartItem.cartId, -1);
                    else removeFromCart(cartItem.cartId);
                  }}
                  className="w-8 h-8 flex items-center justify-center bg-background hover:bg-destructive hover:text-destructive-foreground rounded-full transition-all shadow-sm flex-shrink-0"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-4 text-center text-sm font-medium">
                  {cartItem.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(cartItem.cartId, 1)}
                  className="w-8 h-8 flex items-center justify-center bg-primary text-primary-foreground hover:opacity-90 rounded-full transition-all shadow-sm flex-shrink-0"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart({
                    model,
                    subcategory: subcat,
                    category,
                    selectedSpecs: calculateDefaultSpecs(model),
                    selectedItem: isItem ? item : null,
                    selectedAddons: [],
                    total: model.price,
                  });
                }}
                className="w-10 h-10 flex items-center justify-center bg-secondary hover:bg-primary hover:text-primary-foreground rounded-full transition-all shadow-sm flex-shrink-0"
                title="Add to Cart"
              >
                <Plus className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="w-full flex">
      {/* Sidebar Filter */}
      <aside className="w-64 min-h-screen bg-card border-r border-border p-6 flex-shrink-0">
        <div className="sticky top-24">
          <h2 className="text-xl font-medium mb-6">Explore Products</h2>
          <nav className="space-y-4">
            <div>
              <button
                onClick={() => handleCategoryClick("all")}
                className={`w - full text - left px - 4 py - 2 font - medium rounded - lg transition - colors ${selectedCategory === "all" && selectedSubcategory === "all" && selectedDoorType === "all"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  } `}
              >
                All Products
              </button>
            </div>

            {liftCategories.map(category => (
              <div key={category.id} className="space-y-1">
                <button
                  onClick={() => handleCategoryClick(category.id)}
                  className={`w - full text - left px - 4 py - 2 font - medium rounded - lg transition - colors ${selectedCategory === category.id && selectedSubcategory === "all" && selectedDoorType === "all"
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-secondary"
                    } `}
                >
                  {category.name}
                </button>
                <div className="pl-4 space-y-1 mt-1 flex flex-col items-start w-full">
                  {liftSubcategories.filter(s => s.categoryId === category.id).map(subcat => (
                    <button
                      key={subcat.id}
                      onClick={() => handleSubcategoryClick(subcat.id)}
                      className={`w - full text - left px - 4 py - 1.5 text - sm rounded - lg transition - colors ${selectedSubcategory === subcat.id
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                        } `}
                    >
                      {subcat.name}
                    </button>
                  ))}

                  {/* Append LD/CD Filters under Doors manually as requested */}
                  {category.id === 'doors' && (
                    <div className="mt-2 w-full pt-2 border-t border-border/50">
                      <div className="px-4 py-1 text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">
                        Door Types
                      </div>
                      <button
                        onClick={() => handleDoorTypeClick('Landing Door')}
                        className={`w - full text - left px - 4 py - 1.5 text - sm rounded - lg transition - colors ${selectedDoorType === 'Landing Door'
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                          } `}
                      >
                        LD (Landing Doors)
                      </button>
                      <button
                        onClick={() => handleDoorTypeClick('Car Door')}
                        className={`w - full text - left px - 4 py - 1.5 text - sm rounded - lg transition - colors ${selectedDoorType === 'Car Door'
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                          } `}
                      >
                        CD (Car Doors)
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full bg-background min-h-screen pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

          {/* Header & View Toggle */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h1 className="text-3xl md:text-5xl mb-2 tracking-tight">
                {selectedDoorType !== "all"
                  ? `${selectedDoorType} s`
                  : selectedSubcategory !== "all"
                    ? liftSubcategories.find(s => s.id === selectedSubcategory)?.name
                    : selectedCategory !== "all"
                      ? liftCategories.find(c => c.id === selectedCategory)?.name
                      : "All Products"}
              </h1>
              <p className="text-muted-foreground">
                Showing {displayedProducts.length} items
              </p>
            </div>

            <div className="flex-1 w-full max-w-xl mx-auto md:px-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name, code, or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-secondary/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground"
                />
              </div>
            </div>

            <div className="flex self-start md:self-auto flex-shrink-0">
              {(() => {
                const firstModel = displayedProducts.length > 0 ? displayedProducts[0].model : null;
                const customConfigUrl = firstModel ? `/product/${firstModel.id}` : "#";

                return (
                  <Link
                    to={customConfigUrl}
                    className={`px-6 py-2.5 font-semibold rounded-lg transition-opacity flex items-center gap-2 shadow-sm ${firstModel
                      ? "bg-primary text-primary-foreground hover:opacity-90"
                      : "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                      }`}
                    onClick={(e) => {
                      if (!firstModel) e.preventDefault();
                    }}
                  >
                    <Settings className="w-4 h-4" />
                    New Custom Configuration
                  </Link>
                );
              })()}
            </div>
          </div>

          {/* Product Grid */}
          <AnimatePresence mode="wait">
            {isAllProductsView ? (
              <motion.div
                key="grouped"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-12"
              >
                {groupedProducts.map((group) => (
                  <div key={group.id} className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                      <h2 className="text-2xl font-semibold tracking-tight">{group.name}</h2>
                      <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full">
                        {group.products.length} {group.products.length === 1 ? 'Product' : 'Products'}
                      </span>
                    </div>

                    {viewMode === 'visual' ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                        {(expandedGroups[group.id] ? group.products : group.products.slice(0, DEFAULT_VISIBLE_COUNT)).map((prod, index) => renderVisualProduct(prod, index))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                        {(expandedGroups[group.id] ? group.products : group.products.slice(0, DEFAULT_VISIBLE_COUNT)).map((prod, index) => renderTechnicalProduct(prod, index))}
                      </div>
                    )}

                    {group.products.length > DEFAULT_VISIBLE_COUNT && (
                      <div className="mt-8 flex justify-end">
                        <button
                          onClick={() => toggleGroup(group.id)}
                          className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap"
                        >
                          {expandedGroups[group.id] ? "Show Less" : "See More"}
                          <ArrowRight className={`w-4 h-4 transition-transform ${expandedGroups[group.id] ? '-rotate-90' : 'rotate-90'}`} />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </motion.div>
            ) : viewMode === 'visual' ? (
              <div className="space-y-8">
                <motion.div
                  key="visual"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                  {(expandedGroups['single-view'] ? displayedProducts : displayedProducts.slice(0, DEFAULT_VISIBLE_COUNT)).map((prod, index) => renderVisualProduct(prod, index))}
                </motion.div>

                {displayedProducts.length > DEFAULT_VISIBLE_COUNT && (
                  <div className="flex justify-end mt-8">
                    <button
                      onClick={() => toggleGroup('single-view')}
                      className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap"
                    >
                      {expandedGroups['single-view'] ? "Show Less" : "See More"}
                      <ArrowRight className={`w-4 h-4 transition-transform ${expandedGroups['single-view'] ? '-rotate-90' : 'rotate-90'}`} />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-8">
                <motion.div
                  key="technical"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
                >
                  {(expandedGroups['single-view'] ? displayedProducts : displayedProducts.slice(0, DEFAULT_VISIBLE_COUNT)).map((prod, index) => renderTechnicalProduct(prod, index))}
                </motion.div>

                {displayedProducts.length > DEFAULT_VISIBLE_COUNT && (
                  <div className="flex justify-end mt-8">
                    <button
                      onClick={() => toggleGroup('single-view')}
                      className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap"
                    >
                      {expandedGroups['single-view'] ? "Show Less" : "See More"}
                      <ArrowRight className={`w-4 h-4 transition-transform ${expandedGroups['single-view'] ? '-rotate-90' : 'rotate-90'}`} />
                    </button>
                  </div>
                )}
              </div>
            )}
          </AnimatePresence>

          {displayedProducts.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-muted-foreground text-lg">No products found for this selection.</p>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
