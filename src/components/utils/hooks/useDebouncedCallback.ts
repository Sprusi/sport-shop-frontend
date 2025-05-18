import { useMemo, useRef } from 'react';

import debounce from 'lodash/debounce';

import { DebounceSettings } from '@/dto/DebounceSettings';

export const useDebouncedCallback = <T extends (...args: any) => any>(
  fn: T,
  wait?: number,
  options?: DebounceSettings
) => {
  const refFn = useRef(fn);
  refFn.current = fn;
  const debouncedFn = useMemo(() => debounce((...args) => refFn.current(...args), wait, options), [wait, options]);

  return debouncedFn;
};
