import { useContext, useEffect, useState } from "react";
import AppContext from "../context/appContext";

const FloatingBtns = () => {
  const [confim, setConfirm] = useState(false);
  const [blank, setBlank] = useState(false);
  const context = useContext(AppContext);

  const handleClearSession = () => {
    setBlank(true);
    setConfirm(false);
    context.removeSessionId();
    setTimeout(() => {
      setBlank(false);
    }, 2000);
  };

  return (
    <>
      <div className={`blackScreen ${blank ? "animateBlackScreen" : ""}`} />
      {context?.sessionId && (
        <div className="floatingContainer">
          {!confim && (
            <button
              onClick={() => setConfirm(true)}
              className="floatingBtn"
              type="button"
            >
              logout
            </button>
          )}
          {confim && (
            <div className="confirmContainer">
              <p>you sure?</p>
              <button
                className="confirmBtn"
                onClick={handleClearSession}
                type="button"
              >
                yeah
              </button>
              <button
                className="confirmBtn"
                onClick={() => setConfirm(false)}
                type="button"
              >
                nah
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default FloatingBtns;
