import { tContentType } from "../RichContent";
import { IRC } from "../RichContent";
import styles from "../RichContent.module.scss";

interface IPanelElement {
  type: tContentType;
  setCurrentDraggable: (item: IRC) => void;
}

export const PanelElement = ({ type, setCurrentDraggable }: IPanelElement) => {
  return (
    <li
      className={styles.panelElement}
      draggable
      onDrag={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const current: IRC = { type, data: {} };
        if (type === "container") current.data = { flexDirection: "row" };
        setCurrentDraggable(current);
      }}
      title={type}
    >
      {/* <img src={`/icons/richContent/${type}.svg`} /> */}
      {type}
    </li>
  );
};
