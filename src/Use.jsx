import React, { useState, useEffect } from "react";

function Use() {
  const [count, setcount] = useState(0);
  useEffect(() => {
    if (count >= 1) document.title = `chats (${count})`;
    else document.title = `chats`;
  });
  return (
    <>
      <button onClick={() => setcount(count + 1)}>click me</button>
      <h1>{count}</h1>
    </>
  );
}

export default Use;
