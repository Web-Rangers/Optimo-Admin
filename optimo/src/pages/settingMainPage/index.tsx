import type { NextPage } from 'next';
import styles from '@styles/pages/settings.module.scss';
import DatePicker from '@components/inputs/DatePicker';
import { useState } from 'react';
import Table from '@components/ui/Table';
import { ReactSVG } from 'react-svg';
import Image from 'next/image';

const data = Array.from(new Array(5).keys()).map((key) => {
    return {
        id: '1234',
        name: 'Lorem1',
        dateOfDownload: '22.04.2023',
        expirationDate: '22.04.2023',
        edit: '',
        delete: '',
    };
});

const Settings: NextPage = () => {
    const columns = [
        {
            key: 'id',
            title: 'Id',
            dataIndex: 'id',
        },
        {
            key: 'name',
            title: 'Name',
            dataIndex: 'name',
        },
        {
            key: 'dateOfDownload',
            title: 'Date Of Download',
            dataIndex: 'dateOfDownload',
        },
        {
            key: 'expirationDate',
            title: 'Expiration Date',
            dataIndex: 'expirationDate',
        },
        {
            key: 'edit',
            title: '',
            dataIndex: 'edit',
            render: () => {
                return (
                    <span className={styles.tableEditCell}>
                        <ReactSVG
                            className={styles.editBtn}
                            src={'/images/icons/ui/ThinPencil.svg'}
                        />
                    </span>
                );
            },
        },
        {
            key: 'delete',
            title: '',
            dataIndex: 'delete',
            render: () => {
                return (
                    <span className={styles.tableEditCell}>
                        <ReactSVG
                            className={styles.editBtn}
                            src={'/images/icons/ui/Trash.svg'}
                        />
                    </span>
                );
            },
        },
    ];
    return (
        <div className={styles.container}>
            <div className={styles.pageTitle}>
                Setting main page 
                <button className={styles.fillButton}>Edit Headers</button>
            </div>
            <div className={styles.block}>
                <div className={styles.title}>Slider</div>
                <Table
                    data={data}
                    columns={columns}
                    rowClassName={styles.tableRow}
                    headerClassName={styles.tableHeader}
                    className={styles.table}
                />
            </div>
            <div className={styles.block}>
                <div className={styles.title}>Bookmakers</div>
                <div className={styles.bookmakerWrapper}>
                    <div className={styles.bookmaker}>
                        <div className={styles.image}>
                            <Image
                                width={50}
                                height={50}
                                src={'/images/bookmakers/bk1.png'}
                                alt="photo"
                            />
                        </div>
                        <div className={styles.name}>12345</div>
                        <ReactSVG
                            className={styles.editBtn}
                            src={'/images/icons/ui/Trash.svg'}
                        />
                    </div>
                    <div className={styles.bookmaker}>
                        <div className={styles.image}>
                            <Image
                                width={50}
                                height={50}
                                src={'/images/bookmakers/bk1.png'}
                                alt="photo"
                            />
                        </div>
                        <div className={styles.name}>12345</div>
                        <ReactSVG
                            className={styles.editBtn}
                            src={'/images/icons/ui/Trash.svg'}
                        />
                    </div>
                    <div className={styles.bookmaker}>
                        <div className={styles.image}>
                            <Image
                                width={50}
                                height={50}
                                src={'/images/bookmakers/bk1.png'}
                                alt="photo"
                            />
                        </div>
                        <div className={styles.name}>12345</div>
                        <ReactSVG
                            className={styles.editBtn}
                            src={'/images/icons/ui/ThinPencil.svg'}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
