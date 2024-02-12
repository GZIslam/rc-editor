import { RC } from "./RichContent";
import { IRCEditorProps } from "./Editor/RCEditor.component";
import styles from "./RichContent.module.scss";
import classNames from "classnames";
import { defaultImage, defaultVideo } from "./RichContent";

interface IRichContent {
  data: RC;
  editor?: IRCEditorProps;
}

export const RichContent = ({ data, editor }: IRichContent) => {
  const onDoubleClick = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    editor?.setCurrentElement(data);
  };
  
  const headerTexteditor = {
    onSelect: console.log,
    suppressContentEditableWarning: editor && !editor?.moving,
    contentEditable: editor && !editor?.moving,
    style: { textAlign: data.data?.textAlign || "left" } as {
      [key: string]: string;
    },
    onBlur: (e: React.BaseSyntheticEvent) => {
      if (data.data.value !== e.target.innerText) {
        data.data.value = e.target.innerText;
        editor?.setCurrentData(data.getRoot().buildData());
      }
    },
    onFocus: (e: React.BaseSyntheticEvent) => {
      if (!data.data?.value) e.target.innerText = "";
    },
  };
  
  const styleContainer: { [key: string]: string } = {
    flexDirection: data.data?.flexDirection || "row",
  };

  if (data.data?.justifyContent)
    styleContainer.justifyContent = data.data?.justifyContent;
  if (data.data?.alignItems) styleContainer.alignItems = data.data?.alignItems;

  // console.log('render')

  return (
    <div
      className={classNames(
        styles.element,
        (editor?.currentDraggable &&
          data.type !== "container") &&
          styles.eventsDisabled,
      )}
      draggable={editor?.moving}
      onDoubleClick={onDoubleClick}
      onDrag={(e: React.BaseSyntheticEvent) => {
        e.preventDefault();
        e.stopPropagation();
        editor?.setCurrentDraggable(data);
      }}
    >
      {data.type === "header" && (
        <h1 {...headerTexteditor}>
          {data.data?.value || (editor ? "Введите заголовок..." : "")}
        </h1>
      )}
      {data.type === "text" && (
        <p {...headerTexteditor}>
          {data.data?.value || (editor ? "Введите текст..." : "")}
        </p>
      )}
      {data.type === "image" && (
        <img
          draggable={false}
          id={data.data?.value || defaultImage.value}
          // size={data.data?.size || defaultImage.size}
        />
      )}
      {data.type === "video" && (
        <>
          {!data.data.value && (
            <img id={defaultVideo.value} style={defaultVideo.size} />
          )}
          {data.data.value && (
            <iframe
              height={data.data?.size?.height || defaultVideo.size.height}
              src={`https://www.youtube.com/embed/${data.data.value.split("=")[1]?.split("&")[0]}`}
              width={data.data?.size?.width || defaultVideo.size.width}
            />
          )}
        </>
      )}
      {data.type === "container" && (
        <div
          className={styles.container}
          onDragEnter={(e: React.BaseSyntheticEvent) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('onDragEnter');
            // return
            
            // console.log('data:', data, 'cDraggable', editor?.currentDraggable, data.same(editor?.currentDraggable))
            if (editor?.currentDraggable && !data.same(editor.currentDraggable)) // && !data.same(editor.currentDraggable)
              e.target.classList.add(styles.active);
          }}
          onDragLeave={(e: React.BaseSyntheticEvent) => {
            console.log('onDragLeave');

            e.preventDefault();
            e.stopPropagation();
            if (editor?.currentDraggable && !data.same(editor.currentDraggable)) e.target.classList.remove(styles.active);
          }}
          onDragOver={(e: React.BaseSyntheticEvent) => {
            console.log('onDragOver')
            e.preventDefault();
            e.stopPropagation();
          }}
          onDrop={(e: React.BaseSyntheticEvent) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('onDrop')
            if (editor?.currentDraggable) {
              e.target.classList.remove(styles.active);
              if ("destroy" in editor.currentDraggable) {
                if (data.include(editor.currentDraggable)) {
                  editor.setCurrentDraggable(null);

                  return;
                }
                editor.currentDraggable.destroy()
              }
              if (!data.items) data.items = [];
              data.items.push(editor.currentDraggable);
              editor.setCurrentData(data.getRoot().buildData());
              editor.setCurrentDraggable(null);
            }
          }}
          style={styleContainer}
        >
          {data.richItems.map((item, index) => (
              <RichContent
                key={`${index}${Math.random()}${data.type}`}
                data={item}
                editor={editor}
              />
            ))}
          {(data.type === 'container' && data.richItems.length === 0) &&
            (editor ? "Пустой контейнер..." : "")}
        </div>
      )}
    </div>
  );
};
