import type { NextPage } from 'next';
import styles from '@styles/pages/SportCategories.module.scss';
import Table from '@components/ui/Table';
import Image from 'next/image';
import { ReactSVG } from 'react-svg';
import { BreadCrumbs } from '@components/ui/BreadCrumbs';

const data = [
    {
        id: 103,
        name: 'Football',
        image: '/images/icons/sports/football.png',
    },
    {
        id: 345,
        name: 'Hockey',
        image: '/images/icons/sports/hockey.png',
    },

    {
        id: 657,
        name: 'Rugby',
        image: '/images/icons/sports/rugby.png',
    },
    {
        id: 378,
        name: 'Boxing',
        image: '/images/icons/sports/boxing.png',
    },
    {
        id: 143,
        name: 'Handball',
        image: '/images/icons/sports/handball.png',
    },
];

const Staff: NextPage = () => {
    const columns = [
        {
            key: 'id',
            title: 'ID',
            dataIndex: 'id',
        },
        {
            key: 'name',
            title: 'Name',
            dataIndex: 'name',
        },
        {
            key: 'image',
            title: 'Image',
            dataIndex: 'image',
            headerStyle: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            },
            render: (image: string) => {
                return (
                    <div className={styles.imageCell}>
                        <Image
                            width={24}
                            height={24}
                            src={image}
                            alt="sport icon"
                        />
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
                        <ReactSVG
                            className={styles.editBtn}
                            src={'/images/icons/ui/ThinPencil.svg'}
                            onClick={() => {
                                return;
                            }}
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
        <>
            <div className={styles.container}>
                <div className={styles.pageTitle}>
                    <div className={styles.titleWithBreadCrumbs}>
                        Sports categories
                        <BreadCrumbs />
                    </div>
                </div>
                <Table
                    columns={columns}
                    data={data}
                    rowClassName={styles.tableRow}
                />
            </div>
        </>
    );
};

export default Staff;
