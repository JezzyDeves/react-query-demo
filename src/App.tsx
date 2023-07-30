import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useCreateText } from "./handlers/useCreateText";
import getToken from "./services/getToken";
import { useTextStore } from "./stores/useTextsStore";

function App() {
  const apiCall = useCreateText();
  const texts = useTextStore((state) => state.texts);

  async function tokenFetch() {
    const token = await getToken();

    sessionStorage.setItem("token", token);

    return token;
  }

  const tokenQuery = useQuery({
    queryKey: ["token"],
    queryFn: tokenFetch,
    refetchIntervalInBackground: true,
    refetchInterval: 1000 * 60,
  });

  const [text, setText] = useState("");

  if (tokenQuery.isLoading) {
    return <>Loading App...</>;
  }
  return (
    <>
      <input
        type="text"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <button onClick={() => apiCall.mutate(text)}>GO</button>
      <br />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h4>React Query</h4>
        {apiCall.isLoading ? "Loading" : "Idle"} <br />
        {apiCall.error?.message}
        <h4>Store Values</h4>
        {texts.join(", ")}
      </div>
    </>
  );
}

export default App;
