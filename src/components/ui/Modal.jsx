import { useEffect, useRef } from "react";
import { useTheme } from "../../context/ThemeContext";

export default function Modal({ isOpen, invoiceId, onConfirm, onCancel }) {
    const { isDark } = useTheme();
    const modalRef = useRef(null);

    useEffect(() => {
        if (!isOpen) return;

        const modal = modalRef.current;
        const focusable = modal.querySelectorAll('button, [href], input, [tabindex]:not([tabindex="-1"])');
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        first?.focus();

        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onCancel();
                return;
            }
            if (e.key === "Tab") {
                if (e.shiftKey) {
                    if (document.activeElement === first) {
                        e.preventDefault();
                        last.focus();
                    }
                } else {
                    if (document.activeElement === last) {
                        e.preventDefault();
                        first.focus();
                    }
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onCancel]);

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 bg-black/50 z-50" onClick={onCancel} />
            <div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[480px] max-w-[90vw] rounded-lg p-12
                ${isDark ? "bg-dark-card" : "bg-white"}`}
            >
                <h2 id="modal-title" className={`text-heading mb-4 ${isDark ? "text-white" : "text-dark-navy"}`}>
                    Confirm Deletion
                </h2>
                <p className={`text-body mb-8 ${isDark ? "text-grey-medium" : "text-grey-blue"}`}>
                    Are you sure you want to delete invoice #{invoiceId}? This action cannot be undone.
                </p>
                <div className="flex items-center justify-end gap-2">
                    <button onClick={onCancel} className="btn-secondary">
                        Cancel
                    </button>
                    <button onClick={onConfirm} className="btn-delete">
                        Delete
                    </button>
                </div>
            </div>
        </>
    );
}
