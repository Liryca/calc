import React from "react";
import { Form, Row, Col } from "react-bootstrap";

const MaterialSelect = ({
  materials = [],
  sheets = [],
  selectedMaterial,
  selectedSheet,
  onMaterialChange,
  onSheetChange,
  errors,
  touched,
  handleBlur,
}) => {
  const availableSheets = selectedMaterial
    ? sheets.filter((sheet) => sheet.material === selectedMaterial)
    : [];

  return (
    <Row className="mb-3 g-3">
      <Col md={6}>
        <Form.Group className="mb-3">
          <Form.Label>Материал покрытия*</Form.Label>
          <Form.Select
            name="material"
            value={selectedMaterial}
            onChange={onMaterialChange}
            onBlur={handleBlur}
            isInvalid={touched.material && !!errors.material}
          >
            <option value="">Выберите материал</option>
            {materials.map((material) => (
              <option key={material} value={material}>
                {material}
              </option>
            ))}
          </Form.Select>
          {touched.material && errors.material && (
            <Form.Control.Feedback type="invalid">
              {errors.material}
            </Form.Control.Feedback>
          )}
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group className="mb-3">
          <Form.Label>Лист покрытия*</Form.Label>
          <Form.Select
            name="sheet"
            value={selectedSheet}
            onChange={onSheetChange}
            disabled={!selectedMaterial}
            onBlur={handleBlur}
            isInvalid={touched.sheet && !!errors.sheet}
          >
            {!availableSheets.length && <option value="">Выберите лист</option>}
            {availableSheets.map((sheet) => (
              <option key={sheet.name} value={sheet.name}>
                {sheet.name} ({sheet.price} руб/{sheet.unit})
              </option>
            ))}
          </Form.Select>
          {touched.sheet && errors.sheet && (
            <Form.Control.Feedback type="invalid">
              {errors.sheet}
            </Form.Control.Feedback>
          )}
        </Form.Group>
      </Col>
    </Row>
  );
};
export default MaterialSelect;
