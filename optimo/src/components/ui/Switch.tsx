import styles from '@styles/components/ui/Switch.module.scss';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

interface SwitchProps {
    className?: string;
    checked?: boolean;
    onChange?: () => void;
    label?: string;
}

const Switch = ({
    className,
    checked = false,
    onChange = () => null,
    label = '',
}: SwitchProps) => {
    return (
        <div className={styles.switch}>
            <div
                className={classNames(styles.container, className, {
                    [`${styles.active}`]: checked,
                })}
                onClick={onChange}
            >
                <div className={styles.circle}></div>
            </div>
            <span className={styles.label}>{label}</span>
        </div>
    );
};

export default Switch;
