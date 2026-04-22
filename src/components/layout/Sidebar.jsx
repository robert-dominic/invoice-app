import { useTheme } from "../../context/ThemeContext";
import { Moon, Sun } from "lucide-react";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.jpg";

export default function Sidebar() {
    const { isDark, toggleTheme } = useTheme();

    return (
        <>
            {/* Desktop/Tablet Sidebar — vertical, fixed left */}
            <aside className={`hidden md:flex fixed left-0 top-0 md:h-screen w-[85px] flex-col justify-between items-center rounded-r-[20px] z-50 ${isDark ? "bg-dark-card" : "bg-[#373B53]"}`}>

                {/* Logo */}
                <div className="w-full h-[90px] bg-purple-primary rounded-r-[20px] flex items-center justify-center relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-purple-light rounded-tl-[20px]" />
                    <img src={logo} alt="logo" className="w-8 h-8 relative z-10" />
                </div>

                {/* Bottom — theme toggle + avatar */}
                <div className="flex flex-col items-center gap-6 pb-6">
                    <button onClick={toggleTheme} aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"} className="cursor-pointer">
                        {isDark
                            ? <Sun size={20} className="text-grey-medium" />
                            : <Moon size={20} className="text-grey-medium" />
                        }
                    </button>
                    <div className="w-20 h-[1px] bg-grey-medium opacity-20" />
                    <img
                        src={avatar}
                        alt="avatar"
                        className="w-10 h-10 rounded-full object-cover"
                    />
                </div>
            </aside>

            {/* Mobile Header — horizontal, fixed top */}
            <header className={`md:hidden overflow-hidden fixed -top-2 left-0 right-0 h-[70px] flex justify-between items-center z-50 shadow-[0_10px_20px_-16px_rgba(0,0,0,0.45)] ${isDark ? "bg-dark-card" : "bg-[#373B53]"}`}>

                {/* Logo */}
                <div className="h-[60px] w-[60px] bg-purple-primary rounded-r-[20px] flex items-center justify-center relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-purple-light rounded-tl-[20px]" />
                    <img src={logo} alt="logo" className="w-6 h-6 relative z-10" />
                </div>

                {/* Right — theme toggle + avatar */}
                <div className="flex items-center gap-6 pr-4">
                    <button onClick={toggleTheme} aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"} className="cursor-pointer">
                        {isDark
                            ? <Sun size={20} className="text-grey-medium" />
                            : <Moon size={20} className="text-grey-medium" />
                        }
                    </button>
                    <div className="w-[1px] h-10 bg-grey-medium opacity-20" />
                    <img
                        src={avatar}
                        alt="avatar"
                        className="w-8 h-8 rounded-full object-cover"
                    />
                </div>
            </header>
        </>
    );
}
