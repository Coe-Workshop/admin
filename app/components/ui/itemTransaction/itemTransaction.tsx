"use client";

import { useState } from "react";
import styles from "./tableTransaction.module.scss";
import { mockData } from "@/app/mockdata/mockdata";
import { Status } from "@/app/types/api/item";
import { prefix } from "@/app/utils/prefix";
import Image from "next/image";
import { StatusTag } from "../statusTag/statusTag";
export const ItemTransaction = () => {
  const [click, setCheck] = useState(false);
  const [openTransaction, setOpenTransaction] = useState<number[]>([]);

  const togleTransaction = (idx: number) => {
    setOpenTransaction((prev) =>
      prev.includes(idx) ? prev.filter((item) => item !== idx) : [...prev, idx]
    );
    console.log("openTransaction", openTransaction);
  };

  return (
    <div className={styles.item_transaction}>
      <table>
        <thead>
          <tr className={styles.header}>
            <th className={styles.toggle}></th>
            <th className="">เลขครุภัณฑ์</th>
            <th>ผู้ยืม</th>
            <th>สถานะ</th>
            <th>เวลาสิ้นสุด </th>
            <th>คำร้อง</th>
          </tr>
        </thead>
        <tbody>
          {mockData.map((item, index) =>
            item.itemTransaction.map((t, i) =>
              i == 0 ? (
                <tr key={i}>
                  <th
                    className={styles.toggle}
                    onClick={() => togleTransaction(index)}
                  >
                    <Image
                      style={{
                        transform: openTransaction.includes(index)
                          ? "rotate(-90deg)"
                          : "",
                      }}
                      className={styles.toggle_image}
                      src={`${prefix}/icon/arrow.svg`}
                      alt="arrow"
                      width={10}
                      height={10}
                    ></Image>
                  </th>
                  <th>{item.assetID}</th>
                  <th className={styles.username}>{t.user.username}</th>
                  <th>
                    <StatusTag status={t.status}></StatusTag>
                  </th>
                  <th className={styles.endTime}>{t.endTime}</th>
                  <th className={styles.message}>{t.message}</th>
                </tr>
              ) : (
                openTransaction.includes(index) && (
                  <tr className={styles.oldTransaction} key={i}>
                    <th></th>
                    <th>{item.assetID}</th>
                    <th className={styles.username}>{t.user.username}</th>
                    <th>
                      <StatusTag status={t.status}></StatusTag>
                    </th>
                    <th className={styles.endTime}>{t.endTime}</th>
                    <th className={styles.message}>{t.message}</th>
                  </tr>
                )
              )
            )
          )}
        </tbody>
      </table>
    </div>
  );
};
