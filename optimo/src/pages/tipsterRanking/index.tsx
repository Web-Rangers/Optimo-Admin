import type { NextPage } from 'next';
import styles from '@styles/pages/Tipster.module.scss';
import DatePicker from '@components/inputs/DatePicker';
import { useState } from 'react';
import { ReactSVG } from 'react-svg';
import classNames from 'classnames';
import Image from 'next/image';
import Table from '@components/ui/Table';

const data = Array.from(new Array(4).keys()).map((key) => {
    return {
        id: '1234',
        name: 'Football',
        image: '',
        status: true,
    };
});

const Tipster: NextPage = () => {
    const columns = [
        {
            key: 'id',
            title: 'Id',
            dataIndex: 'id',
        },
        {
            key: 'image',
            title: 'Image',
            dataIndex: 'image',
            render: () => {
                return (
                    <div className={styles.imageContainer}>
                        <Image
                            width={22}
                            height={22}
                            src="/images/icons/Target.png"
                            alt=""
                        />
                    </div>
                );
            },
            headerStyle: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            },
        },
        {
            key: 'name',
            title: 'Name',
            dataIndex: 'name',
        },
        {
            key: 'status',
            title: 'Status',
            dataIndex: 'status',
            render: (visibility: boolean) => {
                return (
                    <div className={styles.status}>
                        {visibility ? (
                            <ReactSVG src="/images/icons/ui/GreenEye.svg" />
                        ) : (
                            <ReactSVG src="/images/icons/ui/RedEye.svg" />
                        )}
                    </div>
                );
            },
            headerStyle: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
            },
        },
    ];
    return (
        <div className={styles.container}>
            <div className={styles.pageTitle}>Tipster Ranking</div>
            <div className={styles.content}>
                <div className={styles.column}>
                    <div className={styles.block}>
                        <div className={styles.title}>
                            Text information
                            <button className={styles.text}>
                                <ReactSVG src="/images/icons/ui/ThinPencil.svg" />
                                Edit
                            </button>
                        </div>
                        <span className={styles.blockContent}>
                            Amet minim mollit non deserunt ullamco est sit
                            aliqua dolor do amet sint. Velit officia consequat
                            duis enim velit mollit. Exercitation veniam
                            consequat sunt nostrud amet.
                        </span>
                    </div>
                    <div className={styles.block}>
                        <div className={styles.title}>
                            Slider
                            <button className={styles.text}>
                                <ReactSVG src="/images/icons/ui/ThinPencil.svg" />
                                Edit
                            </button>
                        </div>
                        <div className={styles.tableContainer}>
                            <div className={styles.image} />
                            <Table
                                columns={columns}
                                data={data}
                                rowClassName={styles.tableRow}
                                className={styles.table}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.block}>
                    <div className={styles.title}>Choice of reward</div>
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
                                2
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
                                3
                            </div>
                            <div className={styles.verticalDivider} />
                            <span className={styles.prize}>750$</span>
                            <div className={styles.whiteSpace} />
                            <ReactSVG src="/images/icons/ui/trash.svg" />
                        </div>
                        <div className={styles.reward}>
                            <div className={classNames(styles.medal)}>4</div>
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

export default Tipster;
