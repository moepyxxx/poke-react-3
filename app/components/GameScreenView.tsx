import {
  FieldBase,
  FieldDirection,
  FieldObject,
  FieldPosition,
  ShortFieldPosition,
} from "@/types";
import { FC } from "react";
import { motion } from "framer-motion";
import { useGetFieldBase } from "@/app/hooks/useGetFieldBase";
import { useGetFieldObject } from "@/app/hooks/useGetFieldObject";
import { useGetBoyDirection } from "@/app/hooks/useGetBoyDirection";

type Props = {
  fieldSize: number;
  fieldAllTileCount: number;
  fieldVisibleTileCount: number;
  fieldObjects: Record<
    ShortFieldPosition,
    {
      base: FieldBase;
      objects?: FieldObject[];
    }
  >;
  currentFieldPosition: FieldPosition;
  currentFieldDirection: FieldDirection;
};
export const GameScreenView: FC<Props> = ({
  fieldSize,
  fieldAllTileCount,
  fieldVisibleTileCount,
  currentFieldPosition,
  fieldObjects,
  currentFieldDirection,
}) => {
  const getFieldBase = useGetFieldBase();
  const getFieldObject = useGetFieldObject();
  const getBoyDirection = useGetBoyDirection();

  return (
    <div className="flex justify-center items-center relative overflow-hidden">
      <motion.div
        initial={false}
        className="flex flex-wrap justify-center items-center relative"
        style={{
          width: `${fieldSize * fieldAllTileCount}px`,
          height: `${fieldSize * fieldAllTileCount}px`,
        }}
        transition={{
          duration: 0.3,
          ease: "linear",
        }}
        animate={{
          x:
            fieldSize *
            (fieldAllTileCount -
              fieldVisibleTileCount -
              currentFieldPosition.x +
              1),
          y:
            fieldSize *
            (fieldAllTileCount -
              fieldVisibleTileCount -
              currentFieldPosition.y +
              1),
        }}>
        {Object.keys(fieldObjects).map((position) => {
          const material = fieldObjects[position as ShortFieldPosition];
          return (
            <span
              key={position}
              className={`inline-block relative`}
              style={{
                width: `${fieldSize}px`,
                height: `${fieldSize}px`,
              }}>
              <div className="absolute">{getFieldBase(material.base)}</div>
              {material.objects &&
                material.objects.map((object, index) => {
                  return (
                    <div className="absolute" key={index}>
                      {getFieldObject(object)}
                    </div>
                  );
                })}
            </span>
          );
        })}
        <motion.div
          initial={false}
          className="absolute"
          transition={{
            duration: 0.3,
            ease: "linear",
          }}
          animate={{
            x: fieldSize * (currentFieldPosition.x - fieldVisibleTileCount),
            y: fieldSize * (currentFieldPosition.y + -fieldVisibleTileCount),
          }}>
          {getBoyDirection(currentFieldDirection)}
        </motion.div>
      </motion.div>
      <div
        className="absolute"
        style={{ width: 120, height: 120, border: "24px solid gray" }}
      />
    </div>
  );
};
