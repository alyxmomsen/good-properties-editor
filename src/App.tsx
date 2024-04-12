import React, { useEffect, useLayoutEffect, useReducer, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { initial_structure } from "./initial-structure/initial-structure";
// styles module
import styles from "./style.module.css";
import { escape } from "querystring";

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


type tLocalStateReducer = (
  state: { param: Param; paramValues: ParamValue[] },
  action: {
    type: string;
    payload: Partial<{ param: Param; paramValues: ParamValue[] }>;
  },
) => { param: Param; paramValues: ParamValue[] }

function EditModeParamView({
  param,
  model,
  globalState,
  globalDispatch,
}: {
  param: Param;
  model: Model;
  globalState: { params: Param[]; model: Model };
  globalDispatch: React.Dispatch<{
    type: string;
    payload: Partial<{
      params: Param[];
      model: Model;
    }>;
  }>;
}) {
  // const [localParamValues, dispatchLocalParamValues] = useReducer<(state:{param:Param ,paramValues:ParamValue[]} , action:{type:string , payload:{param:Param , paramValues:ParamValue[]}}) => } > ();

  const [localState, dispatchLocalState] = useReducer<tLocalStateReducer>(
    (
      state: { param: Param; paramValues: ParamValue[] },
      action: {
        type: string;
        payload: Partial<{ param: Param; paramValues: ParamValue[] }>;
      },
    ) => ({ ...state, ...action.payload }),
    { param: param, paramValues: [...model.paramValues] },
  );

  const [paramValuesID_toDelete, setParamValuesID_toDelete] = useState<
    number[]
  >([]);

  // const paramValues: ParamValue[] = [];

  useEffect(() => {
    dispatchLocalState({
      type: "update",
      payload: { param, paramValues: model.paramValues },
    });
    console.log("NESTED COMPONENT UPDATE", Date.now());
  }, [model, param]);

  return (
    <div>
      <h2>{param.name}</h2>
      
      <div className={styles.sectionsWrapper}>
        <section className="param">
          
          <input 
            onInput={(e) => {
              dispatchLocalState({
                type: "update",
                payload: {
                  param: { ...localState.param, name: e.currentTarget.value },
                },
              });
            }}
            type="text"
            value={localState.param.name}
          />
        </section>
        <section className={styles.sectionParamValues}>
          {
            /* stucture. */ /* model.paramValues */ localState.paramValues
              .filter((paramValue) => {
                if (paramValue.paramId === param.id) {
                  // paramValues.push(paramValue);
                  return true;
                }
              })
              .map((paramValue) => (
                <div>
                  <input
                    onInput={(e) => {
                      dispatchLocalState({
                        type: "update",
                        payload: {
                          paramValues: [
                            ...localState.paramValues.filter((parVal) => {
                              if (parVal.id !== paramValue.id) {
                                return true;
                              } else {
                                parVal.value = e.currentTarget.value;
                                return true;
                              }
                            }),
                          ],
                        },
                      });
                    }}
                    className="param-value"
                    type="text"
                    value={paramValue.value}
                  />
                  <label htmlFor={paramValue.id.toLocaleString()}>
                    mark to delete
                  </label>
                  <input
                    onChange={(e) => {
                      const isChecked = e.currentTarget.checked;
                      try {
                        setParamValuesID_toDelete((current) => {
                          // console.log(isTrue);

                          if (isChecked) {
                            if (!current.includes(paramValue.id)) {
                              return [...current, paramValue.id];
                            } else {
                              return [...current];
                            }
                          } else {
                            if (current.includes(paramValue.id)) {
                              return [
                                ...current.filter(
                                  (elem) => elem != paramValue.id,
                                ),
                              ];
                            } else {
                              return [...current];
                            }
                          }
                        });
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    id={paramValue.id.toLocaleString()}
                    type="checkbox"
                    checked={
                      paramValuesID_toDelete.includes(paramValue.id)
                        ? true
                        : false
                    } /// <--- WARNING
                  />
                </div>
              ))
          }
        </section>
        <section className={styles.buttonSection}>
        <button
          onClick={() => {
            globalDispatch({
              type: "update",
              payload: {params:[...globalState.params.map(elem => elem.id === localState.param.id ? localState.param : elem ) ,  ] , model: { paramValues: localState.paramValues } },
            });
          }}
        >
          UPDATE
        </button>
        <button
          onClick={() => {
            // setParamValuesID_toDelete([]);

            globalDispatch({
              type: "delete",
              payload: {
                // params:[] ,
                model: {
                  paramValues: [
                    ...globalState.model.paramValues.filter(
                      (elem) => !paramValuesID_toDelete.includes(elem.id),
                    ),
                  ],
                },
                /* localState.paramValues */ /* .filter(parVal => parVal) */
              },
            });
          }}
        >
          DELETE
        </button>
        </section>
      </div>
    </div>
  );
}

function myReducer(
  state: { params: Param[]; model: Model },
  action: { type: string; payload: Partial<{ params: Param[]; model: Model }> },
) {
  return { ...state, ...action.payload };
}

export type tGlobalStructReducer =  (
  state: { params: Param[]; model: Model },
  action: {
    type: string;
    payload: Partial<{ params: Param[]; model: Model }>;
  },
) => { params: Param[]; model: Model }

const ModelEditor: React.FC<{ params: Props }> = ({ params }) => {
  const [globalStucture, globalStructureDispatch] = useReducer<tGlobalStructReducer>(myReducer, params);

  const [ifEditModeOn, setIfEditModeOn] = useState(false);

  useEffect(() => {
    console.log("UPDATE");
  });

  return (
    <div>
      <h1>Model Editor</h1>
      <section className={styles.globalParamsWrapper}>
        {globalStucture.params.map((param) => (
          <div>
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
          </div>
        ))}
      </section>
      <button
        onClick={() => {
          setIfEditModeOn((currentState) => !currentState);
        }}
      >
        GET MODEL
      </button>
      {ifEditModeOn && (
        <aside className={styles.editModePanalWrapper}>
      <div>
            <h1>Edit Mode</h1>

            {globalStucture.params.map((param) => (
              <EditModeParamView
                param={param}
                model={globalStucture.model}
                globalState={globalStucture}
                globalDispatch={globalStructureDispatch}
              />
            ))}
          </div>
      </aside>
      )}
      
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
