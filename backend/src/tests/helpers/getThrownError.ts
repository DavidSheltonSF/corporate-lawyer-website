export function getThrownError(callBack: Function) {
  try {
    callBack();
    return null;
  } catch (error) {
    return error;
  }
}
