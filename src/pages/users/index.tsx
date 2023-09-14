import type { NextPage } from 'next';
import styles from '@styles/pages/Users.module.scss';
import { useState } from 'react';
import classNames from 'classnames';
import Table from '@components/ui/Table';
import Image from 'next/image';
import { ReactSVG } from 'react-svg';
import Input from '@components/inputs/Input';
import Link from 'next/link';

interface StuffProfile {
    name: string;
    photo: string;
    mail: string;
}

const data = Array.from(new Array(20).keys()).map((key) => {
    return {
        profile: {
            name: 'Cameron Williamson',
            photo: '/images/users/Avatar.png',
            mail: 'ckctm12@gmail.com',
        },
        subCount: '46',
        roi: '70',
        profit: '670',
        detailed: 'asdasdasd',
        block: key % 4 === 0 ? true : false,
        edit: '',
        expand: () => {
            return (
                <div className={styles.expanColumnWrapper}>
                    <div className={styles.column}>
                        <div className={styles.grayText}>
                            Growth in the number of subscribers
                        </div>
                        <div className={styles.blackText}>123</div>
                        <div className={styles.grayText}>
                            Number of following (month)
                        </div>
                        <div className={styles.blackText}>26</div>
                    </div>
                    <div className={styles.column}>
                        <div className={styles.grayText}>
                            Number of paid subscriptions (month)
                        </div>
                        <div className={styles.blackText}>12</div>
                        <div className={styles.grayText}>
                            Number of free subscriptions (month)
                        </div>
                        <div className={styles.blackText}>45</div>
                    </div>
                    <div className={styles.column}>
                        <div className={styles.grayText}>
                            Profit from subscribers (month)
                        </div>
                        <div className={styles.blackText}>12</div>
                    </div>
                </div>
            );
        },
    };
});

const renderText = (text: string) => {
    return <div className={styles.text}>{text}</div>;
};

const Users: NextPage = () => {
    const columns = [
        {
            key: 'profile',
            title: 'Name',
            dataIndex: 'profile',
            render: (
                profile: StuffProfile,
                key: any,
                isEdit: boolean,
                setIsEdit: (isEdit: boolean) => void,
                isExpand: boolean,
                setIsExpand: (isExpand: boolean) => void
            ) => {
                return (
                    <span className={styles.tableNameCell}>
                        <ReactSVG
                            className={styles.expand}
                            src="/images/icons/ui/ChevronRight.svg"
                            style={{
                                transform: `rotate(${isExpand ? 90 : 0}deg)`,
                            }}
                            onClick={() => setIsExpand(!isExpand)}
                        />
                        <Link href={'/users/userPage'}>
                            <Image
                                className={styles.profilePhoto}
                                src={profile.photo}
                                alt="profile photo"
                                width={45}
                                height={45}
                            />
                        </Link>
                        <Link href={'/users/userPage'}>
                            <div className={styles.col}>
                                <span className={styles.name}>
                                    {profile.name}
                                </span>
                                <span className={styles.mail}>
                                    {profile.mail}
                                </span>
                            </div>
                        </Link>
                    </span>
                );
            },
        },
        {
            key: 'block',
            title: 'status',
            dataIndex: 'block',
            render: (block: boolean) => {
                return (
                    <span
                        className={classNames(styles.tableBlockCell, {
                            [`${styles.blocked as string}`]: block,
                        })}
                    >
                        {block ? 'Block' : 'Active'}
                    </span>
                );
            },
        },
        {
            key: 'subs',
            title: 'Number of subscribers',
            dataIndex: 'subCount',
            render: renderText,
            headerStyle: {
                display: 'flex',
                justifyContent: 'flex-end',
            },
        },
        {
            key: 'roi',
            title: 'ROI, %',
            dataIndex: 'roi',
            render: renderText,
            headerStyle: {
                display: 'flex',
                justifyContent: 'flex-end',
            },
        },
        {
            key: 'profit',
            title: 'Profit per month',
            dataIndex: 'profit',
            render: renderText,
            headerStyle: {
                display: 'flex',
                justifyContent: 'flex-end',
            },
        },
        // {
        //     key: 'detailed',
        //     title: 'detailed',
        //     dataIndex: 'detailed',
        //     render: (data:any) => {
        //         return <div className={styles.detailed}>afasdfadfasdf</div>;
        //     },
        // },
    ];

    const [filterOpen, setFilterOpen] = useState(false);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.pageTitle}>
                    Users
                    <div className={styles.filterBlock}>
                        <Input
                            icon={
                                <ReactSVG
                                    src="/images/icons/ui/Search.svg"
                                    className={styles.searchicon}
                                />
                            }
                            placeholder="Nickname"
                        />
                        <button
                            className={styles.outline}
                            onClick={() => setFilterOpen((origin) => !origin)}
                        >
                            Filters
                            <div className={styles.indicator}>2</div>
                        </button>
                        <div
                            className={classNames(styles.filtersContainer, {
                                [`${styles.open as string}`]: filterOpen,
                            })}
                        >
                            <div className={styles.header}>
                                <span>Filters</span>
                            </div>
                            <div className={styles.inputRow}>
                                <div className={styles.filterName}>
                                    Number of subscribers
                                </div>
                                <div />
                                <Input placeholder="from" />
                                <div className={styles.divider} />
                                <Input placeholder="to" />
                            </div>
                            <div className={styles.inputRow}>
                                <div className={styles.filterName}>
                                    Profit per month
                                </div>
                                <div />
                                <Input placeholder="from" />
                                <div className={styles.divider} />
                                <Input placeholder="to" />
                            </div>
                            <div className={styles.inputRow}>
                                <div className={styles.filterName}>ROI</div>
                                <div />
                                <Input placeholder="from" />
                                <div className={styles.divider} />
                                <Input placeholder="to" />
                            </div>
                            <div className={styles.inputRow}>
                                <div className={styles.filterName}>
                                    Growth in the number of subscribers (month)
                                </div>
                                <div />
                                <Input placeholder="from" />
                                <div className={styles.divider} />
                                <Input placeholder="to" />
                            </div>
                            <div className={styles.inputRow}>
                                <div className={styles.filterName}>
                                    Profit from subscribers (month)
                                </div>
                                <div />
                                <Input placeholder="from" />
                                <div className={styles.divider} />
                                <Input placeholder="to" />
                            </div>
                            <div className={styles.inputRow}>
                                <div className={styles.filterName}>
                                    Number of following (month)
                                </div>
                                <div />
                                <Input placeholder="from" />
                                <div className={styles.divider} />
                                <Input placeholder="to" />
                            </div>
                            <div className={styles.inputRow}>
                                <div className={styles.filterName}>
                                    Number of free subscriptions (month)
                                </div>
                                <div />
                                <Input placeholder="from" />
                                <div className={styles.divider} />
                                <Input placeholder="to" />
                            </div>
                            <div className={styles.inputRow}>
                                <div className={styles.filterName}>
                                    Number of paid subscriptions (month)
                                </div>
                                <div />
                                <Input placeholder="from" />
                                <div className={styles.divider} />
                                <Input placeholder="to" />
                            </div>

                            <div className={styles.footer}>
                                <button
                                    className={styles.fillButton}
                                    onClick={() =>
                                        setFilterOpen((origin) => !origin)
                                    }
                                >
                                    Apply
                                </button>
                                <button
                                    className={styles.outlineButton}
                                    onClick={() =>
                                        setFilterOpen((origin) => !origin)
                                    }
                                >
                                    Reset
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <Table
                    columns={columns}
                    data={data}
                    rowClassName={styles.userTableRow}
                    pagination={{
                        pageSize: 7,
                    }}
                    expandable
                />
            </div>
        </>
    );
};

export default Users;
