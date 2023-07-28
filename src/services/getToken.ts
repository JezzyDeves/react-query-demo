export default async function getToken() {
  const json: string = await (await fetch("/api/token")).json();

  return json;
}
