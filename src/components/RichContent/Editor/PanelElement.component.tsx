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
      onDragStart={() => {
        const current: IRC = { type, data: {style: {}} };
        if (type === "container") current.data.style = { flexDirection: "row" };
        if (type === "image") current.data = {
          value: "https://cdn3.iconfinder.com/data/icons/online-states/150/Photos-512.png",
          style: {
            width: 360,
            height: 360,
          }
        };
        if (type === "video") current.data.style = {
          width: 640,
          height: 360,
        };
        if (type === "header" || type === "text") current.data.style = {textAlign: 'left'};
        setCurrentDraggable(current);
      }}
      title={type}
    >
      <img src={`./images/${type}.png`} />
    </li>
  );
};
