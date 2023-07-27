import { useMutation } from "@tanstack/react-query";
import create from "./services/create";
import { useState } from "react";

function App() {
  const apiCall = useMutation({
    mutationFn: create,
  });

  const errorMessage = () => {
    if (apiCall.error instanceof Error) {
      return <>{apiCall.error.message}</>;
    }
  };

  const [text, setText] = useState("");

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
