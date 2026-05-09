import { WithId } from '@/types/WithId';
import { FieldValue } from '../../FieldValue';
import { SafeUser } from '@/types/SafeUser';
import { Card } from '../../ui/Card/Card';

interface Props {
  clientData: WithId<SafeUser>;
  openClientModal: Function;
  openOptionsModal: Function;
}

export function ClientCard({ clientData, openClientModal, openOptionsModal }: Props) {
  const { firstName, lastName, email, cpf } = clientData;

  return (
    <Card openModal={openClientModal} openOptionsModal={openOptionsModal}>
      <h1>
        {firstName} {lastName}
      </h1>
      <FieldValue field="Nome" value={firstName} />
      <FieldValue field="Sobrenome" value={lastName} />
      <FieldValue field="Email" value={email} />
      <FieldValue field="CPF" value={cpf} />
    </Card>
  );
}
