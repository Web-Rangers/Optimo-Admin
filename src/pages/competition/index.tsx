import type { NextPage } from 'next';
import styles from '@styles/pages/Сompetition.module.scss';
import DatePicker from '@components/inputs/DatePicker';
import { useState } from 'react';
import { ReactSVG } from 'react-svg';
import classNames from 'classnames';
import Image from 'next/image';
import Input from '@components/inputs/Input';

const Comp: NextPage = () => {
    const [tab, setTab] = useState(2);
    const [date, setDate] = useState('');
    const [newDate, setNewDate] = useState('');
    return (
        <div className={styles.container}>
            <div className={styles.pageHeader}>
                <div className={styles.pageTitle}>Competition</div>
                <div className={styles.tabSelect}>
                    <div className={styles.selectName}>Competition:</div>
                    <div className={styles.tabs}>
                        <div
                            className={classNames(styles.tabBtn, {
                                [`${styles.currentTab as string}`]: tab === 1,
                            })}
                            onClick={() => setTab(1)}
                        >
                            Past
                        </div>
                        <div
                            className={classNames(styles.tabBtn, {
                                [`${styles.currentTab as string}`]: tab === 2,
                            })}
                            onClick={() => setTab(2)}
                        >
                            Current
                        </div>
                        <div
                            className={classNames(styles.tabBtn, {
                                [`${styles.currentTab as string}`]: tab === 3,
                            })}
                            onClick={() => setTab(3)}
                        >
                            Future
                        </div>
                    </div>
                </div>
            </div>
            {tab === 1 && (
                <div className={styles.content}>
                    <div className={styles.pastCompWrapper}>
                        {Array.from(new Array(5).keys()).map((key) => {
                            return (
                                <div key={key} className={styles.block}>
                                    <div className={styles.title}>
                                        Name of competition
                                        <button className={styles.text}>
                                            <ReactSVG src="/images/icons/ui/ThinPencil.svg" />
                                        </button>
                                    </div>
                                    <div className={styles.compBlock}>
                                        <Image
                                            alt="image"
                                            src="/images/competetion/comp1.png"
                                            className={styles.compImage}
                                            width={302}
                                            height={200}
                                        />
                                        <div className={styles.date}>
                                            12.04.2022 - 14.06.2022
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
            {tab === 2 && (
                <div className={styles.content}>
                    <div className={styles.topContent}>
                        <div className={styles.block}>
                            <div className={styles.title}>
                                Current competition
                                <button className={styles.text}>
                                    <ReactSVG src="/images/icons/ui/ThinPencil.svg" />
                                </button>
                            </div>
                            <div className={styles.compBlock}>
                                <Image
                                    alt="image"
                                    src="/images/competetion/comp1.png"
                                    className={styles.compImage}
                                    width={302}
                                    height={200}
                                />
                                <div className={styles.title}>
                                    Name of competetion
                                </div>
                                <div className={styles.date}>
                                    12.04.2022 - 14.06.2022
                                </div>
                            </div>
                        </div>
                        <div className={styles.block}>
                            <div className={styles.title}>
                                Upcoming competition
                                <button className={styles.text}>
                                    <ReactSVG
                                        src="/images/icons/ui/ChevronRight.svg"
                                        style={{ transform: 'rotate(180deg)' }}
                                    />
                                    <ReactSVG src="/images/icons/ui/ChevronRight.svg" />
                                </button>
                            </div>
                            <div className={styles.blockWrapper}>
                                <div className={styles.compBlock}>
                                    <Image
                                        alt="image"
                                        src="/images/competetion/comp1.png"
                                        className={styles.compImage}
                                        width={302}
                                        height={200}
                                    />
                                    <div className={styles.title}>
                                        Name of competetion
                                    </div>
                                    <div className={styles.date}>
                                        12.04.2022 - 14.06.2022
                                    </div>
                                </div>
                                <div className={styles.compBlock}>
                                    <Image
                                        alt="image"
                                        src="/images/competetion/comp1.png"
                                        className={styles.compImage}
                                        width={302}
                                        height={200}
                                    />
                                    <div className={styles.title}>
                                        Name of competetion
                                    </div>
                                    <div className={styles.date}>
                                        12.04.2022 - 14.06.2022
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.bottomContent}>
                        <div className={styles.block}>
                            <div className={styles.title}>
                                Create a new competition
                            </div>
                            <div className={styles.inputContainer}>
                                <div className={styles.title}>Backround</div>
                                <div className={styles.uploadFile}>
                                    <ReactSVG src="/images/icons/ui/CloudUpload.svg" />
                                    <span className={styles.inputText}>
                                        Drop image here, or{' '}
                                        <button className={styles.text}>
                                            browse
                                        </button>
                                    </span>
                                </div>
                            </div>
                            <div className={styles.inputRow}>
                                <Input
                                    label="Name of competetion"
                                    placeholder="Name of competetion"
                                    className={styles.nameInput}
                                />
                                <DatePicker
                                    value={newDate}
                                    placeholder="dd.mm.yyyy - dd.mm.yyyy"
                                    onChange={(value) => {
                                        setNewDate(value);
                                        console.log(value);
                                    }}
                                    label="Dates"
                                    mode="range"
                                />
                            </div>
                            <div className={styles.inputContainer}>
                                <div className={styles.title}>
                                    <span>Rewards:</span>
                                    <span className={styles.addPrizeText}>
                                        <ReactSVG src="/images/icons/ui/Plus.svg" />{' '}
                                        Add another prize
                                    </span>
                                </div>
                                <div className={styles.rewardWrapper}>
                                    <div className={styles.reward}>
                                        <div className={styles.rewardBody}>
                                            <div
                                                className={styles.rewardParams}
                                            >
                                                <div className={styles.prize}>
                                                    750$
                                                </div>
                                                <div className={styles.place}>
                                                    1st place
                                                </div>
                                            </div>
                                            <div
                                                className={
                                                    styles.prizeContainer
                                                }
                                            >
                                                <Image
                                                    src={
                                                        '/images/competetion/prize1.png'
                                                    }
                                                    alt="prize"
                                                    width={0}
                                                    height={0}
                                                    className={styles.medal}
                                                />
                                            </div>
                                        </div>
                                        <div className={styles.rewardActions}>
                                            <button
                                                className={classNames(
                                                    styles.text,
                                                    styles.editBtn
                                                )}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className={classNames(
                                                    styles.text,
                                                    styles.deleteBtn
                                                )}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                    <div className={styles.reward}>
                                        <div className={styles.rewardBody}>
                                            <div
                                                className={styles.rewardParams}
                                            >
                                                <div className={styles.prize}>
                                                    200$
                                                </div>
                                                <div className={styles.place}>
                                                    2st place
                                                </div>
                                            </div>
                                            <div
                                                className={
                                                    styles.prizeContainer
                                                }
                                            >
                                                <Image
                                                    src={
                                                        '/images/competetion/prize2.png'
                                                    }
                                                    alt="prize"
                                                    width={0}
                                                    height={0}
                                                    className={styles.medal}
                                                />
                                            </div>
                                        </div>
                                        <div className={styles.rewardActions}>
                                            <button
                                                className={classNames(
                                                    styles.text,
                                                    styles.editBtn
                                                )}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className={classNames(
                                                    styles.text,
                                                    styles.deleteBtn
                                                )}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                    <div className={styles.reward}>
                                        <div className={styles.rewardBody}>
                                            <div
                                                className={styles.rewardParams}
                                            >
                                                <div className={styles.prize}>
                                                    130$
                                                </div>
                                                <div className={styles.place}>
                                                    3st place
                                                </div>
                                            </div>
                                            <div
                                                className={
                                                    styles.prizeContainer
                                                }
                                            >
                                                <Image
                                                    src={
                                                        '/images/competetion/prize3.png'
                                                    }
                                                    alt="prize"
                                                    width={0}
                                                    height={0}
                                                    className={styles.medal}
                                                />
                                            </div>
                                        </div>
                                        <div className={styles.rewardActions}>
                                            <button
                                                className={classNames(
                                                    styles.text,
                                                    styles.editBtn
                                                )}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className={classNames(
                                                    styles.text,
                                                    styles.deleteBtn
                                                )}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button
                                style={{ alignSelf: 'flex-end' }}
                                className={styles.fillButton}
                            >
                                Create
                            </button>
                        </div>
                        <div className={styles.block}>
                            <div className={styles.title}>
                                The presenters have won
                            </div>
                            <div className={styles.compsWrapper}>
                                {Array.from(new Array(8).keys()).map((key) => {
                                    return (
                                        <div
                                            key={key}
                                            className={classNames(
                                                styles.compBlock,
                                                {
                                                    [`${styles.index as string}`]:
                                                        key === 2,
                                                }
                                            )}
                                        >
                                            <span className={styles.name}>
                                                Name of competetion
                                            </span>
                                            <span className={styles.dates}>
                                                12.04.2023 - 14.04.2023
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {tab === 3 && (
                <div className={styles.content}>
                    <div className={styles.pastCompWrapper}>
                        {Array.from(new Array(3).keys()).map((key) => {
                            return (
                                <div key={key} className={styles.block}>
                                    <div className={styles.compBlock}>
                                        <Image
                                            alt="image"
                                            src="/images/competetion/comp1.png"
                                            className={styles.compImage}
                                            width={302}
                                            height={200}
                                        />
                                        <div>
                                            <div className={styles.title}>
                                                Name of competition
                                            </div>
                                            <div className={styles.date}>
                                                12.04.2022 - 14.06.2022
                                            </div>
                                        </div>
                                        <div className={styles.winners}>
                                            <div className={styles.title}>Winners</div>
                                            <div className={styles.wrapper}>
                                                {
                                                    Array.from ( new Array(5).keys()).map((key)=>{
                                                        return (
                                                            <div key={key} className={styles.winner}>
                                                                <Image className={styles.winnerImage}
                                                                width={35} height={35} src={'/images/users/Photo1.png'} alt='winner image'></Image>
                                                            </div>
                                                        );
                                                    }
                                                    )
                                                }
                                                <div className={styles.winner}>
                                                    +5
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Comp;
