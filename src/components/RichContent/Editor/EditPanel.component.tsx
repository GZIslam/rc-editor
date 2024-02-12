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
        <div className={styles.title}>
          <img width={40} height={40} alt="" src={`./images/${type}.png`} />
          <h2>
            {type}
          </h2>
        </div>
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
              data.style = Object.assign({}, data.style, {textAlign: e.target.value})
              setCurrentData(item.getRoot().buildData())
            }}
            value={data.style.textAlign}
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
              data.style = Object.assign({}, data.style, {textAlign: e.target.value})
              setCurrentData(item.getRoot().buildData())
            }}
            value={data.style.textAlign}
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
              if(e.target.files) {
                e.target.files && uploadImage(e.target.files[0]).then(img => {
                  data.value = img.data.url
                  if(!data.style.width) data.style.width = img.data.width;
                  if(!data.style.height) data.style.height = img.data.height;
                  setCurrentData(item.getRoot().buildData())
                })
              }
            }}
            type="file"
            title="Image"
          />
          Link
          <input
            type="text"
            onChange={(e) => {
              e.target.value && uploadImage(e.target.value).then(img => {
                data.value = img.data.url
                if(!data.style.width) data.style.width = img.data.width;
                if(!data.style.height) data.style.height = img.data.height;
                setCurrentData(item.getRoot().buildData())
              })
            }}
          />
          Width
          <input
            onChange={(e) =>{
              data.style = Object.assign({}, data.style, {width: +e.target.value})
              setCurrentData(item.getRoot().buildData())
            }}
            value={data.style.width}
            type="number"
          />
          Height
          <input
            onChange={(e) =>{
              data.style = Object.assign({}, data.style, {height: +e.target.value})
              setCurrentData(item.getRoot().buildData())
            }}
            value={data.style.height}
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
            onChange={(e) =>{
              data.style = Object.assign({}, data.style, {width: +e.target.value})
              setCurrentData(item.getRoot().buildData())
            }}
            value={data.style.width}
            type="number"
          />
          Height
          <input
            onChange={(e) =>{
              data.style = Object.assign({}, data.style, {height: +e.target.value})
              setCurrentData(item.getRoot().buildData())
            }}
            value={data.style.height}
            type="number"
          />
        </div>
      )}
      {type === "container" && (
        <div className={styles.fields}>
          Flex direction
          <select
            onChange={(e) =>{
              data.style = Object.assign({}, data.style, {flexDirection: e.target.value})
              setCurrentData(item.getRoot().buildData())
            }}
            value={data.style.flexDirection}
          >
            <option value="column">Column</option>
            <option value="row">Row</option>
          </select>
          Justify content
          <select
            onChange={(e) =>{
              data.style = Object.assign({}, data.style, {justifyContent: e.target.value})
              setCurrentData(item.getRoot().buildData())
            }}
            value={data.style.justifyContent || ""}
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
              data.style = Object.assign({}, data.style, {alignItems: e.target.value})
              setCurrentData(item.getRoot().buildData())
            }}
            value={data.style.alignItems || ""}
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
