import { categories } from "../data/categories";
import { useState } from "react";
import type { Activity } from "../types";

export default function Form() {
  const [activity, setActivity] = useState<Activity>({
    category: 1, // Default to "Comida"
    name: "",
    calories: 0, // Default to 0 calories
  });
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

  const isValidActivity = () => {
    const { name, calories } = activity;
    console.log(name.trim() !== "" && calories > 0);
    return name.trim() !== "" && calories > 0;
  };

  return (
    <form className=" space-y-5 bg-white p-10 rounded-lg shadow">
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
        value="Guardar Comida o Ejercicio"
        disabled={!isValidActivity()}
      />
    </form>
  );
}
