import { useEffect, useState } from 'react';

interface Props {
  message?: string;
}

export function LoadingMessage({ message = 'Carregando' }: Props) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => (prev < 3 ? prev + 1 : 0));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <p>
      {message}
      {'.'.repeat(count)}
    </p>
  );
}
