import type { NextPage } from 'next';
import styles from '@styles/pages/Bookmakers.module.scss';
import classNames from 'classnames';
import Table from '@components/ui/Table';
import Link from 'next/link';
import Image from 'next/image';
import { ReactSVG } from 'react-svg';

const data = Array.from(new Array(4).keys()).map((key) => {
    return {
        number: '1234567',
        id: '123456',
        name: 'Lorem',
        rating: '4.5',
        edit: '',
    };
});

const Bookmakers: NextPage = () => {
    const columns = [
        {
            key: 'number',
            title: 'Number',
            dataIndex: 'number',
        },
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
            key: 'rating',
            title: 'Rating',
            dataIndex: 'rating',
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
    ];
    return (
        <>
            <div className={styles.container}>
                <div className={styles.pageTitle}>Bookmakers</div>
                <div className={styles.block}>
                    <div className={styles.title}>Top 3</div>
                    <div className={styles.row}>
                        <div className={styles.bookmaker}>
                            <Image
                                alt="image"
                                width={50}
                                height={50}
                                src="/images/bookmakers/bk1.png"
                            />
                            <span className={styles.name}>1234567</span>
                            <ReactSVG
                                className={styles.editBtn}
                                src={'/images/icons/ui/ThinPencil.svg'}
                                onClick={() => {
                                    return;
                                }}
                            />
                            <ReactSVG
                                className={styles.editBtn}
                                src={'/images/icons/ui/Trash.svg'}
                                onClick={() => {
                                    return;
                                }}
                            />
                        </div>
                        <div className={styles.bookmaker}>
                            <Image
                                alt="image"
                                width={50}
                                height={50}
                                src="/images/bookmakers/bk1.png"
                            />
                            <span className={styles.name}>1234567</span>
                            <ReactSVG
                                className={styles.editBtn}
                                src={'/images/icons/ui/ThinPencil.svg'}
                                onClick={() => {
                                    return;
                                }}
                            />
                            <ReactSVG
                                className={styles.editBtn}
                                src={'/images/icons/ui/Trash.svg'}
                                onClick={() => {
                                    return;
                                }}
                            />
                        </div>
                        <div className={styles.bookmaker}>
                            <Image
                                alt="image"
                                width={50}
                                height={50}
                                src="/images/bookmakers/bk1.png"
                            />
                            <span className={styles.name}>1234567</span>
                            <ReactSVG
                                className={styles.editBtn}
                                src={'/images/icons/ui/ThinPencil.svg'}
                                onClick={() => {
                                    return;
                                }}
                            />
                            <ReactSVG
                                className={styles.editBtn}
                                src={'/images/icons/ui/Trash.svg'}
                                onClick={() => {
                                    return;
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.block}>
                    <div className={styles.title}>Bookmakers</div>
                    <Table
                        columns={columns}
                        data={data}
                        rowClassName={styles.tableRow}
                      headerClassName={styles.tableHeader}  
                    />
                </div>
            </div>
        </>
    );
};

export default Bookmakers;
