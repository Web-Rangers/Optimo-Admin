import type { NextPage } from 'next';
import styles from '@styles/pages/EventPage.module.scss';
import Input from '@components/inputs/Input';
import Image from 'next/image';
import { ReactNode, useState } from 'react';
import classNames from 'classnames';
import { ReactSVG } from 'react-svg';
import Table from '@components/ui/Table';
import Link from 'next/link';

interface planeProps {
    value: number;
    currentValue: number;
    children?: React.ReactNode;
}

const data = Array.from(new Array(6).keys()).map((key) => {
    return {
        name: 'BetName',
        one: '2,74',
        x: '3,74',
        two: '3,17',
    };
});

const renderText = (text: string) => {
    return <div className={styles.text}>{text}</div>;
};

const EventPage: NextPage = () => {
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
            key: 'name',
            title: 'Name',
            dataIndex: 'name',
        },
        {
            key: '1',
            title: '1',
            dataIndex: 'one',
            render: renderText,
            headerStyle: {
                display: 'flex',
                justifyContent: 'flex-end',
            },
        },
        {
            key: 'x',
            title: 'X',
            dataIndex: 'x',
            render: renderText,
            headerStyle: {
                display: 'flex',
                justifyContent: 'flex-end',
            },
        },
        {
            key: '2',
            title: '2',
            dataIndex: 'two',
            render: renderText,
            headerStyle: {
                display: 'flex',
                justifyContent: 'flex-end',
            },
        },
    ];
    return (
        <>
            <div className={styles.container}>
                <div className={styles.pageTitle}>Event page</div>
                <div className={styles.content}>
                    <div className={styles.teamsBlock}>
                        <div className={styles.rowTop}>
                            <div className={styles.images}>
                                <Image
                                    className={styles.teamIcon}
                                    alt="team 1 image"
                                    src={'/images/teams/team1.png'}
                                    width={53}
                                    height={53}
                                />
                                <Image
                                    className={styles.teamIcon}
                                    alt="team 1 image"
                                    src={'/images/teams/team2.png'}
                                    width={53}
                                    height={53}
                                />
                            </div>
                            <div className={styles.column}>
                                <span className={styles.date}>24.03.2023</span>
                                <span className={styles.tips}>17 500 tips</span>
                            </div>
                        </div>
                        <span className={styles.name}>Team Name 1</span>
                        <span className={styles.name}>Team Name 2</span>
                        <div className={styles.row}>
                            <div className={styles.kef}>
                                <span className={styles.title}>1</span>
                                <span className={styles.value}>1.50</span>
                            </div>
                            <div className={styles.kef}>
                                <span className={styles.title}>X</span>
                                <span className={styles.value}>10.5</span>
                            </div>
                            <div className={styles.kef}>
                                <span className={styles.title}>2</span>
                                <span className={styles.value}>1.50</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.tabContainer}>
                        <div className={styles.tabList}>
                            <Tab currentValue={tab} value={0}>
                                <ReactSVG src="/images/icons/ui/Bookmaker.svg" />
                                <span className={styles.tabTitle}>
                                    Bookmakers
                                </span>
                            </Tab>
                            <Tab currentValue={tab} value={1}>
                                <ReactSVG src="/images/icons/ui/Dolar.svg" />
                                <span className={styles.tabTitle}>Tips</span>
                            </Tab>
                        </div>
                        <div className={styles.planeContainer}>
                            <Plane currentValue={tab} value={0}>
                                <div className={styles.tabTitle}>
                                    Bookmakers
                                </div>
                                <Table
                                    columns={columns}
                                    data={data}
                                    rowClassName={styles.tableRow}
                                />
                            </Plane>
                            <Plane currentValue={tab} value={1}>
                                <div className={styles.tabTitle}>Tips</div>
                                <div className={styles.tipsWrapper}>
                                    {data.map((tip, index) => {
                                        return (
                                            <Link
                                                key={index}
                                                href={'/events/eventPage/tipPage'}
                                            >
                                                <div className={styles.tip}>
                                                    <Image
                                                        alt="user"
                                                        width={50}
                                                        height={50}
                                                        src="/images/users/tip.png"
                                                    />
                                                    <span
                                                        className={styles.name}
                                                    >
                                                        Lorem
                                                    </span>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </Plane>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EventPage;
