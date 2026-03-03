import { liftCategories, liftSubcategories } from "../data/lifts";

export function CategorySidebar({
    selectedCategory,
    selectedSubcategory,
    selectedDoorType,
    onCategoryClick,
    onSubcategoryClick,
    onDoorTypeClick
}) {
    return (
        <aside className="w-64 min-h-[calc(100vh-4rem)] bg-card border-r border-border p-6 flex-shrink-0 hidden md:block">
            <div className="sticky top-24">
                <h2 className="text-xl font-medium mb-6">Explore Products</h2>
                <nav className="space-y-4">
                    <div>
                        <button
                            onClick={() => onCategoryClick("all")}
                            className={`w-full text-left px-4 py-2 font-medium rounded-lg transition-colors ${selectedCategory === "all" && selectedSubcategory === "all" && selectedDoorType === "all"
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                                }`}
                        >
                            All Products
                        </button>
                    </div>

                    {liftCategories.map(category => (
                        <div key={category.id} className="space-y-1">
                            <button
                                onClick={() => onCategoryClick(category.id)}
                                className={`w-full text-left px-4 py-2 font-medium rounded-lg transition-colors ${selectedCategory === category.id && selectedSubcategory === "all" && selectedDoorType === "all"
                                        ? "bg-primary text-primary-foreground"
                                        : "text-foreground hover:bg-secondary"
                                    }`}
                            >
                                {category.name}
                            </button>
                            <div className="pl-4 space-y-1 mt-1 flex flex-col items-start w-full">
                                {liftSubcategories.filter(s => s.categoryId === category.id).map(subcat => (
                                    <button
                                        key={subcat.id}
                                        onClick={() => onSubcategoryClick(subcat.id)}
                                        className={`w-full text-left px-4 py-1.5 text-sm rounded-lg transition-colors ${selectedSubcategory === subcat.id
                                                ? "bg-primary/10 text-primary font-medium"
                                                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                                            }`}
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
                                            onClick={() => onDoorTypeClick('Landing Door')}
                                            className={`w-full text-left px-4 py-1.5 text-sm rounded-lg transition-colors ${selectedDoorType === 'Landing Door'
                                                    ? "bg-primary/10 text-primary font-medium"
                                                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                                                }`}
                                        >
                                            LD (Landing Doors)
                                        </button>
                                        <button
                                            onClick={() => onDoorTypeClick('Car Door')}
                                            className={`w-full text-left px-4 py-1.5 text-sm rounded-lg transition-colors ${selectedDoorType === 'Car Door'
                                                    ? "bg-primary/10 text-primary font-medium"
                                                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                                                }`}
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
    );
}
