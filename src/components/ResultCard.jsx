import React from "react";
import { Card, Table, Button } from "react-bootstrap";
import ResultItem from "./ResultItem";

const ResultCard = ({ result, onAddToCart }) => {
  if (!result) return null;

  const { dimensions, construction, materials, totals } = result;

  const basketItems = [
    {
      id: "sheet",
      name: materials.sheet.name,
      unit: materials.sheet.unit,
      count: materials.sheet.count,
      price: materials.sheet.price,
      total: totals.sheets,
    },
    {
      id: "pipe",
      name: materials.pipe.name,
      unit: materials.pipe.unit,
      count: materials.pipe.count,
      price: materials.pipe.price,
      total: totals.pipes,
    },
    {
      id: "fix",
      name: materials.fix.name,
      unit: materials.fix.unit,
      count: materials.fix.count,
      price: materials.fix.price,
      total: totals.fixes,
    },
  ];

  return (
    <Card className="shadow-sm h-100">
      <Card.Header className="bg-primary text-white">
        <h5>Результаты расчета</h5>
      </Card.Header>
      <Card.Body>
        <div className="mb-4 p-3 bg-light rounded">
          <h6>Основные параметры конструкции</h6>
          <div className="d-flex justify-content-between">
            <span>
              <strong>Площадь изделия:</strong>{" "}
              {dimensions.totalArea.toFixed(2)} м²
            </span>
            <span>
              <strong>Размер ячейки:</strong>{" "}
              {construction.cellSize.width.toFixed(2)} ×{" "}
              {construction.cellSize.length.toFixed(2)} м
            </span>
          </div>
        </div>

        <Table striped bordered hover className="mt-3">
          <thead className="bg-light">
            <tr>
              <th>Материал</th>
              <th className="text-end">Кол-во</th>
              <th className="text-end">Цена за ед.</th>
              <th className="text-end">Сумма</th>
            </tr>
          </thead>
          <tbody>
            {basketItems.map((item) => (
              <ResultItem key={item.id} item={item} />
            ))}
            <tr className="table-active">
              <td colSpan="3" className="text-end fw-bold">
                Итого:
              </td>
              <td className="text-end fw-bold">{totals.overall.toFixed(2)}</td>
            </tr>
          </tbody>
        </Table>
        <Button
          variant="primary"
          onClick={() => onAddToCart(result)}
          className="mt-3"
        >
          Добавить в корзину
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ResultCard;
