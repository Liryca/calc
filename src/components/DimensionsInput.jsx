import React from "react";
import { Row, Col, Form } from "react-bootstrap";

const DimensionsInput = ({
  widthConfig,
  lengthConfig,
  values,
  handleChange,
  errors,
  touched,
  handleBlur,
}) => {
  // const formatDisplayValue = (value) => {
  //   const num = Number(value);
  //   if (isNaN(num)) return "";
  //   return num % 1 === 0 ? num.toString() : num.toFixed(1);
  // };

  const handleNumberBlur = (e) => {
    const { name, value } = e.target;
    const config = name === "width" ? widthConfig : lengthConfig;

    let numValue = parseFloat(value);

    if (isNaN(numValue)) {
      numValue = config.min;
    } else {
      numValue = Math.round(numValue / config.step) * config.step;
      numValue = Math.max(config.min, Math.min(config.max, numValue));
    }

    const formattedValue = parseFloat(numValue.toFixed(1));

    if (value !== formattedValue.toString()) {
      handleChange({
        ...e,
        target: {
          ...e.target,
          name,
          value: formattedValue.toString(),
        },
      });
    }

    handleBlur(e);
  };

  return (
    <Row className="mb-3 g-3">
      <Col md={6}>
        <Form.Group className="me-md-2">
          <Form.Label>Ширина (м)*</Form.Label>
          <Form.Control
            type="number"
            name="width"
            min={widthConfig.min}
            max={widthConfig.max}
            step={widthConfig.step}
            value={values.width}
            onChange={handleChange}
            onBlur={handleNumberBlur}
            placeholder={`${widthConfig.min}-${widthConfig.max}`}
            isInvalid={touched.width && !!errors.width}
          />
          {errors.width && (
            <Form.Control.Feedback type="invalid">
              {errors.width}
            </Form.Control.Feedback>
          )}
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group className="ms-md-2">
          <Form.Label>Длина (м)*</Form.Label>
          <Form.Control
            type="number"
            name="length"
            min={lengthConfig.min}
            max={lengthConfig.max}
            step={lengthConfig.step}
            value={values.length}
            onChange={handleChange}
            onBlur={handleNumberBlur}
            placeholder={`${lengthConfig.min}-${lengthConfig.max}`}
            isInvalid={touched.length && !!errors.length}
          />
          {errors.length && (
            <Form.Control.Feedback type="invalid">
              {errors.length}
            </Form.Control.Feedback>
          )}
        </Form.Group>
      </Col>
    </Row>
  );
};

export default DimensionsInput;
