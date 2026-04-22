import { useTheme } from "../../../context/ThemeContext";

export default function BillToSection({ data, clientName, clientEmail, errors, onChange, onChangeClient }) {
    const { isDark } = useTheme();

    const inputBase = `w-full px-4 py-3 rounded-md border text-heading outline-none transition-all`;
    const inputTheme = isDark
        ? "bg-dark-card text-white border-dark-card focus:border-purple-primary"
        : "bg-white text-dark-navy border-light-lavender focus:border-purple-primary";
    const inputClass = (err) => `${inputBase} ${inputTheme} ${err ? "!border-red-primary" : ""}`;
    const labelClass = `text-body ${isDark ? "text-grey-medium" : "text-grey-blue"}`;

    return (
        <div className="mb-10">
            <p className="text-body font-bold text-purple-primary mb-6">Bill To</p>

            <div className="flex flex-col gap-6">
                <div>
                    <div className="flex justify-between mb-2">
                        <label htmlFor="clientName" className={labelClass}>Client's Name</label>
                        {errors.clientName && <span className="text-red-primary text-body">{errors.clientName}</span>}
                    </div>
                    <input
                        id="clientName"
                        className={inputClass(errors.clientName)}
                        value={clientName}
                        onChange={e => onChangeClient("clientName", e.target.value)}
                    />
                </div>

                <div>
                    <div className="flex justify-between mb-2">
                        <label htmlFor="clientEmail" className={labelClass}>Client's Email</label>
                        {errors.clientEmail && <span className="text-red-primary text-body">{errors.clientEmail}</span>}
                    </div>
                    <input
                        id="clientEmail"
                        className={inputClass(errors.clientEmail)}
                        value={clientEmail}
                        onChange={e => onChangeClient("clientEmail", e.target.value)}
                        placeholder="e.g. email@example.com"
                    />
                </div>

                <div>
                    <div className="flex justify-between mb-2">
                        <label htmlFor="billTo-street" className={labelClass}>Street Address</label>
                        {errors.billToStreet && <span className="text-red-primary text-body">{errors.billToStreet}</span>}
                    </div>
                    <input
                        id="billTo-street"
                        className={inputClass(errors.billToStreet)}
                        value={data.street}
                        onChange={e => onChange("street", e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                        <div className="flex justify-between mb-2">
                            <label htmlFor="billTo-city" className={labelClass}>City</label>
                            {errors.billToCity && <span className="text-red-primary text-body">{errors.billToCity}</span>}
                        </div>
                        <input
                            id="billTo-city"
                            className={inputClass(errors.billToCity)}
                            value={data.city}
                            onChange={e => onChange("city", e.target.value)}
                        />
                    </div>
                    <div>
                        <div className="flex justify-between mb-2">
                            <label htmlFor="billTo-postCode" className={labelClass}>Post Code</label>
                            {errors.billToPostCode && <span className="text-red-primary text-body">{errors.billToPostCode}</span>}
                        </div>
                        <input
                            id="billTo-postCode"
                            className={inputClass(errors.billToPostCode)}
                            value={data.postCode}
                            onChange={e => onChange("postCode", e.target.value)}
                        />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex justify-between mb-2">
                            <label htmlFor="billTo-country" className={labelClass}>Country</label>
                            {errors.billToCountry && <span className="text-red-primary text-body">{errors.billToCountry}</span>}
                        </div>
                        <input
                            id="billTo-country"
                            className={inputClass(errors.billToCountry)}
                            value={data.country}
                            onChange={e => onChange("country", e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
