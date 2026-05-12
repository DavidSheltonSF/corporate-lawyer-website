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
    const firstSlice = casual.random_element([1000, 9999]);
    const secondSlice = casual.random_element([10000, 99999]);
    const thirdSlice = casual.random_element([10000, 99999]);
    return `${firstSlice}${secondSlice}${thirdSlice}`;
  }

  static mockPassword(): string {
    return casual.random_element(['Ja#32588', 'vRUIA@24949446S4466SSSFAGA']);
  }
}
