import { useMutation, useQuery } from "@tanstack/react-query";
import create from "./services/create";
import { useState } from "react";
import getToken from "./services/getToken";

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
      <br />
      {apiCall.isLoading ? "Loading" : apiCall.data?.text} <br />
      {errorMessage()}
    </>
  );
}

export default App;
