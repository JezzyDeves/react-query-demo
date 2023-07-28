import { useState } from "react";

export const useAsync = <TResult = unknown, TVariable = unknown>(
  fn: (variable: TVariable) => Promise<TResult>
) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TResult | undefined>();
  const [error, setError] = useState<Error | undefined>();

  async function execute(variable: TVariable) {
    try {
      setLoading(true);
      setError(undefined);

      const res = await fn(variable);
      setData(res);

      return res;
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
        return error;
      }

      const unhandledError = new Error("An error occurred");
      setError(unhandledError);
      return unhandledError;
    } finally {
      setLoading(false);
    }
  }

  return { execute, loading, data, error };
};
