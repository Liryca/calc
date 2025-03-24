import React from "react";
import { Form } from "react-bootstrap";

const PipeSelect = ({ pipes, value, onChange, handleBlur, error }) => (
  <Form.Group>
    <Form.Label>Труба каркаса*</Form.Label>
    <Form.Select
      name="pipe"
      value={value}
      onChange={onChange}
      onBlur={handleBlur}
      isInvalid={!!error}
    >
      <option value="">Выберите трубу</option>
      {pipes.map((pipe) => (
        <option key={pipe.name} value={pipe.name}>
          {pipe.name} ({pipe.price} руб/{pipe.unit})
        </option>
      ))}
    </Form.Select>
    <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
  </Form.Group>
);

export default PipeSelect;
