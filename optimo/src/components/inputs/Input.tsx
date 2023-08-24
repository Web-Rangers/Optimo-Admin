import classNames from 'classnames';
import styles from '@styles/components/inputs/Input.module.scss';
import { ReactSVG } from 'react-svg';
import { MouseEventHandler } from 'react';

interface InputProps {
    children?: React.ReactNode;
    className?: string;
    type?:
        | 'text'
        | 'time'
        | 'email'
        | 'password'
        | 'select'
        | 'date'
        | 'number';
    value?: string | number;
    onChange?: (value: string | number | any) => void;
    onClick?: MouseEventHandler;
    label?: string;
    multiline?: boolean;
    placeholder?: string;
    style?: React.CSSProperties;
    disabled?: boolean;
    maxLength?: number;
    id?: number | any;
    min?: string | any;
    passRef?: string | any;
    name?: string;
    defaultValue?: string | number;
    labelStyle?: React.CSSProperties;
    icon?: React.ReactNode;
}

export default function Input({
    children,
    className,
    label,
    value,
    placeholder,
    type,
    multiline,
    onChange,
    style,
    disabled,
    maxLength,
    name,
    defaultValue,
    id,
    min,
    passRef,
    labelStyle,
    icon,
    onClick,
    ...props
}: InputProps) {
    if (type === 'text' && multiline) {
        return (
            <div
                className={classNames([styles.inputContainer, className])}
                onClick={onClick}
            >
                {label && (
                    <span style={labelStyle} className={styles.label}>
                        {label}
                    </span>
                )}
                <div className={styles.input}>
                    <textarea
                        name={name}
                        defaultValue={defaultValue}
                        value={value}
                        placeholder={placeholder}
                        style={style}
                        onChange={(event) =>
                            onChange?.call(null, event.target.value)
                        }
                        ref={passRef}
                    />
                </div>
            </div>
        );
    }
    return (
        <div
            className={classNames([styles.inputContainer, className])}
            onClick={onClick}
        >
            {label && (
                <span style={labelStyle} className={styles.label}>
                    {label}
                </span>
            )}
            <div className={styles.input}>
                {icon ?? icon}
                <input
                    name={name}
                    defaultValue={defaultValue}
                    disabled={disabled}
                    value={value}
                    placeholder={placeholder}
                    type={type}
                    onChange={(event) =>
                        onChange?.call(null, event.target.value)
                    }
                    maxLength={maxLength}
                    id={id}
                    ref={passRef}
                    min={min}
                />
                {type === 'time' && (
                    <ReactSVG
                        src={'/images/icons/inputs/clock.svg'}
                        className={classNames(styles.iconContainer)}
                    />
                )}
                {type === 'password' && (
                    <ReactSVG
                        src={'/images/icons/inputs/eye-off.svg'}
                        className={classNames(styles.iconContainer)}
                    />
                )}
            </div>
        </div>
    );
}
