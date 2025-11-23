import css from './Modal.module.css';
import { createPortal } from 'react-dom';
import type { Note } from '../../types/note';
import { useEffect } from 'react';

interface ModalProps {
  onClose: () => void;
  note: Note[];
}

export default function Modal({ note, onClose }: ModalProps) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>
        {
          <button
            className={css.closeButton}
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </button>
        }
      </div>
    </div>
  );
}
