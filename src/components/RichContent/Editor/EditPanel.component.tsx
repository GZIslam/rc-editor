// import { useState } from "react";
// import { defaultImage, defaultVideo } from "../RichContent";
import { uploadImage } from "../../../methods/uploadImage";
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
  return (
    <div className={styles.editPanel}>
      <div className={styles.header}>
        <h1 style={{ display: "flex", justifyContent: "space-between" }}>
          {type}
        </h1>
        <button
            onClick={() => {
            setCurrentData(item.destroy());
            setCurrentElement(null);
            }}
        >
            <img alt="" src="./images/delete.png" />
        </button>
      </div>
      {type === "header" && (
        <div className={styles.fields}>
          Value
          <input
            onChange={(e) =>{
              data.value = e.target.value
              setCurrentData(item.getRoot().buildData())
            }}
            value={data.value}
          />
          Text align
          <select
            onChange={(e) =>{
              data.textAlign = e.target.value
              setCurrentData(item.getRoot().buildData())
            }}
            value={data.textAlign}
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </div>
      )}
      {type === "text" && (
        <div className={styles.fields}>
          Value
          <textarea
            onChange={(e) =>{
              data.value = e.target.value
              setCurrentData(item.getRoot().buildData())
            }}
            value={data.value}
          />
          Text align
          <select
            onChange={(e) =>{
              data.textAlign = e.target.value
              setCurrentData(item.getRoot().buildData())
            }}
            value={data.textAlign}
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </div>
      )}
      {type === "image" && (
        <div className={styles.fields}>
          <input
            onChange={(e) =>{
              console.log(e.target)
              if(e.target.files) {
                e.target.files && uploadImage(e.target.files[0]).then(img => {
                  data.value = img.data.url
                  if(!data.size) data.size = {width: img.data.width, height: img.data.height}
                  setCurrentData(item.getRoot().buildData())
                })
              }
            }}
            type="file"
            title="Image"
          />
          Width
          <input
            onBlur={(e) =>{
              data.size = Object.assign({}, data.size, {width: +e.target.value})
              setCurrentData(item.getRoot().buildData())
            }}
            defaultValue={data?.size?.width}
            type="number"
          />
          Height
          <input
            onBlur={(e) =>{
              data.size = Object.assign({}, data.size, {height: +e.target.value})
              setCurrentData(item.getRoot().buildData())
            }}
            defaultValue={data?.size?.height}
            type="number"
          />
        </div>
      )}
      {type === "video" && (
        <div className={styles.fields}>
          Video link
          <input
            onChange={(e) =>{
              data.value = e.target.value
              setCurrentData(item.getRoot().buildData())
            }}
            value={data.value}
          />
           Width
          <input
            onBlur={(e) =>{
              data.size = Object.assign({}, data.size, {width: +e.target.value})
              setCurrentData(item.getRoot().buildData())
            }}
            defaultValue={data?.size?.width}
            type="number"
          />
          Height
          <input
            onBlur={(e) =>{
              data.size = Object.assign({}, data.size, {height: +e.target.value})
              setCurrentData(item.getRoot().buildData())
            }}
            defaultValue={data?.size?.height}
            type="number"
          />
        </div>
      )}
      {type === "container" && (
        <div className={styles.fields}>
          Flex direction
          <select
            onChange={(e) =>{
              data.flexDirection = e.target.value
              setCurrentData(item.getRoot().buildData())
            }}
            value={data.flexDirection}
          >
            <option value="column">Column</option>
            <option value="row">Row</option>
          </select>
          Justify content
          <select
            onChange={(e) =>{
              data.justifyContent = e.target.value
              setCurrentData(item.getRoot().buildData())
            }}
            value={data.justifyContent || ""}
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
            onChange={(e) =>{
              data.alignItems = e.target.value
              setCurrentData(item.getRoot().buildData())
            }}
            value={data.alignItems || ""}
          >
            <option value="">Default</option>
            <option value="start">Start</option>
            <option value="center">Center</option>
            <option value="end">End</option>
          </select>
        </div>
      )}
    </div>
  );
};
