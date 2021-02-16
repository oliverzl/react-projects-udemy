//grocery shopping list

//-must have local storage, list will not dissapear when page refreshes
//-functionality for adding, removing, removing all, and editing items in the list
//-alert that pops up for all actions above

import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

// ====================================================================== LOCAL STORAGE FUNCTION ======================================================================
//this is to preserve the values if they were already in the list on refresh.
const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};
// ====================================================================== END OF LOCAL STORAGE FUNCTION ======================================================================

function App() {
  //====================================================================== ALL STATE VALUES ======================================================================
  const [name, setName] = useState("");
  //calling getLocalStorage() here
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  //the alert state is an object now because we have multiple displays showing different text.
  const [alert, setAlert] = useState({
    show: false,
    type: "",
    msg: "",
  });

  //====================================================================== END OF ALL STATE VALUES ======================================================================

  const handleSubmit = (event) => {
    event.preventDefault();
    //VALUE IS EMPTY
    if (!name) {
      //display alert
      showAlert(true, "danger", "Please Enter an Item");
    }
    //if value is not empty, AND isEditing is true
    else if (name && isEditing) {
      //deal with edit
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "success", "value changed");
    } else {
      //adding a new item to the list
      showAlert(true, "success", "Item added to the list");
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };

  //optimizing code: function showAlert that setAlert according to its arguments.
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    showAlert(true, "danger", "emptied list");
    setList([]);
  };

  const removeItem = (id) => {
    showAlert(true, "danger", "item removed");
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        {/* if alert.show is true, render <Alert /> */}
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>Grocery Buddy</h3>
        <div className='form-control'>
          <input
            type='text'
            className='grocery'
            placeholder='e.g. Eggs'
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <button type='submit' className='submit-btn'>
            {isEditing ? "Edit" : "Submit"}
          </button>
        </div>
      </form>
      {/* below code displayed if list > 0 */}
      {list.length > 0 && (
        <div className='grocery-container'>
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className='clear-btn' onClick={clearList}>
            Clear Items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
