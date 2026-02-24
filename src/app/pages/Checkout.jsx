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
} from "lucide-react";

export function Checkout() {
  const navigate = useNavigate();
  const [configuration, setConfiguration] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);

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

  const paymentMethod = watch("paymentMethod");

  useEffect(() => {
    const stored = sessionStorage.getItem("liftConfiguration");
    if (stored) {
      setConfiguration(JSON.parse(stored));
    } else {
      // Redirect if no configuration
      navigate("/categories");
    }
  }, [navigate]);

  const onSubmit = (data) => {
    // Store order data
    sessionStorage.setItem(
      "orderData",
      JSON.stringify({
        configuration,
        customerDetails: data,
        orderDate: new Date().toISOString(),
        orderNumber: `ELV-${Date.now()}`,
      })
    );
    navigate("/confirmation");
  };

  if (!configuration) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p>Loading...</p>
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

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center">
            {steps.map((step, idx) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${currentStep >= step.number
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border"
                    }`}
                >
                  <step.icon className="w-5 h-5" />
                  <span className="hidden md:inline text-sm">{step.title}</span>
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`w-12 h-0.5 mx-2 ${currentStep > step.number ? "bg-primary" : "bg-border"
                      }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Step 1: Configuration Summary */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-2xl mb-6 flex items-center gap-2">
                  <Package className="w-6 h-6" />
                  Configuration Summary
                </h2>

                {/* Selected Model */}
                <div className="mb-6 p-4 bg-secondary/30 rounded-lg">
                  <div className="flex gap-4">
                    <img
                      src={configuration.model.image}
                      alt={configuration.model.name}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div className="flex-1">
                      <div className="text-sm text-muted-foreground mb-1">
                        {configuration.category.name} → {configuration.subcategory.name}
                      </div>
                      <h3 className="text-xl mb-2">{configuration.model.name}</h3>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Capacity:</span>{" "}
                          {configuration.model.capacity}kg
                        </div>
                        <div>
                          <span className="text-muted-foreground">Speed:</span>{" "}
                          {configuration.model.speed}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Passengers:</span>{" "}
                          {configuration.model.passengers}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Selected Add-ons */}
                {configuration.selectedAddons.length > 0 && (
                  <div>
                    <h3 className="text-sm uppercase tracking-wide text-muted-foreground mb-3">
                      Selected Add-ons
                    </h3>
                    <div className="space-y-2">
                      {configuration.selectedAddons.map((addon) => (
                        <div
                          key={addon.id}
                          className="flex items-center justify-between p-3 bg-secondary/30 rounded"
                        >
                          <div>
                            <div className="font-medium">{addon.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {addon.category}
                            </div>
                          </div>
                          <div className="font-mono">+${addon.price.toLocaleString()}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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
                      {...register("firstName", { required: "First name is required" })}
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
                      {...register("lastName", { required: "Last name is required" })}
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
                        {...register("zipCode", { required: "ZIP code is required" })}
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
                  {paymentMethod === "quote" ? "Submit Quote Request" : "Continue to Payment"}
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl mb-6">Order Summary</h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between pb-4 border-b border-border">
                  <div>
                    <div className="font-medium">{configuration.model.name}</div>
                    <div className="text-sm text-muted-foreground">Base unit</div>
                  </div>
                  <div className="font-mono">
                    ${configuration.model.price.toLocaleString()}
                  </div>
                </div>

                {configuration.selectedAddons.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Add-ons:</div>
                    {configuration.selectedAddons.map((addon) => (
                      <div key={addon.id} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{addon.name}</span>
                        <span className="font-mono">+${addon.price.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex justify-between pt-4 border-t-2 border-primary">
                  <div className="text-sm uppercase tracking-wide">Total</div>
                  <div className="text-2xl font-mono">
                    ${configuration.total.toLocaleString()}
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
    </div>
  );
}