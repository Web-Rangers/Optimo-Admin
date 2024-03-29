import classNames from 'classnames';
import styles from '@styles/components/inputs/Inputs.module.scss';
import { ReactSVG } from 'react-svg';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

enum DayName {
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6,
    Sunday = 0,
}

enum MonthName {
    January = 0,
    February = 1,
    March = 2,
    April = 3,
    May = 4,
    June = 5,
    July = 6,
    August = 7,
    September = 8,
    October = 9,
    November = 10,
    December = 11,
}

declare global {
    interface Date {
        GetFirstDayOfWeek(): Date;
        GetLastDayOfWeek(): Date;
        GetWeekDay(weekday: number): Date;
    }
}

Date.prototype.GetFirstDayOfWeek = function () {
    const date = new Date(this.getFullYear(), this.getMonth(), this.getDate());
    return new Date(
        date.setDate(
            date.getDate() - date.getDay() + (date.getDay() == 0 ? -6 : 1)
        )
    );
};
Date.prototype.GetLastDayOfWeek = function () {
    const date = new Date(this.getFullYear(), this.getMonth(), this.getDate());
    return new Date(
        date.setDate(
            date.getDate() - date.getDay() + (date.getDay() == 0 ? 0 : 7)
        )
    );
};
Date.prototype.GetWeekDay = function (weekday: number) {
    const date = new Date(this.getFullYear(), this.getMonth(), this.getDate());
    const day = this.getDay();
    return new Date(
        date.setDate(date.getDate() - day + (day == 0 ? -6 : 1) + weekday)
    );
};

function daysInMonth(month: number, year: number) {
    return new Date(year, month + 1, 0).getDate();
}

function getDayOfWeek(day: number, month: number, year: number) {
    const dayOfWeek = new Date(year, month, day).getDay();
    return dayOfWeek + 1;
}

function getPrevMonthDate(date: Date) {
    let year = date.getFullYear();
    let month = date.getMonth();
    if (month === 0) {
        month = 11;
        year -= 1;
    } else {
        month -= 1;
    }
    return new Date(year, month);
}

function getNextMonthDate(date: Date) {
    let year = date.getFullYear();
    let month = date.getMonth();
    if (month === 11) {
        month = 0;
        year += 1;
    } else {
        month += 1;
    }
    return new Date(year, month);
}

function compareDateMonth(dateA: Date, dateB: Date) {
    if (dateA.getFullYear() > dateB.getFullYear()) return true;
    if (dateA.getFullYear() < dateB.getFullYear()) return false;
    if (dateA.getMonth() > dateB.getMonth()) return true;
    return false;
}

// function compareDate(dateA: Date, dateB: Date) {
//     if (dateA.getFullYear() >= dateB.getFullYear()) return true;
//     if (dateA.getFullYear() < dateB.getFullYear()) return false;
//     if (dateA.getMonth() >= dateB.getMonth()) return true;
//     if (dateA.getMonth() < dateB.getMonth()) return false;
//     if (dateA.getDate() >= dateB.getDate()) return true;
//     return false;
// }

interface DatePickerProps {
    className?: string;
    label?: string;
    value?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
    mode?: 'single' | 'range';
    name?: string;
}

export default function DatePicker({
    className,
    label,
    value,
    placeholder,
    onChange,
    mode,
    name,
}: DatePickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [valueDate, setValuseDate] = useState(value ?? '');
    const dateField = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setValuseDate(value ?? '');
    }, [value]);

    return (
        <div className={classNames([styles.inputContainer, className])}>
            {label && <span className={styles.label}>{label}</span>}
            <div className={styles.input}>
                <input
                    name={name}
                    value={valueDate}
                    placeholder={placeholder}
                    type="text"
                    ref={dateField}
                    onChange={(event) => {
                        setValuseDate(event.target.value);
                        onChange?.call(null, event.target.value);
                    }}
                    className={
                        (mode === 'range' && styles.hideDefaultIcon) || ''
                    }
                />
                <ReactSVG
                    src={'/images/icons/ui/calendar.svg'}
                    className={classNames(styles.iconContainer)}
                    onClick={() => setIsOpen(!isOpen)}
                />
                {mode === 'single' && (
                    <Picker
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                        onChange={(start: string) => {
                            setValuseDate(start);
                            onChange?.call(null, start);
                        }}
                    />
                )}
                {mode === 'range' && (
                    <RangePicker
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                        dateStartChange={(start: string) => {
                            onChange?.call(null, start);
                        }}
                        dateEndChange={(start, end) => {
                            onChange?.call(null, `${start} - ${end}`);
                        }}
                    />
                )}
            </div>
        </div>
    );
}

interface RangePickerProps {
    isOpen?: boolean;
    dateStartChange?: (value: string) => void;
    dateEndChange?: (startValue: string, endValue: string) => void;
    onClose?: () => void;
}

interface PickerProps {
    isOpen?: boolean;
    onChange?: (value: string) => void;
    onClose?: () => void;
}

const Picker = ({ isOpen, onChange, onClose }: PickerProps) => {
    const [days, setDays] = useState<JSX.Element[]>([]);
    const [date, setDate] = useState(new Date());
    const [selected, setSelected] = useState<Date>();
    function configureDays() {
        const daysCount = daysInMonth(date.getMonth(), date.getFullYear());
        const days = [];
        for (let i = 0; i < 7; i++) {
            days.push(
                <DayHeader
                    key={`dhp${i}`}
                    title={DayName[i] as string}
                    className={
                        i === 1
                            ? (styles.left as string)
                            : i === 7
                            ? (styles.right as string)
                            : undefined
                    }
                />
            );
        }
        let row = 2;
        for (let i = 1; i <= daysCount; i++) {
            const column = getDayOfWeek(i, date.getMonth(), date.getFullYear());
            days.push(
                <Day
                    key={`d${i}`}
                    className={classNames({
                        [styles.selected as string]:
                            selected &&
                            date.getFullYear() === selected.getFullYear() &&
                            date.getMonth() === selected.getMonth() &&
                            selected.getDate() === i,
                    })}
                    onClick={() => {
                        setSelected(
                            new Date(date.getFullYear(), date.getMonth(), i)
                        );
                        function toJSONLocal(date: Date) {
                            const local = new Date(date);
                            local.setMinutes(
                                date.getMinutes() - date.getTimezoneOffset()
                            );
                            return local.toJSON().slice(0, 10);
                        }
                        const dt = new Date(
                            date.getFullYear(),
                            date.getMonth(),
                            i
                        );
                        if (onChange) onChange(toJSONLocal(dt));
                        if (onClose) onClose();
                    }}
                    number={i}
                    style={{
                        gridColumnStart: column,
                        gridColumnEnd: column + 1,
                        gridRowStart: row,
                        gridRowEnd: row + 1,
                    }}
                />
            );
            if (column === 7) {
                row++;
            }
        }

        const prevDaysCount =
            getDayOfWeek(1, date.getMonth(), date.getFullYear()) - 1;
        const prevMonthDays = daysInMonth(
            date.getMonth() - 1,
            date.getFullYear()
        );
        for (let i = prevMonthDays; i > prevMonthDays - prevDaysCount; i--) {
            const column = getDayOfWeek(
                i,
                date.getMonth() - 1,
                date.getFullYear()
            );
            days.unshift(
                <Day
                    key={`dp${i}`}
                    number={i}
                    className={styles.otherDays}
                    style={{
                        gridColumnStart: column,
                        gridColumnEnd: column + 1,
                        gridRowStart: 2,
                        gridRowEnd: 3,
                    }}
                />
            );
        }

        const nextDaysCount =
            7 - getDayOfWeek(daysCount, date.getMonth(), date.getFullYear());
        for (let i = 1; i <= nextDaysCount; i++) {
            const column = getDayOfWeek(
                i,
                date.getMonth() + 1,
                date.getFullYear()
            );
            days.push(
                <Day
                    key={`df${i}`}
                    number={i}
                    className={styles.otherDays}
                    style={{
                        gridColumnStart: column,
                        gridColumnEnd: column + 1,
                        gridRowStart: row,
                        gridRowEnd: row + 1,
                    }}
                />
            );
        }
        setDays(days);
    }
    useEffect(() => {
        configureDays();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date, selected]);

    const blockRef = useRef<HTMLDivElement>(null);

    // const [getClick, setGetClick] = useState(false);
    useEffect(() => {
        if (isOpen) {
            window.addEventListener('click', clickNotOnBlock, {
                capture: true,
            });
        } else {
            window.removeEventListener('click', clickNotOnBlock, {
                capture: true,
            });
        }
        return () => {
            window.removeEventListener('click', clickNotOnBlock, {
                capture: true,
            });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    const clickNotOnBlock = (e: MouseEvent) => {
        if (blockRef.current)
            if (!e.composedPath().includes(blockRef.current)) {
                if (onClose) onClose();
            }
    };

    return (
        <div
            className={classNames(styles.pickerContainer, {
                [styles.closed as string]: !isOpen,
            })}
            ref={blockRef}
        >
            <div className={styles.pickerHeader}>
                <div
                    className={styles.moveBtn}
                    style={{ display: 'flex' }}
                    onClick={() => setDate(getPrevMonthDate(date))}
                >
                    <Image
                        src="/images/icons/datepicker/left.svg"
                        width={20}
                        height={20}
                        alt="chevron"
                    />
                </div>
                <div className={styles.date}>{`${
                    MonthName[date.getMonth()] as string
                }, ${date.getFullYear()}`}</div>
                <div
                    className={styles.moveBtn}
                    style={{ display: 'flex' }}
                    onClick={() => setDate(getNextMonthDate(date))}
                >
                    <Image
                        alt="chevron"
                        src="/images/icons/datepicker/right.svg"
                        width={20}
                        height={20}
                    />
                </div>
            </div>
            <div className={styles.calendar}>{days}</div>
        </div>
    );
};

const RangePicker = ({
    isOpen,
    // onClose,
    dateStartChange,
    dateEndChange,
}: RangePickerProps) => {
    const [days, setDays] = useState<JSX.Element[]>([]);
    const [nextDays, setNextDays] = useState<JSX.Element[]>([]);
    const [date, setDate] = useState<Date>(new Date());
    const [nextDate, setNextDate] = useState(getNextMonthDate(date));
    const [dateStart, setDateStart] = useState<Date>();
    const [dateEnd, setDateEnd] = useState<Date>();
    const [target, setTarget] = useState<'start' | 'end'>('start');

    function configureDays() {
        const daysCount = daysInMonth(date.getMonth(), date.getFullYear());
        const days = [];
        for (let i = 6; i < 13; i++) {
            days.push(
                <DayHeader
                    key={`dhrp${i}`}
                    title={DayName[i % 7] as string}
                    className={
                        i === 0
                            ? (styles.left as string)
                            : i === 6
                            ? (styles.right as string)
                            : undefined
                    }
                />
            );
        }
        let row = 2;
        for (let i = 1; i <= daysCount; i++) {
            const column = getDayOfWeek(i, date.getMonth(), date.getFullYear());
            days.push(
                <Day
                    key={`d${i}`}
                    className={classNames({
                        [styles.selected as string]:
                            (dateStart &&
                                date.getFullYear() ===
                                    dateStart.getFullYear() &&
                                date.getMonth() === dateStart.getMonth() &&
                                dateStart.getDate() === i) ||
                            (dateEnd &&
                                date.getFullYear() === dateEnd.getFullYear() &&
                                date.getMonth() === dateEnd.getMonth() &&
                                dateEnd.getDate() === i),
                        [styles.disabled as string]:
                            target === 'end' &&
                            dateStart &&
                            new Date(date.getFullYear(), date.getMonth(), i) <
                                dateStart,
                        [styles.inRange as string]:
                            dateStart &&
                            dateEnd &&
                            new Date(date.getFullYear(), date.getMonth(), i) >
                                dateStart &&
                            new Date(date.getFullYear(), date.getMonth(), i) <
                                dateEnd,
                    })}
                    onClick={() => {
                        if (target === 'start') {
                            setTarget('end');
                            setDateEnd(undefined);
                            const newDate = new Date(
                                date.getFullYear(),
                                date.getMonth(),
                                i
                            );
                            setDateStart(newDate);
                            return;
                        }
                        setTarget('start');
                        setDateEnd(
                            new Date(date.getFullYear(), date.getMonth(), i)
                        );
                    }}
                    number={i}
                    style={{
                        gridColumnStart: column,
                        gridColumnEnd: column + 1,
                        gridRowStart: row,
                        gridRowEnd: row + 1,
                    }}
                />
            );
            if (column === 7) {
                row++;
            }
        }

        const prevDaysCount =
            getDayOfWeek(1, date.getMonth(), date.getFullYear()) - 1;
        const prevMonthDays = daysInMonth(
            date.getMonth() - 1,
            date.getFullYear()
        );
        for (let i = prevMonthDays; i > prevMonthDays - prevDaysCount; i--) {
            const column = getDayOfWeek(
                i,
                date.getMonth() - 1,
                date.getFullYear()
            );
            days.unshift(
                <Day
                    key={`dp${i}`}
                    number={i}
                    className={classNames(styles.otherDays)}
                    style={{
                        gridColumnStart: column,
                        gridColumnEnd: column + 1,
                        gridRowStart: 2,
                        gridRowEnd: 3,
                    }}
                />
            );
        }

        const nextDaysCount =
            7 - getDayOfWeek(daysCount, date.getMonth(), date.getFullYear());
        for (let i = 1; i <= nextDaysCount; i++) {
            const column = getDayOfWeek(
                i,
                date.getMonth() + 1,
                date.getFullYear()
            );
            days.push(
                <Day
                    key={`df${i}`}
                    number={i}
                    className={styles.otherDays}
                    style={{
                        gridColumnStart: column,
                        gridColumnEnd: column + 1,
                        gridRowStart: row,
                        gridRowEnd: row + 1,
                    }}
                />
            );
        }
        setDays(days);
    }

    function configureNextDays() {
        const daysCount = daysInMonth(
            nextDate.getMonth(),
            nextDate.getFullYear()
        );
        const days: JSX.Element[] = [];
        for (let i = 6; i < 13; i++) {
            days.push(
                <DayHeader
                    key={`dhrpn${i}`}
                    title={DayName[i % 7] as string}
                    className={
                        i === 0
                            ? (styles.left as string)
                            : i === 6
                            ? (styles.right as string)
                            : undefined
                    }
                />
            );
        }
        let row = 2;
        for (let i = 1; i <= daysCount; i++) {
            const column = getDayOfWeek(
                i,
                nextDate.getMonth(),
                nextDate.getFullYear()
            );
            days.push(
                <Day
                    key={`d${i}`}
                    className={classNames({
                        [styles.selected as string]:
                            (dateStart &&
                                nextDate.getFullYear() ===
                                    dateStart.getFullYear() &&
                                nextDate.getMonth() === dateStart.getMonth() &&
                                dateStart.getDate() === i) ||
                            (dateEnd &&
                                nextDate.getFullYear() ===
                                    dateEnd.getFullYear() &&
                                nextDate.getMonth() === dateEnd.getMonth() &&
                                dateEnd.getDate() === i),
                        [styles.disabled as string]:
                            target === 'end' &&
                            dateStart &&
                            new Date(
                                nextDate.getFullYear(),
                                nextDate.getMonth(),
                                i
                            ) < dateStart,
                        [styles.inRange as string]:
                            dateStart &&
                            dateEnd &&
                            new Date(
                                nextDate.getFullYear(),
                                nextDate.getMonth(),
                                i
                            ) > dateStart &&
                            new Date(
                                nextDate.getFullYear(),
                                nextDate.getMonth(),
                                i
                            ) < dateEnd,
                    })}
                    onClick={() => {
                        if (target === 'start') {
                            setTarget('end');
                            setDateEnd(undefined);
                            setDateStart(
                                new Date(
                                    nextDate.getFullYear(),
                                    nextDate.getMonth(),
                                    i
                                )
                            );
                            return;
                        }
                        setTarget('start');
                        setDateEnd(
                            new Date(
                                nextDate.getFullYear(),
                                nextDate.getMonth(),
                                i
                            )
                        );
                    }}
                    number={i}
                    style={{
                        gridColumnStart: column,
                        gridColumnEnd: column + 1,
                        gridRowStart: row,
                        gridRowEnd: row + 1,
                    }}
                />
            );
            if (column === 7) {
                row++;
            }
        }

        const prevDaysCount =
            getDayOfWeek(1, nextDate.getMonth(), nextDate.getFullYear()) - 1;
        const prevMonthDays = daysInMonth(
            nextDate.getMonth() - 1,
            nextDate.getFullYear()
        );
        for (let i = prevMonthDays; i > prevMonthDays - prevDaysCount; i--) {
            const column = getDayOfWeek(
                i,
                nextDate.getMonth() - 1,
                nextDate.getFullYear()
            );
            days.unshift(
                <Day
                    key={`dp${i}`}
                    number={i}
                    className={styles.otherDays}
                    style={{
                        gridColumnStart: column,
                        gridColumnEnd: column + 1,
                        gridRowStart: 2,
                        gridRowEnd: 3,
                    }}
                />
            );
        }

        const nextDaysCount =
            7 -
            getDayOfWeek(
                daysCount,
                nextDate.getMonth(),
                nextDate.getFullYear()
            );
        for (let i = 1; i <= nextDaysCount; i++) {
            const column = getDayOfWeek(
                i,
                nextDate.getMonth() + 1,
                nextDate.getFullYear()
            );
            days.push(
                <Day
                    key={`df${i}`}
                    number={i}
                    className={styles.otherDays}
                    style={{
                        gridColumnStart: column,
                        gridColumnEnd: column + 1,
                        gridRowStart: row,
                        gridRowEnd: row + 1,
                    }}
                />
            );
        }
        setNextDays(days);
    }

    useEffect(() => {
        configureNextDays();
        configureDays();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date, nextDate, dateStart, dateEnd]);

    useEffect(() => {
        if (!dateStart) {
            dateStartChange?.call(null, '');
            return;
        }
        if (dateStart === undefined) return;
        dateStartChange?.call(null, dateStart.toLocaleDateString());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dateStart]);

    useEffect(() => {
        if (!dateStart) return;
        if (!dateEnd) {
            dateEndChange?.call(null, dateStart?.toLocaleDateString(), '');
            return;
        }
        dateEndChange?.call(
            null,
            dateStart.toLocaleDateString(),
            dateEnd.toLocaleDateString()
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dateEnd]);

    return (
        <div
            className={classNames(styles.rangePickerContainer, {
                [styles.closed as string]: !isOpen,
            })}
        >
            <div className={styles.pickerSide}>
                <div className={styles.pickerHeader}>
                    <div
                        className={styles.moveBtn}
                        onClick={() => setDate(getPrevMonthDate(date))}
                    >
                        <ReactSVG
                            src="/images/icons/datepicker/left.svg"
                            className={styles.iconContainer}
                        />
                    </div>
                    <div className={styles.date}>{`${
                        MonthName[date.getMonth()] as string
                    }, ${date.getFullYear()}`}</div>
                    <div
                        className={classNames(styles.moveBtn, {
                            [styles.deactive as string]: !compareDateMonth(
                                nextDate,
                                getNextMonthDate(date)
                            ),
                        })}
                        onClick={() => setDate(getNextMonthDate(date))}
                    >
                        <ReactSVG
                            src="/images/icons/datepicker/right.svg"
                            className={styles.iconContainer}
                        />
                    </div>
                </div>
                <div className={styles.calendar}>{days}</div>
            </div>
            <div className={styles.pickerSide}>
                <div className={styles.pickerHeader}>
                    <div
                        className={classNames(styles.moveBtn, {
                            [styles.deactive as string]: !compareDateMonth(
                                getPrevMonthDate(nextDate),
                                date
                            ),
                        })}
                        onClick={() => setNextDate(getPrevMonthDate(nextDate))}
                    >
                        <ReactSVG
                            src="/images/icons/datepicker/left.svg"
                            className={styles.iconContainer}
                        />
                    </div>
                    <div className={styles.date}>{`${
                        MonthName[nextDate.getMonth()] as string
                    }, ${nextDate.getFullYear()}`}</div>
                    <div
                        className={styles.moveBtn}
                        onClick={() => setNextDate(getNextMonthDate(nextDate))}
                    >
                        <ReactSVG
                            src="/images/icons/datepicker/right.svg"
                            className={styles.iconContainer}
                        />
                    </div>
                </div>
                <div className={styles.calendar}>{nextDays}</div>
            </div>
        </div>
    );
};

interface DayHeaderProps {
    title: string;
    className?: string;
}

interface DayProps {
    number?: number;
    className?: string;
    onClick?: () => void;
    style: React.CSSProperties;
}

function DayHeader({ title, className }: DayHeaderProps) {
    return (
        <div className={classNames(styles.dayHeader, className)}>
            {title.substring(0, 1)}
        </div>
    );
}

function Day({ number, className, onClick, ...props }: DayProps) {
    return (
        <div
            className={classNames(styles.day, className)}
            {...props}
            onClick={onClick}
        >
            <div className={styles.dayNumber}>{number}</div>
        </div>
    );
}
