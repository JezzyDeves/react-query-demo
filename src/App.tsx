import { useMutation, useQuery } from "@tanstack/react-query";
import create from "./services/create";
import { useState } from "react";
import getToken from "./services/getToken";
import { useAsync } from "./hooks/useAsync";

function App() {
  const apiCall = useMutation({
    mutationFn: create,
    onSuccess: (data) => {
      console.log("Success", data);
    },
    onError: (error) => {
      console.log("Error", error);
    },
    onSettled: (data) => {
      console.log("Settled", data);
    },
  });

  const errorMessage = () => {
    if (apiCall.error instanceof Error) {
      return <>{apiCall.error.message}</>;
    }
  };

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

  const customCreate = useAsync(create);

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
      <button onClick={() => apiCall.mutate({ text })}>GO</button>
      <button onClick={() => customCreate.execute({ text })}>GO CUSTOM</button>
      <br />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h4>React Query</h4>
        {apiCall.isLoading ? "Loading" : apiCall.data?.text}
        {errorMessage()}
        <h4>Custom Hook</h4>
        {customCreate.loading ? "Loading" : customCreate.data?.text}
        {customCreate.error?.message}
      </div>
    </>
  );
}

export default App;
