import React, { useEffect, useLayoutEffect, useReducer, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { initial_structure } from "./initial-structure/initial-structure";
// styles module
import styles from "./style.module.css";

export interface Param {
  id: number;

  name: string;

  type: "string";
}

export interface ParamValue {
  id: number;
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

function EditModeParamView({ param, model }: { param: Param; model: Model }) {
  const [state, dispatch] = useReducer(
    (state: ParamValue[], action: { type: string; payload: ParamValue[] }) => [
       ...action.payload,
    ],
    model.paramValues,
  );

  // const paramValues: ParamValue[] = [];

  useLayoutEffect(() => {}, []);

  useEffect(() => {});

  return (
    <div>
      <h2>{param.name}</h2>
      <div className={styles.sectionsWrapper}>
        <section className="param">
          <input type="text" value={param.name} />
        </section>
        <section className={styles.sectionParamValues}>
          {
            /* stucture. */ /* model.paramValues */ state
              .filter((paramValue) => {
                if (paramValue.paramId === param.id) {
                  // paramValues.push(paramValue);
                  return true;
                }
              })
              .map((paramValue) => (
                <input
                  onInput={(e) => {
                    dispatch({
                      type: "update",
                      payload: [
                        ...state.filter(
                          (parVal) => {
                            if(parVal.id !== paramValue.id) {
                              return true ;
                            }
                            else {
                              parVal.value = e.currentTarget.value ;
                              return true ;
                            }
                          },
                        ),
                        
                      ],
                    });
                  }}
                  className="param-value"
                  type="text"
                  value={paramValue.value}
                />
              ))
          }
        </section>
      </div>
    </div>
  );
}

function myReducer(
  state: { params: Param[]; model: Model },
  action: { type: string; payload: Partial<{ params: Param[]; model: Model }> },
) {
  return { ...state , ...action.payload };
}

const ModelEditor: React.FC<{ params: Props }> = ({ params }) => {
  const [globalStucture, dispatchGlobalStructure] = useReducer<
    (
      state: { params: Param[]; model: Model },
      action: {
        type: string;
        payload: Partial<{ params: Param[]; model: Model }>;
      },
    ) => { params: Param[]; model: Model }
  >(myReducer, params);

  const [ifEditModeOn, setIfEditModeOn] = useState(false);

  return (
    <div>
      <h1>Model Editor</h1>
      <section>
        {globalStucture.params.map((param) => (
          <>
            <span>{param.name}</span>
            <select>
              {globalStucture.model.paramValues
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
      <button
        onClick={() => {
          setIfEditModeOn((currentState) => !currentState);
        }}
      >
        GET MODEL
      </button>
      <aside>
        {ifEditModeOn && (
          <div>
            <h1>Edit Mode</h1>

            {globalStucture.params.map((param) => (
              <EditModeParamView param={param} model={globalStucture.model} />
            ))}
          </div>
        )}
      </aside>
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
