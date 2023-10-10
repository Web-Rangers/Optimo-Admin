import Link from 'next/link';
import styles from '@styles/components/ui/BreadCrumbs.module.scss';
import { useRouter } from 'next/router';
import React from 'react';
import classNames from 'classnames';
import { ReactSVG } from 'react-svg';

interface BreadCrumb {
    route: string;
    label: string;
    link: string;
}

interface Crumb {
    link: string;
    route: string;
    label: string;
}

interface RoutMapArray {
    [index: string]: string;
}

const Route2LabelMap: RoutMapArray = {
    '/': 'Main',
    '/events/eventPage': 'Event page',
    '/events/eventPage/tipPage': 'Tip page',
    '/settingMainPage': 'Setting main page',
    '/sportCategories': 'Sport categories',
    '/staff/staffPage': 'Staff page',
    '/staff/edit': 'Staff page',
    '/staff/add': 'Add staff',
    '/tipsterRanking': 'Tipster Ranking',
    '/users/userPage': 'User page',
    '/competition/edit': 'Edit competition'
};

function titleCaseWord(str: string) {
    if (!str) return str;

    return str.substring(0, 1).toUpperCase() + str.substr(1).toLowerCase();
}

export function BreadCrumbs() {
    const router = useRouter();

    const [crumbs, setCrumbs] = React.useState<Crumb[]>([]);

    React.useEffect(() => {
        const segmentsPath = router.asPath.split('/');
        const segmentsRoute = router.route.split('/');
        const crumbLinks = CombineAccumulatively(segmentsPath);
        const crumbLabels = CombineAccumulatively(segmentsRoute);

        const crumbs = crumbLinks.map((link, index) => {
            const route = crumbLabels[index] as string;
            const crumb: Crumb = {
                link: link,
                route: route,
                label: Route2LabelMap[route] || titleCaseWord(route.slice(1)),
            };
            return crumb;
        });

        setCrumbs(crumbs);

        console.log({
            router,
            segmentsPath,
            segmentsRoute,
            crumbLinks,
            crumbLabels,
            crumbs,
        });
    }, [router.route]);

    return (
        <div className={styles.breadCrumbs}>
            {crumbs.map((c, i) => {
                return (
                    <div className={styles.breadCrumbItem} key={i}>
                        {i > 0 ? (
                            <ReactSVG
                                className={styles.breadCrumbIcon}
                                src="/images/icons/ui/GrayChevronRight.svg"
                            />
                        ) : null}
                        {/* <div className={(i == (crumbs.length - 1) ? 'bg-blue-300 ' : 'bg-gray-300 ') + " px-2 py-1 rounded-xl"}> */}
                        <div
                            className={classNames(styles.breadCrumbLink, {
                                [`${styles.currentLink as string}`]:
                                    i == crumbs.length - 1,
                            })}
                        >
                            <Link href={c.link}>{c.label}</Link>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

function CombineAccumulatively(segments: string[]) {
    /* 
  when segments = ['1','2','3']
  returns ['1','1/2','1/2/3']
  */
    const links = segments.reduce((acc: string[], cur, curIndex) => {
        const last = curIndex > 1 ? acc[curIndex - 1] : '';
        const newPath = (last as string) + '/' + cur;
        acc.push(newPath);
        return acc;
    }, []);
    return links;
}
