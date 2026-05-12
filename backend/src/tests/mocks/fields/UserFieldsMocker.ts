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
    return casual.random_element(['15855855577', '225.558.115-55']);
  }

  static mockPassword(): string {
    return casual.random_element(['Ja#32588', 'vRUIA@24949446S4466SSSFAGA']);
  }
}
