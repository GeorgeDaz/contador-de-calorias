import type { Activity } from "./../types";

export type ActivityActions =
  | { type: "ADD_ACTIVITY"; payload: { newActivity: Activity } }
  | { type: "SET_ACTIVEID"; payload: { id: Activity["id"] } };

type ActivityState = {
  activities: Activity[];
  activeId: Activity["id"];
};

export const initialState: ActivityState = {
  activities: [],
  activeId: "",
};

export const activityReducer = (
  state: ActivityState = initialState,
  action: ActivityActions
) => {
  if (action.type === "ADD_ACTIVITY") {
    return {
      ...state,
      activities: [...state.activities, action.payload.newActivity],
    };
  }

  if (action.type === "SET_ACTIVEID") {
    return {
      ...state,
      activeId: action.payload.id,
    };
  }
  return state;
};
