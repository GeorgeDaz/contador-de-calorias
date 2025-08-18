import { categories } from "../data/categories";
import { v4 as uuidv4 } from "uuid";
// si no aparecen los types de uuid hacer npm install --save-dev @types/uuid
import { useState, useEffect } from "react";
import type { Activity } from "../types";
import type {
  ActivityActions,
  ActivityState,
} from "../reducers/activity-reducer";

type FormProps = {
  dispatch: React.Dispatch<ActivityActions>;
  state: ActivityState; // Si necesitas el estado para algo más, puedes pasarlo aquí
};

const initialState: Activity = {
  id: uuidv4(),
  category: 1, // Default to "Comida"
  name: "",
  calories: 0, // Default to 0 calories
};

export default function Form({ dispatch, state }: FormProps) {
  const [activity, setActivity] = useState<Activity>(initialState);

  useEffect(() => {
    if (state.activeId) {
      const selectedActivity = state.activities.filter(
        (stateActivity) => stateActivity.id === state.activeId
      )[0];
      setActivity(selectedActivity);
    }
  }, [state.activeId]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    const isNumberField = ["category", "calories"].includes(e.target.id);
    //console.log(isNumberField);
    //const value = isNumberField ? Number(e.target.value) : e.target.value;

    setActivity({
      ...activity,
      [e.target.id]: isNumberField
        ? e.target.value === ""
          ? ""
          : Number(e.target.value)
        : e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (!isValidActivity()) return;
    // // Aquí puedes manejar el envío del formulario, como agregar la actividad a una lista
    dispatch({
      type: "ADD_ACTIVITY",
      payload: { newActivity: activity },
    });
    // Resetear el formulario
    setActivity({ ...initialState, id: uuidv4() }); // Generar un nuevo ID para la próxima actividad
  };

  const isValidActivity = () => {
    const { name, calories } = activity;
    // console.log(name.trim() !== "" && calories > 0);
    return name.trim() !== "" && calories > 0;
  };

  return (
    <form
      className=" space-y-5 bg-white p-10 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
      <div className=" grid grid-cols-1 gap-3">
        <label htmlFor="category" className=" font-bold">
          Categoria:
        </label>
        <select
          className=" border border-slate-300 p-2 rounded-lg w-full bg-white"
          name=""
          id="category"
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className=" grid grid-cols-1 gap-3">
        <label htmlFor="name" className=" font-bold">
          Actividad:
        </label>
        <input
          type="text"
          id="name"
          className=" border border-slate-300 p-2 rounded-lg"
          placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
          value={activity.name}
          onChange={handleChange}
        />
      </div>
      <div className=" grid grid-cols-1 gap-3">
        <label htmlFor="calories" className=" font-bold">
          Calorias:
        </label>
        <input
          type="number"
          id="calories"
          className=" border border-slate-300 p-2 rounded-lg"
          placeholder="Calorias. ej 300 o 500"
          value={activity.calories === 0 ? "" : activity.calories}
          onChange={handleChange}
        />
      </div>
      <input
        type="submit"
        className=" bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer rounded-lg transition-colors disabled:opacity-10"
        value={activity.category === 1 ? "Agregar Comida" : "Agregar Ejercicio"}
        disabled={!isValidActivity()}
      />
    </form>
  );
}
