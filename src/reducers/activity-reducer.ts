import type { Activity } from "./../types";

export type ActivityActions =
  | { type: "ADD_ACTIVITY"; payload: { newActivity: Activity } }
  | { type: "SET_ACTIVEID"; payload: { id: Activity["id"] } }
  | { type: "DELETE_ACTIVITY"; payload: { id: Activity["id"] } };

export type ActivityState = {
  activities: Activity[];
  activeId: Activity["id"];
};

const localStorageActivities = (): Activity[] => {
  const storedActivities = localStorage.getItem("activities");
  return storedActivities ? JSON.parse(storedActivities) : []; // Retorna un array vacío si no hay actividades almacenadas
};

export const initialState: ActivityState = {
  activities: localStorageActivities(),
  activeId: "",
};

export const activityReducer = (
  state: ActivityState = initialState,
  action: ActivityActions
) => {
  if (action.type === "ADD_ACTIVITY") {
    let updatedActivities: Activity[] = [];
    if (state.activeId) {
      updatedActivities = state.activities.map((activity) =>
        activity.id === state.activeId ? action.payload.newActivity : activity
      );
    } else {
      updatedActivities = [...state.activities, action.payload.newActivity];
    }

    return {
      ...state,
      activities: updatedActivities,
      activeId: "", // Reset activeId after adding a new activity
    };
  }

  if (action.type === "SET_ACTIVEID") {
    return {
      ...state,
      activeId: action.payload.id,
    };
  }

  if (action.type === "DELETE_ACTIVITY") {
    return {
      ...state,
      activities: state.activities.filter(
        (activity) => activity.id !== action.payload.id
      ),
    };
  }
  return state;
};
