import React, { useReducer, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { initial_structure } from "./initial-structure/initial-structure";

export interface Param {
  id: number;

  name: string;

  type: "string";
}

export interface ParamValue {
  paramId: number;

  value: string;
}

export interface Model {
  paramValues: ParamValue[];
}

interface Props {
  params: Param[];

  model: Model;
}

interface i_MyReducerModel {
  params: Param[];
  values: ParamValue[];
}

function myReducer(
  state: { params: Param[]; model: Model },
  action: { type: string; payload: Partial<{ params: Param[]; model: Model }> },
) {
  return { ...state };
}

const ModelEditor: React.FC<{ params: Props }> = ({ params }) => {
  const [structure, dispatch] = useReducer<
    (
      state: { params: Param[]; model: Model },
      action: {
        type: string;
        payload: Partial<{ params: Param[]; model: Model }>;
      },
    ) => { params: Param[]; model: Model }
  >(myReducer, params);

  return (
    <div>
      <h1>Model Editor</h1>
      <section>
        {structure.params.map((param) => (
          <>
            <span>{param.name}</span>
            <select>
              {structure.model.paramValues
                .filter((paramValue) => paramValue.paramId === param.id)
                .map((paramValue) => {
                  return (
                    <option value={paramValue.paramId}>
                      {paramValue.value}
                    </option>
                  );
                })}
            </select>
          </>
        ))}
      </section>
      <button onClick={() => {}}>GET MODEL</button>
      <aside>{}</aside>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <ModelEditor params={initial_structure} />
    </div>
  );
}

export default App;
