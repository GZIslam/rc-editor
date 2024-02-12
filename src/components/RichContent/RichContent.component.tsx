import { RC } from "./RichContent";
import { IRCEditorProps } from "./Editor/RCEditor.component";
import styles from "./RichContent.module.scss";
import classNames from "classnames";

interface IRichContent {
  item: RC;
  editor?: IRCEditorProps;
}

export const RichContent = ({ item, editor }: IRichContent) => {
  const onDoubleClick = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    editor?.setCurrentElement(item);
  };
  
  const headerTexteditor = {
    // onSelect: console.log,
    suppressContentEditableWarning: editor && !editor?.moving,
    contentEditable: editor && !editor?.moving,
    style: item.data?.style as {
      [key: string]: string;
    },
    onBlur: (e: React.BaseSyntheticEvent) => {
      if (item.data.value !== e.target.innerText) {
        item.data.value = e.target.innerText;
        editor?.setCurrentData(item.getRoot().buildData());
      }
    },
    onFocus: (e: React.BaseSyntheticEvent) => {
      if (!item.data?.value) e.target.innerText = "";
    },
  };
  
  return (
    <div
      className={classNames(
        styles.element,
        (editor?.currentDraggable &&
          item.type !== "container") &&
          styles.eventsDisabled,
      )}
      draggable={editor?.moving}
      onDoubleClick={onDoubleClick}
      onDrag={(e: React.BaseSyntheticEvent) => {
        e.preventDefault();
        e.stopPropagation();
        editor?.setCurrentDraggable(item);
      }}
    >
      {item.type === "header" && (
        <h1 {...headerTexteditor}>
          {item.data?.value || (editor ? "Введите заголовок..." : "")}
        </h1>
      )}
      {item.type === "text" && (
        <p {...headerTexteditor}>
          {item.data?.value || (editor ? "Введите текст..." : "")}
        </p>
      )}
      {item.type === "image" && (
        <img
          draggable={false}
          src={item.data?.value}
          style={item.data?.style as {[key: string]: string}}
        />
      )}
      {item.type === "video" && (
        <>
          {!item.data.value && (
            <img
              src="https://external-preview.redd.it/JP-CYfhVX3e_n_ilieCSrG4Wdy4Pnn8El5Rxk4DomeM.jpg?width=640&crop=smart&auto=webp&s=695b4a3cd0bcd026a92ed70441f3f2f3aa6cb567"
              style={item.data?.style as {[key: string]: string}}
             />
          )}
          {item.data.value && (
            <iframe
              src={`https://www.youtube.com/embed/${item.data.value.split("=")[1]?.split("&")[0]}`}
              style={item.data?.style as {[key: string]: string}}
            />
          )}
        </>
      )}
      {item.type === "container" && (
        <div
          className={styles.container}
          onDragEnter={(e: React.BaseSyntheticEvent) => {
            e.preventDefault();
            e.stopPropagation();
            if (editor?.currentDraggable && !item.same(editor.currentDraggable))
              e.target.classList.add(styles.active);
          }}
          onDragLeave={(e: React.BaseSyntheticEvent) => {
            e.preventDefault();
            e.stopPropagation();
            if (editor?.currentDraggable) e.target.classList.remove(styles.active);
          }}
          onDragOver={(e: React.BaseSyntheticEvent) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDrop={(e: React.BaseSyntheticEvent) => {
            e.preventDefault();
            e.stopPropagation();
            if (editor?.currentDraggable) {
              e.target.classList.remove(styles.active);
              if ("destroy" in editor.currentDraggable) {
                if (item.include(editor.currentDraggable)) {
                  editor.setCurrentDraggable(null);

                  return;
                }
                editor.currentDraggable.destroy()
              }
              if (!item.items) item.items = [];
              item.items.push(editor.currentDraggable);
              editor.setCurrentData(item.getRoot().buildData());
              editor.setCurrentDraggable(null);
            }
          }}
          style={{ display: 'flex', width: '100%', height: '100%', ...item.data.style as {
            [key: string]: string;
          }}}
        >
          {item.richItems.map((child, index) => (
              <RichContent
                key={`${index}${Math.random()}${item.type}`}
                item={child}
                editor={editor}
              />
            ))}
          {(item.type === 'container' && item.richItems.length === 0) &&
            (editor ? "Пустой контейнер..." : "")}
        </div>
      )}
    </div>
  );
};
