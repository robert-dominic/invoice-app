import { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useInvoices } from "../../context/InvoiceContext";
import { generateId } from "../../utils/helpers";
import { validateInvoice } from "../../utils/validation";
import BillFromSection from "./form/BillFromSection";
import BillToSection from "./form/BillToSection";
import PaymentSection from "./form/PaymentSection";
import ItemListSection from "./form/ItemListSection";
import FormFooter from "./form/FormFooter";

const emptyForm = {
    billFrom: { street: "", city: "", postCode: "", country: "" },
    billTo: { street: "", city: "", postCode: "", country: "" },
    clientName: "",
    clientEmail: "",
    invoiceDate: new Date(),
    paymentTerms: 30,
    description: "",
    items: [],
};

export default function InvoiceForm({ isOpen, onClose, isEdit, editId }) {
    const { isDark } = useTheme();
    const { addInvoice, updateInvoice, invoices } = useInvoices();
    const [form, setForm] = useState(emptyForm);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isEdit && editId) {
            const invoice = invoices.find(inv => inv.id === editId);
            if (invoice) {
                setForm({
                    billFrom: invoice.billFrom,
                    billTo: invoice.billTo,
                    clientName: invoice.clientName,
                    clientEmail: invoice.clientEmail,
                    invoiceDate: new Date(invoice.invoiceDate),
                    paymentTerms: invoice.paymentTerms,
                    description: invoice.description,
                    items: invoice.items,
                });
            }
        } else {
            setForm(emptyForm);
        }
        setErrors({});
    }, [isEdit, editId, isOpen]);

    const updateBillFrom = (field, value) =>
        setForm(prev => ({ ...prev, billFrom: { ...prev.billFrom, [field]: value } }));

    const updateBillTo = (field, value) =>
        setForm(prev => ({ ...prev, billTo: { ...prev.billTo, [field]: value } }));

    const updateClient = (field, value) =>
        setForm(prev => ({ ...prev, [field]: value }));

    const updatePayment = (field, value) =>
        setForm(prev => ({ ...prev, [field]: value }));

    const addItem = () =>
        setForm(prev => ({
            ...prev,
            items: [...prev.items, { name: "", quantity: 1, price: 0, total: 0 }],
        }));

    const updateItem = (index, field, value) => {
        setForm(prev => {
            const items = [...prev.items];
            items[index] = { ...items[index], [field]: value };
            if (field === "quantity" || field === "price") {
                items[index].total = Number(items[index].quantity) * Number(items[index].price);
            }
            return { ...prev, items };
        });
    };

    const removeItem = (index) =>
        setForm(prev => ({
            ...prev,
            items: prev.items.filter((_, i) => i !== index),
        }));

    const getTotal = () =>
        form.items.reduce((sum, item) => sum + item.total, 0);

    const buildInvoice = (status) => ({
        id: isEdit ? editId : generateId(),
        status,
        billFrom: form.billFrom,
        billTo: form.billTo,
        clientName: form.clientName,
        clientEmail: form.clientEmail,
        invoiceDate: form.invoiceDate ? form.invoiceDate.toISOString() : new Date().toISOString(),
        paymentDue: new Date(
            (form.invoiceDate ? form.invoiceDate.getTime() : new Date().getTime()) + form.paymentTerms * 86400000
        ).toISOString(),
        paymentTerms: form.paymentTerms,
        description: form.description,
        items: form.items,
        total: getTotal(),
    });

    const handleSaveAsDraft = () => {
        addInvoice(buildInvoice("draft"));
        onClose();
    };

    const handleSaveAndSend = () => {
        const e = validateInvoice(form);
        if (Object.keys(e).length > 0) { setErrors(e); return; }
        addInvoice(buildInvoice("pending"));
        onClose();
    };

    const handleSaveChanges = () => {
        const e = validateInvoice(form);
        if (Object.keys(e).length > 0) { setErrors(e); return; }
        updateInvoice(editId, buildInvoice("pending"));
        onClose();
    };

    return (
        <div
            className={`drawer-scroll fixed top-0 left-0 md:left-[72px] h-full w-full md:w-[580px] lg:w-[616px] z-40 overflow-y-auto transform transition-transform duration-300 ease-in-out rounded-r-[20px]
  ${isOpen ? "translate-x-0" : "-translate-x-full pointer-events-none"}
  ${isDark ? "bg-dark-bg" : "bg-white"}`}
        >
            <div className="px-6 md:px-14 pt-12 pb-36">

                {/* Go back — mobile only */}
                <button
                    onClick={onClose}
                    aria-label="Go back"
                    className={`flex items-center gap-1 mb-8 pt-8 sm:hidden md:hidden text-heading cursor-pointer ${isDark ? "text-white" : "text-dark-navy"}`}
                >
                    <ChevronLeft size={20} className="text-purple-primary pb-1" />
                    Go back
                </button>

                {/* Title */}
                <h2 className={`text-responsive sm:pt-6 mb-6 ${isDark ? "text-white" : "text-dark-navy"}`}>
                    {isEdit
                        ? <><span className="text-grey-medium">Edit #</span>{editId}</>
                        : "New Invoice"
                    }
                </h2>

                <BillFromSection
                    data={form.billFrom}
                    errors={errors}
                    onChange={updateBillFrom}
                />

                <BillToSection
                    data={form.billTo}
                    clientName={form.clientName}
                    clientEmail={form.clientEmail}
                    errors={errors}
                    onChange={updateBillTo}
                    onChangeClient={updateClient}
                />

                <PaymentSection
                    invoiceDate={form.invoiceDate}
                    paymentTerms={form.paymentTerms}
                    description={form.description}
                    errors={errors}
                    onChange={updatePayment}
                />

                <ItemListSection
                    items={form.items}
                    errors={errors}
                    onAdd={addItem}
                    onUpdate={updateItem}
                    onRemove={removeItem}
                />

            </div>

            <FormFooter
                isEdit={isEdit}
                onClose={onClose}
                onSaveAsDraft={handleSaveAsDraft}
                onSaveAndSend={handleSaveAndSend}
                onSaveChanges={handleSaveChanges}
            />
        </div>
    );
}
