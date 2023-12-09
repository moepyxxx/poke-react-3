import { tv } from "tailwind-variants";

export const selectScreen = tv({
  base: "absolute right-2 border-2 border-black p-2",
});

type Props<Key extends string | number> = {
  currentSelectKey: Key;
  selectableItems: {
    label: string;
    key: Key;
  }[];
};

export const SubSelectScreen = <Key extends string | number>({
  currentSelectKey,
  selectableItems,
}: Props<Key>) => {
  const isCurrentSelect = (key: Key) => key === currentSelectKey;

  return (
    <div
      className={selectScreen()}
      style={{ width: "120px", height: "72px", bottom: "88px" }}>
      <div className="flex flex-wrap">
        {selectableItems.map(({ label, key }) => {
          return (
            <div key={key} className="w-full">
              <p>
                <span className="inline-block w-5">
                  {isCurrentSelect(key) ? "▶️" : ""}
                </span>
                {label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
