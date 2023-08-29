import classNames from 'classnames';
import styles from '@styles/components/modals/ConfirmModal.module.scss';
import Modal from './Modal';
import { ReactSVG } from 'react-svg';

interface ConfirmModalPorps {
    title?: string;
    text?: string;
    acceptText?: string;
    cancelText?: string;
    onAccept?: () => void;
    className?: string;
    onBackClick?: () => void;
}

export default function ConfirmModal({
    title,
    text,
    className,
    acceptText,
    cancelText,
    onBackClick,
    onAccept,
    ...props
}: ConfirmModalPorps) {
    return (
        <Modal onBackClick={onBackClick} className={className}>
            <div className={styles.header}>
                <div className={styles.title}>{title}</div>
                <div className={styles.close} onClick={onBackClick}>
                    <ReactSVG src="/images/icons/ui/X.svg" />
                </div>
            </div>
            <div className={styles.text}>{text}</div>
            <div className={styles.buttons}>
                <button onClick={onBackClick} className={styles.outlineButton}>
                    {cancelText}
                </button>
                <button
                    onClick={() => {
                        onAccept?.call(null);
                        onBackClick?.call(null);
                    }}
                    className={styles.fillButton}
                >
                    {acceptText}
                </button>
            </div>
        </Modal>
    );
}
