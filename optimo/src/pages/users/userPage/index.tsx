import type { NextPage } from 'next';
import styles from '@styles/pages/userPage.module.scss';
import { useState } from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import { ReactSVG } from 'react-svg';
import Table from '@components/ui/Table';
import Select from '@components/inputs/Select';

interface StuffProfile {
    name: string;
    photo: string;
    mail: string;
}

interface planeProps {
    value: number;
    currentValue: number;
    children?: React.ReactNode;
}

const data = Array.from(new Array(5).keys()).map((key) => {
    return {
        type: 'Deposit',
        date: '23.03.2023',
        amount: '140 $',
        status: 'Successful',
    };
});

const renderText = (text: string) => {
    return <div className={styles.text}>{text}</div>;
};

const UserPage: NextPage = () => {
    const [tab, setTab] = useState(0);

    const Plane = ({ currentValue, value, children }: planeProps) => {
        return (
            <div
                className={classNames(styles.plane, {
                    [`${styles.show as string}`]: value === currentValue,
                })}
            >
                {children}
            </div>
        );
    };
    const Tab = ({ currentValue, value, children }: planeProps) => {
        return (
            <div
                className={classNames(styles.tab, {
                    [`${styles.current as string}`]: value === currentValue,
                })}
                onClick={() => setTab(value)}
            >
                {children}
            </div>
        );
    };
    const columns = [
        {
            key: 'type',
            title: 'Type',
            dataIndex: 'type',
        },
        {
            key: 'date',
            title: 'Date',
            dataIndex: 'date',
        },
        {
            key: 'amount',
            title: 'Amount',
            dataIndex: 'amount',
        },
        {
            key: 'status',
            title: 'Status',
            dataIndex: 'status',
            render: (text: any) => {
                return (
                    <div className={styles.status}>
                        <div
                            className={classNames(styles.indicator, {
                                [`${styles.green as string}`]:
                                    text === 'Successful',
                                [`${styles.red as string}`]: text === 'Failed',
                                [`${styles.yellow as string}`]:
                                    text === 'In progress',
                            })}
                        ></div>
                        <span className={styles.text}>{text}</span>
                    </div>
                );
            },
        },
    ];

    const [filterOpen, setFilterOpen] = useState(false);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.pageTitle}>Users</div>
                <div className={styles.content}>
                    <div className={styles.leftSide}>
                        <div className={styles.imageContainer}>
                            <Image
                                alt="photo"
                                src={'/images/users/photo1.png'}
                                width={120}
                                height={120}
                            />
                            <div className={styles.lockBlock}>
                                <ReactSVG src="/images/icons/ui/Lock.svg" />
                            </div>
                        </div>
                        <span className={styles.fullName}>
                            Brooklyn Simmons
                        </span>
                        <span className={styles.mail}>
                            vuhaithuongnute@gmail.com
                        </span>
                        <span className={styles.status}>Unblocked</span>
                        <div className={styles.row}>
                            <div className={styles.outlineBlock}>
                                {`1877.74 $`}
                            </div>
                            <div className={styles.outlineBlock}>
                                {`1234.04`}
                                <Image
                                    width={22}
                                    height={22}
                                    src={'/images/icons/coin.png'}
                                    alt="coin"
                                />
                            </div>
                        </div>
                        <div className={styles.statusBlock}>
                            <div className={styles.column}>
                                <span className={styles.name}>Status</span>
                                <span className={styles.value}>Verified</span>
                            </div>
                            <button className={styles.text}>
                                <ReactSVG src="/images/icons/ui/File.svg" />{' '}
                                Look
                            </button>
                        </div>
                    </div>
                    <div className={styles.tabContainer}>
                        <div className={styles.tabList}>
                            <Tab currentValue={tab} value={0}>
                                <ReactSVG src="/images/icons/ui/GraphUp.svg" />
                                <span className={styles.tabTitle}>
                                    Statistic
                                </span>
                            </Tab>
                            <Tab currentValue={tab} value={1}>
                                <ReactSVG src="/images/icons/ui/Transactions.svg" />
                                <span className={styles.tabTitle}>
                                    Transactions
                                </span>
                            </Tab>
                        </div>
                        <div className={styles.planeContainer}>
                            <Plane currentValue={tab} value={0}>
                                <div className={styles.tabTitle}>
                                    Balance
                                    <span className={styles.filterText}>
                                        show data for{' '}
                                        <Select
                                            title=""
                                            items={[
                                                {
                                                    value: 'day',
                                                    title: 'day',
                                                },
                                                {
                                                    value: 'week',
                                                    title: 'week',
                                                },
                                                {
                                                    value: 'month',
                                                    title: 'month',
                                                },
                                                {
                                                    value: 'year',
                                                    title: 'year',
                                                },
                                            ]}
                                            defaultValue="week"
                                            onSelect={() => 0}
                                            variant="text"
                                        />
                                    </span>
                                </div>
                                <div className={styles.doubleBlock}>
                                    <div className={styles.block}>
                                        <span className={styles.title}>
                                            Roi
                                        </span>
                                        <span className={styles.value}>
                                            120%
                                        </span>
                                        <span className={styles.graphUp}>
                                            <ReactSVG src="/images/icons/ui/ArrowDown.svg" />
                                            6%
                                        </span>
                                    </div>
                                    <div className={styles.block}>
                                        <span className={styles.title}>
                                            Growth in the number of subscribers
                                        </span>
                                        <span className={styles.value}>
                                            12 345
                                        </span>
                                        <span className={styles.graphDown}>
                                            <ReactSVG src="/images/icons/ui/ArrowUp.svg" />
                                            27
                                        </span>
                                    </div>
                                </div>
                                <div className={styles.tripleBlock}>
                                    <div className={styles.block}>
                                        <span className={styles.title}>
                                            Number of subscribers
                                        </span>
                                        <span className={styles.value}>
                                            1234
                                        </span>
                                    </div>
                                    <div className={styles.block}>
                                        <span className={styles.title}>
                                            Number of following
                                        </span>
                                        <span className={styles.value}>
                                            1234
                                        </span>
                                    </div>
                                    <div className={styles.block}>
                                        <span className={styles.title}>
                                            Profit
                                        </span>
                                        <span className={styles.value}>
                                            123 456$
                                        </span>
                                    </div>
                                </div>
                            </Plane>
                            <Plane currentValue={tab} value={1}>
                                <div className={styles.tabTitle}>
                                    Transactions
                                </div>
                                <Table
                                    columns={columns}
                                    data={data}
                                    rowClassName={styles.tableRow}
                                    className={styles.table}
                                />
                            </Plane>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default UserPage;
