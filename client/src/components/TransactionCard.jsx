import React from "react";
import deleteIcon from "../icons/delete.png";

function TransactionCard({ transaction, deleteTransaction }) {
  return (
    <div className="transaction-card">
      <div>
        <p>{transaction.detail}</p>
        <h2 className={transaction.type}>&#x20b9; {transaction.amount}</h2>
      </div>
      <button
        className="delete-btn"
        onClick={() => {
          deleteTransaction(transaction._id);
        }}
      >
        <img src={deleteIcon} alt="delete" width="15px" height="15px" />
      </button>
    </div>
  );
}

export default TransactionCard;
