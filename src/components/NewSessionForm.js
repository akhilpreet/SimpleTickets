import { useContext, useRef } from "react";
import AppContext from "../context/appContext";

const NewSessionForm = () => {
  const context = useContext(AppContext);
  let sessionId = useRef();

  const handleCreateSession = () => {
    const id = sessionId.value.trim().toLowerCase();
    if (id) {
      context.newSession(id);
    }
  };

  return (
    <div className="newSessionForm">
      <span className="heading">Create new or continue session</span>
      <span className="text">session id</span>
      <input
        ref={(el) => (sessionId = el)}
        type="text"
        placeholder="set a unique name!"
      />
      <button onClick={handleCreateSession} type="button">
        start session
      </button>
    </div>
  );
};

export default NewSessionForm;
