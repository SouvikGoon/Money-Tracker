import React from "react";

function Balance(props) {
  return (
    <div className="balance">
      <div>
        <h3>Expense</h3>
        <p>{props.balance.expense}</p>
      </div>
      <div>
        <h3>Income</h3>
        <p>{props.balance.income}</p>
      </div>
    </div>
  );
}

export default Balance;
