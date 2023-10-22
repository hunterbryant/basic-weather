export function debounceInput<E extends Event>(
  func: (event: E) => void,
  waitFor: number
): (event: E) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (event: E): void => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => func(event), waitFor);
  };
}
