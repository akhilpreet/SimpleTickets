import { useContext, useRef } from 'react';
import AppContext from '../context/appContext';

const NewSessionForm = () => {
  const context = useContext(AppContext);
  let sessionId = useRef();

  const handleCreateSession = (e) => {
    e.preventDefault();
    const id = sessionId.value.trim().toLowerCase();
    if (id) {
      context.newSession(id);
    }
  };

  return (
    <div className="newSessionForm">
      <span className="heading">Create new or continue session</span>
      <span className="text">session id</span>
      <form onSubmit={handleCreateSession}>
        <input
          ref={(el) => (sessionId = el)}
          type="text"
          placeholder="set a unique name!"
        />
        <button type="submit">start session</button>
      </form>
    </div>
  );
};

export default NewSessionForm;
