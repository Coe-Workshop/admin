"use client";

import { useState } from "react";
import { ModalContainer } from "@/app/components/modal/modalContainer/modalContainer";
import { ItemTransaction } from "@/app/components/ui/itemTransaction/itemTransaction";
import useDisclosure from "@/app/hook/useDisclosure";
import { DeleteConfirm } from "@/app/components/modal/deleteConfirm/deleteConfirm";
const Tool = () => {
  const [itemanme] = useState("itemName");
  const [category] = useState("category");
  const { opened, handle } = useDisclosure();
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
      <ModalContainer opened={opened} onClose={() => handle.close()}>
        <DeleteConfirm
          onClose={() => handle.close()}
          confirmMessage={"อะไรซักอย่าง"}
        ></DeleteConfirm>
      </ModalContainer>
      <button onClick={() => handle.open()} type="button">
        click
      </button>
    </div>
  );
};

export default Tool;
