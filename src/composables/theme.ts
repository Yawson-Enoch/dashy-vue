import { useColorMode } from '@vueuse/core';

export function useTheme() {
  const { store: theme, state: resolvedTheme } = useColorMode({
    initialValue: 'system',
  });

  return {
    theme,
    resolvedTheme,
  };
}
