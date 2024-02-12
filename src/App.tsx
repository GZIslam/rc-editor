import { useState } from "react";
import { demoPositions } from "./components/RichContent/mokki";
import RichContentEditor from "./components/RichContent/Editor/RCEditor.component";

function App() {
  const [data, setData] = useState(demoPositions);

  return (
    <>
      <h1>rc-editor:</h1>
      <RichContentEditor data={data} setCurrentData={setData} />
    </>
  );
}

export default App;
