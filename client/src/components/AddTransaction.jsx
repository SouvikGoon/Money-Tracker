import React, { useState } from "react";

function AddTransaction(props) {
  const [inputTransaction, setInputTransaction] = useState({
    _id: "",
    detail: "",
    amount: "",
    type: "",
  });

  const [inputError, setInputError] = useState({
    detail: "",
    amount: "",
    type: "",
  });

  function isValid() {
    if (inputTransaction.detail === "") {
      setInputError((prev) => {
        return {
          ...prev,
          detail: "Enter transaction detail",
        };
      });

      return false;
    }

    if (inputTransaction.amount === "") {
      setInputError((prev) => {
        return {
          ...prev,
          amount: "Enter transaction amount",
        };
      });

      return false;
    }

    if (inputTransaction.type === "") {
      setInputError((prev) => {
        return {
          ...prev,
          type: "Select transaction type",
        };
      });

      return false;
    }

    return true;
  }

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
          placeholder="Enter transaction details"
          autoComplete="off"
          onChange={handleInputChange}
          value={inputTransaction.detail}
        />
        <span style={{ color: "red", fontSize: "12px" }}>
          {inputError.detail}
        </span>
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          name="amount"
          placeholder="Enter Amount"
          onChange={handleInputChange}
          value={inputTransaction.amount}
        />
        <span style={{ color: "red" }}>{inputError.amount}</span>
        <input type="date" name="transactionDate" />
        <div>
          <div>
            <input
              type="radio"
              name="type"
              id="expense"
              value="expense"
              onChange={handleInputChange}
            />
            <label htmlFor="expense">Expense</label>
          </div>
          <div>
            <input
              type="radio"
              name="type"
              id="income"
              value="income"
              onChange={handleInputChange}
            />
            <label htmlFor="income">Income</label>
          </div>
        </div>
        <span style={{ color: "red" }}>{inputError.type}</span>
        <button
          name="submit"
          onClick={(event) => {
            event.preventDefault();

            //add transaction to the list in parent component "App" if non empty inputs
            if (isValid()) {
              props.addTransaction(inputTransaction);

              setInputError({
                detail: "",
                amount: "",
                type: "",
              });
            }

            //clear input field and assign a new id
            setInputTransaction((prevState) => {
              return {
                _id: "",
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
