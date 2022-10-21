import { useContext, useState } from 'react';
import AppContext from '../context/appContext';
import closeIcon from '../assets/closeicon.png';

const EditTicketForm = ({ setEditMode, editDesc, editTitle, ticketId }) => {
  const [desc, setDesc] = useState(editDesc || '');
  const [title, setTitle] = useState(editTitle || '');
  const context = useContext(AppContext);

  const handleEditTicket = (e) => {
    e.preventDefault();
    if (title && desc) {
      context.editTicket(title, desc, ticketId);
      e.target.reset();
    }
    setEditMode(false);
  };

  return (
    <div className="addTicketContainer">
      <form onSubmit={handleEditTicket} className="addTicketForm">
        <span>Ticket details</span>
        <span
          className="closeBtn formBtnLight"
          onClick={() => setEditMode(false)}
        >
          <img src={closeIcon} alt="close icon" />
        </span>
        <input
          type="text"
          name="title"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          name="desc"
          placeholder="description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button type="submit">Done</button>
      </form>
    </div>
  );
};

export default EditTicketForm;
