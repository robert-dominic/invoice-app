import { useTheme } from "../../../context/ThemeContext";
import { formatDate } from "../../../utils/helpers";
import InvoiceItemsTable from "./InvoiceItemsTable";

export default function InvoiceDetailCard({ invoice }) {
    const { isDark } = useTheme();

    const cardBg = isDark ? "bg-dark-navy" : "bg-white";
    const textPrimary = isDark ? "text-white" : "text-dark-navy";
    const textSecondary = isDark ? "text-grey-medium" : "text-grey-blue";
    const cardShadow = isDark
        ? "shadow-[0_18px_40px_-28px_rgba(0,0,0,0.85)]"
        : "shadow-[0_10px_20px_-10px_rgba(72,84,159,0.15)]";

    return (
        <div className={`${cardBg} ${cardShadow} rounded-2xl p-6 md:px-8 md:py-12 mb-6`}>
            <div className="flex flex-col gap-8 md:flex-row md:justify-between md:items-start mb-8 md:mb-12">
                <div>
                    <p className={`text-heading ${textPrimary}`}>
                        <span className="text-grey-medium">#</span>{invoice.id}
                    </p>
                    <p className={`text-body ${textSecondary} mt-1`}>{invoice.description}</p>
                </div>
                <div className={`text-body ${textSecondary} max-w-[170px] md:text-right`}>
                    <p>{invoice.billFrom?.street}</p>
                    <p>{invoice.billFrom?.city}</p>
                    <p>{invoice.billFrom?.postCode}</p>
                    <p>{invoice.billFrom?.country}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-[190px_1fr_230px] md:gap-x-10 md:gap-y-0 mb-10 md:mb-14">
                <div className="flex flex-col gap-8">
                    <div>
                        <p className={`text-body ${textSecondary} mb-3`}>Invoice Date</p>
                        <p className={`text-heading ${textPrimary}`}>{formatDate(invoice.invoiceDate)}</p>
                    </div>
                    <div>
                        <p className={`text-body ${textSecondary} mb-3`}>Payment Due</p>
                        <p className={`text-heading ${textPrimary}`}>{formatDate(invoice.paymentDue)}</p>
                    </div>
                </div>

                <div>
                    <p className={`text-body ${textSecondary} mb-3`}>Bill To</p>
                    <p className={`text-heading ${textPrimary} mb-2`}>{invoice.clientName}</p>
                    <div className={`text-body ${textSecondary} max-w-[150px]`}>
                        <p>{invoice.billTo?.street}</p>
                        <p>{invoice.billTo?.city}</p>
                        <p>{invoice.billTo?.postCode}</p>
                        <p>{invoice.billTo?.country}</p>
                    </div>
                </div>

                <div className="col-span-2 md:col-span-1">
                    <p className={`text-body ${textSecondary} mb-3`}>Sent to</p>
                    <p className={`text-heading ${textPrimary}`}>{invoice.clientEmail}</p>
                </div>
            </div>

            <InvoiceItemsTable items={invoice.items} total={invoice.total} />
        </div>
    );
}
