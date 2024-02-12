import { defaultImage, defaultVideo, tContentType } from "../RichContent";
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
        const current: IRC = { type, data: {} };
        if (type === "container") current.data = { flexDirection: "row" };
        if (type === "image") current.data = defaultImage
        if (type === "video") current.data.size = defaultVideo.size
        if (type === "header" || type === "text") current.data.textAlign = 'left'
        setCurrentDraggable(current);
      }}
      title={type}
    >
      <img src={`./images/${type}.png`} />
    </li>
  );
};
