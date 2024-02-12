import { useState } from "react";
import { demo } from "./components/RichContent/mokki";
import RichContentEditor from "./components/RichContent/Editor/RCEditor.component";

function App() {
  const [data, setData] = useState(demo);
  return (
    <>
      <RichContentEditor data={data} setCurrentData={setData} />
    </>
  );
}

export default App;
