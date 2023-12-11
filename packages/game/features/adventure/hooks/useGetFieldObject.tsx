import { FieldMaterial } from "@types";
import Image from "next/image";

export const useGetFieldObject = () => {
  return function useGetFieldObject(
    object: NonNullable<FieldMaterial["objects"]>[number]
  ) {
    // altちゃんとつける
    switch (object.type) {
      case "person":
        return (
          <Image
            priority
            src={`/person/object/${object.personType}.svg`}
            height={24}
            width={24}
            alt="Follow us on Twitter"
          />
        );
      case "ornament":
        return (
          <Image
            priority
            src={`/ornament/${object.ornamentType}.svg`}
            height={24}
            width={24}
            alt="Follow us on Twitter"
          />
        );
      default:
        return <></>;
    }
  };
};
