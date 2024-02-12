import classNames from "classnames";
import styles from "./toggle.module.scss";

interface IToggle {
    title: string
    checked: boolean
    onChange: (value: boolean) => void
}

export const Toggle = ({title, checked, onChange}: IToggle) => {
    return (
        <div
            className={classNames(styles.toogle, checked && styles.checked)}
            onClick={() => onChange(!checked)}
        >
            {title}
        </div>
    )
}