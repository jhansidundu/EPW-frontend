export const ALLOWED_ROUTES = new Map([
  [
    "admin",
    ["/admin/dashboard", "/admin/exams", "/admin/users", "/admin/settings"],
  ],
  [
    "teacher",
    [
      "/teacher/dashboard",
      "/teacher/exams",
      "/teacher/exams/add",
      /^\/teacher\/exams\/(\d+)\/questions$/,
      /^\/teacher\/exams\/(\d+)\/edit$/,
      /^\/teacher\/exams\/(\d+)\/enroll$/,
      /^\/teacher\/verify\/(.+)$/,
    ],
  ],
  [
    "student",
    [
      /^\/student\/enroll\/(.+)$/,
      "/student/dashboard",
      /^\/student\/exams\/(\d+)\/window$/,
      /^\/student\/exams\/(\d+)\/result$/,
      /^\/student\/verify\/(.+)$/,
    ],
  ],
]);
