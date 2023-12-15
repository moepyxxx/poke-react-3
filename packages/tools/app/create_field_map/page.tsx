import { tv } from "tailwind-variants";
import NextLink from "next/link";
import { FieldObjectMap } from "@types";

const cell = tv({
  base: "border border-slate-700 px-4 py-2",
});

export const link = tv({
  base: "hover:text-blue-700 underline",
});

export default async function CreateFieldMapList() {
  const fieldObjectMaps: Record<string, FieldObjectMap> = await (
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/field_objects`)
  ).json();
  return (
    <>
      <h1 className="mb-4">フィールド一覧</h1>
      <table className="border-collapse border border-slate-700">
        <thead>
          <tr>
            <th className={cell()}>フィールド名</th>
            <th className={cell()}>フィールドキー</th>
            <th className={cell()} colSpan={3}>
              操作
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(fieldObjectMaps).map((key) => {
            return (
              <tr key={key}>
                <td className={cell()}>101ばん道路</td>
                <td className={cell()}>{key}</td>
                <td className={cell()}>
                  <NextLink
                    className={link()}
                    href={`/create_field_map/${key}`}>
                    詳細
                  </NextLink>
                </td>
                <td className={cell()}>
                  <NextLink
                    className={link()}
                    href={`/create_field_map/${key}/edit`}>
                    編集
                  </NextLink>
                </td>
                <td className={cell()}>
                  <button className={link()}>削除</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
