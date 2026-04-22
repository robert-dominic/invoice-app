import { useState, useRef } from "react";
import { ChevronDown, Calendar } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const termOptions = [
    { label: "Net 1 Day", value: 1 },
    { label: "Net 7 Days", value: 7 },
    { label: "Net 14 Days", value: 14 },
    { label: "Net 30 Days", value: 30 },
];

export default function PaymentSection({ invoiceDate, paymentTerms, description, errors, onChange }) {
    const { isDark } = useTheme();
    const [termsOpen, setTermsOpen] = useState(false);
    const datePickerRef = useRef(null);

    const inputBase = `w-full px-4 py-3 rounded-md border text-heading outline-none transition-all`;
    const inputTheme = isDark
        ? "bg-dark-card text-white border-dark-card focus:border-purple-primary"
        : "bg-white text-dark-navy border-light-lavender focus:border-purple-primary";
    const inputClass = (err) => `${inputBase} ${inputTheme} ${err ? "!border-red-primary" : ""}`;
    const labelClass = `text-body ${isDark ? "text-grey-medium" : "text-grey-blue"}`;
    const fieldBg = isDark
        ? "bg-dark-card border-dark-card text-white"
        : "bg-white border-light-lavender text-dark-navy";

    return (
        <div className="mb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

                {/* Invoice Date */}
                <div>
                    <label htmlFor="invoiceDate" className={`${labelClass} block mb-2`}>Invoice Date</label>
                    <div className={`relative flex items-center px-4 py-3 rounded-md border ${fieldBg}`}>
                        <ReactDatePicker
                            ref={datePickerRef}
                            id="invoiceDate"
                            selected={invoiceDate}
                            onChange={date => onChange("invoiceDate", date ?? invoiceDate)}
                            dateFormat="dd MMM yyyy"
                            className={`outline-none bg-transparent text-heading w-full cursor-pointer ${isDark ? "text-white" : "text-dark-navy"}`}
                            popperClassName={isDark ? "" : "light-calendar"} />
                        <Calendar
                            size={16}
                            className="text-grey-blue flex-shrink-0 absolute right-4 cursor-pointer"
                            onClick={() => datePickerRef.current?.setOpen(true)}
                        />
                    </div>
                </div>

                {/* Payment Terms */}
                <div className="relative">
                    <label className={`${labelClass} block mb-2`}>Payment Terms</label>
                    <button
                        type="button"
                        onClick={() => setTermsOpen(prev => !prev)}
                        aria-expanded={termsOpen}
                        aria-haspopup="listbox"
                        aria-label="Payment Terms"
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-md border cursor-pointer ${fieldBg}`}
                    >
                        <span className="text-heading">
                            {termOptions.find(t => t.value === paymentTerms)?.label}
                        </span>
                        <ChevronDown
                            size={16}
                            className={`text-purple-primary transition-transform ${termsOpen ? "rotate-180" : ""}`}
                        />
                    </button>
                    {termsOpen && (
                        <div className={`absolute top-full left-0 w-full rounded-lg shadow-xl z-10 overflow-hidden mt-2
              ${isDark ? "bg-dark-card" : "bg-white"}`}
                        >
                            {termOptions.map(option => (
                                <div
                                    key={option.value}
                                    onClick={() => {
                                        onChange("paymentTerms", option.value);
                                        setTermsOpen(false);
                                    }}
                                    className={`px-4 py-4 text-heading cursor-pointer border-b transition-colors
                    ${option.value === paymentTerms ? "text-purple-primary" : isDark ? "text-white" : "text-dark-navy"}
                    ${isDark ? "border-dark-bg hover:text-purple-primary" : "border-light-lavender hover:text-purple-primary"}`}
                                >
                                    {option.label}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Project Description */}
            <div>
                <div className="flex justify-between mb-2">
                    <label htmlFor="description" className={labelClass}>Project Description</label>
                    {errors.description && (
                        <span className="text-red-primary text-body">{errors.description}</span>
                    )}
                </div>
                <input
                    id="description"
                    className={inputClass(errors.description)}
                    value={description}
                    onChange={e => onChange("description", e.target.value)}
                    placeholder="e.g. Graphic Design Service"
                />
            </div>
        </div>
    );
}
