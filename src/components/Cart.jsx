import React from "react";
import { Table, Button, Badge } from "react-bootstrap";
import CartItem from "./CartItem";

const Cart = ({ cart, onClearCart, totals }) => {
  return (
    <div className="mt-5 p-3 border rounded">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>
          Корзина
          <Badge bg="secondary" pill>
            {cart.length}
          </Badge>
        </h3>
        {cart.length > 0 && (
          <Button variant="outline-danger" size="sm" onClick={onClearCart}>
            Очистить корзину
          </Button>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-4 text-muted">
          <i className="bi bi-cart-x fs-1"></i>
          <p className="mt-2">Корзина пуста</p>
        </div>
      ) : (
        <>
          <div className="table-responsive">
            <Table striped bordered hover className="align-middle">
              <thead className="table-light">
                <tr>
                  <th width="50px">#</th>
                  <th>Дата расчета</th>
                  <th>Листы (м²)</th>
                  <th>Трубы (мп)</th>
                  <th>Саморезы (шт)</th>
                  <th>Сумма</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <CartItem key={item.id} item={item} index={index} />
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="2" className="text-end fw-bold">
                    Итого:
                  </td>
                  <td className="fw-bold">{totals.sheets.toFixed(2)}</td>
                  <td className="fw-bold">{totals.pipes.toFixed(2)}</td>
                  <td className="fw-bold">{totals.screws}</td>
                  <td colSpan="2" className="fw-bold">
                    {totals.totalSum.toFixed(2)} руб.
                  </td>
                </tr>
              </tfoot>
            </Table>
          </div>

          <div className="d-flex justify-content-between mt-3">
            <Button variant="success">Оформить заказ</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
