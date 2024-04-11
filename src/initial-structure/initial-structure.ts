import { Model, Param } from "../App";

export const initial_structure: {
    params: Param[];
    model: Model;
  } = {
    params: [
      {
        id: 0,
        name: "length",
        type: "string",
      },
      {
        id: 1,
        name: "color",
        type: "string",
      },
      {
        id: 2,
        name: "price",
        type: "string",
      },
    ],
  
    model: {
      paramValues: [
        {
          paramId: 0,
          value: "large",
        },
        {
          paramId: 0,
          value: "small",
        },
        {
          paramId: 0,
          value: "biggest",
        },
        {
          paramId: 1,
          value: "red",
        },
        {
          paramId: 1,
          value: "green",
        },
        {
          paramId: 1,
          value: "blue",
        },
        {
          paramId: 2,
          value: "100",
        },
        {
          paramId: 2,
          value: "200",
        },
        {
          paramId: 2,
          value: "300",
        },
      ],
    },
  };