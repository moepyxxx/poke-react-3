import { FieldMaterial } from "@types";

export const useGetFieldObject = () => {
  return function useGetFieldObject(
    object: NonNullable<FieldMaterial["objects"]>[number]
  ) {
    // altちゃんとつける
    switch (object.type) {
      case "person":
        return (
          <picture>
            <img
              src={
                require(`@masters/images/person/${object.personType}.svg`)
                  .default
              }
              width={24}
              height={24}
              alt="アイコン"
            />
          </picture>
        );
      case "ornament":
        return (
          <picture>
            <img
              src={
                require(`@masters/images/ornament/${object.ornamentType}.svg`)
                  .default
              }
              width={24}
              height={24}
              alt="アイコン"
            />
          </picture>
        );
      default:
        return <></>;
    }
  };
};
