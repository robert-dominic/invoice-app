import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useInvoices } from "../context/InvoiceContext";
import Modal from "../components/ui/Modal";
import InvoiceForm from "../components/invoice/InvoiceForm";
import InvoiceDetail from "../components/invoice/InvoiceDetail";

export default function DetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isDark } = useTheme();
    const { invoices, deleteInvoice, markAsPaid } = useInvoices();
    const [showModal, setShowModal] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const invoice = invoices.find(inv => inv.id === id);

    if (!invoice) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${isDark ? "bg-dark-bg text-white" : "bg-light-bg text-dark-navy"}`}>
                <p>Invoice not found.</p>
            </div>
        );
    }

    const handleDelete = () => {
        deleteInvoice(id);
        navigate("/");
    };

    return (
        <div className={`min-h-screen ${isDark ? "bg-dark-bg" : "bg-light-bg"}`}>

            {/* Overlay */}
            {isFormOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20"
                    onClick={() => setIsFormOpen(false)}
                />
            )}

            {/* Edit Form Drawer */}
            <InvoiceForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                isEdit={true}
                editId={id}
            />

            {/* Delete Modal */}
            <Modal
                isOpen={showModal}
                invoiceId={id}
                onConfirm={handleDelete}
                onCancel={() => setShowModal(false)}
            />

            <div className="md:pl-[103px] pt-[72px] md:pt-0">
                <InvoiceDetail
                    invoice={invoice}
                    onBack={() => navigate("/")}
                    onEdit={() => setIsFormOpen(true)}
                    onDelete={() => setShowModal(true)}
                    onMarkAsPaid={() => markAsPaid(id)}
                />
            </div>
        </div>
    );
}
