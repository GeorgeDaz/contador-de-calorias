import Form from "./components/Form";
import { useReducer } from "react";
import { initialState, activityReducer } from "./reducers/activity-reducer";
import ActivityList from "./components/ActivityList";

function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  return (
    <>
      <header className=" bg-lime-600 py-3">
        <div className=" max-w-4xl mx-auto flex justify-between">
          <h1 className=" text-center text-lg font-bold text-white uppercase">
            Contador de Calorias
          </h1>
        </div>
      </header>
      <section className=" bg-lime-500 py-20 px-5">
        <div className=" max-w-4xl mx-auto">
          <Form dispatch={dispatch} state={state} />
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
