"use client";

import { useState } from "react";
import { ModalContainer } from "@/app/components/modal/modalContainer/modalContainer";
import { ItemTransaction } from "@/app/components/ui/itemTransaction/itemTransaction";
import useDisclosure from "@/app/hook/useDisclosure";
import { DeleteConfirm } from "@/app/components/modal/deleteConfirm/deleteConfirm";
import styles from "./test.module.scss";
import Image from "next/image";
import { prefix } from "@/app/utils/prefix";
const Tool = () => {
  const [itemanme] = useState("itemName");
  const [category] = useState("category");
  const [description] = useState(
    " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation"
  );
  const { opened, handle } = useDisclosure();
  return (
    <div>
      <section className={styles.info}>
        <div className={styles.header}>
          <div className={styles.title}>
            <h1>{itemanme}</h1>
            <p className={styles.category}>{category}</p>
          </div>
          <div className={styles.action}>
            <button type="button">
              <Image
                src={`${prefix}/icon/pencil.svg`}
                width={24}
                height={24}
                alt="editIcon"
              ></Image>
            </button>
            <button type="button">
              <Image
                src={`${prefix}/icon/tash.svg`}
                width={24}
                height={24}
                alt="editIcon"
              ></Image>
            </button>
          </div>
        </div>
        <p className={styles.description}>{description}</p>
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
