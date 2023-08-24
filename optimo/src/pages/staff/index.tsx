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
import ConfirmModal from '@components/modals/ConfirmModal';
import Badge from '@components/ui/Badge';

const data = Array.from(new Array(20).keys()).map((key) => {
    return {
        name: 'Cameron Williamson',
        role: 'moderator',
        mail: 'ckctm12@gmail.com',
        nickname: 'LoremIpsum007',
        block: key % 4 === 0 ? true : false,
        status:
            key % 2 === 0 ? 'active' : key % 3 === 0 ? 'inactive' : 'blocked',
        edit: '',
    };
});

const Staff: NextPage = () => {
    const [isOpen, setIsOpen] = useState(false);
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
            key: 'status',
            title: 'Status',
            dataIndex: 'status',
            headerStyle: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            },
            render: (status: string) => {
                return (
                    <div className={styles.badgeCell}>
                        {status === 'active' ? <Badge text="Active" /> : null}
                        {status === 'inactive' ? (
                            <Badge
                                dotColor="#667085"
                                backColor="#F2F4F7"
                                textColor="#344054"
                                text="Inactive"
                            />
                        ) : null}
                        {status === 'blocked' ? (
                            <Badge
                                dotColor="#DF371F"
                                backColor="#FDF2FA"
                                textColor="#C22E18"
                                text="Blocked"
                            />
                        ) : null}
                    </div>
                );
            },
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
                                setIsOpen(true);
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
            {isOpen ? (
                <ConfirmModal
                    title="Deletion confirmation"
                    text="Are you sure you want to delete this employee?"
                    onBackClick={() => setIsOpen(false)}
                    cancelText="No, Keep it"
                    acceptText="Yes, Delete"
                />
            ) : null}
            <div className={styles.container}>
                <div className={styles.pageTitle}>
                    Staff
                    <Link href={'/staff/add'}>
                        <button className={styles.fillButton}>
                            Add new staff
                        </button>
                    </Link>
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
