import { useEffect, useState } from 'react';

interface Props {
  message: string;
  loading: boolean;
}

export function LoadingMessage({ message, loading }: Props) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => (prev < 3 ? prev + 1 : 0));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return loading ? (
    <p>
      {message}
      {'.'.repeat(count)}
    </p>
  ) : null;
}
