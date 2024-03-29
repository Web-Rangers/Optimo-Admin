import styles from '@styles/components/ui/Range.module.scss';
import classNames from 'classnames';
import {
    type CSSProperties,
    useEffect,
    useRef,
    useState,
    type Dispatch,
    type SetStateAction,
} from 'react';

export interface RangeProps {
    className?: string;
    minValue?: number;
    maxValue?: number;
    step?: number;
    onChange?: (min: number, max: number) => void;
    min?: number;
    max?: number;
}
let shift = 0;
let prevPos = 0;

const Range = ({
    className,
    minValue = 0,
    maxValue = 100,
    step = 1,
    min = minValue,
    max = maxValue / 2,
    onChange,
}: RangeProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [handle1, setHandle1] = useState<number>(min);
    const [handle1Active, setHandle1Active] = useState<boolean>(false);
    const [handle2, setHandle2] = useState<number>(max);
    const [handle2Active, setHandle2Active] = useState<boolean>(false);
    const [style1, setStyle1] = useState<React.CSSProperties>({});
    const [style2, setStyle2] = useState<React.CSSProperties>({});
    const [trackStyle, setTrackStyle] = useState<React.CSSProperties>({});

    function configurePositions() {
        let h1pos = (handle1 - minValue) / (maxValue - minValue);
        h1pos = Number.isNaN(h1pos) ? 0 : h1pos;
        let h2pos = (handle2 - minValue) / (maxValue - minValue);
        h2pos = Number.isNaN(h2pos) ? 0 : h2pos;
        const left = h1pos < h2pos ? h1pos : h2pos;
        const right = h1pos > h2pos ? h1pos : h2pos;
        const h1Style: CSSProperties = {
            left: `${h1pos * 100}%`,
        };
        const h2Style: CSSProperties = {
            left: `${h2pos * 100}%`,
        };
        const tStyle = {
            left: `${left * 100}%`,
            width: `${(right - left) * 100}%`,
        };
        setStyle1(h1Style);
        setStyle2(h2Style);
        setTrackStyle(tStyle);
    }

    useEffect(() => {
        document.addEventListener('mouseup', () => {
            setHandle1Active(false);
            setHandle2Active(false);
            document.body.classList.remove('slide');
        });
    }, []);

    useEffect(() => {
        configurePositions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [handle1, handle2, minValue, maxValue]);

    useEffect(() => {
        const min = handle1;
        const max = handle2;
        onChange?.call(null, min, max);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [handle1, handle2]);

    useEffect(() => {
        if (min === handle1 && max === handle2) return;
        if (min !== undefined) setHandle1(min);
        if (max !== undefined) setHandle2(max);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [min, max]);

    function getHandleMove(setter: Dispatch<SetStateAction<number>>) {
        return (event: MouseEvent) => {
            shift += event.clientX - prevPos;
            prevPos = event.clientX;
            const steps = (maxValue - minValue) / step;
            if (ref.current !== null)
                if (Math.abs(shift) >= ref.current.offsetWidth / steps) {
                    const translateX = shift / (ref.current.offsetWidth / steps);
                    shift = 0;
                    setter((origin) => {
                        let temp = origin + translateX;
                        temp =
                            temp < minValue
                                ? minValue
                                : temp > maxValue
                                ? maxValue
                                : temp;
                        return Math.round(temp);
                    });
                }
        };
    }

    useEffect(() => {
        if (handle1Active) {
            const event = getHandleMove(setHandle1);
            document.addEventListener('mousemove', event);
            document.addEventListener(
                'mouseup',
                () => {
                    document.removeEventListener('mousemove', event);
                },
                { once: true }
            );
        }
        if (handle2Active) {
            const event = getHandleMove(setHandle2);
            document.addEventListener('mousemove', event);
            document.addEventListener(
                'mouseup',
                () => {
                    document.removeEventListener('mousemove', event);
                },
                { once: true }
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [handle1Active, handle2Active]);

    return (
        <div className={classNames(styles.container, className)} ref={ref}>
            <div className={styles.rail} />
            <div className={styles.track} style={trackStyle} />
            <div
                className={styles.handle1}
                style={style1}
                onMouseDown={(event) => {
                    prevPos = event.clientX;
                    shift = 0;
                    setHandle1Active(true);
                    document.body.classList.add('slide');
                }}
            />
            <div
                className={styles.handle2}
                style={style2}
                onMouseDown={(event) => {
                    prevPos = event.clientX;
                    shift = 0;
                    setHandle2Active(true);
                    document.body.classList.add('slide');
                }}
            />
        </div>
    );
};

export default Range;
