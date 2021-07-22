import React from "react";

function TransactionCard({ transaction, onDelete }) {
  return (
    <div className="transaction-card">
      <p>{transaction.detail}</p>
      <h2 className={transaction.type}>{transaction.amount}</h2>
      <button
        className="delete-btn"
        onClick={() => {
          onDelete(transaction.id);
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default TransactionCard;
