import styles from '@styles/components/ui/Badge.module.scss';

interface BadgeProps {
    dotColor?: string;
    backColor?: string;
    textColor?: string;
    text?: string;
}

const Badge = ({
    dotColor = '#00B247',
    backColor = '#ECFDF3',
    textColor = '#027A48',
    text,
}: BadgeProps) => {
    return (
        <div
            className={styles.badge}
            style={{
                backgroundColor: backColor,
                color: textColor,
            }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
            >
                <circle cx="4" cy="4" r="3" fill={dotColor} />
            </svg>
            {text}
        </div>
    );
};

export default Badge;
