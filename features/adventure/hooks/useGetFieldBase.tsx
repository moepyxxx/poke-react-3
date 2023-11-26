import { FieldMaterial } from "@/features/adventure/types";
import Image from "next/image";

export const useGetFieldBase = () => {
  return function useGetFieldBase(base: FieldMaterial["base"]) {
    return (
      // altちゃんとつける
      <Image src={`/base/${base}.svg`} width={24} height={24} alt="アイコン" />
    );
  };
};
