import { subScreen } from "../LineScreen";

type Props<Key extends string | number> = {
  currentSelectKey: Key;
  selectableItems: {
    label: string;
    key: Key;
  }[];
};
export const MainSelectScreen = <Key extends string | number>({
  currentSelectKey,
  selectableItems,
}: Props<Key>) => {
  const isCurrentSelect = (key: Key) => key === currentSelectKey;

  return (
    <div className={subScreen()} style={{ width: "360px", height: "72px" }}>
      <div className="flex flex-wrap">
        {selectableItems.map(({ label, key }) => {
          return (
            <div key={key} className="w-1/2">
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
