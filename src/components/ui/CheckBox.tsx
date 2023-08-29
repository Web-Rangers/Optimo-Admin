import classNames from 'classnames';
import styles from '@styles/components/ui/CheckBox.module.scss';

interface CheckBoxProps {
    className?: string;
    label?: string;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    checkStyle?: "check" | "fill";
    id?: string;
}

export default function CheckBox({
    className,
    label,
    checked,
    onChange,
    id,
    checkStyle = 'check',
    ...props
}: CheckBoxProps) {
    return (
        <>
            <input
                id={id}
                type={'checkbox'}
                className={classNames([styles.checkBox, className])}
                checked={checked}
                onChange={() => onChange && onChange(!checked)}
            />
            <label  htmlFor={id} className={classNames(styles.checkBoxLabel, styles[checkStyle])}>
                {label}
            </label>
        </>
    );
}
