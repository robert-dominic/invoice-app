import { createContext, useContext, useState, useEffect } from "react";

const InvoiceContext = createContext();

export function InvoiceProvider({ children }) {
    const [invoices, setInvoices] = useState(() => {
        const stored = localStorage.getItem("invoices");
        return stored ? JSON.parse(stored) : [];
    });

    const [filter, setFilter] = useState([]);

    useEffect(() => {
        localStorage.setItem("invoices", JSON.stringify(invoices));
    }, [invoices]);

    const filteredInvoices = filter.length === 0
        ? invoices
        : invoices.filter(inv => filter.includes(inv.status));

    const addInvoice = (invoice) => {
        setInvoices(prev => [invoice, ...prev]);
    };

    const updateInvoice = (id, updated) => {
        setInvoices(prev =>
            prev.map(inv => inv.id === id ? { ...inv, ...updated } : inv)
        );
    };

    const deleteInvoice = (id) => {
        setInvoices(prev => prev.filter(inv => inv.id !== id));
    };

    const markAsPaid = (id) => {
        const invoice = invoices.find(inv => inv.id === id);
        if (!invoice || invoice.status === "draft") return;
        updateInvoice(id, { status: "paid" });
    };

    return (
        <InvoiceContext.Provider value={{
            invoices,
            filteredInvoices,
            filter,
            setFilter,
            addInvoice,
            updateInvoice,
            deleteInvoice,
            markAsPaid,
        }}>
            {children}
        </InvoiceContext.Provider>
    );
}

export function useInvoices() {
    return useContext(InvoiceContext);
}
