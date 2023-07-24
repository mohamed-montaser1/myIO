export default function emailValidation(email) {
  if (email == "") return false;

  let regexp = /^[^<>&"'!@#$%^+=]+(\.\w+)*\@[a-z]{3,}\.[a-z]{2,}/g;
  return regexp.test(email);
}
