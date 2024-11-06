import * as yup from "yup";

export const validationSchema = yup.object({
  userName: yup
    .string()
    .required("user name is required")
    .min(3, "userName must be at least 3 character")
    .max(30, "max is 30"),
  email: yup.string().required("email is required").email(),
  password: yup
    .string()
    .required("password is required")
    .min(3, "password must be at least 3 digits")
    .max(30, "max is 30"),
});
//Done
export const loginSchema = yup.object({
  email: yup
    .string()
    .required("يجب ادخال البريد الاكتروني*")
    .email("يجب كتابة البريد الالكتروني بالصيغة الصحيحة")
    .min(6)
    .max(50),
  password: yup
    .string()
    .required("يجب ادخال كلمة المرور*")
    .min(8, "يجب ادخال 8 أحرف على الاقل"),
});
export const sendCodeSchema = yup.object({
  email: yup
    .string()
    .required("يجب ادخال البريد الاكتروني*")
    .email("يجب كتابة البريد الالكتروني بالصيغة الصحيحة"),
});

export const forgetPasswordSchema = yup.object({
  email: yup
    .string()
    .required("يجب ادخال البريد الاكتروني*")
    .email("يجب كتابة البريد الالكتروني بالصيغة الصحيحة"),
  password: yup
    .string()
    .required("يجب ادخال كلمة المرور*")
    .min(3, "يجب ادخال 3 أحرف على الاقل")
    .max(30, "يجب ادخال 30 حرف كحد أقصى"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "يجب ان تتوافق الكلمة مع الكلمة "),
  code: yup
    .string()
    .required(" يجب ادخال الرمز*")
    .length(4, "يجب أن يتكون الرمز من 4 أرقام"),
});
export const CreateorderSchema = yup.object({
  couponName: yup.string(),
  address: yup.string().required("Your Address is required"),
  phone: yup.string().required("Your Phone is required"),
});

// const CITIES = [
//   "القدس",
//   "رام الله",
//   "نابلس",
//   "الخليل",
//   "جنين",
//   "بيت لحم",
//   "أريحا",
//   "قلقيلية",
//   "طولكرم",
//   "سلفيت",
//   "غزة",
//   "رفح",
//   "خان يونس",
//   "جباليا",
//   "دير البلح",
// ];

const PHONE_NUMBER_REGEX = /^((\+970)|(\+972)|0)?5[0-9]{8}$/;
const FILE_SIZE = 1024 * 1024 * 5; // 5 MB
const SUPPORTED_DOC_FORMATS = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const managerFormSchema = yup.object({
  firstName: yup
    .string()
    .required("يجب ادخال الاسم الأول")
    .min(2, "الاسم الأول يجب أن يكون على الأقل من حرفين"),
  lastName: yup
    .string()
    .required("يجب ادخال اسم العائلة")
    .min(2, "اسم العائلة يجب أن يكون على الأقل من حرفين"),
  email: yup
    .string()
    .required("يجب ادخال البريد الالكتروني")
    .email("الرجاء إدخال بريد إلكتروني صالح"),
  birthDate: yup.date().required("يجب ادخال تاريخ الميلاد"),
  phone: yup
    .string()
    .matches(PHONE_NUMBER_REGEX, "رقم الجوال غير صالح")
    .required("يجب إدخال رقم الجوال"),
  password: yup
    .string()
    .required("يجب ادخال كلمة المرور")
    .min(8, "كلمة السر قصيرة جدا")
    .max(30, "كلمة السر طويلة جداً"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "يجب أن تتطابق كلمتا السر")
    .required("يجب أدخال تأكيد كلمة المرور"),
  gender: yup.string().required("يجب ادخال الجنس"),
  city: yup.string().required("المدينة مطلوبة"),
});

export const schoolFormSchema = yup.object().shape({
  schoolName: yup
    .string()
    .required("اسم المدرسة مطلوب")
    .min(3, "اسم المدرسة يجب أن يكون على الأقل 3 أحرف")
    .max(100, "اسم المدرسة لا يمكن أن يزيد عن 100 حرف"),

  address: yup
    .string()
    .required("العنوان مطلوب")
    .min(5, "العنوان يجب أن يكون على الأقل 5 أحرف")
    .max(200, "العنوان لا يمكن أن يزيد عن 200 حرف"),

  logo: yup
    .mixed()
    .nullable()
    .test("fileSize", "حجم الملف كبير جدًا", (value) => {
      return !value || value.size <= 1024 * 1024;
    })
    .test("fileType", "نوع الملف غير مدعوم", (value) => {
      return (
        !value || ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
      );
    }),

  officialDocument: yup
    .mixed()
    .nullable()
    .test("fileSize", "حجم الملف كبير جدًا", (value) => {
      return !value || value.size <= FILE_SIZE;
    })
    .test("fileFormat", "نوع الملف غير مدعوم", (value) => {
      return !value || SUPPORTED_DOC_FORMATS.includes(value.type);
    }),
});

export const studentFormSchema = yup.object({
  firstName: yup
    .string()
    .required("يجب ادخال الاسم الأول")
    .min(2, "الاسم الأول يجب أن يكون على الأقل من حرفين"),
  lastName: yup
    .string()
    .required("يجب ادخال اسم العائلة")
    .min(2, "اسم العائلة يجي أن يكون على الأقل من حرفين"),
  email: yup
    .string()
    .required("يجب ادخال البريد الالكتروني")
    .email("الرجاء إدخال بريد إلكتروني صالح"),
  birthDate: yup.date().required("يجب ادخال تاريخ الميلاد"),
  gender: yup.string().required("يجب ادخال الجنس"),
  password: yup
    .string()
    .required("يجب ادخال كلمة المرور")
    .min(8, "كلمة السر قصيرة جدا")
    .max(30, "كلمة السر طويلة جداً"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "يجب أن تتطابق كلمتا السر")
    .required("يجب أدخال تأكيد كلمة المرور"),
  city: yup.string().required("المدينة مطلوبة"),
});

export const teacherFormSchema = yup.object({
  firstName: yup
    .string()
    .required("يجب ادخال الاسم الأول")
    .min(2, "الاسم الأول يجب أن يكون على الأقل من حرفين"),
  lastName: yup
    .string()
    .required("يجب ادخال اسم العائلة")
    .min(2, "اسم العائلة يجب أن يكون على الأقل من حرفين"),
  email: yup
    .string()
    .required("يجب ادخال البريد الالكتروني")
    .email("الرجاء إدخال بريد إلكتروني صالح"),
  birthDate: yup.date().required("يجب ادخال تاريخ الميلاد"),
  phone: yup
    .string()
    .matches(PHONE_NUMBER_REGEX, "رقم الجوال غير صالح")
    .required("يجب إدخال رقم الجوال"),
  password: yup
    .string()
    .required("يجب ادخال كلمة المرور")
    .min(8, "كلمة السر قصيرة جدا")
    .max(30, "كلمة السر طويلة جداً"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "يجب أن تتطابق كلمتا السر")
    .required("يجب أدخال تأكيد كلمة المرور"),
  gender: yup.string().required("يجب ادخال الجنس"),

  resume: yup
    .mixed()
    .required("يجب رفع السيرة الذاتية")
    .test("fileSize", "حجم الملف كبير جدًا", (value) => {
      return value && value.size <= FILE_SIZE;
    })
    .test("fileFormat", "نوع الملف غير مدعوم", (value) => {
      return value && SUPPORTED_DOC_FORMATS.includes(value.type);
    }),
});

export const circleFormSchema = yup.object().shape({
  circleName: yup
    .string()
    .required("اسم الحلقة مطلوب")
    .min(3, "اسم الحلقة يجب أن يكون على الأقل 3 أحرف")
    .max(100, "اسم الحلقة لا يمكن أن يزيد عن 100 حرف"),

  days: yup
    .array()
    .min(1, "يجب اختيار يوم واحد على الأقل")
    .required("الأيام مطلوبة"),

  timing: yup
    .string()
    .required("التوقيت مطلوب")
    .matches(
      /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
      "الرجاء إدخال وقت صالح بصيغة HH:MM"
    ),

  image: yup
    .mixed()
    .nullable()
    .test("fileSize", "حجم الملف كبير جدًا", (value) => {
      return !value || value.size <= 1024 * 1024;
    })
    .test("fileType", "نوع الملف غير مدعوم", (value) => {
      return (
        !value || ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
      );
    }),
});
