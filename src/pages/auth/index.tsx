import type { NextPage } from 'next';
import styles from '@styles/pages/Auth.module.scss';
import Input from '@components/inputs/Input';

const Auth: NextPage = () => {
    return (
        <div className={styles.content}>
            <div className={styles.form}>
                <div className={styles.title}>
                    <span className={styles.bold}>Welcome</span>
                    <span className={styles.gray}>Sign In in your account</span>
                </div>
                <div className={styles.inputs}>
                    <Input
                        label="Email address"
                        placeholder="Email"
                        className={styles.input}
                    />
                    <Input
                        label="Password"
                        placeholder="Password"
                        className={styles.input}
                    />
                    <button className={styles.fillButton}>Sign In</button>
                </div>
            </div>
            <div className={styles.side}>
                <div className={styles.title}>OPTIOMO</div>
                <div className={styles.guyContainer}>
                    <div className={styles.guy}></div>
                </div>
            </div>
        </div>
    );
};
export default Auth;
