import type { NextPage } from 'next';
import styles from '@styles/pages/Staff.module.scss';
import { useState } from 'react';
import classNames from 'classnames';
import Table from '@components/ui/Table';
import Image from 'next/image';
import { ReactSVG } from 'react-svg';
import Modal from '@components/modals/Modal';
import Input from '@components/inputs/Input';
import Radio from '@components/inputs/radio';
import CheckBox from '@components/ui/CheckBox';

const StaffEdit: NextPage = () => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.pageTitle}>
                    Staff
                    <button className={styles.fillButton}>Log out staff</button>
                </div>
                <div className={styles.block}>
                    <div className={styles.title}>Main</div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <Input
                                labelStyle={{ color: '#201522' }}
                                label="Fullname"
                                placeholder="Fullname"
                            />
                            <Input
                                labelStyle={{ color: '#201522' }}
                                label="Email"
                                placeholder="Email"
                            />
                            <Input
                                labelStyle={{ color: '#201522' }}
                                label="Nickname"
                                placeholder="Mickname"
                            />
                        </div>
                        <div className={styles.borderedImageContainer}>
                            <Image
                                className={styles.image}
                                src={'/images/users/photo.png'}
                                alt="image"
                                width={135}
                                height={135}
                            />
                            <div className={styles.changeImageBtn}>
                                <Image
                                    width={24}
                                    height={24}
                                    alt={'camera'}
                                    src="/images/icons/ui/camera.png"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.block}>
                    <div className={styles.title}>Access settings</div>
                    <div className={styles.column}>
                        <div className={styles.subTitle}>Role</div>
                        <div className={styles.row}>
                            <Radio
                                label="Moderator"
                                id="role"
                                value="moderator"
                            />
                            <Radio label="Admin" id="role" value="admin" />
                        </div>
                    </div>
                    <div className={styles.column}>
                        <div className={styles.subTitle}>Permission</div>
                        <CheckBox id="perm1" label="checkbox" />
                        <CheckBox id="perm2" label="checkbox" />
                        <CheckBox id="perm3" label="checkbox" />
                    </div>
                </div>
                <div className={styles.row}>
                    <button className={styles.outlineButton}>Cancel</button>
                    <button className={styles.fillButton}>Add staff</button>
                </div>
            </div>
        </>
    );
};

export default StaffEdit;
