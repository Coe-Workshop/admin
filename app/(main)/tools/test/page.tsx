"use client";

import { useState } from "react";
import { ModalContainer } from "@/app/components/modal/modalContainer/modalContainer";
import { ItemTransaction } from "@/app/components/ui/itemTransaction/itemTransaction";
import useDisclosure from "@/app/hook/useDisclosure";
import { DeleteConfirm } from "@/app/components/modal/deleteConfirm/deleteConfirm";
import styles from "./test.module.scss";
import Image from "next/image";
import { TimeTransaction } from "@/app/components/ui/timeTransaction/timeTransaction";
import { OptionsAction } from "@/app/components/ui/optionAction/optionsAction";
import { prefix } from "@/app/utils/prefix";
import { Options } from "../../../components/ui/optionAction/types";
const Tool = () => {
  const [itemanme] = useState("itemName");
  const [category] = useState("category");
  const [description] = useState(
    " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation"
  );

  const handleEditItem = () => {
    console.log("is edit");
  };

  const handleDeleteItem = () => {
    console.log("is del");
  };

  const [options] = useState<Options[]>([
    { title: "แก้ไขเพิ่มเติม", action: handleEditItem },
    { title: "ลบอุปกรณ์", action: handleDeleteItem },
  ]);
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
            <OptionsAction options={options} lastDelete={true}>
              <Image
                src={`${prefix}/icon/dot.svg`}
                width={24}
                height={24}
                alt="editIcon"
              ></Image>
            </OptionsAction>
          </div>
        </div>
        <p className={styles.description}>{description}</p>
      </section>
      <section>
        <TimeTransaction></TimeTransaction>
        {/* <ItemTransaction></ItemTransaction> */}
      </section>
      <ModalContainer opened={opened} onClose={() => handle.close()}>
        <DeleteConfirm
          onClose={() => handle.close()}
          confirmMessage={"อะไรซักอย่าง"}
        ></DeleteConfirm>
      </ModalContainer>
    </div>
  );
};

export default Tool;
