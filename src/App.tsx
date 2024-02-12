import { useState } from "react";
import { demoPositions } from "./components/RichContent/mokki";
import RichContentEditor from "./components/RichContent/Editor/RCEditor.component";
// import { IRC } from "./components/RichContent/RichContent";
// import { RichContent } from "./components/RichContent/RichContent.component";

function App() {
  const [data, setData] = useState(demoPositions);

  return (
    <>
      <h1>RichContent</h1>
      {/* <RichContent data={demoPositions} /> */}
      <RichContentEditor data={data} setCurrentData={setData} />
    </>
  );
}

export default App;
