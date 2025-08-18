import React from "react";
import type { Activity } from "../types";
import { categories } from "../data/categories";
import { useMemo } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline"; // Import icons if needed
import type { ActivityActions } from "../reducers/activity-reducer";

type ActivityListProps = {
  activities: Activity[];
  dispatch: React.Dispatch<ActivityActions>;
};

export default function ActivityList({
  activities,
  dispatch,
}: ActivityListProps) {
  // Función para obtener el nombre de la categoría
  const categoryName = useMemo(
    () => (category: Activity["category"]) =>
      categories.map((cat) => (cat.id === category ? cat.name : " ")),
    [activities]
  );
  // Función para obtener el nombre de la categoría --- lograda por mi mismo en el curso
  // const categoryName = (categoryId: number) => {
  //   const category = categories.find((cat) => cat.id === categoryId);
  //   return category?.name || "Desconocida";
  // };

  return (
    <>
      <h2 className=" text-center text-4xl font-bold text-slate-600">
        Actividades y Comidas
      </h2>

      <ul className=" space-y-3">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className=" bg-white px-5 py-10 mt-5 rounded-lg shadow flex justify-between"
          >
            <div className=" space-y-2 relative">
              <p
                className={`absolute -top-8 -left-8 px-10 py-2 text-white font-bold uppercase ${
                  activity.category === 1 ? "bg-lime-500" : "bg-orange-500"
                } `}
              >
                {categoryName(activity.category)}
              </p>
              <p className="text-2xl font-bold pt-5">{activity.name}</p>
              <p className="font-black text-3xl text-lime-500">
                {activity.calories}
                <span> Calorias</span>
              </p>
            </div>
            <div className=" flex gap-5 items-center">
              <button
                onClick={() =>
                  dispatch({
                    type: "SET_ACTIVEID",
                    payload: { id: activity.id },
                  })
                }
              >
                <PencilSquareIcon className=" h-8 w-8 text-gray-800" />
              </button>
            </div>
          </div>
        ))}
      </ul>
    </>
  );
}
