"use client";

import { TagInput } from "@/app/components/form/TagInput/TagInput";
import { DeleteConfirm } from "@/app/components/modal/deleteConfirm/deleteConfirm";
import { ModalContainer } from "@/app/components/modal/modalContainer/modalContainer";
import { OptionsAction } from "@/app/components/ui/optionAction/optionsAction";
import { TimeTransaction } from "@/app/components/ui/timeTransaction/timeTransaction";
import useDisclosure from "@/app/hook/useDisclosure";
import { prefix } from "@/app/utils/prefix";
import React, { useState } from "react";
import { Options } from "../../../components/ui/optionAction/types";
import styles from "./test.module.scss";
import IconSvgMono from "@/app/components/Icon/SvgIcon";
import { useParams } from "next/navigation";
import { useGetToolQuery } from "@/lib/features/tools/toolsApiSlice";
import { ToolCategories, type Tool } from "@/lib/features/tools/tool.typs"
import CreateItem from "@/app/components/modal/create_item/create";
const Tool = () => {
  const params = useParams<{ slug: string }>();
  const toolId = params.slug;
  const [toolData, setToolData] = useState<Tool | null>(null);
  const {data: fetchTool } = useGetToolQuery(Number(toolId), {refetchOnMountOrArgChange: false})
  const tool = fetchTool
  console.log("category name", tool?.category)
  console.log("this is ", tool);  
  const [itemanme] = useState("itemName");
  const [category] = useState("category");
  const [description] = useState(
    " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
  );
  const { opened, handle } = useDisclosure();
  const { opened: openedAssetId, handle: handleAssetId } = useDisclosure();
  const { opened: createItem, handle: handlecreateItem } = useDisclosure();
  // const { opened: openedDelete, handle: handleDelete } = useDisclosure();
  const handleEditItem = () => {
    console.log("is edit");
    handlecreateItem.open()
  };

  const [options] = useState<Options[]>([
    { title: "แก้ไขเพิ่มเติม", action: handleEditItem },
    { title: "เพิ่มเลขครุภัณฑ์", action: handleAssetId.open },
    { title: "ลบอุปกรณ์", action: handle.open },
  ]);
  return (
    <div>
      <section className={styles.info}>
        <div className={styles.header}>
          <div className={styles.title}>
            <h1>{tool?.name}</h1>
            <p className={styles.category}>{tool ?  (tool.category) : ""}</p>
          </div>
          <div className={styles.action}>
            <OptionsAction options={options} lastDelete={true}>
              <IconSvgMono
                src={`${prefix}/icon/dot.svg`}
                width={24}
                height={24}
                alt="editIcon"
              ></IconSvgMono>
            </OptionsAction>
          </div>
        </div>
        <p className={styles.description}>{description}</p>
      </section>
      <section>
        <TimeTransaction></TimeTransaction>
        {/* <ItemTransaction></ItemTransaction> */}
      </section>
      <ModalContainer
        opened={openedAssetId}
        onClose={() => handleAssetId.close()}
      >
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}
          className={styles.assetId}
        >
          <div className={styles.assetId_header}>
            <h2 className={styles.assetId_title}>เพิ่มหมายเลขครุภัณฑ์</h2>
            <p>
              เพิ่มอุปกรณ์ที่มีเลขครุภัณฑ์ที่อนุญาตให้ผู้ใช้ทั่วไปสามารถรทำการยืมได้
              โดยสามารถเพิ่มได้หลายรายการโดยการกดปุ่ม --ENTER--
              และจะไม่สามารถนำอุปกรณ์นั้นออกจากระบบได้หากมีผู้ใช้งานอยู่
            </p>
          </div>
          <TagInput placeholder="ป้อนเลขครุภัณฑ์ของอุปกรณ์"></TagInput>
          <div className={styles.assetId_action}>
            <button
              onClick={() => handleAssetId.close()}
              type="button"
              className={styles.assetId_cancel}
            >
              ยกเลิก
            </button>
            <button type="button" className={styles.assetId_submit}>
              ยืนยัน
            </button>
          </div>
        </form>
      </ModalContainer>
      <ModalContainer opened={opened} onClose={() => handle.close()}>
        <DeleteConfirm
          onClose={() => handle.close()}
          confirmMessage={itemanme}
        ></DeleteConfirm>

      </ModalContainer>
      <ModalContainer opened={createItem}
          onClose={() => handlecreateItem.close()}>
          <CreateItem onClose={() => handlecreateItem.close()}></CreateItem>
      </ModalContainer>
    </div>
  );
};

export default Tool;
