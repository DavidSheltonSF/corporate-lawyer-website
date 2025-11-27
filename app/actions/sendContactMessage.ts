'use server';

export async function sendContactMessage(formData: FormData) {
  const firstName = formData.get('firstName');
  const secondName = formData.get('secondName');
  const email = formData.get('email');
  const message = formData.get('message');
  console.log(firstName);
  console.log(secondName);
  console.log(email);
  console.log(message);
}
