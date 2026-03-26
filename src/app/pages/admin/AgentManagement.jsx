import React, { useState, useMemo } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Plus, Search, Filter, Eye, X, Calendar, DollarSign, FileText, User, MapPin, Package, Clock, AlertCircle, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const TEMP_ORDERS = [
    {
        id: "1",
        deliveryTerm: "DAP",
        projectSmi: "IND-SMALL & MEDIUM INSTALLERS",
        merge: "SO0000162STEL_LD4",
        specialReferenceA: "",
        orderType: "Order Cancelled",
        soNo: "SO0000162",
        customerOrderNo: "IBRH240125-1",
        customer: "AVANI CORPORATION",
        region: "ER",
        salePerson: "Simanta Sinha",
        itemCode: "STEL_LD",
        itemDescription: "STEL LD 01C 700x20 00304 FVP",
        qty: 4,
        customerPoDate: "2025-02-05",
        orderDate: "2025-01-30",
        customerReqDate: "2025-02-12",
        soReleaseDate: "2025-02-05",
        givenToPlanningDate: "2025-02-06",
        plannedDeliveryDate: "", 
        ageingOrderToSoRelease: 5,
        productLineNumber: "",
        dispatchDate: "",
        revisedCommitmentDate: "",
        productionCompletedOn: "2025-02-10",
        ageingSoReleaseToSchedule: 0,
        productionMoNumber: "M00010004",
        ageingAfterProduction: 409,
        ageingOrderToMaterialReadiness: 10,
        ageingFcToSchedule: 413,
        division: "D",
        product: "STELLAR-ECO",
        plant: "P1",
        price: 24850.00,
        amount: 86000.00,
        status: "Cancelled",
        visibility: "",
        remarks: "Need to rebook the order",
        financeClearanceDate: "",
        dispatchPlannedDate: "",
        specialRemarks: "",
        reasonForDelay: "",
        remarksOnDelay: "",
        leadtime: 7,
        checkForLeadTime: 7,
        poToSo: "S",
        orderEfficiency: "STELLAR-ECOS",
        productVariantMapping: "-1",
        invoiceCheck: "",
        productionOrderCheck1: "NA",
        planDate: "",
        productionOrderStatusCheck3: "",
        finCheck: "NA",
        checkInvoiceDuplicate: "SO0000162"
    },
    {
        id: "2",
        deliveryTerm: "EXW",
        projectSmi: "IND-LARGE INSTALLERS",
        merge: "SO0000163STEL_LD2",
        specialReferenceA: "REF-001",
        orderType: "Standard Order",
        soNo: "SO0000163",
        customerOrderNo: "IBRH240126-2",
        customer: "XYZ CORP",
        region: "NR",
        salePerson: "Amit Kumar",
        itemCode: "STEL_HD",
        itemDescription: "STEL HD 02C 800x20 00405 FVP",
        qty: 10,
        customerPoDate: "2025-02-06",
        orderDate: "2025-02-01",
        customerReqDate: "2025-02-20",
        soReleaseDate: "2025-02-07",
        givenToPlanningDate: "2025-02-08",
        plannedDeliveryDate: "2025-02-18",
        ageingOrderToSoRelease: 6,
        productLineNumber: "PL-001",
        dispatchDate: "2025-02-15",
        revisedCommitmentDate: "2025-02-16",
        productionCompletedOn: "2025-02-14",
        ageingSoReleaseToSchedule: 2,
        productionMoNumber: "M00010005",
        ageingAfterProduction: 5,
        ageingOrderToMaterialReadiness: 14,
        ageingFcToSchedule: 5,
        division: "C",
        product: "STELLAR-PRO",
        plant: "P2",
        price: 35000.00,
        amount: 350000.00,
        status: "Delivered",
        visibility: "High",
        remarks: "Urgent dispatch",
        financeClearanceDate: "2025-02-12",
        dispatchPlannedDate: "2025-02-14",
        specialRemarks: "Handle with care",
        reasonForDelay: "",
        remarksOnDelay: "",
        leadtime: 14,
        checkForLeadTime: 14,
        poToSo: "M",
        orderEfficiency: "STELLAR-PRO",
        productVariantMapping: "1",
        invoiceCheck: "INV-001",
        productionOrderCheck1: "OK",
        planDate: "2025-02-08",
        productionOrderStatusCheck3: "Completed",
        finCheck: "Approved",
        checkInvoiceDuplicate: "SO0000163"
    },
    {
        id: "3",
        deliveryTerm: "FOB",
        projectSmi: "INTERNATIONAL-01",
        merge: "SO0000164STEL_LD5",
        specialReferenceA: "NA",
        orderType: "Export Order",
        soNo: "SO0000164",
        customerOrderNo: "IBRH240127-3",
        customer: "ACME LTD",
        region: "SR",
        salePerson: "Rahul Singh",
        itemCode: "STEL_MD",
        itemDescription: "STEL MD 01C 600x20 00204 FVP",
        qty: 2,
        customerPoDate: "2025-02-08",
        orderDate: "2025-02-03",
        customerReqDate: "2025-02-28",
        soReleaseDate: "2025-02-10",
        givenToPlanningDate: "2025-02-11",
        plannedDeliveryDate: "2025-02-25",
        ageingOrderToSoRelease: 7,
        productLineNumber: "PL-002",
        dispatchDate: "",
        revisedCommitmentDate: "",
        productionCompletedOn: "",
        ageingSoReleaseToSchedule: 4,
        productionMoNumber: "M00010006",
        ageingAfterProduction: 0,
        ageingOrderToMaterialReadiness: 5,
        ageingFcToSchedule: 10,
        division: "B",
        product: "STELLAR-MID",
        plant: "P1",
        price: 18000.00,
        amount: 36000.00,
        status: "Processing",
        visibility: "Medium",
        remarks: "Pending materials",
        financeClearanceDate: "2025-02-15",
        dispatchPlannedDate: "2025-02-24",
        specialRemarks: "Notify customer before dispatch",
        reasonForDelay: "Material shortage",
        remarksOnDelay: "Expected arrival next week",
        leadtime: 21,
        checkForLeadTime: 21,
        poToSo: "S",
        orderEfficiency: "STELLAR-MIDS",
        productVariantMapping: "0",
        invoiceCheck: "",
        productionOrderCheck1: "Pending",
        planDate: "2025-02-12",
        productionOrderStatusCheck3: "In Progress",
        finCheck: "Pending",
        checkInvoiceDuplicate: "SO0000164"
    }
];

export function AgentManagement() {
    const [orders, setOrders] = useState(TEMP_ORDERS);
    const [editOrder, setEditOrder] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    const filteredOrders = useMemo(() => {
        return orders.filter(o => 
            (statusFilter === 'All' || o.status === statusFilter) &&
            (o.soNo.toLowerCase().includes(searchQuery.toLowerCase()) || 
             o.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
             o.product.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }, [orders, searchQuery, statusFilter]);

    const handleUpdateField = (field, value) => {
        setEditOrder(prev => ({ ...prev, [field]: value }));
    };

    const handleSaveOrder = () => {
        setOrders(prev => prev.map(o => o.id === editOrder.id ? editOrder : o));
        setEditOrder(null);
    };

    return (
        <DashboardLayout type="admin">
            <div className="max-w-7xl mx-auto pb-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">Order Management</h1>
                        <p className="text-muted-foreground text-sm mt-1">Review and manage detailed sales order metrics and lifecycle data for agents & managers.</p>
                    </div>
                </div>

                {/* Filters bar */}
                <div className="bg-card border border-border p-4 rounded-2xl mb-6 flex flex-col lg:flex-row gap-4 items-center justify-between shadow-sm">
                    <div className="relative w-full lg:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search by SO No, Customer..."
                            className="w-full pl-10 pr-4 py-2 bg-secondary/30 border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <Filter className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm font-medium text-foreground whitespace-nowrap">Status:</span>
                            <select 
                                className="w-full sm:w-auto px-4 py-2 bg-secondary/30 border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="All">All Statuses</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Processing">Processing</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-secondary/20 border-b border-border">
                                <th className="p-4 text-xs uppercase tracking-widest font-bold text-muted-foreground">SO Number</th>
                                <th className="p-4 text-xs uppercase tracking-widest font-bold text-muted-foreground">Customer</th>
                                <th className="p-4 text-xs uppercase tracking-widest font-bold text-muted-foreground">Product</th>
                                <th className="p-4 text-xs uppercase tracking-widest font-bold text-muted-foreground">Amount</th>
                                <th className="p-4 text-xs uppercase tracking-widest font-bold text-muted-foreground">Status</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            {filteredOrders.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="p-8 text-center text-muted-foreground text-sm">No orders found matching your filters.</td>
                                </tr>
                            ) : filteredOrders.map((order, i) => (
                                <motion.tr
                                    key={order.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="hover:bg-secondary/10 transition-colors group cursor-pointer"
                                    onClick={() => setEditOrder(order)}
                                >
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                                                <FileText className="w-5 h-5 text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-foreground">{order.soNo}</p>
                                                <p className="text-xs text-muted-foreground">{order.orderDate}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <p className="text-sm font-bold text-foreground">{order.customer}</p>
                                        <p className="text-xs text-muted-foreground">{order.region} • {order.salePerson}</p>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-foreground">{order.product}</span>
                                            <span className="text-xs text-muted-foreground truncate max-w-[200px]" title={order.itemDescription}>{order.itemDescription}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <p className="text-sm font-bold text-foreground">₹{order.amount}</p>
                                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Qty: {order.qty}</p>
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                                            order.status === 'Cancelled' ? 'bg-red-500/10 text-red-600 border border-red-500/20' : 
                                            order.status === 'Delivered' ? 'bg-green-500/10 text-green-600 border border-green-500/20' : 
                                            'bg-primary/10 text-primary border border-primary/20'
                                        }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button className="p-2 hover:bg-secondary rounded-lg text-muted-foreground transition-colors inline-block" onClick={(e) => { e.stopPropagation(); setEditOrder(order); }}>
                                            <Eye className="w-4 h-4" />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Order Editing Modal */}
            <AnimatePresence>
                {editOrder && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setEditOrder(null)}
                            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="relative w-full max-w-6xl bg-card border border-border rounded-2xl shadow-2xl flex flex-col max-h-[90vh]"
                        >
                            {/* Modal Header */}
                            <div className="px-6 py-4 border-b border-border flex items-center justify-between sticky top-0 bg-card z-10 rounded-t-2xl">
                                <div>
                                    <h2 className="text-xl font-bold">Edit Order: {editOrder.soNo}</h2>
                                    <p className="text-xs text-muted-foreground mt-1">Make changes to order data dynamically. Hit save when done.</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={handleSaveOrder}
                                        className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-bold rounded-xl shadow-lg hover:shadow-primary/20 transition-all hover:scale-105 active:scale-95"
                                    >
                                        <Save className="w-4 h-4" />
                                        Save Changes
                                    </button>
                                    <button
                                        onClick={() => setEditOrder(null)}
                                        className="p-2.5 hover:bg-secondary rounded-full bg-secondary/50 text-foreground transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Modal Body with Editable Inputs */}
                            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                    
                                    {/* Section 1: Order Information */}
                                    <div className="bg-secondary/10 border border-border/50 rounded-xl p-4">
                                        <div className="flex items-center gap-2 mb-4 text-primary">
                                            <FileText className="w-4 h-4" />
                                            <h3 className="font-bold text-sm tracking-wide uppercase">Order Info</h3>
                                        </div>
                                        <div className="space-y-1">
                                            <DetailInput label="SO Number" value={editOrder.soNo} onChange={v => handleUpdateField("soNo", v)} />
                                            <DetailInput label="Customer Order No" value={editOrder.customerOrderNo} onChange={v => handleUpdateField("customerOrderNo", v)} />
                                            <DetailInput label="Order Date" type="date" value={editOrder.orderDate} onChange={v => handleUpdateField("orderDate", v)} />
                                            <DetailInput label="Order Type" value={editOrder.orderType} onChange={v => handleUpdateField("orderType", v)} />
                                            <DetailInput label="Status" value={editOrder.status} onChange={v => handleUpdateField("status", v)} highlight={editOrder.status === 'Cancelled'} />
                                            <DetailInput label="Visibility" value={editOrder.visibility} onChange={v => handleUpdateField("visibility", v)} />
                                            <DetailInput label="PO to SO" value={editOrder.poToSo} onChange={v => handleUpdateField("poToSo", v)} />
                                            <DetailInput label="Project / SMI" value={editOrder.projectSmi} onChange={v => handleUpdateField("projectSmi", v)} />
                                            <DetailInput label="Merge" value={editOrder.merge} onChange={v => handleUpdateField("merge", v)} />
                                            <DetailInput label="Special Reference A" value={editOrder.specialReferenceA} onChange={v => handleUpdateField("specialReferenceA", v)} />
                                        </div>
                                    </div>

                                    {/* Section 2: Customer & Rep */}
                                    <div className="bg-secondary/10 border border-border/50 rounded-xl p-4">
                                        <div className="flex items-center gap-2 mb-4 text-primary">
                                            <User className="w-4 h-4" />
                                            <h3 className="font-bold text-sm tracking-wide uppercase">Customer Details</h3>
                                        </div>
                                        <div className="space-y-1">
                                            <DetailInput label="Customer" value={editOrder.customer} onChange={v => handleUpdateField("customer", v)} />
                                            <DetailInput label="Region" value={editOrder.region} onChange={v => handleUpdateField("region", v)} />
                                            <DetailInput label="Sales Person" value={editOrder.salePerson} onChange={v => handleUpdateField("salePerson", v)} />
                                            <DetailInput label="Delivery Term" value={editOrder.deliveryTerm} onChange={v => handleUpdateField("deliveryTerm", v)} />
                                            <DetailInput label="Division" value={editOrder.division} onChange={v => handleUpdateField("division", v)} />
                                            <DetailInput label="Plant" value={editOrder.plant} onChange={v => handleUpdateField("plant", v)} />
                                        </div>
                                    </div>

                                    {/* Section 3: Product & Financials */}
                                    <div className="bg-secondary/10 border border-border/50 rounded-xl p-4">
                                        <div className="flex items-center gap-2 mb-4 text-primary">
                                            <Package className="w-4 h-4" />
                                            <h3 className="font-bold text-sm tracking-wide uppercase">Product Data</h3>
                                        </div>
                                        <div className="space-y-1">
                                            <DetailInput label="Product" value={editOrder.product} onChange={v => handleUpdateField("product", v)} />
                                            <DetailInput label="Item Code 10.8" value={editOrder.itemCode} onChange={v => handleUpdateField("itemCode", v)} />
                                            <DetailInput label="Item Description 10.8" value={editOrder.itemDescription} onChange={v => handleUpdateField("itemDescription", v)} />
                                            <DetailInput label="Product Line Number" value={editOrder.productLineNumber} onChange={v => handleUpdateField("productLineNumber", v)} />
                                            <DetailInput label="Product Varriant Mapping" value={editOrder.productVariantMapping} onChange={v => handleUpdateField("productVariantMapping", v)} />
                                            <DetailInput label="Qty" type="number" value={editOrder.qty} onChange={v => handleUpdateField("qty", v)} />
                                            <DetailInput label="Price" type="number" value={editOrder.price} onChange={v => handleUpdateField("price", v)} />
                                            <DetailInput label="Amount" type="number" value={editOrder.amount} onChange={v => handleUpdateField("amount", v)} strong />
                                            <DetailInput label="Order Efficiency" value={editOrder.orderEfficiency} onChange={v => handleUpdateField("orderEfficiency", v)} />
                                        </div>
                                    </div>

                                    {/* Section 4: Dates & Scheduling */}
                                    <div className="bg-secondary/10 border border-border/50 rounded-xl p-4">
                                        <div className="flex items-center gap-2 mb-4 text-primary">
                                            <Calendar className="w-4 h-4" />
                                            <h3 className="font-bold text-sm tracking-wide uppercase">Scheduling</h3>
                                        </div>
                                        <div className="space-y-1">
                                            <DetailInput label="Customer PO Date" type="date" value={editOrder.customerPoDate} onChange={v => handleUpdateField("customerPoDate", v)} />
                                            <DetailInput label="Customer req date" type="date" value={editOrder.customerReqDate} onChange={v => handleUpdateField("customerReqDate", v)} />
                                            <DetailInput label="SO Release Date" type="date" value={editOrder.soReleaseDate} onChange={v => handleUpdateField("soReleaseDate", v)} />
                                            <DetailInput label="Given to Planning for Scheduling" type="date" value={editOrder.givenToPlanningDate} onChange={v => handleUpdateField("givenToPlanningDate", v)} />
                                            <DetailInput label="Planned delivery date" type="date" value={editOrder.plannedDeliveryDate} onChange={v => handleUpdateField("plannedDeliveryDate", v)} />
                                            <DetailInput label="Production Completed on" type="date" value={editOrder.productionCompletedOn} onChange={v => handleUpdateField("productionCompletedOn", v)} />
                                            <DetailInput label="Dispatch Date" type="date" value={editOrder.dispatchDate} onChange={v => handleUpdateField("dispatchDate", v)} />
                                            <DetailInput label="Dispatch planned date" type="date" value={editOrder.dispatchPlannedDate} onChange={v => handleUpdateField("dispatchPlannedDate", v)} />
                                            <DetailInput label="Plan Date" type="date" value={editOrder.planDate} onChange={v => handleUpdateField("planDate", v)} />
                                            <DetailInput label="Finance Clearance given for dispatch on" type="date" value={editOrder.financeClearanceDate} onChange={v => handleUpdateField("financeClearanceDate", v)} />
                                            <DetailInput label="Revised Commitment date" type="date" value={editOrder.revisedCommitmentDate} onChange={v => handleUpdateField("revisedCommitmentDate", v)} />
                                        </div>
                                    </div>

                                    {/* Section 5: Ageing & Tracking */}
                                    <div className="bg-secondary/10 border border-border/50 rounded-xl p-4">
                                        <div className="flex items-center gap-2 mb-4 text-primary">
                                            <Clock className="w-4 h-4" />
                                            <h3 className="font-bold text-sm tracking-wide uppercase">Ageing & Tracking</h3>
                                        </div>
                                        <div className="space-y-1">
                                            <DetailInput label="Ageing Order Date to SO Release" type="number" value={editOrder.ageingOrderToSoRelease} onChange={v => handleUpdateField("ageingOrderToSoRelease", v)} postfix="days" />
                                            <DetailInput label="Ageing SO Release to Schedule Date" type="number" value={editOrder.ageingSoReleaseToSchedule} onChange={v => handleUpdateField("ageingSoReleaseToSchedule", v)} postfix="days" />
                                            <DetailInput label="Ageing after Production Completion" type="number" value={editOrder.ageingAfterProduction} onChange={v => handleUpdateField("ageingAfterProduction", v)} postfix="days" />
                                            <DetailInput label="Ageing Order date to Material readiness" type="number" value={editOrder.ageingOrderToMaterialReadiness} onChange={v => handleUpdateField("ageingOrderToMaterialReadiness", v)} postfix="days" />
                                            <DetailInput label="Ageing FC to Schedule/YTS" type="number" value={editOrder.ageingFcToSchedule} onChange={v => handleUpdateField("ageingFcToSchedule", v)} postfix="days" />
                                            <DetailInput label="Leadtime" type="number" value={editOrder.leadtime} onChange={v => handleUpdateField("leadtime", v)} postfix="days" />
                                            <DetailInput label="Check for Lead time" type="number" value={editOrder.checkForLeadTime} onChange={v => handleUpdateField("checkForLeadTime", v)} postfix="days" />
                                        </div>
                                    </div>

                                    {/* Section 6: Remarks & Checks */}
                                    <div className="bg-secondary/10 border border-border/50 rounded-xl p-4">
                                        <div className="flex items-center gap-2 mb-4 text-primary">
                                            <AlertCircle className="w-4 h-4" />
                                            <h3 className="font-bold text-sm tracking-wide uppercase">Remarks & Checks</h3>
                                        </div>
                                        <div className="space-y-1">
                                            <DetailInput label="Remarks" value={editOrder.remarks} onChange={v => handleUpdateField("remarks", v)} />
                                            <DetailInput label="Special Remarks" value={editOrder.specialRemarks} onChange={v => handleUpdateField("specialRemarks", v)} />
                                            <DetailInput label="Reason for Delay" value={editOrder.reasonForDelay} onChange={v => handleUpdateField("reasonForDelay", v)} />
                                            <DetailInput label="Remarks on Delay" value={editOrder.remarksOnDelay} onChange={v => handleUpdateField("remarksOnDelay", v)} />
                                            <DetailInput label="Production MO Number" value={editOrder.productionMoNumber} onChange={v => handleUpdateField("productionMoNumber", v)} />
                                            <DetailInput label="Fin check" value={editOrder.finCheck} onChange={v => handleUpdateField("finCheck", v)} />
                                            <DetailInput label="Invoice Check" value={editOrder.invoiceCheck} onChange={v => handleUpdateField("invoiceCheck", v)} />
                                            <DetailInput label="Check the invoice duplicate" value={editOrder.checkInvoiceDuplicate} onChange={v => handleUpdateField("checkInvoiceDuplicate", v)} />
                                            <DetailInput label="Production Order Check 1" value={editOrder.productionOrderCheck1} onChange={v => handleUpdateField("productionOrderCheck1", v)} />
                                            <DetailInput label="Production order Status Check 3" value={editOrder.productionOrderStatusCheck3} onChange={v => handleUpdateField("productionOrderStatusCheck3", v)} />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </DashboardLayout>
    );
}

function DetailInput({ label, value, type = "text", onChange, strong, highlight, postfix }) {
    return (
        <div className="flex justify-between items-center gap-4 text-sm border-b border-border/20 py-2 last:border-0 hover:bg-secondary/5 px-2 rounded-lg transition-colors">
            <span className="text-muted-foreground w-1/3 text-xs uppercase font-medium leading-tight">{label}</span>
            <div className="w-2/3 flex items-center gap-2">
                <input
                    type={type}
                    value={value || ''}
                    onChange={e => onChange(e.target.value)}
                    className={`w-full bg-secondary/30 border border-border/50 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:bg-background transition-colors ${strong ? 'font-bold' : ''} ${highlight ? 'text-red-500 font-bold' : 'text-foreground'}`}
                />
                {postfix && <span className="text-xs text-muted-foreground font-medium whitespace-nowrap">{postfix}</span>}
            </div>
        </div>
    );
}
