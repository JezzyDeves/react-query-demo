import { useMutation } from "@tanstack/react-query";
import create from "../services/create";
import { useTextStore } from "../stores/useTextsStore";

export const useCreateText = () => {
  const textStore = useTextStore();
  const { error, isLoading, mutate } = useMutation<void, Error, string>({
    mutationFn: execute,
  });

  async function execute(text: string): Promise<void> {
    const res = await create({ text });

    textStore.addText(res.text);
  }

  return { mutate, isLoading, error };
};
