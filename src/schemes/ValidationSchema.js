import * as Yup from "yup";
import { ERROR_MESSAGES } from "../constants/errors";

export const createValidationSchema = (sizeConfig = []) => {
  const widthConfig = sizeConfig.find((item) => item.key === "width");
  const lengthConfig = sizeConfig.find((item) => item.key === "length");

  const validateStep = (value, step) => {
    if (value === undefined || value === null) return false;
    const remainder = Math.round((value / step) * 1000000) % 1000000;
    return remainder === 0 || remainder === 1000000;
  };

  return Yup.object().shape({
    material: Yup.string().required(ERROR_MESSAGES.REQUIRED),
    sheet: Yup.string().required(ERROR_MESSAGES.REQUIRED),
    pipe: Yup.string().required(ERROR_MESSAGES.REQUIRED),
    frameType: Yup.string().required(ERROR_MESSAGES.REQUIRED),
    width: Yup.number()
      .typeError(ERROR_MESSAGES.NUMBER_REQUIRED)
      .min(widthConfig.min, `${ERROR_MESSAGES.WIDTH_MIN} ${widthConfig.min}м`)
      .max(widthConfig.max, `${ERROR_MESSAGES.WIDTH_MAX} ${widthConfig.max}м`)
      .required(ERROR_MESSAGES.REQUIRED)
      .test(
        "is-multiple-of-step",
        `${ERROR_MESSAGES.STEP_VALIDATION} ${widthConfig.step}`,
        (value) => validateStep(value, widthConfig.step)
      ),
    length: Yup.number()
      .typeError(ERROR_MESSAGES.NUMBER_REQUIRED)
      .min(
        lengthConfig.min,
        `${ERROR_MESSAGES.LENGTH_MIN} ${lengthConfig.min}м`
      )
      .max(
        lengthConfig.max,
        `${ERROR_MESSAGES.LENGTH_MAX} ${lengthConfig.max}м`
      )
      .required(ERROR_MESSAGES.REQUIRED)
      .test(
        "is-multiple-of-step",
        `${ERROR_MESSAGES.STEP_VALIDATION} ${lengthConfig.step}`,
        (value) => validateStep(value, lengthConfig.step)
      ),
  });
};
