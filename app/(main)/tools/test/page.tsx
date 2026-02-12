"use client";

import { TagInput } from "@/app/components/ui/TagInput/TagInput";
import { DeleteConfirm } from "@/app/components/modal/deleteConfirm/deleteConfirm";
import { ModalContainer } from "@/app/components/modal/modalContainer/modalContainer";
import { OptionsAction } from "@/app/components/ui/optionAction/optionsAction";
import { TimeTransaction } from "@/app/components/ui/timeTransaction/timeTransaction";
import useDisclosure from "@/app/hook/useDisclosure";
import { prefix } from "@/app/utils/prefix";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { Options } from "../../../components/ui/optionAction/types";
import styles from "./test.module.scss";
import { useGetToolQuery, useUpdateToolAssetsMutation } from "@/lib/features/tools/toolsApiSlice";

const Tool = () => {
  const [updateToolAssets, { isLoading, isError, error }] = useUpdateToolAssetsMutation();
  const [assetIds, setAssetIds] = useState<number[]>([]);
  const { data: tool } = useGetToolQuery(1); // test สมมติ toolId = 1

  const [itemanme] = useState("itemName");
  const [category] = useState("category");
  const [description] = useState(
    " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
  );
  const { opened, handle } = useDisclosure();
  const { opened: openedAssetId, handle: handleAssetId } = useDisclosure();
  // const { opened: openedDelete, handle: handleDelete } = useDisclosure();
  const handleEditItem = () => {
  };

  // ใช้ ref เพื่อดึงค่าออกจาก TagInput
  const tagRef = useRef<{ getValues: () => number[] }>(null);

  const handleConfirmAssets = async () => {
    const assets = tagRef.current?.getValues() ?? [];
    // test สมมติ toolId = 1
    try {
      await updateToolAssets({ toolId: 1, assets_id: assets }).unwrap();
      handleAssetId.close(); // ปิด modal หลังอัปเดตเสร็จ
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const [errors, setErrors] = useState({
    name: "",
    category: "",
  });

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
          <TagInput 
            ref={tagRef}
            placeholder="ป้อนเลขครุภัณฑ์ของอุปกรณ์"
            initialAssets={tool?.assets_id ?? []}
          ></TagInput>
          <div className={styles.assetId_action}>
            {(errors.name || errors.category) && (
              <span className={styles.errorMessage}>
                ไม่สามารถสร้างรายการได้ : error message
              </span>
            )}
            <button
              onClick={() => handleAssetId.close()}
              type="button"
              className={styles.assetId_cancel}
            >
              ยกเลิก
            </button>
            <button 
              type="button" 
              disabled={isLoading}
              className={styles.assetId_submit}
              onClick={handleConfirmAssets}
            >
              {isLoading ? "กำลังบันทึก..." : "ยืนยัน"}
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
    </div>
  );
};

export default Tool;
