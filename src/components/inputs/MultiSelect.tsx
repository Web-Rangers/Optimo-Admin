import classNames from 'classnames';
import styles from '@styles/components/inputs/MultiSelect.module.scss';
import { ReactSVG } from 'react-svg';
import { useState } from 'react';
import Input from './Input';

interface SelectItem {
    value: string;
    title: string;
}

interface SelectProps {
    title?: string;
    defaultValue?: string[];
    className?: string;
    items: SelectItem[];
    showChackBox?: boolean;
    placeholder?: string;
    onSelect: (selectedItems: string[]) => void;
}

export default function Select({
    title,
    items,
    defaultValue,
    onSelect,
    showChackBox = false,
    placeholder,
    className,
}: SelectProps) {
    const [selectedItem, setSelectedItem] = useState<string[]>(
        defaultValue ?? []
    );
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div className={classNames([styles.inputContainer, className])}>
            {title ? <span className={styles.label}>{title}</span> : null}
            <div
                className={styles.input}
                onClick={() => {
                    setIsOpen((origin) => !origin);
                }}
            >
                <div className={styles.selectedItems}>
                    {selectedItem.length > 0 ? (
                        <span>
                            {items
                                .filter(
                                    (item) =>
                                        selectedItem.indexOf(item.value) > -1
                                )
                                .map((item, i) => item.title)
                                .join(', ')}
                        </span>
                    ) : (
                        <span className={styles.placeholder}>
                            {placeholder}
                        </span>
                    )}
                    <ReactSVG src="/images/icons/ui/ChevronDownGray.svg" />
                </div>
                <div
                    className={classNames(styles.itemWrapper, {
                        [`${styles.open as string}`]: isOpen,
                    })}
                >
                    <Input
                        icon={
                            <ReactSVG
                                src="/images/icons/ui/Search.svg"
                                className={styles.searchicon}
                            />
                        }
                        onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                        }}
                        placeholder="Search"
                        className={styles.search}
                    />
                    {items.map((item, key) => (
                        <div
                            key={key}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (selectedItem.indexOf(item.value) === -1) {
                                    setSelectedItem([
                                        item.value,
                                        ...selectedItem,
                                    ]);
                                    onSelect([item.value, ...selectedItem]);
                                }
                                if (selectedItem.indexOf(item.value) > -1) {
                                    const arr: string[] = [...selectedItem];
                                    arr.splice(
                                        selectedItem.indexOf(item.value),
                                        1
                                    );
                                    setSelectedItem(arr);
                                    onSelect(arr);
                                }
                            }}
                            className={styles.selectItem}
                        >
                            <ReactSVG
                                src={`/images/icons/flags/${item.value}.svg`}
                            />
                            <span>{item.title}</span>
                            {showChackBox ? (
                                <div
                                    className={classNames(styles.check, {
                                        [`${styles.checked as string}`]:
                                            selectedItem.indexOf(item.value) >
                                            -1,
                                    })}
                                ></div>
                            ) : null}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
