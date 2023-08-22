import { NextPage } from 'next';
import styles from '@styles/pages/TipPage.module.scss';
import Image from 'next/image';
import { ReactSVG } from 'react-svg';
import Modal from '@components/modals/Modal';
import Radio from '@components/inputs/radio';
import { boolean } from 'zod';
import { useState } from 'react';

interface HideModalProps {
    onCancel?: () => void;
    onConfirm?: () => void;
}

function HideModal({ onCancel, onConfirm }: HideModalProps) {
    return (
        <Modal onBackClick={onCancel} className={styles.modal}>
            <div className={styles.header}>
                <div className={styles.title}>Hide comment</div>
            </div>
            <div className={styles.body}>
                <div className={styles.grayText}>Reason for hiding</div>
                <Radio name="reason" label="Spam or false information" />
                <Radio
                    name="reason"
                    label="Insults or manifestations of intolerance"
                />
                <Radio name="reason" label="Spam or false information" />
                <Radio
                    name="reason"
                    label="Insults or manifestations of intolerance"
                />
            </div>
            <div className={styles.actions}>
                <button className={styles.outlineButton} onClick={onCancel}>
                    Cancel
                </button>
                <button className={styles.fillButton}>Block user</button>
            </div>
        </Modal>
    );
}

const TipPage: NextPage = () => {
    const [modalShow, setModalShow] = useState(false);
    return (
        <>
            {modalShow && <HideModal onCancel={() => setModalShow(false)} />}
            <div className={styles.container}>
                <div className={styles.pageTitle}>Tip page</div>
                <div className={styles.content}>
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
                                    <div className={styles.name}>Emilio</div>
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
                                        src={'/images/teams/team1.png'}
                                        width={40}
                                        height={40}
                                        alt="football ball"
                                    />
                                    <Image
                                        className={styles.teamIcon}
                                        src={'/images/teams/team2.png'}
                                        width={40}
                                        height={40}
                                        alt="football ball"
                                    />
                                </div>
                                <div className={styles.column}>
                                    <div className={styles.grayText}>
                                        29.02.2022 ∙ LaLegaue
                                    </div>
                                    <div className={styles.teamNames}>
                                        Team Name 1 - Team Name 2
                                    </div>
                                </div>
                            </div>
                            <Image
                                src={'/images/icons/sports/football.png'}
                                width={24}
                                height={24}
                                alt="football ball"
                            />
                        </div>
                        <div className={styles.matchResults}>
                            <div className={styles.column}>
                                <div className={styles.title}>Name</div>
                                <div className={styles.value}>
                                    Victory Team 1
                                </div>
                            </div>
                            <div className={styles.column}>
                                <div className={styles.title}>KEF</div>
                                <div className={styles.value}>2.92</div>
                            </div>
                            <div className={styles.column}>
                                <div className={styles.title}>Result</div>
                                <div className={styles.value}>5 : 1</div>
                            </div>
                            <div className={styles.bookmaker}>
                                <Image
                                    src={'/images/icons/ui/testLogo.png'}
                                    width={70}
                                    height={25}
                                    alt="bookmaker logo"
                                />
                            </div>
                            <div className={styles.column}>
                                <div className={styles.title}>Amount</div>
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
                    <div className={styles.block}>
                        <div className={styles.title}>Commnets</div>
                        <div className={styles.comment}>
                            <div className={styles.leftBorder}>
                                <Image
                                    src="/images/users/photo1.png"
                                    alt="photo1"
                                    width={32}
                                    height={32}
                                />
                                <div className={styles.border}></div>
                            </div>
                            <div className={styles.commentContainer}>
                                <div className={styles.commentBody}>
                                    <div className={styles.date}>
                                        Apr 15 at 14:56
                                        <ReactSVG
                                            onClick={() => setModalShow(true)}
                                            src="/images/icons/ui/Hidden.svg"
                                        />
                                    </div>
                                    <div className={styles.text}>
                                        Lorem ipsum dolor sit amet, coetur
                                        adipiscing elit ut aliquam, purus sit
                                        amet luctus Lorem ipsum dolor sit amet
                                        aliquam, purus sit amet luctus
                                    </div>
                                </div>
                                <div className={styles.expandButton}>
                                    View all {12} comments{' '}
                                    <ReactSVG src="/images/icons/ui/ChevronDown.svg" />
                                </div>
                                <div className={styles.comment}>
                                    <div className={styles.leftBorder}>
                                        <Image
                                            src="/images/users/photo1.png"
                                            alt="photo1"
                                            width={32}
                                            height={32}
                                        />
                                    </div>
                                    <div className={styles.commentContainer}>
                                        <div className={styles.commentBody}>
                                            <div className={styles.date}>
                                                Apr 15 at 14:56
                                                <ReactSVG
                                                    onClick={() =>
                                                        setModalShow(true)
                                                    }
                                                    src="/images/icons/ui/Hidden.svg"
                                                />
                                            </div>
                                            <div className={styles.text}>
                                                Lorem ipsum dolor sit amet,
                                                coetur adipiscing elit ut
                                                aliquam, purus sit amet luctus
                                                Lorem ipsum dolor sit amet
                                                aliquam, purus sit amet luctus
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.comment}>
                            <div className={styles.leftBorder}>
                                <Image
                                    src="/images/users/photo1.png"
                                    alt="photo1"
                                    width={32}
                                    height={32}
                                />
                            </div>
                            <div className={styles.commentContainer}>
                                <div className={styles.commentBody}>
                                    <div className={styles.date}>
                                        Apr 15 at 14:56
                                        <ReactSVG
                                            onClick={() => setModalShow(true)}
                                            src="/images/icons/ui/Hidden.svg"
                                        />
                                    </div>
                                    <div className={styles.text}>
                                        Lorem ipsum dolor sit amet, coetur
                                        adipiscing elit ut aliquam, purus sit
                                        amet luctus Lorem ipsum dolor sit amet
                                        aliquam, purus sit amet luctus
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TipPage;
