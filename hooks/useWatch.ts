import { useEffect, useState } from "react";
import { isEqual } from "lodash";

/**
 * 変更があった場合のみcallbackを実行する
 */
export const useWatch = <T>(value: T, callback: (newValue: T) => void) => {
  const [prevState, setPrevState] = useState<T | null>(null);
  const [state, setState] = useState(value);

  useEffect(() => {
    if (isEqual(prevState, value)) {
      return;
    }

    setPrevState(state);
    setState(value);
    // setStateの実行が完了するまでにタイムラグがあるため
    // TODO: なんとかしたい
    setTimeout(() => callback(value), 100);
  }, [callback, value, prevState, state]);
  return state;
};
