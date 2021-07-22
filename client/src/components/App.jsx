import React, { useEffect, useState } from "react";
import AddTransaction from "./AddTransaction";
import TransactionCard from "./TransactionCard";
import Balance from "./Balance";

function App() {
  //declaring state for managing the transactions list
  const [transactionsList, setTransactionsList] = useState([]);

  //fetching all stored transactions from the backend ( add auth token to request )
  useEffect(() => {
    fetch("/api/transactions")
      .then((response) => response.json())
      .then((data) => setTransactionsList(data.transactions)); //updating the state after the data is fetched
  }, []);

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
    setTransactionsList((prevState) => {
      return [newTransaction, ...prevState];
    });

    //console.log(transactionsList);
  }

  //delete transaction from the list
  function deleteTransaction(idOfTransaction) {
    setTransactionsList((prevState) => {
      return prevState.filter((transaction) => {
        return idOfTransaction !== transaction.id;
      });
    });
  }

  return (
    <div className="container">
      <AddTransaction onAdd={addTransaction} />
      <div className="recent-transactions">
        {transactionsList.map((transaction) => {
          return (
            <TransactionCard
              key={transaction.id}
              transaction={transaction}
              onDelete={deleteTransaction}
            />
          );
        })}
      </div>
      <Balance balance={balance} />
    </div>
  );
}

export default App;
