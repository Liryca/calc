import React from "react";

const CartItem = ({ item, index }) => {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{item.timestamp || new Date(item.id).toLocaleString()}</td>
      <td>{item.materials?.sheet?.count?.toFixed(2) || "0.00"}</td>
      <td>{item.materials?.pipe?.count?.toFixed(2) || "0.00"}</td>
      <td>{item.materials?.fix?.count || "0"}</td>
      <td className="fw-bold">
        {item.totals?.overall?.toFixed(2) || "0.00"} руб.
      </td>
    </tr>
  );
};

export default CartItem;
