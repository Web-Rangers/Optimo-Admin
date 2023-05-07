import styles from '@styles/components/layouts/Header.module.scss';
import { ReactSVG } from 'react-svg';
import Image from 'next/image';

interface HeaderProps {
    isAuthorized?: boolean;
}

const Header = ({ isAuthorized = false }: HeaderProps) => {
    return (
        <header className={styles.header}>
            <div className={styles.profileCol}>
                <div className={styles.profileName}>Jane Cooper</div>
            </div>
            <Image
                width={40}
                height={40}
                className={styles.profilePhoto}
                src={'/images/users/Avatar.png'}
                alt="profile-image"
            />
        </header>
    );
};

export default Header;
