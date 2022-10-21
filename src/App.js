import "./styles.css";
import { useContext } from "react";
import Column from "./components/Column";
import AppContext from "./context/appContext";
import FloatingBtns from "./components/FloatingBtns";
import NewSessionForm from "./components/NewSessionForm";
import Loader from "./components/Loader";

export default function App() {
  const context = useContext(AppContext);

  return (
    <div className="mainContainer">
      {context?.loading && <Loader />}
      {context?.tickets && context.columns && (
        <>
          <FloatingBtns />
          <h1 className="appHeading">Simple Tickets</h1>
          {context?.sessionId && (
            <div className="App">
              {Object.keys(context.columns).map((key) => {
                const column = context.columns[key];
                return (
                  <Column
                    key={key}
                    columnId={key}
                    columnTitle={column?.title}
                    tickets={column?.tickets}
                  />
                );
              })}
            </div>
          )}
          {!context?.sessionId && <NewSessionForm />}
        </>
      )}
    </div>
  );
}
