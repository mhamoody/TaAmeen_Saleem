import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export default function Modal({ open, onClose, title, children, id = 'dialog-title' }) {
  const dialog = useRef(null);
  useEffect(() => {
    if (!open) { dialog.current?.close(); return; }
    const previousOverflow = document.body.style.overflow;
    dialog.current?.showModal();
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; dialog.current?.close(); };
  }, [open]);
  return (
    <dialog ref={dialog} onCancel={onClose} onClose={onClose} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }} aria-labelledby={id} className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-32px)] max-w-xl overflow-y-auto rounded-3xl bg-white p-0 shadow-2xl">
      <div className="p-6 sm:p-8">
        <div className="mb-6 flex items-start justify-between gap-5">
          <h2 id={id} className="text-xl font-bold leading-9">{title}</h2>
          <button onClick={onClose} aria-label="إغلاق" className="flex size-10 shrink-0 items-center justify-center rounded-full bg-wash text-muted hover:text-brand"><X size={20} /></button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
