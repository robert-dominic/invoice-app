import { useTheme } from "../../../context/ThemeContext";
import { formatCurrency } from "../../../utils/helpers";

export default function InvoiceItemsTable({ items, total }) {
    const { isDark } = useTheme();

    const textPrimary = isDark ? "text-white" : "text-dark-navy";
    const textSecondary = isDark ? "text-grey-medium" : "text-grey-blue";
    const tableBg = isDark ? "bg-dark-card" : "bg-[#F9FAFE]";
    const amountBg = isDark ? "bg-[#0C0E16]" : "bg-dark-navy";

    return (
        <div className={`${tableBg} rounded-2xl overflow-hidden md:mt-2`}>
            <div className="hidden md:grid grid-cols-[2fr_90px_120px_120px] gap-4 px-6 pt-8 mb-6">
                <span className={`text-body ${textSecondary}`}>Item Name</span>
                <span className={`text-body ${textSecondary} text-center`}>QTY.</span>
                <span className={`text-body ${textSecondary} text-right`}>Price</span>
                <span className={`text-body ${textSecondary} text-right`}>Total</span>
            </div>

            <div className="flex flex-col gap-6 px-6 py-6 md:px-6 md:pt-0 md:pb-8">
                {(items || []).map((item, index) => (
                    <div key={index}>
                        <div className="hidden md:grid grid-cols-[2fr_90px_120px_120px] gap-4 items-center">
                            <span className={`text-heading ${textPrimary}`}>{item.name}</span>
                            <span className={`text-heading ${textSecondary} text-center`}>{item.quantity}</span>
                            <span className={`text-heading ${textSecondary} text-right`}>{formatCurrency(item.price)}</span>
                            <span className={`text-heading ${textPrimary} text-right`}>{formatCurrency(item.total)}</span>
                        </div>

                        <div className="md:hidden flex justify-between items-start gap-4">
                            <div>
                                <p className={`text-heading ${textPrimary}`}>{item.name}</p>
                                <p className="text-body text-grey-medium mt-1">
                                    {item.quantity} x {formatCurrency(item.price)}
                                </p>
                            </div>
                            <span className={`text-heading ${textPrimary}`}>{formatCurrency(item.total)}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className={`${amountBg} px-6 py-8 md:px-6 md:py-7 flex items-center justify-between gap-4`}>
                <span className="text-body text-white">Amount Due</span>
                <span className="text-[24px] leading-none tracking-[-0.5px] font-bold text-white md:text-[32px]">
                    {formatCurrency(total)}
                </span>
            </div>
        </div>
    );
}
