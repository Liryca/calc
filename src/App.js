import React, { useState, useEffect, useMemo } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { prepareFormProps } from "./utils/dataHelpers";
import { useDataStore } from "./hooks/useData";
import { useCart } from "./hooks/useCart";
import DataModel from "./models/DataModel";
import DataController from "./controllers/DataController";
import MaterialForm from "./components/MaterialForm";
import ResultCard from "./components/ResultCard";
import Cart from "./components/Cart";

import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [model] = useState(new DataModel());
  const [controller] = useState(new DataController(model));
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);

  const { groupedData } = useDataStore(model.getData() || []);

  const { cart, addToCart, clearCart, getTotals } = useCart();

  const handleAddToCart = () => {
    if (result) {
      addToCart({
        ...result,
        id: Date.now(),
        timestamp: new Date().toISOString(),
      });
    }
  };

  const formProps = useMemo(() => {
    const config = model.getConfig();
    return groupedData && config?.length
      ? prepareFormProps(groupedData, config)
      : null;
  }, [groupedData, model]);

  useEffect(() => {
    const init = async () => {
      try {
        await controller.initialize();
      } catch (error) {
        console.error("Initialization error:", error);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [controller]);

  const handleCalculate = (values) => {
    setResult(controller.calculate(values, groupedData, model.getConfig()));
  };

  if (loading) {
    return <Spinner animation="border" className="mt-5 mx-auto" />;
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          {formProps && (
            <MaterialForm {...formProps} onCalculate={handleCalculate} />
          )}
        </Col>
        {result && (
          <Col md={6}>
            <ResultCard result={result} onAddToCart={handleAddToCart} />
          </Col>
        )}
      </Row>
      <Cart cart={cart} onClearCart={clearCart} totals={getTotals()} />
    </Container>
  );
};

export default App;
