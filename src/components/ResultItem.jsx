import React from "react";
import { Badge } from "react-bootstrap";

const ResultItem = ({ item }) => {
  return (
    <tr>
      <td>
        {item.name}
        {item.unit && (
          <Badge bg="secondary" className="ms-2">
            {item.unit}
          </Badge>
        )}
      </td>
      <td className="text-end">{item.count?.toFixed?.(2) ?? item.count}</td>
      <td className="text-end">{item.price?.toFixed(2)}</td>
      <td className="text-end">{item.total?.toFixed(2)}</td>
    </tr>
  );
};

export default ResultItem;
