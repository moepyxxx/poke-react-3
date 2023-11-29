import { useEffect, useRef, useState } from "react";
import { isEqual } from "lodash";

/**
 * 変更があった場合のみcallbackを実行する
 */
export const useWatch = <T>(value: T, callback: (newValue: T) => void) => {
  const prevValue = useRef<T | undefined>();

  useEffect(() => {
    if (isEqual(prevValue.current, value)) {
      return;
    }

    prevValue.current = value;

    // setStateの実行が完了するまでにタイムラグがあるため
    // TODO: なんとかしたい
    setTimeout(() => callback(value), 100);
  }, [callback, value, prevValue]);

  return "hoge";
};
