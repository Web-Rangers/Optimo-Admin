import type { NextPage } from 'next';
import styles from '@styles/pages/Tipster.module.scss';
import tableStyles from '@styles/components/ui/Table.module.scss';
import DatePicker from '@components/inputs/DatePicker';
import { useState } from 'react';
import { ReactSVG } from 'react-svg';
import classNames from 'classnames';
import Image from 'next/image';
import Table from '@components/ui/Table';
import Modal from '@components/modals/Modal';
import Link from 'next/link';
import Input from '@components/inputs/Input';
import TextEditModal from '@components/modals/TextEditModal';

const data = Array.from(new Array(4).keys()).map((key) => {
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

function EditSliderModal({ onBackClick, onConfirm }: ModalProps) {
    const columns = [
        {
            key: 'id',
            title: 'Id',
            dataIndex: 'id',
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
                        <Input defaultValue={data as string} />
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
                        <Input defaultValue={data as string} />
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
            key: 'edit',
            title: '',
            dataIndex: 'edit',
            render: (
                data: any,
                key: any,
                isEdit: any,
                setIsEdit: (isEdit: boolean) => void
            ) => {
                if (isEdit) return <div></div>;
                return (
                    <span className={styles.tableEditCell}>
                        <ReactSVG
                            className={styles.editBtn}
                            src={'/images/icons/ui/ThinPencil.svg'}
                            onClick={() => {
                                setIsEdit(true);
                            }}
                        />
                    </span>
                );
            },
        },
        {
            key: 'status',
            title: '',
            dataIndex: 'status',
            render: (
                visibility: any,
                key: any,
                isEdit: any,
                setIsEdit: (isEdit: boolean) => void
            ) => {
                if (!isEdit) {
                    return (
                        <div className={styles.status}>
                            {visibility ? (
                                <ReactSVG src="/images/icons/ui/GreenEye.svg" />
                            ) : (
                                <ReactSVG src="/images/icons/ui/RedEye.svg" />
                            )}
                        </div>
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
                <div className={styles.title}>Edit Slider</div>
                <div className={styles.close} onClick={onBackClick}>
                    <ReactSVG src="/images/icons/ui/X.svg" />
                </div>
            </div>
            <div className={styles.imageInput}>
                <Image
                    src="/images/slider/slide1.png"
                    alt=""
                    width={670}
                    height={190}
                />
                <button className={styles.textBtn}>
                    <ReactSVG src="/images/icons/ui/CloudUpload.svg" />
                    Upload background
                </button>
            </div>
            <div className={styles.tableContainer}>
                <Table
                    columns={columns}
                    data={data}
                    rowClassName={styles.modalTableRow}
                    className={styles.table}
                />
            </div>
            <div className={styles.modalActions}>
                <button className={styles.outlineButton} onClick={onBackClick}>
                    Cancel
                </button>
                <button className={styles.fillButton} onClick={onConfirm}>
                    Save changes
                </button>
            </div>
        </Modal>
    );
}

const Tipster: NextPage = () => {
    const [sliderEdit, setSliderEdit] = useState(false);
    const [textEdit, setTextEdit] = useState(false);
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
    const text = {
        rus: 'Текст на русском',
        eng: 'Text in english',
        ger: 'text auf Deutsch',
        spa: 'texto en español',
    };
    return (
        <>
            {textEdit && (
                <TextEditModal
                    text={text}
                    onCancel={() => setTextEdit(false)}
                    title="Edit text"
                />
            )}
            {sliderEdit && (
                <EditSliderModal onBackClick={() => setSliderEdit(false)} />
            )}
            <div className={styles.container}>
                <div className={styles.pageTitle}>Tipster Ranking</div>
                <div className={styles.content}>
                    <div className={styles.column}>
                        <div className={styles.block}>
                            <div className={styles.title}>
                                Text information
                                <button
                                    className={styles.text}
                                    onClick={() => setTextEdit(true)}
                                >
                                    <ReactSVG src="/images/icons/ui/ThinPencil.svg" />
                                    Edit
                                </button>
                            </div>
                            <span className={styles.blockContent}>
                                Amet minim mollit non deserunt ullamco est sit
                                aliqua dolor do amet sint. Velit officia
                                consequat duis enim velit mollit. Exercitation
                                veniam consequat sunt nostrud amet.
                            </span>
                        </div>
                        <div className={styles.block}>
                            <div className={styles.title}>
                                Slider
                                <button
                                    className={styles.text}
                                    onClick={() => setSliderEdit(true)}
                                >
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
                    {/* <div className={styles.block}>
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
                </div> */}
                </div>
            </div>
        </>
    );
};

export default Tipster;
