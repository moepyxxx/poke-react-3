import { FieldMaterial } from "@types";

export const useGetFieldBase = () => {
  return function useGetFieldBase(base: FieldMaterial["base"]) {
    return (
      <picture>
        <img
          src={require(`@masters/images/base/${base}.svg`).default}
          width={24}
          height={24}
          alt="アイコン"
        />
      </picture>
    );
  };
};
