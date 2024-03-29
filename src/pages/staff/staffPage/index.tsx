import type { NextPage } from 'next';
import styles from '@styles/pages/Staff.module.scss';
import Image from 'next/image';
import { BreadCrumbs } from '@components/ui/BreadCrumbs';

const StaffEdit: NextPage = () => {
    return (
        <>
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
                        </div>
                        <div className={styles.cont}>
                            <span className={styles.label}>Fullname</span>
                            <span className={styles.value}>
                                Brooklyn Simmons
                            </span>
                        </div>
                        <div className={styles.cont}>
                            <span className={styles.label}>Email</span>
                            <span className={styles.value}>
                                vuhaithuongnute@gmail.com
                            </span>
                        </div>
                        <div className={styles.cont}>
                            <span className={styles.label}>Nickname</span>
                            <span className={styles.value}>LoremIpsum</span>
                        </div>
                    </div>
                </div>
                <div className={styles.block}>
                    <div className={styles.title}>Access settings</div>
                    <div className={styles.column}>
                        <div className={styles.subTitle}>Role</div>
                        <div className={styles.row}>Moderator</div>
                    </div>
                    <div className={styles.column}>
                        <div className={styles.subTitle}>Permission</div>
                        <span>checkbox</span>
                        <span>checkbox</span>
                        <span>checkbox</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StaffEdit;
