import { useTheme } from "../../context/ThemeContext";
import InvoiceDetailCard from "./detail/InvoiceDetailCard";
import InvoiceDetailHeader from "./detail/InvoiceDetailHeader";

export default function InvoiceDetail({
    invoice,
    onBack,
    onEdit,
    onDelete,
    onMarkAsPaid,
}) {
    const { isDark } = useTheme();
    const mobileActionBg = isDark ? "bg-dark-navy" : "bg-white";

    return (
        <div className="max-w-[820px] mx-auto px-2 sm:px-6 pt-2 pb-28 md:px-12 md:pt-20 md:pb-16">
            <InvoiceDetailHeader
                invoice={invoice}
                onBack={onBack}
                onEdit={onEdit}
                onDelete={onDelete}
                onMarkAsPaid={onMarkAsPaid}
            />

            <InvoiceDetailCard invoice={invoice} />

            <div className={`md:hidden fixed bottom-0 left-0 right-0 px-2 py-5 ${mobileActionBg}`}>
                <div className="flex items-center gap-2">
                    <button
                        onClick={onEdit}
                        className={`btn-secondary flex-1 ${invoice.status === "paid" ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={invoice.status === "paid"}
                    >
                        Edit
                    </button>
                    <button onClick={onDelete} className="btn-delete flex-1">
                        Delete
                    </button>
                    {invoice.status === "pending" && (
                        <button onClick={onMarkAsPaid} className="btn-base-purple flex-[1.45]">
                            Mark as Paid
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
