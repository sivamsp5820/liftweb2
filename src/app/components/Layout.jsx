import { Outlet, Link, useLocation } from "react-router";
import { Building2, ShoppingCart, Menu, X, User } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";

export function Layout() {
  const { cartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-border">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-mono tracking-tight uppercase">ELEVATE</span>
                <span className="text-[10px] text-muted-foreground tracking-widest uppercase">Lift Systems</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                to="/"
                className={`text-sm tracking-wide uppercase transition-colors ${isActive("/") ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                Home
              </Link>
              <Link
                to="/categories"
                className={`text-sm tracking-wide uppercase transition-colors ${isActive("/categories") ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                Products
              </Link>
              <Link
                to="/cart"
                className="relative flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="text-sm font-semibold">Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white font-bold animate-in zoom-in duration-300">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link
                to="/auth"
                className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
              >
                <User className="w-4 h-4" />
                <span className="text-sm font-semibold">Sign In</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border">
              <div className="flex flex-col gap-4">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm tracking-wide uppercase transition-colors ${isActive("/") ? "text-primary" : "text-muted-foreground"
                    }`}
                >
                  Home
                </Link>
                <Link
                  to="/categories"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm tracking-wide uppercase transition-colors ${isActive("/categories") ? "text-primary" : "text-muted-foreground"
                    }`}
                >
                  Products
                </Link>
                <Link
                  to="/cart"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg justify-center relative"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span className="text-sm font-semibold">Cart ({cartCount})</span>
                </Link>
                <Link
                  to="/auth"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg justify-center relative mt-2"
                >
                  <User className="w-5 h-5" />
                  <span className="text-sm font-semibold">Sign In / Sign Up</span>
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="w-6 h-6" />
                <span className="font-mono tracking-tight uppercase">ELEVATE</span>
              </div>
              <p className="text-sm text-primary-foreground/80">
                Engineering vertical transportation solutions since 1985.
              </p>
            </div>
            <div>
              <h3 className="text-sm uppercase tracking-wide mb-4">Products</h3>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li>Residential Lifts</li>
                <li>Commercial Lifts</li>
                <li>Industrial Lifts</li>
                <li>Medical Lifts</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm uppercase tracking-wide mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li>Documentation</li>
                <li>Maintenance</li>
                <li>Warranty</li>
                <li>Contact Us</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm uppercase tracking-wide mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li>+1 (555) 123-4567</li>
                <li>info@elevate.com</li>
                <li>123 Industrial Ave</li>
                <li>New York, NY 10001</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-center text-sm text-primary-foreground/60">
            <p>&copy; 2026 ELEVATE Lift Systems. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
