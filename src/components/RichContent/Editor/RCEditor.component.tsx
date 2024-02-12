import { IRC, RC } from "../RichContent";
import { useState } from "react";
import { tContentType } from "../RichContent";
import { defaultValue } from "../RichContent";
import { RichContent } from "../RichContent.component";
import { PanelElement } from "./PanelElement.component";
import { EditPanel } from "./EditPanel.component";
import styles from "../RichContent.module.scss";
import classNames from "classnames";

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
            Hide borders
            <input
              type="checkbox"
              // defaultChecked={hideBorders}
              onChange={(e) => setHideBorders(e.target.checked)}
              checked={hideBorders}
            />
            Moving
            <input
              type="checkbox"
              // defaultChecked={moving}
              onChange={(e) => setMoving(e.target.checked)}
              checked={moving}
            />
          </>
        )}
        <div className={styles.controls}>
          Preview
          <input
            type="checkbox"
            onChange={(e) => setShowPreview(e.target.checked)}
            checked={showPreview}
          />
        </div>
      </div>
      {showPreview && <RichContent data={currentData} />}
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
                data={currentData}
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
