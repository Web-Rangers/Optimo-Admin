import type { NextPage } from 'next';
import styles from '@styles/pages/Staff.module.scss';
import { useState } from 'react';
import classNames from 'classnames';
import Table from '@components/ui/Table';
import Image from 'next/image';
import { ReactSVG } from 'react-svg';
import Modal from '@components/modals/Modal';
import Input from '@components/inputs/Input';
import { Router, useRouter } from 'next/router';
import Link from 'next/link';

const data = Array.from(new Array(20).keys()).map((key) => {
    return {
        name: 'Cameron Williamson',
        role: 'moderator',
        mail: 'ckctm12@gmail.com',
        nickname: 'LoremIpsum007',
        block: key % 4 === 0 ? true : false,
        edit: '',
    };
});

const Staff: NextPage = () => {
    const columns = [
        {
            key: 'name',
            title: 'Full Name',
            dataIndex: 'name',
        },
        {
            key: 'mail',
            title: 'Email',
            dataIndex: 'mail',
        },
        {
            key: 'nickname',
            title: 'Nickname',
            dataIndex: 'nickname',
        },
        {
            key: 'role',
            title: 'Role',
            dataIndex: 'role',
        },
        {
            key: 'edit',
            title: '',
            dataIndex: 'edit',
            render: () => {
                return (
                    <span className={styles.tableEditCell}>
                        <Link href={'/staff/edit'}>
                            <ReactSVG
                                className={styles.editBtn}
                                src={'/images/icons/ui/ThinPencil.svg'}
                                onClick={() => {
                                    return;
                                }}
                            />
                        </Link>
                    </span>
                );
            },
        },
        {
            key: 'delete',
            title: '',
            dataIndex: 'delete',
            render: (block: boolean) => {
                return (
                    <span className={styles.tableEditCell}>
                        <ReactSVG
                            className={styles.editBtn}
                            src={'/images/icons/ui/Trash.svg'}
                            onClick={() => {
                                return;
                            }}
                        />
                    </span>
                );
            },
        },
    ];

    return (
        <>
            <div className={styles.container}>
                <div className={styles.pageTitle}>
                    Staff
                    <button className={styles.fillButton}>Add new staff</button>
                </div>
                <Table
                    columns={columns}
                    data={data}
                    rowClassName={styles.tableRow}
                    pagination={{
                        pageSize: 7,
                    }}
                />
            </div>
        </>
    );
};

export default Staff;
