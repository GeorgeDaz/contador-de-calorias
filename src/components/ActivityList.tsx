import React from "react";
import type { Activity } from "../types";

type ActivityListProps = {
  activities: Activity[];
};

export default function ActivityList({ activities }: ActivityListProps) {
  return (
    <>
      <h2 className=" text-center text-4xl font-bold text-slate-600">
        Actividades y Comidas
      </h2>

      <ul className=" space-y-3">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className=" bg-white p-5 rounded-lg shadow flex justify-between"
          >
            <div className=" space-y-2 relative">
              <p className="text-2xl font-bold pt-5">{activity.name}</p>
              <p>{activity.category === 1 ? "Comida" : "Ejercicio"}</p>
              <p className="font-black text-3xl text-lime-500">
                {activity.calories}
                <span> Calorias</span>
              </p>
            </div>
            <div>
              <p>acciones</p>
            </div>
          </div>
        ))}
      </ul>
    </>
  );
}
