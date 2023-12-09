import { FieldDirection } from "@/features/adventure/types";
import Image from "next/image";

export const useGetBoyDirection = () => {
  return function useGetBoyDirection(direction: FieldDirection) {
    return (
      // altちゃんとつける
      <Image
        priority
        src={`/person/boy/${direction}.svg`}
        height={24}
        width={24}
        alt="Follow us on Twitter"
      />
    );
  };
};
