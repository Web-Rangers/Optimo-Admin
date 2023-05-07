import { NextPage } from 'next';
import styles from '@styles/pages/TipPage.module.scss';
import Image from 'next/image';

const TipPage: NextPage = () => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.pageTitle}>Tip page</div>
                <div className={styles.content}>
                    <div className={styles.event}>
                        <div className={styles.teams}>
                            <div className={styles.teamsIcons}>
                                <Image
                                    className={styles.teamIcon}
                                    alt="team 1 image"
                                    src={'/images/teams/team1.png'}
                                    width={37}
                                    height={37}
                                />
                                VS
                                <Image
                                    className={styles.teamIcon}
                                    alt="team 1 image"
                                    src={'/images/teams/team2.png'}
                                    width={37}
                                    height={37}
                                />
                            </div>
                            <div className={styles.teamsNames}>
                                <span className={styles.name}>
                                    {'Team name 1'}
                                </span>
                                <span className={styles.name}>
                                    {'Team name 2'}
                                </span>
                            </div>
                        </div>
                        <div className={styles.footer}>
                            <span className={styles.date}>{'24.03.2023'}</span>
                        </div>
                    </div>
                    <div className={styles.tipBlock}>
                        <div className={styles.row}>
                            <div className={styles.tipProp}>
                                <div className={styles.name}>Name</div>
                                <div className={styles.valueBold}>
                                    Victory Team 1
                                </div>
                            </div>
                            <span className={styles.text}>Private tip</span>
                        </div>
                        <div className={styles.tipProp}>
                            <div className={styles.name}>Nickname</div>
                            <div className={styles.value}>Lorem</div>
                        </div>

                        <div className={styles.tipProp}>
                            <div className={styles.name}>KEF</div>
                            <div className={styles.value}>11,25</div>
                        </div>

                        <div className={styles.tipProp}>
                            <div className={styles.name}>Sum</div>
                            <div className={styles.value}>120 <Image src={'/images/icons/coin.png'} alt='coin' width={22} height={22}/></div>
                        </div>

                        <div className={styles.tipProp}>
                            <div className={styles.name}>Bookmaker</div>
                            <div className={styles.value}>BetName</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TipPage;
