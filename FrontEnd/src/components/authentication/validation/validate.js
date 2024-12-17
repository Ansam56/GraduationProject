import * as yup from "yup";

// export const validationSchema = yup.object({
//   userName: yup
//     .string()
//     .required("user name is required")
//     .min(3, "userName must be at least 3 character")
//     .max(30, "max is 30"),
//   email: yup.string().required("email is required").email(),
//   password: yup
//     .string()
//     .required("password is required")
//     .min(3, "password must be at least 3 digits")
//     .max(30, "max is 30"),
// });
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
  .min(8, "يجب ادخال 8 أحرف على الاقل")
  .max(30, "يجب ادخال 30 حرف كحد أقصى"),
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
    .min(8, "يجب ادخال 8 أحرف على الاقل")
    .max(30, "يجب ادخال 30 حرف كحد أقصى"),
 cpassword: yup
    .string()
    .required("يجب ادخال كلمة المرور*")
    .min(8, "يجب ادخال 8 أحرف على الاقل")
    .max(30, "يجب ادخال 30 حرف كحد أقصى")
    .oneOf([yup.ref("password"), null], "يجب ان تتوافق الكلمة مع الكلمة "),

  code: yup
    .string()
    .required(" يجب ادخال الرمز*")
    .length(5, "يجب أن يتكون الرمز من 5 أرقام"),
});

export const AddNewAchaievementSchema = yup.object({
  creationDate:yup.date().required("يرجى ادخال تاريخ الانشاء"),
  achievementType: yup.string().required("يرجى تحديد نوع الانجاز"),
  startSurah:yup.string().required("يرجى اختيار السورة"),
  endSurah: yup.string().required("يرجى اختيار السورة"),
  // pageCount:yup.string().required("يرجى ادخال عدد الصفحات المنجزة"),
  // rating: '',
  startVerse: yup.number().required("يرجى اختيار رقم آية البدء"),
  endVerse:yup.number().required("يرجى اختيار رقم آية الانتهاء"),
   
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

const PHONE_NUMBER_REGEX = /^((\970)|(\972))?[0-9]{9}$/;
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
  idNumber: yup
    .string()
    .required("يجب ادخال رقم الهوية")
    .min(9, "رقم الهوية يجب أن يكون من تسعة أرقام")
    .max(9, "رقم الهوية يجب أن يكون من تسعة أرقام"),
  email: yup
    .string()
    .required("يجب ادخال البريد الالكتروني")
    .email("الرجاء إدخال بريد إلكتروني صالح"),
  phonePrefix: yup
    .string()
    .required("مقدمة الهاتف مطلوبة")
    .oneOf(["+970", "+972"], "مقدمة الهاتف غير صالحة"),
  phone: yup
    .string()
    .matches(PHONE_NUMBER_REGEX, "رقم الجوال غير صالح")
    .required("يجب إدخال رقم الجوال"),
  password: yup
    .string()
    .required("يجب إدخال كلمة المرور")
    .min(8, "كلمة السر قصيرة جداً - يجب أن تتكون من 8 أحرف على الأقل")
    .max(30, "كلمة السر طويلة جداً - الحد الأقصى 30 حرفاً")
    .matches(
      /[A-Z]/,
      "كلمة السر يجب أن تحتوي على حرف كبير واحد على الأقل (Uppercase)"
    )
    .matches(
      /[a-z]/,
      "كلمة السر يجب أن تحتوي على حرف صغير واحد على الأقل (Lowercase)"
    )
    .matches(/\d/, "كلمة السر يجب أن تحتوي على رقم واحد على الأقل")
    .matches(
      /[@$!%*?&]/,
      "كلمة السر يجب أن تحتوي على حرف خاص واحد على الأقل (مثل: @, $, !, %, *, ?, &)"
    ),

  cpassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "يجب أن تتطابق كلمتا السر")
    .required("يجب أدخال تأكيد كلمة المرور"),
  gender: yup.string().required("يجب ادخال الجنس"),
  country: yup.string().required("يجب ادخال المدينة"),
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

  schoolPhoto: yup
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

  schoolInfo: yup
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
  id: yup
    .string()
    .required("يجب ادخال رقم الهوية")
    .min(9, "رقم الهوية يجب أن يكون من تسعة أرقام")
    .max(9, "رقم الهوية يجب أن يكون من تسعة أرقام"),
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
  city: yup.string().required("يجب ادخال المدينة"),
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
  id: yup
    .string()
    .required("يجب ادخال رقم الهوية")
    .min(9, "رقم الهوية يجب أن يكون من تسعة أرقام")
    .max(9, "رقم الهوية يجب أن يكون من تسعة أرقام"),
  email: yup
    .string()
    .required("يجب ادخال البريد الالكتروني")
    .email("الرجاء إدخال بريد إلكتروني صالح"),
  city: yup.string().required("يجب ادخال المدينة"),
  birthDate: yup.date().required("يجب ادخال تاريخ الميلاد"),
  phonePrefix: yup
    .string()
    .required("مقدمة الهاتف مطلوبة")
    .oneOf(["+970", "+972"], "مقدمة الهاتف غير صالحة"),
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
    .required("يجب ارفاق السيرة الذاتية")
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
    .required("يجب ادخال اسم الحلقة")
    .min(3, "اسم الحلقة يجب أن يكون على الأقل 3 أحرف")
    .max(100, "اسم الحلقة لا يمكن أن يزيد عن 100 حرف"),

  days: yup
    .array()
    .min(1, "يجب اختيار يوم واحد على الأقل")
    .required("الأيام مطلوبة"),
  startTime: yup
    .string()
    .required("يجب ادخال وقت البدء")
    .matches(
      /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
      "الرجاء إدخال وقت صالح بصيغة HH:MM"
    ),

  endTime: yup
    .string()
    .required("يجب ادخال وقت الانتهاء")
    .matches(
      /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
      "الرجاء إدخال وقت صالح بصيغة HH:MM"
    )
    .test(
      "isLater",
      "يجب أن يكون وقت الانتهاء بعد وقت البدء",
      function (value) {
        const { startTime } = this.parent;
        return startTime && value && startTime < value;
      }
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
export const PostFormSchema = yup.object().shape({
  postTitle: yup
    .string()
    .required("يرجى تعبئة عنوان الخبر")
    .min(5, "يجب أن يكون العنوان 5 أحرف على الأقل"),
  postContent: yup.string().required("يرجى تعبئة تفاصيل الخبر"),
});
export const CertificateFormSchema = yup.object().shape({
  certificateTitle: yup
    .string()
    .required("يرجى تعبئة عنوان الشهادة")
    .min(5, "يجب أن يكون العنوان 5 أحرف على الأقل"),
  certificatePicture: yup
    .mixed()
    .required("يرجى رفع صورة الشهادة")
    .test(
      "fileType",
      "يجب أن تكون الصورة بتنسيق JPG أو PNG",
      (value) =>
        value &&
        (typeof value === "string" ||
          ["image/jpeg", "image/png"].includes(value.type))
    ),
});
