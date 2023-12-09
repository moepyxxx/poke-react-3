import {
  FieldBase,
  FieldDirection,
  FieldObject,
  FieldPosition,
  ShortFieldPosition,
} from "@/features/adventure/types";
import { FC } from "react";
import { motion } from "framer-motion";
import { useGetFieldBase } from "@/features/adventure/hooks/useGetFieldBase";
import { useGetFieldObject } from "@/features/adventure/hooks/useGetFieldObject";
import { useGetBoyDirection } from "@/features/adventure/hooks/useGetBoyDirection";

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
export const FieldScreen: FC<Props> = ({
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
    <div className="relative w-20 h-20 my-20 mx-auto">
      <div
        className="flex justify-center items-center absolute overflow-hidden"
        style={{
          top: "-24px",
          left: "-24px",
        }}>
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
          style={{
            width: fieldAllTileCount * 24,
            height: fieldAllTileCount * 24,
            border: "24px solid #e5e5e5",
          }}
        />
      </div>
    </div>
  );
};
