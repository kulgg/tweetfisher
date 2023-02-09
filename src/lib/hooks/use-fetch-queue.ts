import { useState, useRef, useEffect } from "react";

export type UseFetchQueueProps<T> = {
  urlQueue: T[];
  setUrlQueue: React.Dispatch<React.SetStateAction<T[]>>;
  invalidateCanary: string;
  urlAccessor: (t: T) => string;
  action: (response: Response, invalidates: boolean, current: T) => void;
};

const useFetchQueue = <T>({
  urlQueue,
  setUrlQueue,
  invalidateCanary,
  urlAccessor,
  action,
}: UseFetchQueueProps<T>) => {
  const [requestsPerSecond, setRequestsPerSecond] = useState(1);
  const intervalId = useRef<string | NodeJS.Timer | number | null>(null);
  const queueRef = useRef(urlQueue);
  const canaryRef = useRef(invalidateCanary);
  const requestsPerSecondRef = useRef(requestsPerSecond);
  console.log("rqps", requestsPerSecond);

  useEffect(() => {
    queueRef.current = urlQueue;
  }, [urlQueue]);

  useEffect(() => {
    canaryRef.current = invalidateCanary;
  }, [invalidateCanary]);

  useEffect(() => {
    if (
      urlQueue.length === 0 ||
      (intervalId.current && requestsPerSecondRef.current === requestsPerSecond)
    ) {
      return;
    }
    if (intervalId.current) {
      clearInterval(intervalId.current);
    }

    intervalId.current = setInterval(() => {
      if (queueRef.current.length === 0) {
        console.log("clearing");
        clearInterval(intervalId.current!);
        intervalId.current = null;
        return;
      }
      const curr = queueRef.current[0]!;
      const tmp = canaryRef.current;
      setUrlQueue((prev) => prev.slice(1));

      console.log("Fetching", { curr });
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
    console.log("setting interval", intervalId.current);
  }, [urlQueue, requestsPerSecond]);

  useEffect(() => {
    console.log("useEffect mount enter");
    return () => {
      console.log("useEffect mount clear");
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
