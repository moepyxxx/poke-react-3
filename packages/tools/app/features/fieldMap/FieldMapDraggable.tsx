import { useDraggable } from "@dnd-kit/core";

type Props = {
  children: React.ReactNode;
  id: string;
  dataKey: string;
};
export const FieldMapDraggable: React.FC<Props> = ({
  children,
  id,
  dataKey,
}) => {
  const { setNodeRef, listeners, attributes, transform } = useDraggable({
    id: `${dataKey}_${id}`,
    data: {
      key: `${dataKey}_${id}`,
    },
  });

  const transformStyle = transform
    ? `translate(${transform.x}px, ${transform.y}px)`
    : undefined;

  const dataPath = dataKey === "base" ? "base" : "ornament";
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        transform: transformStyle,
        height: "fit-content",
      }}
      className="w-10 h-10 m-3 cursor-pointer bg-neutral-200">
      <picture>
        <img
          width={36}
          height={36}
          src={require(`@masters/images/${dataPath}/${children}.svg`).default}
          alt="base"
        />
      </picture>
    </div>
  );
};
