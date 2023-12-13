import NextLink from "next/link";
export default function Home() {
  return (
    <>
      <h1 className="mb-4">ポケモンツール作りをします！</h1>
      <ul>
        <li>
          <NextLink href="/create_field_map">フィールドを作る</NextLink>
        </li>
        <li>オブジェクトをつくる（TODO）</li>
        <li>ポケモンをつくる（TODO）</li>
      </ul>
    </>
  );
}
