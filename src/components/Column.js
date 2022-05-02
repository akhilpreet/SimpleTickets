import { useContext } from "react";
import AppContext from "../context/appContext";
import AddTicketForm from "./AddTicketForm";
import Ticket from "./Ticket";

const Column = ({ columnId, columnTitle, tickets }) => {
  const context = useContext(AppContext);
  const ticketsList = tickets && tickets?.toString().split(",");

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    const ticketId = e.dataTransfer.getData("ticketId");
    const startColumn = e.dataTransfer.getData("startColumn");
    if (startColumn === columnId) {
      return;
    }
    context.changeColumn(startColumn, columnId, ticketId);
  };

  return (
    <div className="column" onDragOver={handleDragOver} onDrop={handleDrop}>
      <h1>{columnTitle}</h1>
      {ticketsList &&
        ticketsList?.map((item) => {
          const ticket = item.trim();
          return <Ticket key={ticket} ticketId={ticket} columnId={columnId} />;
        })}
      <AddTicketForm columnId={columnId} />
    </div>
  );
};

export default Column;
