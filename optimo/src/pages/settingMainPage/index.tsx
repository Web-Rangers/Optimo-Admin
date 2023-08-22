import type { NextPage } from 'next';
import styles from '@styles/pages/settings.module.scss';
import DatePicker from '@components/inputs/DatePicker';
import tableStyles from '@styles/components/ui/Table.module.scss';
import { useState } from 'react';
import Table from '@components/ui/Table';
import { ReactSVG } from 'react-svg';
import Image from 'next/image';
import Input from '@components/inputs/Input';
import Modal from '@components/modals/Modal';
import Select from '@components/inputs/Select';

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

const sports = Array.from(new Array(4).keys()).map((key) => {
    return {
        id: '1234',
        name: 'Football',
        image: '',
        status: true,
        isEdit: false,
    };
});

interface ModalProps {
    onBackClick?: () => void;
    onConfirm?: () => void;
}

function EditHeaderModal({ onBackClick, onConfirm }: ModalProps) {
    const [selected, setSelected] = useState('1');
    const columns = [
        {
            key: 'id',
            title: 'Id',
            dataIndex: 'id',
            render: (data: any, key: any) => {
                return (
                    <div
                        className={`${tableStyles.tableCell as string} ${
                            tableStyles.tableCellTemplate as string
                        }`}
                        key={`data-${key as string}`}
                    >
                        {data}
                    </div>
                );
            },
        },
        {
            key: 'name',
            title: 'Name',
            dataIndex: 'name',
            render: (data: any, key: any, isEdit: any) => {
                if (!isEdit) {
                    return (
                        <div
                            className={`${tableStyles.tableCell as string} ${
                                tableStyles.tableCellTemplate as string
                            }`}
                            key={`data-${key as string}`}
                        >
                            {data}
                        </div>
                    );
                }

                return (
                    <div
                        className={`${tableStyles.tableCell as string} ${
                            tableStyles.tableCellTemplate as string
                        } ${styles.inputCell as string}`}
                        key={`data-${key as string}`}
                    >
                        <Select
                            title=""
                            onSelect={(newItem) => setSelected(newItem)}
                            items={[
                                { title: 'Football', value: '1' },
                                { title: 'Rugby', value: '2' },
                            ]}
                        />
                    </div>
                );
            },
        },
        {
            key: 'image',
            title: 'Image',
            dataIndex: 'image',
            render: (data: any, key: any, isEdit: any) => {
                if (!isEdit) {
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
                }
                return (
                    <div className={styles.imageContainer}>
                        <div className={styles.image}>
                            <Image
                                width={22}
                                height={22}
                                src="/images/icons/Target.png"
                                alt=""
                            />

                            <div className={styles.editImageBtn}>
                                <Image
                                    width={22}
                                    height={22}
                                    src="/images/icons/ui/camera.png"
                                    alt=""
                                />
                            </div>
                        </div>
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
            key: 'status',
            title: '',
            dataIndex: 'status',
            render: (
                data: any,
                key: any,
                isEdit: any,
                setIsEdit: (isEdit: boolean) => void
            ) => {
                if (!isEdit) {
                    return (
                        <span className={styles.statusCheck}>
                            <ReactSVG
                                className={styles.editBtn}
                                src={'/images/icons/ui/ThinPencil.svg'}
                                onClick={() => {
                                    setIsEdit(true);
                                }}
                            />
                            <ReactSVG
                                className={styles.editBtn}
                                src={'/images/icons/ui/Trash.svg'}
                                onClick={() => {
                                    setIsEdit(true);
                                }}
                            />
                        </span>
                    );
                }
                return (
                    <div className={styles.statusCheck}>
                        <ReactSVG
                            src="/images/icons/ui/CheckCircle.svg"
                            onClick={() => setIsEdit(false)}
                        />
                        <ReactSVG
                            className={styles.cancelCircle}
                            src="/images/icons/ui/XCircle.svg"
                            onClick={() => setIsEdit(false)}
                        />
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
        <Modal onBackClick={onBackClick} className={styles.modal}>
            <div className={styles.header}>
                <div className={styles.title}>Header</div>
                <div className={styles.close} onClick={onBackClick}>
                    <ReactSVG src="/images/icons/ui/X.svg" />
                </div>
            </div>
            <div className={styles.tableContainer}>
                <Table
                    columns={columns}
                    data={sports}
                    rowClassName={styles.modalTableRow}
                    className={styles.table}
                />
            </div>
            <div className={styles.modalActions}>
                <button className={styles.textBtn}>+ Add category </button>
            </div>
        </Modal>
    );
}

const Settings: NextPage = () => {
    const [headerEdit, setHeaderEdit] = useState(false);
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
        <>
            {headerEdit && (
                <EditHeaderModal onBackClick={() => setHeaderEdit(false)} />
            )}
            <div className={styles.container}>
                <div className={styles.pageTitle}>
                    Setting main page 
                    <button
                        className={styles.fillButton}
                        onClick={() => setHeaderEdit(true)}
                    >
                        Edit Header
                    </button>
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
                {/* <div className={styles.block}>
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
            </div> */}
            </div>
        </>
    );
};

export default Settings;
