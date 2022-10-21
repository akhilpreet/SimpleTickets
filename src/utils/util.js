export const updateColTickets = (ticketsList, ticketId) => {
  let stringToRemove = ticketId;

  if (ticketsList.length > 1) {
    if (ticketsList[0] !== ticketId) {
      stringToRemove = `,${ticketId}`;
    } else if (ticketsList[0] === ticketId) {
      stringToRemove = `${ticketId},`;
    }
  }
  return stringToRemove;
};
