import { useState } from "react";
import { defaultImage, defaultVideo } from "../RichContent";
import { RC, IRC } from "../RichContent";
import styles from "../RichContent.module.scss";

interface IEditPanel {
  item: RC;
  setCurrentData: (data: IRC) => void;
  setCurrentElement: (item: RC | null) => void;
}

export const EditPanel = ({
  item,
  setCurrentData,
  setCurrentElement,
}: IEditPanel) => {
  const { type, data } = item;
  const [value, setValue] = useState(data.value);
  const [flexDirection, setFlexDirection] = useState(
    data?.flexDirection || "row",
  );
  const [justifyContent, setJustifyContent] = useState(
    data?.justifyContent || "",
  );
  const [alignItems, setAlignItems] = useState(data?.alignItems || "");
  const [textAlign, setTextAlign] = useState(data?.textAlign || "left");
  const [width, setWidth] = useState(data?.size?.width);
  const [height, setHeight] = useState(data?.size?.height);

  return (
    <>
      <h1 style={{ display: "flex", justifyContent: "space-between" }}>
        {type}
      </h1>
      <button
          onClick={() => {
          setCurrentData(item.destroy());
          setCurrentElement(null);
          }}
      >
          <img alt="" src="/icons/deleteRedIcon.svg" />
      </button>
      {(type === "header" || type === "text") && (
        <div>
          Value
          <input
            // fullWidth
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          Text align
          <select
            // fullWidth
            onChange={(e) => setTextAlign(e.target.value)}
            value={textAlign}
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </div>
      )}
      {type === "image" && (
        <div>
          {/* <UploadImageWidget
              onChange={(val) => {
                data.value = val;
                setCurrentData(item.getRoot().buildData());
              }}
              title="Image"
              value={value}
            /> */}
          <input
            onChange={(e) => {
              data.value = e.target.value;
              setCurrentData(item.getRoot().buildData());
            }}
            title="Image"
            value={value}
          />
          Width
          <input
            // fullWidth
            onChange={(e) => setWidth(+e.target.value)}
            type="number"
            value={width}
          />
          Height
          <input
            // fullWidth
            onChange={(e) => setHeight(+e.target.value)}
            type="number"
            value={height}
          />
        </div>
      )}
      {type === "video" && (
        <div>
          Video link
          <input
            // fullWidth
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          Width
          <input
            // fullWidth
            onChange={(e) => setWidth(+e.target.value)}
            type="number"
            value={width}
          />
          Height
          <input
            // fullWidth
            onChange={(e) => setHeight(+e.target.value)}
            type="number"
            value={height}
          />
        </div>
      )}
      {type === "container" && (
        <div>
          Flex direction
          <select
            // fullWidth
            onChange={(e) => setFlexDirection(e.target.value)}
            value={flexDirection}
          >
            <option value="column">Column</option>
            <option value="row">Row</option>
          </select>
          Justify content
          <select
            // fullWidth
            onChange={(e) => setJustifyContent(e.target.value)}
            value={justifyContent}
          >
            <option value="">Default</option>
            <option value="start">Start</option>
            <option value="center">Center</option>
            <option value="end">End</option>
            <option value="space-between">Space between</option>
            <option value="space-around">Space around</option>
          </select>
          Align items
          <select
            // fullWidth
            onChange={(e) => setAlignItems(e.target.value)}
            value={alignItems}
          >
            <option value="">Default</option>
            <option value="start">Start</option>
            <option value="center">Center</option>
            <option value="end">End</option>
          </select>
        </div>
      )}
      <div className={styles.buttons}>
        <button
          color="primary"
          // fullWidth
          onClick={() => {
            data.value = value;

            if (type === "container") {
              data.justifyContent = justifyContent;
              data.flexDirection = flexDirection;
              data.alignItems = alignItems;
            }

            if (type === "header" || type === "text") {
              data.textAlign = textAlign;
            }

            if (type === "image") {
              if (!data.size) {
                data.size = {
                  width: width || defaultImage.size.width,
                  height: height || defaultImage.size.height,
                };
              }
              data.size.width = width || defaultImage.size.width;
              data.size.height = height || defaultImage.size.height;
            }
            if (type === "video") {
              if (!data.size) {
                data.size = {
                  width: width || defaultVideo.size.width,
                  height: height || defaultVideo.size.height,
                };
              }
              data.size.width = width || defaultVideo.size.width;
              data.size.height = height || defaultVideo.size.height;
            }
            const fullData = item.getRoot().buildData();

            // dev
            console.log("Data:", fullData);

            setCurrentData(fullData);
          }}
          // variant="contained"
        >
          Ok
        </button>
      </div>
    </>
  );
};
