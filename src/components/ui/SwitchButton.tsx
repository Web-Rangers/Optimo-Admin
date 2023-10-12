import styles from '@styles/components/ui/SwitchButton.module.scss';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';

interface SwitchButtonProps {
    defaultChecked?: boolean;
    checked?: boolean;
    onClick?: () => void;
    falseLabel?: string;
    trueLabel?: string;
}

const SwitchButton = ({
    checked,
    onClick,
    falseLabel,
    trueLabel,
}: SwitchButtonProps) => {
    const [value, setValue] = useState<boolean>(false);
    const defaultClickHandler = () => {
        setValue((origin) => !origin);
    };
    useEffect(() => {
        if (checked !== undefined) setValue(checked);
    }, [checked]);
    return (
        <div
            className={styles.inputContainer}
            onClick={onClick ?? defaultClickHandler}
        >
            <span className={styles.label}>
                {value ? trueLabel : falseLabel}
            </span>
            <ReactSVG
                className={classNames(styles.icon, {
                    [`${styles.rotate as string}`]: value,
                })}
                src="/images/icons/ui/ChevronDown.svg"
            />
        </div>
    );
};

export default SwitchButton;
