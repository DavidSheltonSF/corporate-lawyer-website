export function isValidUserName(name: string) {
  const regex = /^[A-Za-zÀ-ÿ\s']{2,100}$/;
  return regex.test(name)
}
