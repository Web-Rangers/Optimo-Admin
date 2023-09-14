import type { NextPage } from 'next';
import styles from '@styles/pages/UserPage.module.scss';
import { useState } from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import { ReactSVG } from 'react-svg';
import Table from '@components/ui/Table';
import Select from '@components/inputs/Select';
import Modal from '@components/modals/Modal';
import Input from '@components/inputs/Input';

interface planeProps {
    value: number;
    currentValue: number;
    children?: React.ReactNode;
}

const data = Array.from(new Array(6).keys()).map((i) => {
    return {
        type: 'Deposit',
        date: '23.03.2023',
        amount: '140 $',
        status:
            i === 1
                ? 'Failed'
                : i === 2
                ? 'In progress'
                : i === 3
                ? 'Canceled'
                : 'Successful',
    };
});

const subData = Array.from(new Array(5).keys()).map((key) => {
    return {
        id: 3066 + key,
        nickname: 'Venture One - 9292',
        payDate: '06.06.2022',
        amount: '$11 400',
        expDate: '06.06.2022',
    };
});

interface VerificationModalProps {
    onBackClick: () => void;
}

interface ReplenishmentModalProps {
    onBackClick: () => void;
    onAccept: () => void;
}

const VerificationModal = ({ onBackClick }: VerificationModalProps) => {
    return (
        <Modal onBackClick={onBackClick} className={styles.modal}>
            <div className={styles.header}>
                <div className={styles.title}>Photo for verification</div>
                <div className={styles.close} onClick={onBackClick}>
                    <ReactSVG src="/images/icons/ui/X.svg" />
                </div>
            </div>
            <div className={styles.photoWrapper}>
                <Image
                    src={'/images/Passport.png'}
                    alt="passport"
                    width={200}
                    height={150}
                />
                <Image
                    src={'/images/Passport.png'}
                    alt="passport"
                    width={200}
                    height={150}
                />
                <Image
                    src={'/images/Passport.png'}
                    alt="passport"
                    width={200}
                    height={150}
                />
                <Image
                    src={'/images/Passport.png'}
                    alt="passport"
                    width={200}
                    height={150}
                />
            </div>
        </Modal>
    );
};

const ReplenishmentModal = ({
    onBackClick,
    onAccept,
}: ReplenishmentModalProps) => {
    return (
        <Modal onBackClick={onBackClick} className={styles.modal}>
            <div className={styles.header}>
                <div className={styles.title}>Replenishment of coins</div>
                <div className={styles.close} onClick={onBackClick}>
                    <ReactSVG src="/images/icons/ui/X.svg" />
                </div>
            </div>
            <div className={styles.body}>
                <Input label="Number of coins" placeholder="Number of coins" />
                <Input style={{height:'142px'}} label="Message" placeholder="Message" multiline={true} type='text' />
            </div>
            <div className={styles.buttons}>
                <button onClick={onBackClick} className={styles.outlineButton}>
                    Cancel
                </button>
                <button
                    onClick={() => {
                        onAccept?.call(null);
                        onBackClick?.call(null);
                    }}
                    className={styles.fillButton}
                >
                    Send
                </button>
            </div>
        </Modal>
    );
};

const UserPage: NextPage = () => {
    const [tab, setTab] = useState(0);
    const [isVerification, setIsVerification] = useState(false);
    const [isReplenishment, setIsReplenishment] = useState(false);

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

    const subColumns = [
        {
            key: 'id',
            title: 'ID',
            dataIndex: 'id',
        },
        {
            key: 'nickname',
            title: 'Nickname',
            dataIndex: 'nickname',
        },
        {
            key: 'payDate',
            title: 'Payment date',
            dataIndex: 'payDate',
        },
        {
            key: 'amount',
            title: 'Amount',
            dataIndex: 'amount',
        },
        {
            key: 'expDate',
            title: 'Expiration date',
            dataIndex: 'expDate',
        },
    ];

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
                                [`${styles.red as string}`]:
                                    text === 'Failed' || text === 'Canceled',
                                [`${styles.yellow as string}`]:
                                    text === 'In progress',
                            })}
                        ></div>
                        <span className={styles.text}>{text}</span>
                    </div>
                );
            },
        },
        {
            key: 'status',
            title: '',
            dataIndex: 'status',
            render: (text: any) => {
                if (text === 'In progress' || text === 'Canceled')
                    return (
                        <div className={styles.refund}>
                            <div className={styles.whiteSpace}></div>
                            <div className={styles.refundButton}>
                                <ReactSVG src="/images/icons/ui/Refund.svg" />
                                <span>Refund</span>
                            </div>
                        </div>
                    );
                return <></>;
            },
        },
    ];

    // const [filterOpen, setFilterOpen] = useState(false);

    return (
        <>
            {isReplenishment && (
                <ReplenishmentModal
                    onAccept={() => setIsReplenishment(false)}
                    onBackClick={() => setIsReplenishment(false)}
                />
            )}
            {isVerification && (
                <VerificationModal
                    onBackClick={() => setIsVerification(false)}
                />
            )}
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
                            <div
                                className={styles.outlineBlock}
                                onClick={() => setIsReplenishment(true)}
                            >
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
                            <button
                                className={styles.text}
                                onClick={() => setIsVerification(true)}
                            >
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
                            <Tab currentValue={tab} value={2}>
                                <ReactSVG src="/images/icons/ui/Group1.svg" />
                                <span className={styles.tabTitle}>
                                    Subscribers
                                </span>
                            </Tab>
                            <Tab currentValue={tab} value={3}>
                                <ReactSVG src="/images/icons/ui/TicketPrice.svg" />
                                <span className={styles.tabTitle}>Tips</span>
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
                                                    value: 'w',
                                                    title: 'Week',
                                                },
                                                {
                                                    value: 'm',
                                                    title: 'Month',
                                                },
                                                {
                                                    value: '3m',
                                                    title: '3 month',
                                                },
                                                {
                                                    value: '6m',
                                                    title: '6 month',
                                                },
                                                {
                                                    value: 'y',
                                                    title: 'Year',
                                                },
                                                {
                                                    value: 'all',
                                                    title: 'All time',
                                                },
                                            ]}
                                            defaultValue="w"
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
                            <Plane currentValue={tab} value={2}>
                                <div className={styles.tabTitle}>
                                    Subscribers
                                </div>
                                <Table
                                    columns={subColumns}
                                    data={subData}
                                    rowClassName={styles.tableSubRow}
                                    className={styles.table}
                                />
                            </Plane>
                            <Plane currentValue={tab} value={3}>
                                <div className={styles.tabTitle}>Tips</div>
                                <div
                                    className={`${styles.block as string} ${
                                        styles.smallPadding as string
                                    }`}
                                >
                                    <div className={styles.tipHeader}>
                                        <div className={styles.profile}>
                                            <Image
                                                alt="profile-image"
                                                src="/images/users/photo1.png"
                                                width={40}
                                                height={40}
                                            />
                                            <div className={styles.column}>
                                                <div className={styles.name}>
                                                    Emilio
                                                </div>
                                                <div className={styles.tipType}>
                                                    Free tip
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.tipStatus}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="8"
                                                height="8"
                                                viewBox="0 0 8 8"
                                                fill="none"
                                            >
                                                <circle
                                                    cx="4"
                                                    cy="4"
                                                    r="3"
                                                    fill="#00B247"
                                                />
                                            </svg>
                                            Active
                                        </div>
                                    </div>
                                    <div className={styles.matchInfo}>
                                        <div className={styles.teamInfo}>
                                            <div className={styles.teamIcons}>
                                                <Image
                                                    className={styles.teamIcon}
                                                    src={
                                                        '/images/teams/team1.png'
                                                    }
                                                    width={40}
                                                    height={40}
                                                    alt="football ball"
                                                />
                                                <Image
                                                    className={styles.teamIcon}
                                                    src={
                                                        '/images/teams/team2.png'
                                                    }
                                                    width={40}
                                                    height={40}
                                                    alt="football ball"
                                                />
                                            </div>
                                            <div className={styles.column}>
                                                <div
                                                    className={styles.grayText}
                                                >
                                                    29.02.2022 ∙ LaLegaue
                                                </div>
                                                <div
                                                    className={styles.teamNames}
                                                >
                                                    Team Name 1 - Team Name 2
                                                </div>
                                            </div>
                                        </div>
                                        <Image
                                            src={
                                                '/images/icons/sports/football.png'
                                            }
                                            width={24}
                                            height={24}
                                            alt="football ball"
                                        />
                                    </div>
                                    <div className={styles.matchResults}>
                                        <div className={styles.column}>
                                            <div className={styles.title}>
                                                Name
                                            </div>
                                            <div className={styles.value}>
                                                Victory Team 1
                                            </div>
                                        </div>
                                        <div className={styles.column}>
                                            <div className={styles.title}>
                                                KEF
                                            </div>
                                            <div className={styles.value}>
                                                2.92
                                            </div>
                                        </div>
                                        <div className={styles.column}>
                                            <div className={styles.title}>
                                                Result
                                            </div>
                                            <div className={styles.value}>
                                                5 : 1
                                            </div>
                                        </div>
                                        <div className={styles.bookmaker}>
                                            <Image
                                                src={
                                                    '/images/icons/ui/testLogo.png'
                                                }
                                                width={70}
                                                height={25}
                                                alt="bookmaker logo"
                                            />
                                        </div>
                                        <div className={styles.column}>
                                            <div className={styles.title}>
                                                Amount
                                            </div>
                                            <div className={styles.value}>
                                                <Image
                                                    src="/images/icons/ui/coin.png"
                                                    alt="coin"
                                                    width={22}
                                                    height={22}
                                                />
                                                179.4
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className={`${styles.block as string} ${
                                        styles.smallPadding as string
                                    }`}
                                >
                                    <div className={styles.tipHeader}>
                                        <div className={styles.profile}>
                                            <Image
                                                alt="profile-image"
                                                src="/images/users/photo1.png"
                                                width={40}
                                                height={40}
                                            />
                                            <div className={styles.column}>
                                                <div className={styles.name}>
                                                    Emilio
                                                </div>
                                                <div className={styles.tipType}>
                                                    Free tip
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.tipStatus}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="8"
                                                height="8"
                                                viewBox="0 0 8 8"
                                                fill="none"
                                            >
                                                <circle
                                                    cx="4"
                                                    cy="4"
                                                    r="3"
                                                    fill="#00B247"
                                                />
                                            </svg>
                                            Active
                                        </div>
                                    </div>
                                    <div className={styles.matchInfo}>
                                        <div className={styles.teamInfo}>
                                            <div className={styles.teamIcons}>
                                                <Image
                                                    className={styles.teamIcon}
                                                    src={
                                                        '/images/teams/team1.png'
                                                    }
                                                    width={40}
                                                    height={40}
                                                    alt="football ball"
                                                />
                                                <Image
                                                    className={styles.teamIcon}
                                                    src={
                                                        '/images/teams/team2.png'
                                                    }
                                                    width={40}
                                                    height={40}
                                                    alt="football ball"
                                                />
                                            </div>
                                            <div className={styles.column}>
                                                <div
                                                    className={styles.grayText}
                                                >
                                                    29.02.2022 ∙ LaLegaue
                                                </div>
                                                <div
                                                    className={styles.teamNames}
                                                >
                                                    Team Name 1 - Team Name 2
                                                </div>
                                            </div>
                                        </div>
                                        <Image
                                            src={
                                                '/images/icons/sports/football.png'
                                            }
                                            width={24}
                                            height={24}
                                            alt="football ball"
                                        />
                                    </div>
                                    <div className={styles.matchResults}>
                                        <div className={styles.column}>
                                            <div className={styles.title}>
                                                Name
                                            </div>
                                            <div className={styles.value}>
                                                Victory Team 1
                                            </div>
                                        </div>
                                        <div className={styles.column}>
                                            <div className={styles.title}>
                                                KEF
                                            </div>
                                            <div className={styles.value}>
                                                2.92
                                            </div>
                                        </div>
                                        <div className={styles.column}>
                                            <div className={styles.title}>
                                                Result
                                            </div>
                                            <div className={styles.value}>
                                                5 : 1
                                            </div>
                                        </div>
                                        <div className={styles.bookmaker}>
                                            <Image
                                                src={
                                                    '/images/icons/ui/testLogo.png'
                                                }
                                                width={70}
                                                height={25}
                                                alt="bookmaker logo"
                                            />
                                        </div>
                                        <div className={styles.column}>
                                            <div className={styles.title}>
                                                Amount
                                            </div>
                                            <div className={styles.value}>
                                                <Image
                                                    src="/images/icons/ui/coin.png"
                                                    alt="coin"
                                                    width={22}
                                                    height={22}
                                                />
                                                179.4
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Plane>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default UserPage;
