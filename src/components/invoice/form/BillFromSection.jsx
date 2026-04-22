import { useTheme } from "../../../context/ThemeContext";

export default function BillFromSection({ data, errors, onChange }) {
    const { isDark } = useTheme();

    const inputBase = `w-full px-4 py-3 rounded-md border text-heading outline-none transition-all`;
    const inputTheme = isDark
        ? "bg-dark-card text-white border-dark-card focus:border-purple-primary"
        : "bg-white text-dark-navy border-light-lavender focus:border-purple-primary";
    const inputClass = (err) => `${inputBase} ${inputTheme} ${err ? "!border-red-primary" : ""}`;
    const labelClass = `text-body ${isDark ? "text-grey-medium" : "text-grey-blue"}`;

    return (
        <div className="mb-10">
            <p className="text-body font-bold text-purple-primary mb-6">Bill From</p>

            <div className="flex flex-col gap-6">
                <div>
                    <div className="flex justify-between mb-2">
                        <label htmlFor="billFrom-street" className={labelClass}>Street Address</label>
                        {errors.billFromStreet && <span className="text-red-primary text-body">{errors.billFromStreet}</span>}
                    </div>
                    <input
                        id="billFrom-street"
                        className={inputClass(errors.billFromStreet)}
                        value={data.street}
                        onChange={e => onChange("street", e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                        <div className="flex justify-between mb-2">
                            <label htmlFor="billFrom-city" className={labelClass}>City</label>
                            {errors.billFromCity && <span className="text-red-primary text-body">{errors.billFromCity}</span>}
                        </div>
                        <input
                            id="billFrom-city"
                            className={inputClass(errors.billFromCity)}
                            value={data.city}
                            onChange={e => onChange("city", e.target.value)}
                        />
                    </div>
                    <div>
                        <div className="flex justify-between mb-2">
                            <label htmlFor="billFrom-postCode" className={labelClass}>Post Code</label>
                            {errors.billFromPostCode && <span className="text-red-primary text-body">{errors.billFromPostCode}</span>}
                        </div>
                        <input
                            id="billFrom-postCode"
                            className={inputClass(errors.billFromPostCode)}
                            value={data.postCode}
                            onChange={e => onChange("postCode", e.target.value)}
                        />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex justify-between mb-2">
                            <label htmlFor="billFrom-country" className={labelClass}>Country</label>
                            {errors.billFromCountry && <span className="text-red-primary text-body">{errors.billFromCountry}</span>}
                        </div>
                        <input
                            id="billFrom-country"
                            className={inputClass(errors.billFromCountry)}
                            value={data.country}
                            onChange={e => onChange("country", e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
