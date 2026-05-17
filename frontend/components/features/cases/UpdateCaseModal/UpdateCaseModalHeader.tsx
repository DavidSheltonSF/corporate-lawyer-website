import { RequestFeedback } from '@/components/ui/Feedback/RequestFeedback';
import { RequestState } from '@/types/RequestState';

interface Props {
  requestState: RequestState | null;
}

export function UpdateCaseModalHeader({ requestState }: Props) {
  return (
    <header className="flex flex-col items-center">
      <div className="">
        <h2>Alterar Processo</h2>
      </div>
      <div className="flex justify-center items-center h-[40px] w-full">
        <RequestFeedback requestState={requestState} />
      </div>
    </header>
  );
}
