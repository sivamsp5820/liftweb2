import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  CheckCircle,
  Download,
  Mail,
  Phone,
  Calendar,
  Package,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { motion } from "motion/react";

export function OrderConfirmation() {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("orderData");
    if (stored) {
      setOrderData(JSON.parse(stored));
    } else {
      // Redirect if no order data
      navigate("/categories");
    }
  }, [navigate]);

  if (!orderData) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p>Loading...</p>
      </div>
    );
  }

  const { configuration, customerDetails, orderNumber, orderDate } = orderData;
  const isQuoteRequest = customerDetails.paymentMethod === "quote";

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center">
            <CheckCircle className="w-16 h-16 text-primary-foreground" />
          </div>
        </motion.div>

        {/* Main Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl mb-4">
            {isQuoteRequest ? "Quote Request Received!" : "Order Confirmed!"}
          </h1>
          <p className="text-lg text-muted-foreground">
            {isQuoteRequest
              ? "Our sales team will contact you within 24 hours with your detailed quote."
              : "Thank you for your order. We'll begin processing it immediately."}
          </p>
        </motion.div>

        {/* Order Number */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-lg p-6 mb-8 text-center"
        >
          <div className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
            {isQuoteRequest ? "Reference Number" : "Order Number"}
          </div>
          <div className="text-3xl font-mono mb-4">{orderNumber}</div>
          <div className="text-sm text-muted-foreground">
            {new Date(orderDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </motion.div>

        {/* Configuration Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card border border-border rounded-lg p-6 mb-8"
        >
          <h2 className="text-xl mb-6 flex items-center gap-2">
            <Package className="w-5 h-5" />
            Your Configuration
          </h2>

          <div className="space-y-6">
            {/* Model */}
            <div className="flex gap-4 pb-6 border-b border-border">
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
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Capacity:</span>{" "}
                    {configuration.model.capacity}kg
                  </div>
                  <div>
                    <span className="text-muted-foreground">Speed:</span>{" "}
                    {configuration.model.speed}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono text-lg">
                  ${configuration.model.price.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Add-ons */}
            {configuration.selectedAddons.length > 0 && (
              <div className="pb-6 border-b border-border">
                <h3 className="text-sm uppercase tracking-wide text-muted-foreground mb-3">
                  Add-ons
                </h3>
                <div className="space-y-2">
                  {configuration.selectedAddons.map((addon) => (
                    <div key={addon.id} className="flex justify-between">
                      <span>{addon.name}</span>
                      <span className="font-mono">+${addon.price.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Total */}
            <div className="flex justify-between items-center">
              <div className="text-lg">Total</div>
              <div className="text-3xl font-mono">${configuration.total.toLocaleString()}</div>
            </div>
          </div>
        </motion.div>

        {/* Customer & Installation Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          {/* Customer Details */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Contact Information
            </h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-muted-foreground">Name:</span>{" "}
                {customerDetails.firstName} {customerDetails.lastName}
              </div>
              <div>
                <span className="text-muted-foreground">Email:</span>{" "}
                {customerDetails.email}
              </div>
              <div>
                <span className="text-muted-foreground">Phone:</span>{" "}
                {customerDetails.phone}
              </div>
              {customerDetails.company && (
                <div>
                  <span className="text-muted-foreground">Company:</span>{" "}
                  {customerDetails.company}
                </div>
              )}
            </div>
          </div>

          {/* Installation Address */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Installation Address
            </h3>
            <div className="space-y-1 text-sm">
              <div>{customerDetails.street}</div>
              <div>
                {customerDetails.city}, {customerDetails.state} {customerDetails.zipCode}
              </div>
              <div>{customerDetails.country}</div>
              <div className="mt-2 pt-2 border-t border-border">
                <span className="text-muted-foreground">Building Floors:</span>{" "}
                {customerDetails.buildingFloors}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-primary text-primary-foreground rounded-lg p-6 mb-8"
        >
          <h3 className="text-xl mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            What Happens Next?
          </h3>
          <div className="space-y-3">
            {isQuoteRequest ? (
              <>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-foreground text-primary rounded-full flex items-center justify-center">
                    1
                  </div>
                  <div>
                    <div className="font-medium">Initial Contact (24 hours)</div>
                    <div className="text-sm text-primary-foreground/80">
                      Our sales representative will reach out to discuss your requirements
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-foreground text-primary rounded-full flex items-center justify-center">
                    2
                  </div>
                  <div>
                    <div className="font-medium">Site Assessment (3-5 days)</div>
                    <div className="text-sm text-primary-foreground/80">
                      Technical team evaluates installation requirements
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-foreground text-primary rounded-full flex items-center justify-center">
                    3
                  </div>
                  <div>
                    <div className="font-medium">Detailed Quote (7-10 days)</div>
                    <div className="text-sm text-primary-foreground/80">
                      Comprehensive quote with timeline and payment terms
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-foreground text-primary rounded-full flex items-center justify-center">
                    1
                  </div>
                  <div>
                    <div className="font-medium">Order Processing (1-2 days)</div>
                    <div className="text-sm text-primary-foreground/80">
                      Verification and documentation preparation
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-foreground text-primary rounded-full flex items-center justify-center">
                    2
                  </div>
                  <div>
                    <div className="font-medium">Manufacturing (6-8 weeks)</div>
                    <div className="text-sm text-primary-foreground/80">
                      Custom fabrication and quality testing
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-foreground text-primary rounded-full flex items-center justify-center">
                    3
                  </div>
                  <div>
                    <div className="font-medium">Installation (2-3 weeks)</div>
                    <div className="text-sm text-primary-foreground/80">
                      Professional installation and certification
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={() => window.print()}
            className="flex items-center justify-center gap-2 px-6 py-3 border border-border rounded-lg hover:bg-secondary transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download Confirmation</span>
          </button>
          <Link
            to="/categories"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            <span>Browse More Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Support Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center text-sm text-muted-foreground"
        >
          <p className="mb-2">Questions about your order?</p>
          <div className="flex items-center justify-center gap-4">
            <a href="mailto:sales@elevate.com" className="flex items-center gap-2 hover:text-foreground">
              <Mail className="w-4 h-4" />
              sales@elevate.com
            </a>
            <span>•</span>
            <a href="tel:+15551234567" className="flex items-center gap-2 hover:text-foreground">
              <Phone className="w-4 h-4" />
              +1 (555) 123-4567
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}