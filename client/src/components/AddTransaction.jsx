import React, { useState } from "react";

function AddTransaction(props) {
  const [inputTransaction, setInputTransaction] = useState({
    id: Date.now(),
    detail: "",
    amount: "",
    type: "",
  });

  function handleInputChange(event) {
    const eventCallerName = event.target.name;
    const eventCallerValue = event.target.value;

    setInputTransaction((prevState) => {
      return {
        ...prevState,
        [eventCallerName]: eventCallerValue,
      };
    });
  }

  return (
    <div>
      <form id="add">
        <label htmlFor="detail">Description</label>
        <input
          type="text"
          name="detail"
          placeholder="Enter transaction details..."
          onChange={handleInputChange}
          value={inputTransaction.detail}
        />
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          name="amount"
          placeholder="Enter Amount..."
          onChange={handleInputChange}
          value={inputTransaction.amount}
        />
        <div>
          <input
            type="radio"
            name="type"
            id="expense"
            value="expense"
            onChange={handleInputChange}
          />
          <label htmlFor="expense">Expense</label>
          <input
            type="radio"
            name="type"
            id="income"
            value="income"
            onChange={handleInputChange}
          />
          <label htmlFor="income">Income</label>
        </div>
        <button
          name="submit"
          onClick={(event) => {
            event.preventDefault();

            //add transaction to the list in parent component "App"
            props.onAdd(inputTransaction);

            //clear input field and assign a new id
            setInputTransaction((prevState) => {
              return {
                id: Date.now(),
                detail: "",
                amount: "",
                type: prevState.type,
              };
            });
          }}
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default AddTransaction;
