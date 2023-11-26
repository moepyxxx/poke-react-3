"use client";

import { ControllerAction } from "@/features/adventure/types";
import { useCallback } from "react";

export type UseGameControllerOptions = {
  onControllerAct: (action: ControllerAction) => void;
};

/**
 * コントローラーの動作を制御する
 */
export const useGameController = ({
  onControllerAct,
}: UseGameControllerOptions) => {
  const onPushA = useCallback(() => {
    onControllerAct("onPushA");
  }, [onControllerAct]);

  // TODO
  const onPushB = useCallback(() => {
    onControllerAct("onPushB");
    console.log("pushB");
  }, [onControllerAct]);

  // TODO
  const onPushStart = useCallback(() => {
    onControllerAct("onPushStart");
    console.log("pushStart");
  }, [onControllerAct]);

  const onPushAbove = useCallback(() => {
    onControllerAct("onPushAbove");
  }, [onControllerAct]);

  const onPushBelow = useCallback(() => {
    onControllerAct("onPushBelow");
  }, [onControllerAct]);

  const onPushLeft = useCallback(() => {
    onControllerAct("onPushLeft");
  }, [onControllerAct]);

  const onPushRight = useCallback(() => {
    onControllerAct("onPushRight");
  }, [onControllerAct]);

  return {
    controllerOptions: {
      onPushA,
      onPushB,
      onPushStart,
      onPushAbove,
      onPushBelow,
      onPushLeft,
      onPushRight,
    },
  };
};
