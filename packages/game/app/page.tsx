export default function Home() {
  const hoge = fetch("http://localhost:3000/api/fields").then((res) => {
    console.log(res.json);
  });
  return <></>;
}
