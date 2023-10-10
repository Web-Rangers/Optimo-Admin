import type { NextPage } from 'next';
import styles from '@styles/pages/Сompetition.module.scss';
import DatePicker from '@components/inputs/DatePicker';
import { useState } from 'react';
import { ReactSVG } from 'react-svg';
import classNames from 'classnames';
import Image from 'next/image';
import Input from '@components/inputs/Input';
import Select from '@components/inputs/Select';
import Modal from '@components/modals/Modal';
import { BreadCrumbs } from '@components/ui/BreadCrumbs';

function ordinal_suffix_of(i: number) {
    const j: number = i % 10,
        k: number = i % 100;
    if (j == 1 && k != 11) {
        return `${i}st`;
    }
    if (j == 2 && k != 12) {
        return `${i}nd`;
    }
    if (j == 3 && k != 13) {
        return `${i}rd`;
    }
    return `${i}th`;
}

interface PrizeEditModalProps {
    onSuccess: (newPrize: number) => void;
    onCancel: () => void;
    defaultValue: number;
}

interface Winner {
    photo: string;
    name: string;
    prize: number;
}

interface WinnersModalProps {
    winners: Winner[];
    onBackClick: () => void;
}

const WinnersModal = ({ winners, onBackClick }: WinnersModalProps) => {
    return (
        <Modal onBackClick={onBackClick} className={styles.winnersModal}>
            <div className={styles.header}>
                <div className={styles.title}>Winners</div>
                <div className={styles.close} onClick={onBackClick}>
                    <ReactSVG src="/images/icons/ui/X.svg" />
                </div>
            </div>
            <div className={styles.body}>
                <Select
                    className={styles.timeSelect}
                    items={[
                        {
                            title: 'New one first',
                            value: '1',
                        },
                    ]}
                    defaultValue="1"
                    onSelect={() => {
                        return;
                    }}
                    title=""
                    variant="text"
                />
                <div className={styles.winnerWrapper}>
                    {winners.map((winner, index) => {
                        return (
                            <div key={index} className={styles.winner}>
                                <div className={styles.winnerInfo}>
                                    <Image
                                        src={winner.photo}
                                        alt="photo"
                                        width={40}
                                        height={40}
                                    />
                                    <div className={styles.name}>
                                        {winner.name}
                                    </div>
                                </div>
                                <div className={styles.prize}>
                                    {`${winner.prize}$`}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Modal>
    );
};

const PrizeEditModal = ({
    onSuccess,
    onCancel,
    defaultValue,
}: PrizeEditModalProps) => {
    const [value, setValue] = useState(defaultValue);
    return (
        <Modal onBackClick={onCancel} className={styles.modal}>
            <div className={styles.modalBody}>
                <Input
                    label="Reward"
                    type="number"
                    className={styles.inputShort}
                    value={value}
                    onChange={(newValue: number) => setValue(+newValue)}
                    defaultValue={defaultValue}
                />
            </div>
            <div className={styles.modalActions}>
                <button
                    className={styles.saveAction}
                    onClick={() => onSuccess(value)}
                >
                    Save
                </button>
                <button onClick={onCancel} className={styles.cancelAction}>
                    Cancel
                </button>
            </div>
        </Modal>
    );
};

const Comp: NextPage = () => {
    const [tab, setTab] = useState(2);
    const [date, setDate] = useState('');
    const [newDate, setNewDate] = useState('');
    const [prizeList, setPrizeList] = useState<number[]>([750, 200, 150]);
    const [isEdit, setIsEdit] = useState(false);
    const [isWinnersShow, setIsWinnersShow] = useState(false);
    const [editingPrize, setEditingPrize] = useState(0);
    return (
        <>
            {isWinnersShow && (
                <WinnersModal
                    winners={[
                        {
                            name: 'Cameron Williamson',
                            photo: '/images/users/photo.png',
                            prize: 1500,
                        },
                        {
                            name: 'Brooklyn Simmons',
                            photo: '/images/users/photo.png',
                            prize: 250,
                        },
                        {
                            name: 'Savannah Nguyen',
                            photo: '/images/users/photo.png',
                            prize: 750,
                        },
                        {
                            name: 'Ralph Edwards',
                            photo: '/images/users/photo.png',
                            prize: 100,
                        },
                    ]}
                    onBackClick={() => setIsWinnersShow(false)}
                />
            )}
            {isEdit ? (
                <PrizeEditModal
                    onCancel={() => setIsEdit(false)}
                    defaultValue={prizeList[editingPrize] as number}
                    onSuccess={(newValue) => {
                        const newArr = [...prizeList];
                        newArr[editingPrize] = newValue;
                        setPrizeList(newArr);
                        setIsEdit(false);
                    }}
                />
            ) : null}
            <div className={styles.container}>
                <div className={styles.pageHeader}>
                    <div className={styles.pageTitle}>
                        <div className={styles.titleWithBreadCrumbs}>
                            Edit competition
                            <BreadCrumbs />
                        </div>
                    </div>
                </div>
                    <div className={styles.content}>
                        <div className={styles.bottomContent}>
                            <div className={styles.block}>
                                <div className={styles.title}>
                                    Edit competition
                                </div>
                                <div className={styles.inputContainer}>
                                    <div className={styles.title}>
                                        Backround
                                    </div>
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
                                        <span
                                            className={styles.addPrizeText}
                                            onClick={() =>
                                                setPrizeList([...prizeList, 0])
                                            }
                                        >
                                            <ReactSVG src="/images/icons/ui/Plus.svg" />{' '}
                                            Add another prize
                                        </span>
                                    </div>
                                    <div className={styles.rewardWrapper}>
                                        {prizeList.map((prize, key) => {
                                            return (
                                                <div
                                                    key={key}
                                                    className={styles.reward}
                                                >
                                                    <div
                                                        className={
                                                            styles.rewardBody
                                                        }
                                                    >
                                                        <div
                                                            className={
                                                                styles.rewardParams
                                                            }
                                                        >
                                                            <div
                                                                className={
                                                                    styles.prize
                                                                }
                                                            >
                                                                {prize}$
                                                            </div>
                                                            <div
                                                                className={
                                                                    styles.place
                                                                }
                                                            >
                                                                {ordinal_suffix_of(
                                                                    key + 1
                                                                )}{' '}
                                                                place
                                                            </div>
                                                        </div>
                                                        <div
                                                            className={
                                                                styles.prizeContainer
                                                            }
                                                        >
                                                            {key < 3 ? (
                                                                <Image
                                                                    src={`/images/competetion/prize${
                                                                        key + 1
                                                                    }.png`}
                                                                    alt="prize"
                                                                    width={0}
                                                                    height={0}
                                                                    className={
                                                                        styles.medal
                                                                    }
                                                                />
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={
                                                            styles.rewardActions
                                                        }
                                                    >
                                                        <button
                                                            className={classNames(
                                                                styles.text,
                                                                styles.editBtn
                                                            )}
                                                            onClick={() => {
                                                                setEditingPrize(
                                                                    key
                                                                );
                                                                setIsEdit(true);
                                                            }}
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            className={classNames(
                                                                styles.text,
                                                                styles.deleteBtn
                                                            )}
                                                            onClick={() => {
                                                                const newArr = [
                                                                    ...prizeList,
                                                                ];
                                                                newArr.splice(
                                                                    key,
                                                                    1
                                                                );
                                                                setPrizeList(
                                                                    newArr
                                                                );
                                                            }}
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                <button
                                    style={{ alignSelf: 'flex-end' }}
                                    className={styles.fillButton}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
            </div>
        </>
    );
};

export default Comp;
