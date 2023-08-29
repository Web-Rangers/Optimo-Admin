import type { NextPage } from 'next';
import styles from '@styles/pages/Bookmakers.module.scss';
import Table from '@components/ui/Table';
import Image from 'next/image';
import { ReactSVG } from 'react-svg';
import Modal from '@components/modals/Modal';
import Input from '@components/inputs/Input';
import { useState } from 'react';
import Select from '@components/inputs/Select';

const data = Array.from(new Array(4).keys()).map(() => {
    return {
        number: '1234567',
        id: '123456',
        name: 'Lorem',
        rating: '4.5',
        edit: '',
    };
});

interface ModalProps {
    onBackClick?: () => void;
    onConfirm?: () => void;
}

function ChangeBookmakerModal({ onBackClick, onConfirm }: ModalProps) {
    const [selectedItem, setSelectedItem] = useState('');
    return (
        <Modal onBackClick={onBackClick} className={styles.modal}>
            <div className={styles.header}>
                <div className={styles.title}>Change bookmaker</div>
                <div className={styles.close} onClick={onBackClick}>
                    <ReactSVG src="/images/icons/ui/X.svg" />
                </div>
            </div>
            <div className={styles.input}>
                <Select
                    items={Array.from(new Array(20).keys()).map((key) => {
                        return {
                            value: `${key}`,
                            title: `Bookmaker${key}`,
                        };
                    })}
                    onSelect={(newItem) => setSelectedItem(newItem)}
                    title="Bookmakers"
                />
            </div>
        </Modal>
    );
}

function EditBookmakerModal({ onBackClick, onConfirm }: ModalProps) {
    return (
        <Modal onBackClick={onBackClick} className={styles.modal}>
            <div className={styles.header}>
                <div className={styles.title}>Edit bookmaker</div>
                <div className={styles.close} onClick={onBackClick}>
                    <ReactSVG src="/images/icons/ui/X.svg" />
                </div>
            </div>
            <div className={styles.inputContainer}>
                <div className={styles.uploadFile}>
                    <ReactSVG src="/images/icons/ui/CloudUpload.svg" />
                    <span className={styles.inputText}>
                        Drop image here, or{' '}
                        <button className={styles.text}>browse</button>
                    </span>
                </div>
            </div>
            <div className={styles.inputs}>
                <Input label="Name" />
                <Input label="Rating" />
            </div>
        </Modal>
    );
}

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
                        <ReactSVG
                            className={styles.editBtn}
                            src={'/images/icons/ui/ThinPencil.svg'}
                            onClick={() => {
                                setIsEdit(true);
                                return;
                            }}
                        />
                    </span>
                );
            },
        },
    ];
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [isChange, setIsChange] = useState<boolean>(false);
    return (
        <>
            {isChange? <ChangeBookmakerModal onBackClick={()=>setIsChange(false)}/> : null}
            {isEdit ? (
                <EditBookmakerModal onBackClick={() => setIsEdit(false)} />
            ) : null}
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
                                    setIsChange(true);
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
                                    setIsChange(true);
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
                                    setIsChange(true);
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
