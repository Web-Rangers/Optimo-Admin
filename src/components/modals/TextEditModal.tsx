import classNames from 'classnames';
import styles from '@styles/components/Modals/TextEditModal.module.scss';
import Modal from './Modal';
import { ReactSVG } from 'react-svg';
import { ChangeEventHandler, useEffect, useState } from 'react';

interface Text {
    eng?: string;
    ger?: string;
    rus?: string;
    spa?: string;
}

interface TextModalProps {
    title?: string;
    text: Text;
    onConfirm?: (text: Text) => void;
    onCancel?: () => void;
}

interface LangTabProps {
    onClick?: () => void;
    code: string;
    selected?: boolean;
}

type Language = {
    name: string;
};

type Languages = { [propKey: string]: Language };

const languages: Languages = {
    eng: {
        name: 'English',
    },
    ger: {
        name: 'Deutch',
    },
    rus: {
        name: 'Russian',
    },
    spa: {
        name: 'Spanish',
    },
};

function LangTab({ onClick, code, selected = false }: LangTabProps) {
    return (
        <div
            className={classNames(styles.langTab, {
                [`${styles.selectedTab as string}`]: selected,
            })}
            onClick={onClick}
        >
            <ReactSVG
                className={styles.langicon}
                src={`/images/icons/flags/${code}.svg`}
            />
            {languages[code]?.name}
        </div>
    );
}


type Langs = 'eng' | 'ger' | 'rus' | 'spa';

export default function TextEditModal({
    title,
    text,
    onConfirm,
    onCancel,
    ...props
}: TextModalProps) {
    const [lang, setLang] = useState<Langs>('eng');
    const [newText, setNewText] = useState<Text>(text);

    const onTextChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
        setNewText((origin) => {
            const newValue = { ...origin };
            newValue[lang] = event.target.value;
            return newValue;
        });
    };

    return (
        <Modal onBackClick={onCancel} className={styles.modal}>
            <div className={styles.header}>
                <div className={styles.title}>{title}</div>
                <div className={styles.close} onClick={onCancel}>
                    <ReactSVG src="/images/icons/ui/X.svg" />
                </div>
            </div>
            <div className={styles.inputContainer}>
                <div className={styles.languageWrapper}>
                    {Object.keys(languages).map((language, i) => {
                        return (
                            <LangTab
                                onClick={() => setLang(language as Langs)}
                                key={i}
                                code={language}
                                selected={lang === language}
                            />
                        );
                    })}
                </div>
                <div className={styles.inputBody}>
                    <textarea
                        className={styles.textInput}
                        value={newText[lang]}
                        onChange={onTextChange}
                        maxLength={200}
                    ></textarea>
                    <div className={styles.counter}>
                        {newText[lang]?.length}/200
                    </div>
                </div>
            </div>
            <div className={styles.modalActions}>
                <button className={styles.outlineButton} onClick={onCancel}>
                    Cancel
                </button>
                <button
                    className={styles.fillButton}
                    onClick={() => {
                        if (onConfirm) onConfirm(newText);
                    }}
                >
                    Save changes
                </button>
            </div>
        </Modal>
    );
}
