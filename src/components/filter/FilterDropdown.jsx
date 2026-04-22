import { useRef, useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useInvoices } from "../../context/InvoiceContext";
import { useTheme } from "../../context/ThemeContext";

export default function FilterDropdown() {
    const { filter, setFilter } = useInvoices();
    const { isDark } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const options = ["draft", "pending", "paid"];

    const handleCheck = (status) => {
        setFilter(prev =>
            prev.includes(status) ? [] : [status]
        );
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={dropdownRef} className="relative">
            <button
                onClick={() => setIsOpen(prev => !prev)}
                className={`flex items-center gap-3 text-heading cursor-pointer
          ${isDark ? "text-white" : "text-dark-navy"}`}
            >
                <span className="hidden md:inline">Filter by status</span>
                <span className="md:hidden">Filter</span>
                {isOpen
                    ? <ChevronUp size={16} className="text-purple-primary" />
                    : <ChevronDown size={16} className="text-purple-primary" />
                }
            </button>

            {isOpen && (
                <div className={`absolute top-8 left-1/2 -translate-x-1/2 w-[192px] rounded-lg shadow-xl p-6 flex flex-col gap-4 z-50
          ${isDark ? "bg-dark-card" : "bg-white"}`}
                >
                    {options.map(option => (
                        <label
                            key={option}
                            className="flex items-center gap-4 cursor-pointer group"
                            onMouseDown={(e) => {
                                e.preventDefault();
                                handleCheck(option);
                            }}
                        >
                            <div className={`w-4 h-4 rounded-sm border-2 flex items-center justify-center transition-all flex-shrink-0
                ${filter.includes(option)
                                    ? "bg-purple-primary border-purple-primary"
                                    : "border-grey-medium group-hover:border-purple-primary"
                                }`}
                            >
                                {filter.includes(option) && (
                                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )}
                            </div>
                            <span className={`capitalize font-bold text-body
                ${isDark ? "text-white" : "text-dark-navy"}`}
                            >
                                {option}
                            </span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}