import { ChevronLeft } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";
import StatusBadge from "../../ui/StatusBadge";

export default function InvoiceDetailHeader({
    invoice,
    onBack,
    onEdit,
    onDelete,
    onMarkAsPaid,
}) {
    const { isDark } = useTheme();

    const textPrimary = isDark ? "text-white" : "text-dark-navy";
    const textSecondary = isDark ? "text-grey-medium" : "text-grey-blue";
    const cardBg = isDark ? "bg-dark-navy" : "bg-white";
    const cardShadow = isDark
        ? "shadow-[0_18px_40px_-28px_rgba(0,0,0,0.85)]"
        : "shadow-[0_10px_20px_-10px_rgba(72,84,159,0.15)]";

    return (
        <>
            <button
                onClick={onBack}
                aria-label="Go back"
                className={`flex items-center gap-3 mb-8 md:gap-4 text-heading cursor-pointer ${textPrimary}`}
            >
                <ChevronLeft size={20} className="text-purple-primary" />
                <span className="pt-1">Go back</span>
            </button>

            <div className={`${cardBg} ${cardShadow} rounded-2xl px-6 py-6 md:px-8 md:py-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4 md:mb-6`}>
                <div className="flex items-center justify-between gap-4 w-full md:w-auto md:justify-start md:gap-5">
                    <span className={`text-body ${textSecondary}`}>Status</span>
                    <StatusBadge status={invoice.status} />
                </div>

                <div className="hidden md:flex items-center gap-3">
                    <button
                        onClick={onEdit}
                        className={`btn-secondary ${invoice.status === "paid" ? "cursor-not-allowed opacity-50" : ""}`}
                        disabled={invoice.status === "paid"}
                    >
                        Edit
                    </button>
                    <button onClick={onDelete} className="btn-delete">
                        Delete
                    </button>
                    {invoice.status === "pending" && (
                        <button onClick={onMarkAsPaid} className="btn-base-purple">
                            Mark as Paid
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}
