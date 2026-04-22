import { useState } from "react";
import { Plus } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useInvoices } from "../context/InvoiceContext";
import InvoiceList from "../components/invoice/InvoiceList";
import FilterDropdown from "../components/filter/FilterDropdown";
import InvoiceForm from "../components/invoice/InvoiceForm";

export default function ListPage() {
    const { isDark } = useTheme();
    const { invoices, filteredInvoices, filter } = useInvoices();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editId, setEditId] = useState(null);

    const getSubtitle = () => {
        if (invoices.length === 0) return "No invoices";
        if (filter.length === 0) return `There are ${invoices.length} total invoices`;
        return `There are ${filteredInvoices.length} ${filter.length === 1 ? filter[0] : ""} invoices`;
    };

    const handleOpenNew = () => {
        setEditId(null);
        setIsFormOpen(true);
    };

    const handleClose = () => {
        setIsFormOpen(false);
        setEditId(null);
    };

    return (
        <div className={`min-h-screen overflow-x-hidden ${isDark ? "bg-dark-bg" : "bg-light-bg"}`}>
            {/* Overlay */}
            {isFormOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={handleClose}
                />
            )}

            {/* Form Drawer */}
            <InvoiceForm
                isOpen={isFormOpen}
                onClose={handleClose}
                isEdit={!!editId}
                editId={editId}
            />

            {/* Main content */}
            <div className="md:pl-[103px] pt-[72px] md:pt-0">
                <div className="max-w-[730px] mx-auto px-2.5 py-8 md:py-16">

                    {/* Page Header */}
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h1 className={`text-responsive ${isDark ? "text-white" : "text-dark-navy"}`}>
                                Invoices
                            </h1>
                            <p className="text-[10px] md:text-small text-grey-medium mt-1">
                                {getSubtitle()}
                            </p>
                        </div>

                        <div className="flex items-center gap-2 md:gap-10">
                            <FilterDropdown />
                            <button
                                onClick={handleOpenNew}
                                className="btn-base-purple"
                            >
                                <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                                    <Plus size={14} className="text-purple-primary" />
                                </div>
                                <span className="hidden sm:inline mt-1">New Invoice</span>
                                <span className="sm:hidden mt-1">New</span>
                            </button>
                        </div>
                    </div>

                    {/* Invoice List */}
                    <InvoiceList onEdit={(id) => { setEditId(id); setIsFormOpen(true); }} />
                </div>
            </div>
        </div>
    );
}