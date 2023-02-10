import { useState, useRef, useEffect } from "react";

export type UseFetchQueueProps<T> = {
  queue: T[];
  setQueue: React.Dispatch<React.SetStateAction<T[]>>;
  invalidateCanary: string;
  urlAccessor: (t: T) => string;
  action: (response: Response, invalidates: boolean, current: T) => void;
};

const useFetchQueue = <T>({
  queue,
  setQueue,
  invalidateCanary,
  urlAccessor,
  action,
}: UseFetchQueueProps<T>) => {
  const [requestsPerSecond, setRequestsPerSecond] = useState(1);
  const intervalId = useRef<string | NodeJS.Timer | number | null>(null);
  const queueRef = useRef(queue);
  const canaryRef = useRef(invalidateCanary);
  const requestsPerSecondRef = useRef(requestsPerSecond);

  useEffect(() => {
    queueRef.current = queue;
  }, [queue]);

  useEffect(() => {
    canaryRef.current = invalidateCanary;
  }, [invalidateCanary]);

  useEffect(() => {
    if (
      queue.length === 0 ||
      (intervalId.current && requestsPerSecondRef.current === requestsPerSecond)
    ) {
      return;
    }
    if (intervalId.current) {
      clearInterval(intervalId.current);
    }

    intervalId.current = setInterval(() => {
      if (queueRef.current.length === 0) {
        clearInterval(intervalId.current!);
        intervalId.current = null;
        return;
      }
      const curr = queueRef.current[0]!;
      const tmp = canaryRef.current;
      setQueue((prev) => prev.slice(1));

      const url = urlAccessor(curr);
      if (url) {
        fetch(url)
          .then((response) => action(response, canaryRef.current !== tmp, curr))
          .catch((error) => {
            console.error(`Error fetching url: ${curr}`);
          });
      }
    }, 1000 / requestsPerSecond);
    requestsPerSecondRef.current = requestsPerSecond;
  }, [queue, requestsPerSecond]);

  useEffect(() => {
    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
      intervalId.current = null;
    };
  }, []);

  return {
    requestsPerSecond,
    setRequestsPerSecond,
  };
};

export default useFetchQueue;
