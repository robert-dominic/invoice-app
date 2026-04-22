import { useTheme } from "../../context/ThemeContext";
import { ChevronRight } from "lucide-react";
import StatusBadge from "../ui/StatusBadge";
import { formatDate, formatCurrency } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";

export default function InvoiceCard({ invoice }) {
    const { isDark } = useTheme();
    const navigate = useNavigate();

    return (
        <button
            type="button"
            onClick={() => navigate(`/invoice/${invoice.id}`)}
            className={`w-full text-left flex items-center justify-between px-6 py-4 rounded-lg cursor-pointer border border-transparent hover:border-purple-primary transition-all duration-200
            ${isDark ? "bg-dark-card text-white" : "bg-white text-dark-navy"}`}
        >
            {/* Desktop Layout */}
            <div className="hidden md:flex items-center justify-between w-full">
                <span className="text-heading w-[100px]">
                    <span className="text-grey-medium">#</span>{invoice.id}
                </span>
                <span className="text-body text-grey-medium w-[150px]">
                    Due {formatDate(invoice.paymentDue)}
                </span>
                <span className="text-body text-grey-medium w-[150px]">
                    {invoice.clientName}
                </span>
                <span className="text-heading w-[150px]">
                    {formatCurrency(invoice.total)}
                </span>
                <div className="flex items-center gap-4">
                    <StatusBadge status={invoice.status} />
                    <ChevronRight size={16} className="text-purple-primary" />
                </div>
            </div>

            {/* Mobile Layout */}
            <div className="flex md:hidden flex-col gap-6 w-full">
                <div className="flex justify-between items-center">
                    <span className="text-heading">
                        <span className="text-grey-medium">#</span>{invoice.id}
                    </span>
                    <span className="text-body text-grey-medium">{invoice.clientName}</span>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-2">
                        <span className="text-body text-grey-medium">
                            Due {formatDate(invoice.paymentDue)}
                        </span>
                        <span className="text-heading">{formatCurrency(invoice.total)}</span>
                    </div>
                    <StatusBadge status={invoice.status} />
                </div>
            </div>
        </button>
    );
}
