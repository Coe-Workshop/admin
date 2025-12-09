"use client";

import { useState } from "react";
import { ItemTransaction } from "@/app/components/ui/itemTransaction/itemTransaction";

const Tool = () => {
  const [itemanme] = useState("itemName");
  const [category] = useState("category");
  return (
    <div>
      <section>
        <div>
          <h1>{itemanme}</h1>
          <p>{category}</p>
        </div>
        <div></div>
      </section>
      <section>
        <ItemTransaction></ItemTransaction>
      </section>
    </div>
  );
};

export default Tool;
