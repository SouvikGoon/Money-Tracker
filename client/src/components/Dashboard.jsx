import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Navbar from "./Navbar";
import AddTransaction from "./AddTransaction";
import TransactionCard from "./TransactionCard";
import Balance from "./Balance";

function Dashboard() {
  //declaring state for managing the transactions list
  const [transactionsList, setTransactionsList] = useState([]);
  const [isAuth, setIsAuth] = useState(true);

  //fetching all stored transactions from the backend ( add auth token to request )
  useEffect(() => {
    callGetTransaction();
  }, []);

  async function callGetTransaction() {
    const response = await fetch("/api/transactions", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authToken"),
      },
    });
    const data = await response.json();

    if (data.success === true) {
      setTransactionsList(data.data);
      setIsAuth(true);
    }
  }

  let balance = {
    expense: Number(0),
    income: Number(0),
  };

  //get initial expense and income
  for (let i = 0; i < transactionsList.length; i++) {
    if (transactionsList[i].type === "expense") {
      balance.expense += Number(transactionsList[i].amount);
    } else {
      balance.income += Number(transactionsList[i].amount);
    }
  }

  //add transaction to the list of transactions
  function addTransaction(newTransaction) {
    callAddTransaction(newTransaction);
  }

  //funtion for calling backend api to post transaction
  async function callAddTransaction(transactionDetails) {
    const response = await fetch("/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authToken"),
      },
      body: JSON.stringify({
        detail: transactionDetails.detail,
        amount: transactionDetails.amount,
        type: transactionDetails.type,
      }),
    });
    const data = await response.json();

    if (data.success === true) {
      transactionDetails._id = data.data._id;
      setTransactionsList((prevState) => {
        return [transactionDetails, ...prevState];
      });
    }
  }

  //delete transaction from the list
  function deleteTransaction(idOfTransaction) {
    callDeleteTransaction(idOfTransaction);
  }

  //function for calling backend api to delete transaction
  async function callDeleteTransaction(transactionId) {
    const response = await fetch("/api/transactions/" + transactionId, {
      method: "DELETE",
      headers: {
        "auth-token": localStorage.getItem("authToken"),
      },
    });
    const data = await response.json();

    if (data.success === true) {
      setTransactionsList((prevState) => {
        return prevState.filter((transaction) => {
          return transactionId !== transaction._id;
        });
      });
    }
  }

  if (!isAuth) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <Navbar />
      <div className="container-dashboard">
        <AddTransaction addTransaction={addTransaction} />
        <div className="recent-transactions">
          <p>Recent Transactions</p>
          {transactionsList.map((transaction) => {
            return (
              <TransactionCard
                key={transaction._id}
                transaction={transaction}
                deleteTransaction={deleteTransaction}
              />
            );
          })}
        </div>
        <Balance balance={balance} />
      </div>
    </div>
  );
}

export default Dashboard;
