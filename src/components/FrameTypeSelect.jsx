import React from "react";
import { Form } from "react-bootstrap";
const FrameTypeSelect = ({
  frameConfigs,
  value,
  onChange,
  error,
  handleBlur,
}) => (
  <Form.Group className="mb-3">
    <Form.Label>Прочность каркаса*</Form.Label>
    <div className="d-flex flex-column gap-2">
      {frameConfigs.map((frame) => (
        <Form.Check
          key={frame.key}
          type="radio"
          id={`frame-${frame.key}`}
          name="frameType"
          label={frame.name}
          value={frame.key}
          checked={value === frame.key}
          onChange={onChange}
          onBlur={handleBlur}
          isInvalid={!!error}
        />
      ))}
    </div>
    {error && (
      <div className="text-danger mt-1" style={{ fontSize: "0.875em" }}>
        {error}
      </div>
    )}
  </Form.Group>
);

export default FrameTypeSelect;
