import type { NextPage } from 'next';
import styles from '@styles/pages/competition.module.scss';
import DatePicker from '@components/inputs/DatePicker';
import { useState } from 'react';
import { ReactSVG } from 'react-svg';
import classNames from 'classnames';

const Comp: NextPage = () => {
    const [date, setDate] = useState('');
    const [newDate, setNewDate] = useState('');
    return (
        <div className={styles.container}>
            <div className={styles.pageTitle}>Competition</div>
            <div className={styles.content}>
                <div className={styles.column}>
                    <div className={styles.block}>
                        <div className={styles.title}>
                            Current competition
                            <button className={styles.text}>
                                <ReactSVG src="/images/icons/ui/CloudUpload.svg" />
                                Upload background
                            </button>
                        </div>
                        <DatePicker
                            className={styles.flex50}
                            value={date}
                            placeholder="dd.mm.yyyy - dd.mm.yyyy"
                            onChange={(value) => {
                                setDate(value);
                                console.log(value);
                            }}
                            label="Date"
                            mode="range"
                        />
                    </div>
                    <div className={styles.block}>
                        <div className={styles.title}>
                            The presenters have won
                        </div>
                        <div className={styles.compsWrapper}>
                            {Array.from(new Array(6).keys()).map((key) => {
                                return (
                                    <div key={key} className={styles.compBlock}>
                                        <span className={styles.name}>
                                            CompetitioName1
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
                <div className={styles.block}>
                    <div className={styles.title}>Create a new competition</div>
                    <div className={styles.inputContainer}>
                        <div className={styles.title}>Backround</div>
                        <div className={styles.uploadFile}>
                            <ReactSVG src="/images/icons/ui/CloudUpload.svg" />
                            <span className={styles.inputText}>
                                Drop image here, or{' '}
                                <button className={styles.text}>browse</button>
                            </span>
                        </div>
                    </div>
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
                    <div className={styles.divider} />
                    <div className={styles.inputContainer}>
                        <div className={styles.title}>Rewards</div>
                        <div className={styles.reward}>
                            <div
                                className={classNames(
                                    styles.medal,
                                    styles.gold
                                )}
                            >
                                1
                            </div>
                            <div className={styles.verticalDivider} />
                            <span className={styles.prize}>750$</span>
                            <div className={styles.whiteSpace} />
                            <ReactSVG src="/images/icons/ui/trash.svg" />
                        </div>
                        <div className={styles.reward}>
                            <div
                                className={classNames(
                                    styles.medal,
                                    styles.silver
                                )}
                            >
                                1
                            </div>
                            <div className={styles.verticalDivider} />
                            <span className={styles.prize}>750$</span>
                            <div className={styles.whiteSpace} />
                            <ReactSVG src="/images/icons/ui/trash.svg" />
                        </div>
                        <div className={styles.reward}>
                            <div
                                className={classNames(
                                    styles.medal,
                                    styles.bronze
                                )}
                            >
                                1
                            </div>
                            <div className={styles.verticalDivider} />
                            <span className={styles.prize}>750$</span>
                            <div className={styles.whiteSpace} />
                            <ReactSVG src="/images/icons/ui/trash.svg" />
                        </div>
                        <button className={styles.text}>
                           + Add another prize
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comp;
