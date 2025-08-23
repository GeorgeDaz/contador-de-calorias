import Form from "./components/Form";
import { useReducer, useEffect, useMemo } from "react";
import { initialState, activityReducer } from "./reducers/activity-reducer";
import ActivityList from "./components/ActivityList";
import CalorieTracker from "./components/CalorieTracker";

function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  useEffect(() => {
    // Aquí podrías cargar actividades desde una API o almacenamiento local si es necesario
    // Por ahora, dejamos el estado inicial vacío
    localStorage.setItem("activities", JSON.stringify(state.activities));
  }, [state.activities]);

  const canRestartApp = () =>
    useMemo(() => state.activities.length, [state.activities]);

  return (
    <>
      <header className=" bg-lime-600 py-3">
        <div className=" max-w-4xl mx-auto flex justify-between items-center">
          <h1 className=" text-center text-lg font-bold text-white uppercase">
            Contador de Calorias
          </h1>
          <button
            className=" bg-white text-lime-600 px-3 py-1 rounded-lg font-bold hover:bg-lime-500 hover:text-white transition disabled:opacity-10"
            disabled={!canRestartApp()}
            onClick={() => dispatch({ type: "RESTART_APP" })}
          >
            Reiniciar App
          </button>
        </div>
      </header>
      <section className=" bg-lime-500 py-20 px-5">
        <div className=" max-w-4xl mx-auto">
          <Form dispatch={dispatch} state={state} />
        </div>
      </section>
      <section className="bg-gray-800 py-10">
        <div className="max-w-4xl mx-auto">
          <CalorieTracker activities={state.activities} />
        </div>
      </section>

      <section className=" max-w-4xl mx-auto p-10">
        <ActivityList activities={state.activities} dispatch={dispatch} />
      </section>
      <footer className=" bg-lime-600 py-3">
        <div className=" max-w-4xl mx-auto text-center text-white">
          <p>&copy; 2023 Contador de Calorias</p>
        </div>
      </footer>
    </>
  );
}

export default App;
