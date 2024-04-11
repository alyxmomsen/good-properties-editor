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
      name: "shape",
      type: "string",
    },
  ],

  model: {
    paramValues: [
      {
        id: 0,
        paramId: 0,
        value: "large",
      },
      {
        id: 1,
        paramId: 0,
        value: "small",
      },
      {
        id: 2,
        paramId: 0,
        value: "biggest",
      },
      {
        id: 3,
        paramId: 1,
        value: "red",
      },
      {
        id: 4,
        paramId: 1,
        value: "green",
      },
      {
        id: 5,
        paramId: 1,
        value: "blue",
      },
      {
        id: 6,
        paramId: 2,
        value: "triangle",
      },
      {
        id: 7,
        paramId: 2,
        value: "circle",
      },
      {
        id: 8,
        paramId: 2,
        value: "square",
      },
    ],
  },
};
