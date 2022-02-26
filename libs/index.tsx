import useSWR, { Key } from "swr";

class SWRError extends Error {
  info: any | undefined;
  status: number | undefined;
}
export const fetcher = async (url: RequestInfo) => {
  const res = await fetch(url);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new SWRError("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

export function useSWRPrime(url: Key) {
  const { data, error } = useSWR(url, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function generateNumber(from: number, to: number) {
  let numbers = [];
  for (let i = from; i <= to; i++) {
    console.log("generate:", i);
    numbers.push(i);
  }
  return numbers;
}

