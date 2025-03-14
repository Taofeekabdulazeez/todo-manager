import { useActionState, useEffect } from "react";

interface UseMutationActionParams<T> {
  initialState: Awaited<T>;
  actionFn: (data: Awaited<T>) => Promise<T>;
  onSuccess?: (data?: T) => void;
}

export function useMutationAction<T>({
  actionFn,
  initialState,
  onSuccess,
}: UseMutationActionParams<T>) {
  const [state, action, isPending] = useActionState(actionFn, initialState);

  useEffect(() => {
    if (!state) return;

    onSuccess?.(state);
  }, [state, onSuccess]);

  return { action, isPending, state };
}
