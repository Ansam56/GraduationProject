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
/*
 creationDate: '',
    achievementType: '',
    startSurah: '',
    endSurah: '',
    rating: 0, // Default value for Rating
    startVers: '',
    endVers: '',
    note: '',
*/
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
    .required("يجب ادخال تأكيد كلمة المرور"),

  code: yup
    .string()
    .required(" يجب ادخال الرمز*")
    .length(5, "يجب أن يتكون الرمز من 5 أرقام"),
});

export const AddNewAchaievementSchema = yup.object({
  creationDate: yup.date().required("يرجى ادخال تاريخ الانشاء"),
  achievementType: yup.string().required("يرجى تحديد نوع الانجاز"),
  startSurah: yup.string().required("يرجى اختيار السورة"),
  endSurah: yup.string().required("يرجى اختيار السورة"),
  startVers: yup.number().required("يرجى اختيار رقم آية البدء"),
  endVers: yup.number().required("يرجى اختيار رقم آية الانتهاء"),
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
//schoolAdmin profile(المعلومات الشخصية)
//تعدييييل ناقص صورة
export const schoolAdminDataSchema = yup.object({
  phonePrefix: yup.string().oneOf(["+970", "+972"], " اختر +972 أو +970"),
  phone: yup.string().matches(PHONE_NUMBER_REGEX, "رقم الجوال غير صالح"),
  // profilePicture: yup
  // .mixed()
  // .nullable()
  // .test("fileSize", "حجم الملف كبير جدًا", (value) => {
  //   return !value || value.size <= 5*1024*1024; // الحد الأقصى للحجم هو 1MB
  // })
  // .test("fileType", "نوع الملف غير مدعوم", (value) => {
  //   return !value || ["image/jpeg", "image/png", "image/jpg"].includes(value.type); // الأنواع المدعومة
  // }),
});
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
    .required("يجب ادخال تأكيد كلمة المرور"),
  gender: yup.string().required("يجب ادخال الجنس"),
  country: yup.string().required("يجب ادخال المدينة"),
});
//schoolAdmin profile(معلومات المدرسة)
//تعديييييل ناقص صورة 
export const schoolDataSchema = yup.object({
  schoolName: yup
    .string()
    .min(3, "اسم المدرسة يجب أن يكون على الأقل 3 أحرف")
    .max(100, "اسم المدرسة لا يمكن أن يزيد عن 100 حرف"),

  address: yup
    .string()
    .min(5, "العنوان يجب أن يكون على الأقل 5 أحرف")
    .max(200, "العنوان لا يمكن أن يزيد عن 200 حرف"),
});

export const teacherDataSchema= yup.object({
  phonePrefix: yup
  .string()
  .required("مقدمة الهاتف مطلوبة")
  .oneOf(["+970", "+972"], "مقدمة الهاتف غير صالحة"),
phone: yup
  .string()
  .matches(PHONE_NUMBER_REGEX, "رقم الجوال غير صالح")
  .required("يجب إدخال رقم الجوال"),
})

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
    .required("يجب ارفاق صورة للمدرسة ")
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
  idNumber: yup
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
  country: yup.string().required("يجب ادخال المدينة"),
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
  idNumber: yup
    .string()
    .required("يجب ادخال رقم الهوية")
    .min(9, "رقم الهوية يجب أن يكون من تسعة أرقام")
    .max(9, "رقم الهوية يجب أن يكون من تسعة أرقام"),
  email: yup
    .string()
    .required("يجب ادخال البريد الالكتروني")
    .email("الرجاء إدخال بريد إلكتروني صالح"),
  country: yup.string().required("يجب ادخال المدينة"),
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
  teacherInfo: yup
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

  circleType: yup.string().required("يجب اختيار نوع الحلقة"),

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

  logo: yup
    .mixed()
    .required("يجب ارفاق صورة للحلقة")
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
  title: yup
    .string()
    .required("يرجى تعبئة عنوان الخبر")
    .min(5, "يجب أن يكون العنوان 5 أحرف على الأقل"),
  subject: yup.string().required("يرجى تعبئة تفاصيل الخبر"),
});

export const ExamFormSchema = yup
  .object({
    studentId: yup.string().required("مطلوب اختيار الطالب"),
    surah: yup.string().nullable(),
    juz: yup.string().nullable(),
    level: yup.string().nullable(),
    examDate: yup.date().required("مطلوب تاريخ الامتحان"),
    examTime: yup.string().required("مطلوب وقت الامتحان"),
    zoomLink: yup.string(),
  })
  .test(
    "at-least-one",
    "يجب اختيار سورة أو جزء أو مستوى",
    (values) => values.surah || values.juz || values.level
  );
