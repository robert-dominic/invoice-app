import { useInvoices } from "../../context/InvoiceContext";
import { useTheme } from "../../context/ThemeContext";
import InvoiceCard from "./InvoiceCard";
import illustration from "../../assets/illustration-empty.svg";

export default function InvoiceList() {
    const { filteredInvoices } = useInvoices();
    const { isDark } = useTheme();

    if (filteredInvoices.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center mt-24 gap-10 text-center px-6">
                <img src={illustration} alt="empty" className="w-[242px]" />
                <div className="flex flex-col gap-4">
                    <h2 className={`text-heading ${isDark ? "text-white" : "text-dark-navy"}`}>
                        There is nothing here
                    </h2>
                    <p className="text-body text-grey-medium max-w-[220px]">
                        Create an invoice by clicking the <strong>New Invoice</strong> button and get started
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            {filteredInvoices.map(invoice => (
                <InvoiceCard key={invoice.id} invoice={invoice} />
            ))}
        </div>
    );
}