import { useContext, useState } from "react";
import AppContext from "../context/appContext";

const AddTicketForm = ({ columnId }) => {
  const [showForm, setShowForm] = useState(false);
  const context = useContext(AppContext);

  const handleAddTicket = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const desc = e.target.desc.value;
    if (title && desc) {
      context.addTicket(title, desc, columnId);
      e.target.reset();
    }
    setShowForm(false);
  };

  return (
    <div className="addTicketContainer">
      {!showForm && (
        <div className="addTicketBtn" onClick={() => setShowForm(true)}>
          Add ticket
        </div>
      )}
      {showForm && (
        <form onSubmit={handleAddTicket} className="addTicketForm">
          <span>Ticket details</span>
          <span className="closeBtn" onClick={() => setShowForm(false)}>
            x
          </span>
          <input type="text" name="title" placeholder="title" />
          <textarea name="desc" placeholder="description" />
          <button type="submit">Done</button>
        </form>
      )}
    </div>
  );
};

export default AddTicketForm;
