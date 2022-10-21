import { useContext, useEffect, useState } from 'react';
import AppContext from '../context/appContext';
import closeIcon from '../assets/closeicon.png';
import editIcon from '../assets/editicon.png';
import EditTicketForm from './EditTicketForm';

const Ticket = ({ ticketId, columnId }) => {
  const context = useContext(AppContext);
  const [ticketData, setTicketData] = useState({});
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (context.tickets && ticketId) {
      setTicketData(context?.tickets[ticketId]);
    }
  }, [ticketId, context]);

  const handleDragStart = (e) => {
    e.dataTransfer.setData('ticketId', ticketId);
    e.dataTransfer.setData('startColumn', columnId);
    e.target.style.background = '#0000ff80';
  };

  const handleDragEnd = (e) => {
    e.target.style.background = '#e4e4e4';
  };

  const handleDelete = () => {
    context.removeTicket(columnId, ticketId);
  };

  return (
    <>
      {editMode ? (
        <EditTicketForm
          setEditMode={setEditMode}
          editDesc={ticketData?.desc}
          editTitle={ticketData?.title}
          ticketId={ticketId}
        />
      ) : (
        <>
          <div
            className="ticket"
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="closeBtn">
              <img
                className="formBtnDark"
                onClick={setEditMode.bind(this, true)}
                src={editIcon}
                alt="edit icon"
              />
              <img
                className="formBtnDark"
                onClick={handleDelete}
                src={closeIcon}
                alt="close icon"
              />
            </div>
            <h2>{ticketData?.title}</h2>
            <p>{ticketData?.desc}</p>
          </div>
        </>
      )}
    </>
  );
};

export default Ticket;
