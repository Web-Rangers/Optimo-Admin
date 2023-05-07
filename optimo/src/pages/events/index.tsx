import type { NextPage } from 'next';
import styles from '@styles/pages/Events.module.scss';
import Input from '@components/inputs/Input';
import Image from 'next/image';
import Link from 'next/link';

interface EventProps {
    teamOne: string;
    teamOneImage: string;
    teamTwo: string;
    teamTwoImage: string;
    date: string;
    tips: string;
}

const data: EventProps[] = Array.from(new Array(6).keys()).map((key) => {
    return {
        teamOne: 'Team name 1',
        teamOneImage: '/images/teams/team1.png',
        teamTwo: 'Team name 1',
        teamTwoImage: '/images/teams/team2.png',
        date: '24.03.2023',
        tips: '17 500',
    };
});

const Event = ({
    teamOne,
    teamOneImage,
    teamTwo,
    date,
    teamTwoImage,
    tips,
}: EventProps) => {
    return (
        <Link href={'/events/eventPage'}>
            <div className={styles.event}>
                <div className={styles.teams}>
                    <div className={styles.teamsIcons}>
                        <Image
                            className={styles.teamIcon}
                            alt="team 1 image"
                            src={teamOneImage}
                            width={37}
                            height={37}
                        />
                        VS
                        <Image
                            className={styles.teamIcon}
                            alt="team 1 image"
                            src={teamTwoImage}
                            width={37}
                            height={37}
                        />
                    </div>
                    <div className={styles.teamsNames}>
                        <span className={styles.name}>{teamOne}</span>
                        <span className={styles.name}>{teamTwo}</span>
                    </div>
                </div>
                <div className={styles.footer}>
                    <span className={styles.date}>{date}</span>
                    <span className={styles.tips}>{`${tips} tips`}</span>
                </div>
            </div>
        </Link>
    );
};

const Events: NextPage = () => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.pageTitle}>
                    Events
                    <div className={styles.filters}>
                        <Input placeholder="All sports" />
                        <Input placeholder="All countires" />
                    </div>
                </div>
                <div className={styles.eventsWrapper}>
                    {data.map((event, index) => (
                        <Event key={index} {...event} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Events;
