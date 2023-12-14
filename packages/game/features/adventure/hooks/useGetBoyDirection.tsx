import { FieldDirection } from "@types";

export const useGetBoyDirection = () => {
  return function useGetBoyDirection(direction: FieldDirection) {
    return (
      // altちゃんとつける
      <picture>
        <img
          src={require(`@masters/images/person/hero/${direction}.svg`).default}
          width={24}
          height={24}
          alt="アイコン"
        />
      </picture>
    );
  };
};
