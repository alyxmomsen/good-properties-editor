import React from "react";
import logo from "./logo.svg";
import "./App.css";

interface Color {}

interface Param {
  id: number;

  name: string;

  type: "string";
}

interface ParamValue {
  paramId: number;

  value: string;
}

interface Model {
  paramValues: ParamValue[];

  colors: Color[];
}

interface Props {
  params: Param[];

  model: Model;
}

/* class ParamEditor extends React.Component<Props, State> {
          public getModel(): Model {
          
          }
          
          } */

const ModelEditor: React.FC<{ params: Param[] }> = ({ params }) => {
  return (
    <div>
      <h1>Model Editor</h1>
    </div>
  );
};

const params_example: Param[] = [
  {
    id: 1,
    name: "color",
    type: "string",
  },
  {
    id: 2,
    name: "length",
    type: "string",
  },
];

function App() {
  return (
    <div className="App">
      <ModelEditor params={params_example} />
    </div>
  );
}

export default App;
