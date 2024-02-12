import { IRC, RC } from "../RichContent";
import { useState } from "react";
import { tContentType } from "../RichContent";
import { defaultValue } from "../RichContent";
import { RichContent } from "../RichContent.component";
import { PanelElement } from "./PanelElement.component";
import { EditPanel } from "./EditPanel.component";
import styles from "../RichContent.module.scss";
import classNames from "classnames";
import { Toggle } from "../../Toggle/toggle.component";
import { renderToStaticMarkup } from "react-dom/server";

export interface IRCEditorProps {
  setCurrentData: (data: IRC) => void;
  setCurrentElement: (item: RC) => void;
  currentDraggable: IRC | RC | null;
  setCurrentDraggable: (item: IRCEditorProps["currentDraggable"]) => void;
  moving?: boolean;
}

interface RichContentEditorProps {
  data?: IRC;
  setCurrentData: (data: IRC) => void;
}

const RichContentEditor = ({
  data = defaultValue,
  setCurrentData,
}: RichContentEditorProps) => {
  const [panelElements] = useState<{ type: tContentType }[]>([
    { type: "header" },
    { type: "text" },
    { type: "image" },
    { type: "video" },
    { type: "container" },
  ]);
  const [currentElement, setCurrentElement] = useState<RC | null>(null);
  const [currentDraggable, setCurrentDraggable] = useState<IRC | RC | null>(
    null,
  );
  const [hideBorders, setHideBorders] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [moving, setMoving] = useState(false);
  const currentData = new RC({item: data})

  return (
    <div className={styles.root}>
      <div className={styles.toolPanel}>
        {!showPreview && (
          <>
            <ul>
              {panelElements.map((panelElement) => (
                <PanelElement
                  key={panelElement.type}
                  type={panelElement.type}
                  setCurrentDraggable={setCurrentDraggable}
                />
              ))}
            </ul>
            <Toggle
              title={'Hide borders'}
              onChange={(val) => setHideBorders(val)}
              checked={hideBorders}
            />
            <Toggle
              title={'Moving'}
              onChange={(val) => setMoving(val)}
              checked={moving}
            />
          </>
        )}
        <div className={styles.controls}>
          <Toggle
            title="Preview"
            checked={showPreview}
            onChange={(val) => setShowPreview(val)}
          />
          <button onClick={() => console.log(currentData.buildData())}>Schema</button>
          <button onClick={() => console.log(renderToStaticMarkup(<RichContent item={currentData} />))}>HTML</button>
          <button
            onClick={() => {
              const newData = prompt("Put new schema here:")
              newData && setCurrentData(JSON.parse(newData))
            }}
          >
            Set
          </button>
          <button
            // style={{backgroundColor: 'indianred', color: 'white'}}
            onClick={() => setCurrentData(defaultValue)}
          >
            Clear
          </button>
        </div>
      </div>
      {showPreview && <RichContent item={currentData} />}
      {!showPreview && (
        <div className={styles.view}>
          <div className={styles.leftSide}>
            <div
              className={classNames(
                styles.richContent,
                hideBorders && styles.hideBorders,
              )}
            >
              <RichContent
                item={currentData}
                editor={{
                  setCurrentElement,
                  setCurrentData,
                  currentDraggable,
                  setCurrentDraggable,
                  moving,
                }}
              />
            </div>
          </div>
          <div className={styles.rightSide}>
            {!!currentElement && (
              <EditPanel
                item={currentElement}
                setCurrentData={setCurrentData}
                setCurrentElement={setCurrentElement}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RichContentEditor;
