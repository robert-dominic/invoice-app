import { useTheme } from "../../../context/ThemeContext";

export default function FormFooter({ isEdit, onClose, onSaveAsDraft, onSaveAndSend, onSaveChanges }) {
    const { isDark } = useTheme();

    return (
        <div className={`sticky bottom-0 px-6 md:px-14 py-6 ${isDark ? "bg-dark-bg" : "bg-white"}`}
        >
            {isEdit ? (
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className={`h-12 px-6 md:px-8 rounded-full text-heading transition-colors cursor-pointer
                            ${isDark ? "bg-dark-card text-light-lavender hover:bg-[#34395b]" : "bg-light-lavender text-grey-blue hover:bg-[#d7dcef]"}`}
                    >
                        Cancel
                    </button>
                    <button onClick={onSaveChanges} className="btn-base-purple px-7 md:px-10">
                        Save Changes
                    </button>
                </div>
            ) : (
                <div className="flex items-center">
                    <button onClick={onClose} className="btn-base-lavender">
                        Discard
                    </button>
                    <div className="flex gap-2 ml-auto">
                        <button onClick={onSaveAsDraft} className="btn-base-dark">
                            Save as Draft
                        </button>
                        <button onClick={onSaveAndSend} className="btn-base-purple">
                            Save & Send
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
