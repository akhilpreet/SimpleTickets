import { useContext, useEffect, useState } from "react";
import AppContext from "../context/appContext";

const Ticket = ({ ticketId, columnId }) => {
  const context = useContext(AppContext);
  const [ticketData, setTicketData] = useState({});

  useEffect(() => {
    if (context.tickets && ticketId) {
      setTicketData(context?.tickets[ticketId]);
    }
  }, [ticketId, context]);

  const handleDragStart = (e) => {
    e.dataTransfer.setData("ticketId", ticketId);
    e.dataTransfer.setData("startColumn", columnId);
    e.target.style.background = "#0000ff80";
  };

  const handleDelete = () => {
    context.removeTicket(columnId, ticketId);
  };

  return (
    <div className="ticket" draggable onDragStart={handleDragStart}>
      <span className="closeBtn" onClick={handleDelete}>
        x
      </span>
      <h2>{ticketData?.title}</h2>
      <p>{ticketData?.desc}</p>
    </div>
  );
};

export default Ticket;
