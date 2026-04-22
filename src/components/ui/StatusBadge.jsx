import { useTheme } from "../../context/ThemeContext";

export default function StatusBadge({ status }) {
    const { isDark } = useTheme();

    const darkStyles = {
        paid: "bg-[#1F2B3A] text-[#33D69F]",
        pending: "bg-[#2B2736] text-[#FF8F00]",
        draft: "bg-[#292C44] text-[#888EB0]",
    };

    const lightStyles = {
        paid: "bg-[#F3FDFA] text-[#33D69F]",
        pending: "bg-[#FFF8F0] text-[#FF8F00]",
        draft: "bg-[#F4F4F5] text-[#888EB0]",
    };

    const dotColors = {
        paid: "bg-[#33D69F]",
        pending: "bg-[#FF8F00]",
        draft: "bg-[#888EB0]",
    };

    const styles = isDark ? darkStyles : lightStyles;

    return (
        <div className={`flex items-center gap-2 px-4 py-3 rounded-md font-bold text-[12px] w-[80px] justify-center ${styles[status]}`}>
            <span className={`w-2 h-2 rounded-full ${dotColors[status]}`} />
            <span className="capitalize">{status}</span>
        </div>
    );
}