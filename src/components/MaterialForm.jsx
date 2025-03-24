import React from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import MaterialSelect from "./MaterialSelect";
import PipeSelect from "./PipeSelect";
import FrameTypeSelect from "./FrameTypeSelect";
import DimensionsInput from "./DimensionsInput";
import { createValidationSchema } from "../schemes/ValidationSchema";

const MaterialForm = ({
  materials = [],
  sheets = [],
  pipes = [],
  configGetters = {},
  onCalculate,
}) => {
  const sizeConfig = configGetters.getSizeConfig?.() || [];
  const frameConfigs = configGetters.getFrameConfigs?.() || [];

  const widthConfig = sizeConfig.find((item) => item.key === "width");
  const lengthConfig = sizeConfig.find((item) => item.key === "length");

  const formik = useFormik({
    initialValues: {
      material: "",
      sheet: "",
      pipe: "",
      frameType: frameConfigs[0]?.key || "",
      width: widthConfig?.min || 5,
      length: lengthConfig?.min || 5,
    },
    validationSchema: createValidationSchema(sizeConfig),
    onSubmit: (values, { resetForm }) => {
      onCalculate(values);
      resetForm();
    },
    validateOnChange: true,
    validateOnBlur: true,
    enableReinitialize: true,
  });

  console.log(formik);

  const handleMaterialChange = (e) => {
    const material = e.target.value;
    const firstSheet = sheets.find((sheet) => sheet.material === material);

    formik.setValues({
      ...formik.values,
      material: material,
      sheet: firstSheet?.name || "",
    });
  };

  const handleSheetChange = (e) => {
    const sheetName = e.target.value;
    const selectedSheet = sheets.find((sheet) => sheet.name === sheetName);

    if (selectedSheet) {
      formik.setValues({
        ...formik.values,
        sheet: sheetName,
        material: selectedSheet.material,
      });
    }
  };

  return (
    <Card className="shadow-sm h-100">
      <Card.Header className="bg-primary text-white">
        <h5>Калькулятор конструкции</h5>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={formik.handleSubmit}>
          <MaterialSelect
            materials={materials}
            sheets={sheets}
            selectedMaterial={formik.values.material}
            selectedSheet={formik.values.sheet}
            onMaterialChange={handleMaterialChange}
            onSheetChange={handleSheetChange}
            handleBlur={formik.handleBlur}
            errors={formik.errors}
            touched={formik.touched}
          />

          <DimensionsInput
            widthConfig={widthConfig}
            lengthConfig={lengthConfig}
            values={formik.values}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            errors={formik.errors}
            touched={formik.touched}
          />

          <Row className="mb-3 g-3">
            <Col md={6}>
              <PipeSelect
                pipes={pipes}
                value={formik.values.pipe}
                onChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                error={formik.touched.pipe && formik.errors.pipe}
              />
            </Col>
            <Col md={6}>
              <FrameTypeSelect
                frameConfigs={frameConfigs}
                value={formik.values.frameType}
                onChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                error={formik.touched.frameType && formik.errors.frameType}
              />
            </Col>
          </Row>

          <Button
            variant="primary"
            type="submit"
            className="mt-3"
            disabled={!formik.dirty || !formik.isValid || formik.isSubmitting}
          >
            {formik.isSubmitting ? "Расчет..." : "Рассчитать"}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default MaterialForm;
