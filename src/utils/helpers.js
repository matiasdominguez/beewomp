export const containsSpecialChars = str => {
  const specialChars = /[`!@#$%^&*()+=\[\]{};':"\\|,.<>\/?~]/;
  return specialChars.test(str);
}
