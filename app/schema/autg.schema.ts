// Validation schema using yup
import * as yup from "yup";

const signupSchema = yup.object().shape({
    name: yup
        .string()
        .required("Name is required")
        .min(2, "Name must be at least 2 characters"),
    email: yup
        .string()
        .required("Email is required")
        .email("Invalid email format"),
    phone: yup
        .string()
        .required("Phone number is required")
        .matches(/^\+\d{10,15}$/, "Phone number must be in E.164 format"),
    password: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
    confirmPassword: yup
        .string()
        .required("Confirm password is required")
        .oneOf([yup.ref("password"), ""], "Passwords must match"),
    terms: yup
        .boolean()
        .required("You must accept the terms and conditions")
        .oneOf([true], "You must accept the terms and conditions"),
    privacy: yup
        .boolean()
        .required("You must accept the privacy policy")
        .oneOf([true], "You must accept the privacy policy"),
    marketing: yup
        .boolean()
        .required("You must accept the marketing policy")
        .oneOf([true], "You must accept the marketing policy"),
});

const loginSchema = yup.object().shape({
  identifier: yup
    .string()
    .required("Email or phone number is required")
    .test("is-email-or-phone", "Invalid email or phone number", value => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^\+\d{10,15}$/; // E.164 format
      return emailRegex.test(value) || phoneRegex.test(value);
    }),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export { loginSchema, signupSchema };