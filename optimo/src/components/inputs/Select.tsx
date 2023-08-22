import classNames from 'classnames';
import styles from '@styles/components/inputs/Select.module.scss';
import { ReactSVG } from 'react-svg';
import { useState } from 'react';

interface SelectItem {
    value: string;
    title: string;
}

interface SelectProps {
    title: string;
    className?: string;
    items: SelectItem[];
    onSelect: (newItem: string) => void;
}

export default function Select({
    title,
    items,
    onSelect,
    className,
}: SelectProps) {
    const [selectedItem, setSelectedItem] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div className={classNames([styles.inputContainer, className])}>
            <span className={styles.label}>{title}</span>
            <div className={styles.input} onClick={() => 
                {
                    setIsOpen(origin=> !origin);
                }}>
                <div className={styles.selectedItem}>
                    <span>
                        {items.find((item) => item.value === selectedItem)?.title}
                    </span>
                    <ReactSVG src='/images/icons/ui/ChevronDownGray.svg'/>
                </div>
                <div
                    className={classNames(styles.itemWrapper, {
                        [`${styles.open}`]: isOpen,
                    })}
                >
                    {items.map((item, key) => (
                        <div
                            key={key}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setSelectedItem(item.value);
                                onSelect(item.value);
                                setIsOpen(false);
                            }}
                            className={styles.selectItem}
                        >
                            {item.title}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
