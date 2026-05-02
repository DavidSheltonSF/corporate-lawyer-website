import casual from 'casual';

export class NotificationFieldsMocker {
  static mockTitle(): string {
    return casual.random_element([
      'Novo Processo Cadastrado',
      'Prazo dara a contestação expira em 7 dias',
    ]);
  }

  static mockMessage(): string {
    return casual.description;
  }
}
