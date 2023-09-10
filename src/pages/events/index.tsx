import type { NextPage } from 'next';
import styles from '@styles/pages/Events.module.scss';
import Input from '@components/inputs/Input';
import Image from 'next/image';
import Link from 'next/link';
import MultiSelect from '@components/inputs/MultiSelect';
import { ReactSVG } from 'react-svg';
import Modal from '@components/modals/Modal';
import { useState } from 'react';

interface EventProps {
    sport: string;
    sportIcon: string;
    teamOne: string;
    teamOneImage: string;
    teamTwo: string;
    teamTwoImage: string;
    date: string;
    tips: string;
    league: string;
}

interface FiltersModalProps {
    onCancel: () => void;
    leagues?: string[];
    date?: string;
    onApply: (leagues: string[], date: string) => void;
}

const data: EventProps[] = Array.from(new Array(8).keys()).map((key) => {
    let icon = '';
    let name = '';
    switch (key) {
        case 0:
        case 2:
        case 5:
        case 6:
            icon = '/images/icons/sports/football.png';
            name = 'Football';
            break;
        case 1:
            icon = '/images/icons/sports/basketball.png';
            name = 'Basketball';
            break;
        case 3:
        case 7:
            icon = '/images/icons/sports/hockey.png';
            name = 'Hockey';
            break;
        case 4:
            icon = '/images/icons/sports/boxing.png';
            name = 'Boxing';
        default:
            break;
    }
    return {
        sport: name,
        sportIcon: icon,
        teamOne: 'Team name 1',
        teamOneImage: '/images/teams/team1.png',
        teamTwo: 'Team name 1',
        teamTwoImage: '/images/teams/team2.png',
        date: '24.03.2023',
        tips: '17 500',
        league: 'LaLiga',
    };
});

const Event = ({
    sport,
    sportIcon,
    teamOne,
    teamOneImage,
    teamTwo,
    date,
    teamTwoImage,
    tips,
    league,
}: EventProps) => {
    return (
        <Link href={'/events/eventPage'}>
            <div className={styles.event}>
                <div className={styles.eventHeader}>
                    <Image src={sportIcon} alt={sport} width={20} height={20} />
                    {sport}
                </div>
                <div className={styles.teamIcons}>
                    <Image
                        className={styles.teamIcon}
                        alt="team 1 image"
                        src={teamOneImage}
                        width={55}
                        height={55}
                    />
                    VS
                    <Image
                        className={styles.teamIcon}
                        alt="team 1 image"
                        src={teamTwoImage}
                        width={55}
                        height={55}
                    />
                </div>
                <div className={styles.teamsNames}>
                    <div className={styles.league}>{league}</div>
                    <span className={styles.name}>
                        {teamOne} <div className={styles.score}>1</div>
                    </span>
                    <span className={styles.boldName}>
                        {teamTwo} <div className={styles.score}>2</div>
                    </span>
                </div>
                <div className={styles.footer}>
                    <span className={styles.date}>{date}</span>
                    <span className={styles.tips}>{`${tips} tips`}</span>
                </div>
            </div>
        </Link>
    );
};

const FiltersModal = ({
    onCancel,
    onApply,
    date,
    leagues,
}: FiltersModalProps) => {
    return (
        <Modal onBackClick={onCancel} className={styles.modal}>
            <div className={styles.header}>
                <div className={styles.title}>Filters</div>
                <div className={styles.close} onClick={onCancel}>
                    <ReactSVG src="/images/icons/ui/X.svg" />
                </div>
            </div>
            <div className={styles.body}>
                <MultiSelect
                    placeholder="All"
                    title="Leagues"
                    showChackBox
                    className={styles.multiSelect}
                    items={[
                        {
                            title: 'Premier League',
                            value: 'ca',
                        },
                        {
                            title: 'Bundesliga',
                            value: 'de',
                        },
                        {
                            title: 'Seria A',
                            value: 'gb',
                        },
                        {
                            title: 'LaLiga',
                            value: 'br',
                        },
                        {
                            title: 'Eradivisie',
                            value: 'es',
                        },
                    ]}
                    onSelect={() => 0}
                />
                <MultiSelect
                    placeholder="All"
                    title="Date"
                    showChackBox
                    className={styles.multiSelect}
                    items={[]}
                    onSelect={() => 0}
                />
            </div>
            <div className={styles.modalActions}>
                <button className={styles.outlineButton} onClick={onCancel}>
                    Clear
                </button>
                <button
                    className={styles.fillButton}
                    onClick={() => onApply([], '')}
                >
                    Apply
                </button>
            </div>
        </Modal>
    );
};

const Events: NextPage = () => {
    const [filtersOpen, setFiltersOpen] = useState(false);
    return (
        <>
            {filtersOpen && (
                <FiltersModal
                    onCancel={() => setFiltersOpen(false)}
                    onApply={(leagues, date) => setFiltersOpen(false)}
                />
            )}
            <div className={styles.container}>
                <div className={styles.pageTitle}>
                    Events
                    <div className={styles.filters}>
                        <div
                            className={styles.moreFiltersBtn}
                            onClick={() => setFiltersOpen(true)}
                        >
                            More filters
                            <div className={styles.counter}>1</div>
                        </div>
                        <MultiSelect
                            placeholder="All sports"
                            className={styles.multiSelectShort}
                            items={[
                                {
                                    title: 'Football',
                                    value: '1',
                                },
                                {
                                    title: 'Hockey',
                                    value: '2',
                                },
                                {
                                    title: 'Rugby',
                                    value: '3',
                                },
                                {
                                    title: 'Boxing',
                                    value: '4',
                                },
                                {
                                    title: 'Basketball',
                                    value: '5',
                                },
                                {
                                    title: 'Handball',
                                    value: '6',
                                },
                            ]}
                            onSelect={() => 0}
                        />
                        <MultiSelect
                            placeholder="All countries"
                            showChackBox
                            className={styles.multiSelect}
                            items={[
                                {
                                    title: 'Canada',
                                    value: 'ca',
                                },
                                {
                                    title: 'Germany',
                                    value: 'de',
                                },
                                {
                                    title: 'United Kingdom',
                                    value: 'gb',
                                },
                                {
                                    title: 'Brazil',
                                    value: 'br',
                                },
                                {
                                    title: 'Spain',
                                    value: 'es',
                                },
                            ]}
                            onSelect={() => 0}
                        />
                        <div className={styles.resetBtn}>
                            <ReactSVG src="/images/icons/ui/x.svg" />
                        </div>
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
