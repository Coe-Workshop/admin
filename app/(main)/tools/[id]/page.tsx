"use client";

import { useState } from "react";

const Tool = () => {
  const [itemanme] = useState("Occateri");
  const [category] = useState("กระมงปรือ");
  return (
    <div>
      <section>
        <div>
          <h1>{itemanme}</h1>
          <p>{category}</p>
        </div>
        <div></div>
      </section>
    </div>
  );
};

export default Tool;
