import { useAtom } from "jotai";
import { Field } from "../components/Field";
import { currentLocationAtom } from "@/atoms/currentLocation";
import { FIELD_MIDDLE_POSITION } from "../datas/sample";
import { useRouter } from "next/navigation";

export const FieldView = ({ field }: { field: string }) => {
  const router = useRouter();
  const [currentLocation, setCurrentLocation] = useAtom(currentLocationAtom);
  if (!currentLocation) {
    setCurrentLocation({
      field: field,
      position: { x: 1 + FIELD_MIDDLE_POSITION, y: 1 + FIELD_MIDDLE_POSITION },
      direction: "below",
    });
    router.refresh();
    return;
  }

  return (
    <Field
      field={field}
      initialDirection={currentLocation.direction}
      initialPosition={currentLocation.position}
    />
  );
};
