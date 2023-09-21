import type { NextPage } from 'next';
import styles from '@styles/pages/Staff.module.scss';
import { useState } from 'react';
import Image from 'next/image';
import Input from '@components/inputs/Input';
import Radio from '@components/inputs/Radio';
import CheckBox from '@components/ui/CheckBox';
import ConfirmModal from '@components/modals/ConfirmModal';
import { BreadCrumbs } from '@components/ui/BreadCrumbs';

const StaffEdit: NextPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            {isOpen ? (
                <ConfirmModal
                    acceptText="Yes, save changes"
                    cancelText="No, cancel"
                    text="Are you sure you want to save changes?"
                    title="Edit confirmation"
                    onBackClick={() => setIsOpen(false)}
                />
            ) : (
                false
            )}
            <div className={styles.container}>
                <div className={styles.pageTitle}>
                    <div className={styles.titleWithBreadCrumbs}>
                        Staff
                        <BreadCrumbs />
                    </div>
                    <button className={styles.fillButton}>Log out staff</button>
                </div>
                <div className={styles.block}>
                    <div className={styles.title}>Main</div>
                    <div className={styles.row}>
                        <div className={styles.imageContainer}>
                            <Image
                                className={styles.image}
                                src={'/images/users/photo.png'}
                                alt="image"
                                width={100}
                                height={100}
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
                        <Input label="Fullname" />
                        <Input label="Nickname" />
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
                    <button
                        onClick={() => setIsOpen(true)}
                        className={styles.fillButton}
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </>
    );
};

export default StaffEdit;
