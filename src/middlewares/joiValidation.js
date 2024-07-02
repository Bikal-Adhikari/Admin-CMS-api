import Joi from "joi";

const STR_REQUIRED = Joi.string().max(100).required();
const STR = Joi.string().max(100).allow("", null);
const LONG_STR = Joi.string().max(5000).allow("", null);
const LONG_STR_REQUIRED = Joi.string().max(5000).required();
const PHONE = Joi.number().allow("", null);
const PHONE_REQ = Joi.number().required();
const EMAIL = Joi.string()
  .email({
    minDomainSegments: 2,
  })
  .allow("", null);
const EMAIL_REQ = Joi.string()
  .email({
    minDomainSegments: 2,
  })
  .required();
const DATE_REQ = Joi.date().required();
// const ISTRUE = Joi.boolean().allow(null, "");

const joiValidator = ({ req, res, next, schema }) => {
  try {
    const { error } = schema.validate(req.body);
    error
      ? res.json({
          status: "error",
          message: error.message,
        })
      : next();
  } catch (error) {
    next(error);
  }
};
export const newUserValidation = (req, res, next) => {
  const schema = Joi.object({
    fName: STR_REQUIRED,
    lName: STR_REQUIRED,
    phone: PHONE,
    email: EMAIL_REQ,
    password: STR_REQUIRED,
  });
  return joiValidator({ req, res, next, schema });
};
export const newProductValidation = (req, res, next) => {
  const schema = Joi.object({
    name: STR_REQUIRED,
    sku: STR_REQUIRED,
    price: PHONE_REQ,
    quantity: PHONE_REQ,
    category: STR_REQUIRED,
    salesPrice: PHONE_REQ,
    salesStart: DATE_REQ,
    salesEnd: DATE_REQ,
    description: LONG_STR_REQUIRED,
  });

  return joiValidator({ req, res, next, schema });
};
