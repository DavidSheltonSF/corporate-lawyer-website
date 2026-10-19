export function isEmailValid(email: string) {
  return /^[^\s@]+@[^\s@]+\.com+$/.test(email);
}
