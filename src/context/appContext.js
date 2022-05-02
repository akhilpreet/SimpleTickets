import { createContext, useEffect, useState } from "react";
import initialData from "../columns";
import { initializeApp } from "firebase/app";
import { child, get, getDatabase, onValue, ref, set } from "firebase/database";
import { updateColTickets } from "../utils/util";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "ticketmanager-ae40a.firebaseapp.com",
  databaseURL:
    "https://ticketmanager-ae40a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ticketmanager-ae40a",
  storageBucket: "ticketmanager-ae40a.appspot.com",
  messagingSenderId: "792028758479",
  appId: "1:792028758479:web:618cd63800c0cae3f6d2ba"
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

const AppContext = createContext({
  tickets: {},
  columns: {},
  loading: false,
  sessionId: null,
  addTicket: () => {},
  removeTicket: () => {},
  changeColumn: () => {},
  newSession: () => {},
  createSessionId: () => {},
  removeSessionId: () => {}
});

export const AppContextProvider = (props) => {
  const [columns, setColumns] = useState(initialData.columns);
  const [tickets, setTickets] = useState(initialData.tickets);
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    const currentSessionId = localStorage.getItem("sessionId");
    if (currentSessionId) {
      console.log("setting lodaing true");

      setLoading(true);
      setSessionId(currentSessionId);
      getSession(currentSessionId);
    }
  }, []);

  const createSessionId = (sessionId) => {
    setSessionId(sessionId);
    localStorage.setItem("sessionId", sessionId);
  };

  const removeSessionId = () => {
    setSessionId(null);
    localStorage.removeItem("sessionId");
  };

  const getSession = (sessionId) => {
    const dbRef = ref(database, `data/${sessionId}`);
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        data?.columns && setColumns(data?.columns);
        data?.tickets && setTickets(data?.tickets);
      }
    });
    setLoading(false);
  };

  const newSession = (sessionId) => {
    setLoading(true);
    get(child(ref(database), `data/${sessionId}`))
      .then((snapshot) => {
        if (!snapshot.exists()) {
          set(ref(database, `data/${sessionId}`), initialData);
        }
        createSessionId(sessionId);
        getSession(sessionId);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const addTicket = (title, desc, columnId) => {
    const ticketsLength = Object.keys(tickets).length;
    const nextTicket = `t${ticketsLength + 1}`;
    set(ref(database, `data/${sessionId}/tickets/${nextTicket}`), {
      title,
      desc
    });
    const columnTicket = columns[columnId].tickets
      ? `${columns[columnId].tickets},${nextTicket}`
      : nextTicket;
    set(
      ref(database, `data/${sessionId}/columns/${columnId}/tickets`),
      columnTicket
    );
  };

  const removeTicket = (columnId, ticketId) => {
    const tickets = columns[columnId]?.tickets;
    const ticketsList = tickets.split(",");
    const stringToRemove = updateColTickets(ticketsList, ticketId);
    const columnTicket = tickets.replace(stringToRemove, "");
    set(
      ref(database, `data/${sessionId}/columns/${columnId}/tickets`),
      columnTicket
    );
  };

  const changeColumn = (startCol, endCol, ticketId) => {
    const startColTickets = columns[startCol]?.tickets;
    const endColTickets = columns[endCol]?.tickets;

    const ticketsList = startColTickets.split(",");
    const stringToRemove = updateColTickets(ticketsList, ticketId);

    const newColumns = { ...columns };

    newColumns[startCol].tickets = startColTickets.replace(stringToRemove, "");
    newColumns[endCol].tickets = endColTickets
      ? `${endColTickets},${ticketId}`
      : ticketId;

    set(ref(database, `data/${sessionId}/columns`), newColumns);
  };

  return (
    <AppContext.Provider
      value={{
        columns,
        tickets,
        sessionId,
        addTicket,
        removeTicket,
        changeColumn,
        newSession,
        removeSessionId,
        createSessionId,
        loading
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
