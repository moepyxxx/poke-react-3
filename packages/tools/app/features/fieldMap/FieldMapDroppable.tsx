import { useDroppable } from "@dnd-kit/core";
import { FieldBase, FieldObject } from "@types";
import { FC } from "react";

type Props = {
  id: string;
  fieldParts: {
    base: FieldBase;
    objects?: FieldObject[];
  };
};
export const FieldMapDroppable: FC<Props> = ({ id, fieldParts }) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`w-10 relative h-10 m-1 cursor-pointer text-xs ${
        isOver ? "opacity-25" : ""
      }`}>
      <picture>
        <img
          className="absolute top-0 left-0"
          width={36}
          height={36}
          src={require(`@masters/images/base/${fieldParts.base}.svg`).default}
          alt="base"
        />
      </picture>
      {fieldParts.objects &&
        fieldParts.objects.length > 0 &&
        fieldParts.objects.map((object, index) => {
          switch (object.type) {
            case "ornament":
              return (
                <picture key={`ornament_${id}_${index}`}>
                  <img
                    className="absolute top-0 left-0"
                    width={36}
                    height={36}
                    src={
                      require(`@masters/images/ornament/${object.ornamentType}.svg`)
                        .default
                    }
                    alt="ornament"
                  />
                </picture>
              );
            default:
              return <div key={`other_${index}`}></div>;
          }
        })}
    </div>
  );
};
