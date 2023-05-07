// import styles from "@styles/components/layout/Header.module.scss";

import styles from '@styles/components/layouts/SidebarLayout.module.scss';
import { ReactNode, useEffect, useState } from 'react';
import Header from './Header';
import Image from 'next/image';
import { ReactSVG } from 'react-svg';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface LayoutProps {
    children: ReactNode[] | ReactNode;
}

interface MenuLinkProps {
    img: string;
    href: string;
    name: string;
    router: any;
}

const links = [
    {
        img: '/images/icons/ui/Bookmakers.svg',
        href: '/Bookmakers',
        name: 'Bookmakers',
    },
    {
        img: '/images/icons/ui/Competition.svg',
        href: '/competition',
        name: 'Competition',
    },
    {
        img: '/images/icons/ui/Event.svg',
        href: '/events',
        name: 'Events',
    },
    {
        img: '/images/icons/ui/Rating Tipsters.svg',
        href: '/tipsterRanking',
        name: 'Tipster Ranking',
    },
    {
        img: '/images/icons/ui/Settings.svg',
        href: '/settingMainPage',
        name: 'Setting Main',
    },
    {
        img: '/images/icons/ui/Group.svg',
        href: '/staff',
        name: 'Staff',
    },
    {
        img: '/images/icons/ui/User.svg',
        href: '/users',
        name: 'Users',
    },
];

function MenuLink({ img, href, name, router }: MenuLinkProps) {
    const [active, setActive] = useState(false);

    useEffect(() => {
        setActive(location.pathname == href);
    }, [router]);

    return (
        <Link href={href}>
            <div
                className={classNames(styles.navItem, {
                    [`${styles.navCurrent}`]: active,
                })}
            >
                <div className={styles.navLeft}>
                    <ReactSVG className={styles.navIcon} src={img} />
                    <div className={styles.navLabel}>{name}</div>
                </div>
                <div className={styles.navIndicator}></div>
            </div>
        </Link>
    );
}

const SidebarLayout: React.FC<LayoutProps> = (props) => {
    const { children } = props;
    const router = useRouter();
    return (
        <div className={styles.layout}>
            <div className={styles.leftSide}>
                OPTIMO
                <div className={styles.navContainer}>
                    {links.map((link, index) => {
                        return (
                            <MenuLink key={index} router={router} {...link} />
                        );
                    })}
                </div>
                <MenuLink router={router} img="/images/icons/ui/SignOut.svg" href="/logout" name="Log Out"/>
            </div>
            <div className={styles.rightSide}>
                <Header />
                {children}
            </div>
        </div>
    );
};

export default SidebarLayout;
