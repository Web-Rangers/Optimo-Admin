import classNames from 'classnames';
import styles from '@styles/components/inputs/Inputs.module.scss';
import { ReactSVG } from 'react-svg';
import { useEffect, useState, useRef } from 'react';

interface TimePickerProps {
    className?: string;
    label?: string;
    value?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
    name?: string;
}

export default function TimePicker({
    className,
    label,
    value,
    placeholder,
    onChange,
    name,
}: TimePickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [valueTime, setValuseTime] = useState(value ?? '');
    const dateField = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setValuseTime(value ?? '');
    }, [value]);

    return (
        <div className={classNames([styles.inputContainer, className])}>
            {label && <span className={styles.label}>{label}</span>}
            <div className={styles.input}>
                <input
                    name={name}
                    value={valueTime}
                    placeholder={placeholder}
                    type="text"
                    ref={dateField}
                    onChange={(event) => {
                        setValuseTime(event.target.value);
                        onChange?.call(null, event.target.value);
                    }}
                />
                <ReactSVG
                    src={'/images/icons/ui/Clock.svg'}
                    className={classNames(styles.iconContainer)}
                    onClick={() => setIsOpen(!isOpen)}
                />
                <Picker
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    onChange={(start: string) => {
                        setValuseTime(start);
                        onChange?.call(null, start);
                    }}
                />
            </div>
        </div>
    );
}

interface PickerProps {
    isOpen?: boolean;
    onChange?: (value: string) => void;
    onClose?: () => void;
}

const Picker = ({ isOpen, onChange, onClose }: PickerProps) => {
    const [hour, setHour] = useState(12);
    const [minute, setMinute] = useState(0);

    useEffect(()=>{
        onChange?.call(null, `${hour.toString().padStart(2,'0')}:${minute.toString().padStart(2,'0')}`)
    },[hour, minute])

    return (
        <div
            className={classNames(styles.pickerContainer, styles.timePicker, {
                [styles.closed as string]: !isOpen,
            })}
        >
            <div className={styles.numberSelect}>
                <ReactSVG
                    className={classNames(styles.rotate, styles.control)}
                    src="/images/icons/ui/ChevronDownGray.svg"
                    onClick={() => {
                        const newValue = hour + 1;
                        setHour(newValue > 23 ? 0 : newValue);
                    }}
                />
                <div className={styles.value}>{hour}</div>
                <ReactSVG
                    className={styles.control}
                    src="/images/icons/ui/ChevronDownGray.svg"
                    onClick={() => {
                        const newValue = hour - 1;
                        setHour(newValue < 0 ? 23 : newValue);
                    }}
                />
            </div>
            <span>:</span>
            <div className={styles.numberSelect}>
                <ReactSVG
                    className={classNames(styles.rotate, styles.control)}
                    src="/images/icons/ui/ChevronDownGray.svg"
                    onClick={() => {
                        const newValue = minute + 1;
                        setMinute(newValue > 59 ? 0 : newValue);
                    }}
                />
                <div className={styles.value}>{minute}</div>
                <ReactSVG
                    className={styles.control}
                    src="/images/icons/ui/ChevronDownGray.svg"
                    onClick={() => {
                        const newValue = minute - 1;
                        setMinute(newValue < 0 ? 59 : newValue);
                    }}
                />
            </div>
        </div>
    );
};
