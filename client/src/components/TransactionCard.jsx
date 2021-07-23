import React from "react";

function TransactionCard({ transaction, deleteTransaction }) {
  return (
    <div className="transaction-card">
      <p>{transaction.detail}</p>
      <h2 className={transaction.type}>{transaction.amount}</h2>
      <button
        className="delete-btn"
        onClick={() => {
          deleteTransaction(transaction._id);
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default TransactionCard;
