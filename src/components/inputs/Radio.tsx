import classNames from 'classnames';
import { useState } from 'react';
import styles from '@styles/components/inputs/Radio.module.scss';

interface RadioProps {
    className?: string;
    label?: string;
    checked?: boolean;
    defaultChecked?: boolean;
    name?: string;
    onChange?: (checked: string) => void;
    id?: string;
    value?: string;
}

export default function Radio({
    className,
    label,
    id,
    defaultChecked,
    name,
    value = label || "",
    onChange = undefined
}: RadioProps) {
    const [isChecked, setIsChecked] = useState(defaultChecked);
    return (
        <>
            <input
                id={id}
                type={'radio'}
                className={classNames([styles.radio, className])}
                name={name}
                value={value}
                onChange={(event) => onChange?.call(null, event.target.value)}
                />
            <label htmlFor={id} className={styles.radioLabel}>
                {label}
            </label>
        </>
    );
}
