import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Package,
  MapPin,
  User,
  Mail,
  Phone,
  Building2,
  CreditCard,
  FileText,
  CheckCircle2,
  Plus,
  Minus,
  Trash2,
  ChevronDown,
} from "lucide-react";

import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "motion/react";

export function Checkout() {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart, updateQuantity, removeFromCart } = useCart();
  const [expandedItems, setExpandedItems] = useState(new Set());

  const toggleExpand = (cartId) => {
    setExpandedItems(prev => {
      const next = new Set(prev);
      if (next.has(cartId)) next.delete(cartId);
      else next.add(cartId);
      return next;
    });
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      paymentMethod: "quote",
      country: "United States",
    },
  });

  const formData = watch();

  const isStepCompleted = (stepNumber) => {
    if (stepNumber === 1) return cart.length > 0;
    if (stepNumber === 2) {
      return !!(formData.firstName && formData.lastName && formData.email && formData.phone);
    }
    if (stepNumber === 3) {
      return !!(formData.street && formData.city && formData.state && formData.zipCode && formData.country && formData.buildingFloors);
    }
    if (stepNumber === 4) {
      return !!formData.paymentMethod;
    }
    return false;
  };

  useEffect(() => {
    if (cart.length === 0) {
      // If no items in cart, and not loading, redirect
      const timer = setTimeout(() => {
        if (cart.length === 0) navigate("/categories");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [cart, navigate]);

  const onSubmit = (data) => {
    // Store order data
    sessionStorage.setItem(
      "orderData",
      JSON.stringify({
        cart,
        customerDetails: data,
        total: cartTotal,
        orderDate: new Date().toISOString(),
        orderNumber: `ELV-${Date.now()}`,
      })
    );
    clearCart();
    navigate("/confirmation");
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p>Loading configuration...</p>
      </div>
    );
  }

  const steps = [
    { number: 1, title: "Review Configuration", icon: Package },
    { number: 2, title: "Customer Details", icon: User },
    { number: 3, title: "Installation Address", icon: MapPin },
    { number: 4, title: "Quote/Payment", icon: CreditCard },
  ];

  return (
    <div className="w-full bg-secondary/30 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl mb-4">Checkout</h1>
          <p className="text-muted-foreground">
            Complete your lift system order
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 items-start">
          {/* Mobile Progress Stepper */}
          <div className="lg:hidden mb-12">
            <div className="flex items-center justify-center gap-2">
              {steps.map((step, idx) => {
                const completed = isStepCompleted(step.number);
                return (
                  <div key={step.number} className="flex items-center">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-500 ${completed
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-card border border-border text-muted-foreground opacity-50"
                        }`}
                    >
                      <step.icon className="w-4 h-4" />
                    </div>
                    {idx < steps.length - 1 && (
                      <div
                        className={`w-4 h-0.5 mx-1 transition-colors duration-500 ${isStepCompleted(step.number + 1) ? "bg-primary" : "bg-border"
                          }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Vertical Progress Side-rail (Desktop) */}
          <div className="lg:col-span-1 hidden lg:block sticky top-24">
            <div className="relative">
              {/* Vertical Connector Line Base */}
              <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-border/50" />

              <div className="space-y-16">
                {steps.map((step, idx) => {
                  const completed = isStepCompleted(step.number);
                  const isNextCompleted = idx < steps.length - 1 && isStepCompleted(steps[idx + 1].number);

                  return (
                    <div key={step.number} className="relative flex items-center gap-6 group">
                      {/* Active Connector Segment */}
                      {idx < steps.length - 1 && isNextCompleted && (
                        <div className="absolute left-[23px] top-12 h-16 w-0.5 bg-primary z-10 transition-all duration-700" />
                      )}

                      <div
                        className={`relative z-20 flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-500 shadow-sm ${completed
                          ? "bg-primary text-primary-foreground scale-110 shadow-primary/20"
                          : "bg-card border border-border text-muted-foreground"
                          }`}
                      >
                        <step.icon className="w-5 h-5" />
                        {completed && step.number !== 4 && (
                          <div className="absolute -right-1 -top-1 bg-background rounded-full p-0.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col">
                        <span className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-colors duration-500 ${completed ? "text-primary" : "text-muted-foreground/40"
                          }`}>
                          Section {step.number}
                        </span>
                        <span className={`text-sm font-semibold transition-colors duration-500 ${completed ? "text-foreground" : "text-muted-foreground/60"
                          }`}>
                          {step.title}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Configuration Summary - Now Multi-item */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-2xl mb-6 flex items-center gap-2">
                  <Package className="w-6 h-6" />
                  Order Review
                </h2>

                <div className="space-y-6">
                  {cart.map((item) => (
                    <div key={item.cartId} className="p-4 bg-secondary/30 rounded-lg border border-border/50">
                      <div className="flex gap-4">
                        <img
                          src={item.model.image}
                          alt={item.model.name}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-1">
                            <div>
                              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                                {item.category.name} → {item.subcategory.name}
                              </div>
                              <h3 className="text-lg font-semibold truncate">{item.model.name}</h3>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-mono font-bold mb-2">${(item.total * item.quantity).toLocaleString()}</div>
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.cartId, -1)}
                                  className="p-1 hover:bg-secondary rounded border border-border"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="text-xs font-mono font-bold w-4 text-center">{item.quantity}</span>
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.cartId, 1)}
                                  className="p-1 hover:bg-secondary rounded border border-border"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => removeFromCart(item.cartId)}
                                  className="ml-2 p-1 text-muted-foreground hover:text-destructive transition-colors"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="mt-4">
                            <button
                              type="button"
                              onClick={() => toggleExpand(item.cartId)}
                              className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-primary font-bold hover:opacity-80 transition-opacity"
                            >
                              <span>{expandedItems.has(item.cartId) ? "Hide Details" : "View Details"}</span>
                              <ChevronDown className={`w-2.5 h-2.5 transition-transform duration-300 ${expandedItems.has(item.cartId) ? "rotate-180" : ""}`} />
                            </button>

                            <AnimatePresence>
                              {expandedItems.has(item.cartId) && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden"
                                >
                                  <div className="bg-background/50 rounded p-3 mt-3 border border-border/30">
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2">
                                      {Object.entries(item.selectedSpecs).map(([key, val]) => (
                                        <div key={key} className="flex flex-col min-w-0">
                                          <span className="text-[11px] uppercase tracking-tight text-muted-foreground/60 font-medium truncate">
                                            {key}
                                          </span>
                                          <span className="text-sm font-bold text-foreground/80 truncate">
                                            {val}
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 2: Customer Details */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-2xl mb-6 flex items-center gap-2">
                  <User className="w-6 h-6" />
                  Customer Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2">
                      First Name <span className="text-destructive">*</span>
                    </label>
                    <input
                      {...register("firstName", {
                        required: "First name is required",
                        pattern: {
                          value: /^[A-Za-z\s'-]+$/,
                          message: "Invalid characters in name"
                        }
                      })}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {errors.firstName && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm mb-2">
                      Last Name <span className="text-destructive">*</span>
                    </label>
                    <input
                      {...register("lastName", {
                        required: "Last name is required",
                        pattern: {
                          value: /^[A-Za-z\s'-]+$/,
                          message: "Invalid characters in name"
                        }
                      })}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {errors.lastName && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm mb-2">
                      Email <span className="text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                        className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm mb-2">
                      Phone <span className="text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="tel"
                        {...register("phone", { required: "Phone is required" })}
                        className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm mb-2">Company Name (Optional)</label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        {...register("company")}
                        className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Installation Address */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-2xl mb-6 flex items-center gap-2">
                  <MapPin className="w-6 h-6" />
                  Installation Address
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm mb-2">
                      Street Address <span className="text-destructive">*</span>
                    </label>
                    <input
                      {...register("street", { required: "Street address is required" })}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {errors.street && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.street.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-2">
                        City <span className="text-destructive">*</span>
                      </label>
                      <input
                        {...register("city", { required: "City is required" })}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      {errors.city && (
                        <p className="text-destructive text-sm mt-1">
                          {errors.city.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm mb-2">
                        State/Province <span className="text-destructive">*</span>
                      </label>
                      <input
                        {...register("state", { required: "State is required" })}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      {errors.state && (
                        <p className="text-destructive text-sm mt-1">
                          {errors.state.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm mb-2">
                        ZIP/Postal Code <span className="text-destructive">*</span>
                      </label>
                      <input
                        {...register("zipCode", {
                          required: "ZIP code is required",
                          pattern: {
                            value: /^[0-9A-Za-z\s-]+$/i,
                            message: "Invalid ZIP code"
                          }
                        })}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      {errors.zipCode && (
                        <p className="text-destructive text-sm mt-1">
                          {errors.zipCode.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm mb-2">
                        Country <span className="text-destructive">*</span>
                      </label>
                      <input
                        {...register("country", { required: "Country is required" })}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      {errors.country && (
                        <p className="text-destructive text-sm mt-1">
                          {errors.country.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm mb-2">
                      Number of Building Floors <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="number"
                      {...register("buildingFloors", {
                        required: "Number of floors is required",
                      })}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="e.g., 5"
                    />
                    {errors.buildingFloors && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.buildingFloors.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Step 4: Quote/Payment */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-2xl mb-6 flex items-center gap-2">
                  <CreditCard className="w-6 h-6" />
                  Quote or Payment
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm mb-4">
                      Choose your preferred option:
                    </label>
                    <div className="space-y-3">
                      <label className="flex items-start gap-3 p-4 border-2 border-border rounded-lg cursor-pointer hover:bg-secondary/30 transition-colors">
                        <input
                          type="radio"
                          value="quote"
                          {...register("paymentMethod")}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="font-medium mb-1">Request Detailed Quote</div>
                          <div className="text-sm text-muted-foreground">
                            Our sales team will contact you with a customized quote including
                            installation, permits, and timeline.
                          </div>
                        </div>
                      </label>

                      <label className="flex items-start gap-3 p-4 border-2 border-border rounded-lg cursor-pointer hover:bg-secondary/30 transition-colors">
                        <input
                          type="radio"
                          value="payment"
                          {...register("paymentMethod")}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="font-medium mb-1">Proceed to Payment</div>
                          <div className="text-sm text-muted-foreground">
                            Pay 30% deposit now to reserve your order. Remaining balance due
                            before installation.
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm mb-2">
                      <FileText className="inline w-4 h-4 mr-2" />
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      {...register("notes")}
                      rows={4}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      placeholder="Any special requirements, preferred installation timeline, or questions..."
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-8 py-4 border border-border rounded-lg hover:bg-secondary transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                >
                  {formData.paymentMethod === "quote" ? "Submit Quote Request" : "Continue to Payment"}
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl mb-6">Order Summary</h3>

              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.cartId} className="flex justify-between items-center text-sm pb-2 border-b border-border/50">
                    <div className="flex-1 min-w-0 pr-4">
                      <div className="font-medium truncate">{item.model.name}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.cartId, -1)}
                          className="p-0.5 hover:bg-secondary rounded"
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className="text-[10px] font-mono leading-none">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.cartId, 1)}
                          className="p-0.5 hover:bg-secondary rounded"
                        >
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </div>
                    <div className="font-mono text-right">
                      <div className="leading-none">${(item.total * item.quantity).toLocaleString()}</div>
                    </div>
                  </div>
                ))}

                <div className="flex justify-between pt-4 border-t-2 border-primary">
                  <div>
                    <div className="text-sm font-bold uppercase tracking-wider">
                      Total Amount
                    </div>
                  </div>
                  <div className="text-2xl font-mono font-bold">${cartTotal.toLocaleString()}</div>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-primary" />
                <span>Price includes base installation</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-primary" />
                <span>5-year warranty</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-primary" />
                <span>Free first-year maintenance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}