import casual from 'casual';

export class UserFieldsMocker {
  static mockName(): string {
    return casual.first_name;
  }

  static mockEmail(): string {
    return casual.email.toLowerCase();
  }

  static mockPhone(): string {
    return casual.phone.toLowerCase();
  }

  static mockCpf(): string {
      let cpf = '';
      for (let i = 0; i < 11; i++) {
        cpf += casual.integer(0, 9).toString();
      }

      return cpf;
  }

  static mockPassword(): string {
    return casual.random_element(['Ja#32588', 'vRUIA@24949446S4466SSSFAGA']);
  }
}
