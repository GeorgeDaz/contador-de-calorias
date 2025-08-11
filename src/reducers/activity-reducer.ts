import type { Activity } from "./../types";

export type ActivityActions = {
  type: "ADD_ACTIVITY";
  payload: { newActivity: Activity };
};

type ActivityState = {
  activities: Activity[];
};

export const initialState: ActivityState = {
  activities: [],
};

export const activityReducer = (
  state: ActivityState = initialState,
  action: ActivityActions
) => {
  if (action.type === "ADD_ACTIVITY") {
    // return {
    //     ...state,
    //     activities: [...state.activities, action.payload.newActivity],
    // };
    console.log("Reducer received new activity:", action.payload.newActivity);
  }
};
