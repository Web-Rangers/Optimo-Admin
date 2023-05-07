import { useState, useEffect } from 'react';
import styles from '@styles/components/ui/Table.module.scss';
import { ReactSVG } from 'react-svg';
import classNames from 'classnames';
import Link from 'next/link';

interface ColumnDefinition {
    key: string;
    title: string;
    dataIndex: any;
    headerStyle?: React.CSSProperties;
    cellStyle?: React.CSSProperties;
    render?: (record: any, key: any) => React.ReactNode;
}

interface Pagination {
    pageSize: number;
    initialPage?: number;
}

interface TableProps {
    columns: ColumnDefinition[];
    data: any[];
    pagination?: Pagination;
    className?: string;
    rowClassName?: string;
    cellClassName?: string;
    headerClassName?: string;
    bodyClassName?: string;
    detailedUrl?: string;
    querys?: string;
    certificate?: string;
    linkable?: boolean;
}

export default function Table({
    columns = [],
    data = [],
    pagination,
    rowClassName,
    cellClassName,
    headerClassName,
    bodyClassName,
    className,
}: TableProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [diplayedData, setDisplayedData] = useState([]);
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);

    const getStartPage = () => {
        return (currentPage - 1) * (pagination?.pageSize || 10) + 1;
    };

    const getEndPage = () => {
        return Math.min(
            currentPage * (pagination?.pageSize || 10),
            data.length
        );
    };

    const selectPage = (selectedOption) => {
        setCurrentPage(selectedOption.value);
        setSelectedOption(selectedOption);
    };

    useEffect(() => {
        if (!pagination) return setDisplayedData(data);
        setSelectedOption(options[currentPage - 1]);
        setOptions(
            Array.from(
                Array(
                    Math.ceil(data.length / (pagination.pageSize || 10))
                ).keys()
            ).map((i) => ({ value: i + 1, label: i + 1 }))
        );
        setDisplayedData(
            data.slice(
                (currentPage - 1) * (pagination.pageSize || 10),
                currentPage * (pagination.pageSize || 10)
            )
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, data?.length]);

    const tableHeader = (
        <div
            className={styles.headerBack}
            onScroll={(event) => {
                const target = event.target as HTMLElement;
                const header = target.parentNode.querySelector(
                    `.${styles.tableBody}`
                );
                if (target.scrollLeft !== header.scrollLeft)
                    header.scrollTo(target.scrollLeft, 0);
            }}
        >
            <div
                className={classNames(
                    styles.tableHeader,
                    styles.tableRowTemplate,
                    rowClassName,
                    headerClassName
                )}
            >
                {columns.map(({ key, title, headerStyle }) => {
                    return (
                        <div
                            className={`${styles.tableHeaderCell} ${styles.tableCellTemplate} ${cellClassName}`}
                            style={headerStyle ? headerStyle : null}
                            key={key}
                        >
                            {title}
                        </div>
                    );
                })}
            </div>
        </div>
    );

    return (
        <div className={classNames(styles.table, className)}>
            {tableHeader}
            <div
                className={classNames(styles.tableBody, bodyClassName)}
                onScroll={(event) => {
                    const target = event.target as HTMLElement;
                    const header = target.parentNode?.querySelector(
                        `.${styles.headerBack as string}`
                    );
                    if (target.scrollLeft !== header?.scrollLeft)
                        header?.scrollTo(target.scrollLeft, 0);
                }}
            >
                {diplayedData?.map((record, index) => {
                    return (
                        record && (
                            <TableRow
                                columnsDefinition={columns}
                                record={record}
                                key={`table-row-${index}`}
                                rowClassName={rowClassName}
                                cellClassName={cellClassName}
                            />
                        )
                    );
                })}
            </div>
            {pagination ? (
                <div className={styles.pagination}>
                    <div className={styles.recordCounter}></div>
                    <div className={styles.paginationControls}>
                        <div className={styles.paginationButtons}>
                            <ReactSVG
                                src="/images/icons/ui/Prev.svg"
                                className={`${styles.paginationBtn} ${
                                    currentPage === 1 ? styles.disable : ''
                                }`}
                                onClick={() => {
                                    setCurrentPage((origin) => origin - 1);
                                }}
                            />
                            {options.map((option, index) => {
                                return (
                                    <div
                                        key={`option-${index}`}
                                        className={classNames(
                                            styles.paginationOption,
                                            {
                                                [`${
                                                    styles.currentOption as string
                                                }`]:
                                                    currentPage ===
                                                    option.value,
                                            }
                                        )}
                                        onClick={() => {
                                            setCurrentPage(option.value);
                                        }}
                                    >
                                        {option.label}
                                    </div>
                                );
                            })}
                            <ReactSVG
                                src="/images/icons/ui/Next.svg"
                                className={`${styles.paginationBtn} ${
                                    currentPage === options.length
                                        ? styles.disable
                                        : ''
                                }`}
                                onClick={() => {
                                    setCurrentPage((origin) => origin + 1);
                                }}
                            />
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

interface TableRowProps {
    columnsDefinition: ColumnDefinition[];
    record: any;
    rowClassName?: string;
    cellClassName?: string;
}

const TableRow = ({
    record,
    columnsDefinition,
    rowClassName,
    cellClassName,
}: TableRowProps) => {
    return (
        <div
            className={classNames(
                styles.tableRow,
                styles.tableRowTemplate,
                rowClassName
            )}
        >
            {columnsDefinition.map(
                ({ dataIndex, render, cellStyle }, index) => {
                    if (render) {
                        return render(
                            record[dataIndex],
                            `data-${record.key}-${index}`
                        );
                    }
                    return (
                        <>
                            <div
                                className={`${styles.tableCell} ${styles.tableCellTemplate} ${cellClassName}`}
                                key={`data-${record.key}-${index}`}
                                style={cellStyle ? cellStyle : null}
                            >
                                {record[dataIndex]}
                            </div>
                        </>
                    );
                }
            )}
        </div>
    );
};
