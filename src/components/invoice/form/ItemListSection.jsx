import { Trash2 } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";
import { formatCurrency } from "../../../utils/helpers";

export default function ItemListSection({ items, errors, onAdd, onUpdate, onRemove }) {
    const { isDark } = useTheme();

    const inputBase = `w-full px-4 py-3 rounded-md border text-heading outline-none transition-all`;
    const inputTheme = isDark
        ? "bg-dark-card text-white border-dark-card focus:border-purple-primary"
        : "bg-white text-dark-navy border-light-lavender focus:border-purple-primary";
    const inputClass = (err) => `${inputBase} ${inputTheme} ${err ? "!border-red-primary" : ""}`;
    const labelClass = `text-body ${isDark ? "text-grey-medium" : "text-grey-blue"}`;

    return (
        <div className="mb-6">
            <p className={`text-lg font-bold mb-6 ${isDark ? "text-grey-medium" : "text-[#777F98]"}`}>
                Item List
            </p>

            {/* Desktop headers */}
            {items.length > 0 && (
                <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 mb-4">
                    <span className={labelClass}>Item Name</span>
                    <span className={labelClass}>Qty.</span>
                    <span className={labelClass}>Price</span>
                    <span className={labelClass}>Total</span>
                    <span />
                </div>
            )}

            <div className="flex flex-col gap-6 mb-6">
                {items.map((item, index) => (
                    <div key={index}>

                        {/* Mobile layout */}
                        <div className="md:hidden flex flex-col gap-4">
                            <div>
                                <label htmlFor={`item-name-${index}`} className={labelClass}>Item Name</label>
                                <input
                                    id={`item-name-${index}`}
                                    className={inputClass(errors[`itemName${index}`])}
                                    value={item.name}
                                    onChange={e => onUpdate(index, "name", e.target.value)}
                                />
                            </div>
                            <div className="grid grid-cols-3 gap-4 items-end">
                                <div>
                                    <label htmlFor={`item-qty-${index}`} className={labelClass}>Qty.</label>
                                    <input
                                        id={`item-qty-${index}`}
                                        type="number"
                                        className={inputClass(errors[`itemQty${index}`])}
                                        value={item.quantity}
                                        onChange={e => onUpdate(index, "quantity", e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor={`item-price-${index}`} className={labelClass}>Price</label>
                                    <input
                                        id={`item-price-${index}`}
                                        type="number"
                                        className={inputClass(errors[`itemPrice${index}`])}
                                        value={item.price}
                                        onChange={e => onUpdate(index, "price", e.target.value)}
                                    />
                                </div>
                                <div className="flex items-end gap-3">
                                    <div>
                                        <label className={labelClass}>Total</label>
                                        <p className={`text-heading pt-3 ${isDark ? "text-grey-medium" : "text-grey-blue"}`}>
                                            {formatCurrency(item.total)}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => onRemove(index)}
                                        aria-label={`Remove item ${index + 1}`}
                                        className="mb-1 text-grey-medium hover:text-red-primary transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Desktop layout */}
                        <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 items-center">
                            <input
                                aria-label="Item Name"
                                className={inputClass(errors[`itemName${index}`])}
                                value={item.name}
                                onChange={e => onUpdate(index, "name", e.target.value)}
                            />
                            <input
                                aria-label="Quantity"
                                type="number"
                                className={inputClass(errors[`itemQty${index}`])}
                                value={item.quantity}
                                onChange={e => onUpdate(index, "quantity", e.target.value)}
                            />
                            <input
                                aria-label="Price"
                                type="number"
                                className={inputClass(errors[`itemPrice${index}`])}
                                value={item.price}
                                onChange={e => onUpdate(index, "price", e.target.value)}
                            />
                            <p className={`text-heading ${isDark ? "text-grey-medium" : "text-grey-blue"}`}>
                                {formatCurrency(item.total)}
                            </p>
                            <button
                                onClick={() => onRemove(index)}
                                aria-label={`Remove item ${index + 1}`}
                                className="text-grey-medium hover:text-red-primary transition-colors"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>

                    </div>
                ))}
            </div>

            {/* Add New Item */}
            <button onClick={onAdd} className="btn-secondary w-full">
                + Add New Item
            </button>

            {/* Global errors */}
            {Object.keys(errors).length > 0 && (
                <div className="mt-6">
                    {errors.items && (
                        <p className="text-red-primary text-body">- {errors.items}</p>
                    )}
                    {Object.keys(errors).some(k => k !== "items") && (
                        <p className="text-red-primary text-body">- All fields must be added</p>
                    )}
                </div>
            )}
        </div>
    );
}
