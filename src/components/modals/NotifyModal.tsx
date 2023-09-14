import classNames from 'classnames';
import styles from '@styles/components/modals/NotifyModal.module.scss';
import Modal from './Modal';
import { ReactSVG } from 'react-svg';

interface ConfirmModalPorps {
    title?: string;
    text?: string;
    acceptText?: string;
    onAccept?: () => void;
    className?: string;
}

export default function NotifyModal({
    title,
    text,
    className,
    acceptText,
    onAccept,
    ...props
}: ConfirmModalPorps) {
    return (
        <Modal onBackClick={() => 0} className={className}>
            <div className={styles.header}>
                <div className={styles.title}>{title}</div>
                <div className={styles.text}>{text}</div>
            </div>
            <div className={styles.buttons}>
                <button
                    onClick={() => {
                        onAccept?.call(null);
                    }}
                    className={styles.fillButton}
                >
                    {acceptText}
                </button>
            </div>
        </Modal>
    );
}
