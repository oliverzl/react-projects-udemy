import React, { useEffect } from "react";

const Alert = ({ type, msg, list, removeAlert }) => {
  //its good to run the useEffect whenever theres an update to the state value, not just when the timeout is finished.
  //adding the list state to the Alert Component as props and to the useEffect dependency array shows that it will run whenever there is a change in the list state.
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [list]);

  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
