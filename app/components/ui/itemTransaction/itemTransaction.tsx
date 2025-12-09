"use client";

import React, { ReactNode, useState } from "react";
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

  const tableContent: ReactNode | null = mockData.flatMap((item, index) => {
    return item.itemTransaction.map((t, i) => {
      const now = new Date();
      const target = new Date(t.endTime);
      if (i == 0) {
        if (target < now) {
          return (
            <React.Fragment key={item.assetID + i}>
              <tr>
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
                <th className={styles.username}></th>
                <th className={styles.status}>
                  <StatusTag status={Status.Blank}></StatusTag>
                </th>
                <th className={styles.endTime}></th>
                <th className={styles.message}></th>
              </tr>
              {openTransaction.includes(index) && (
                <tr className={styles.oldTransaction} key={item.assetID + i}>
                  <th></th>
                  <th className={styles.assetID}>{item.assetID}</th>
                  <th className={styles.username}>{t.user.username}</th>
                  <th className={styles.status}>
                    <StatusTag status={Status.Finished}></StatusTag>
                  </th>
                  <th className={styles.endTime}>{t.endTime}</th>
                  <th className={styles.message}>{t.message}</th>
                </tr>
              )}
            </React.Fragment>
          );
        }
        return (
          <tr key={item.assetID + i}>
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
            <th className={styles.assetID}>{item.assetID}</th>
            <th className={styles.username}>{t.user.username}</th>
            <th className={styles.status}>
              <StatusTag status={t.status}></StatusTag>
            </th>
            <th className={styles.endTime}>{t.endTime}</th>
            <th className={styles.message}>{t.message}</th>
          </tr>
        );
      }

      return (
        openTransaction.includes(index) && (
          <tr className={styles.oldTransaction} key={item.assetID + i}>
            <th></th>
            <th className={styles.assetID}>{item.assetID}</th>
            <th className={styles.username}>{t.user.username}</th>
            <th>
              <StatusTag status={t.status}></StatusTag>
            </th>
            <th className={styles.endTime}>{t.endTime}</th>
            <th className={styles.message}>{t.message}</th>
          </tr>
        )
      );
    });
  });

  return (
    <div className={styles.item_transaction}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.header}>
            <th className={styles.toggle}></th>
            <th className="">เลขครุภัณฑ์</th>
            <th>ผู้ยืม</th>
            <th className={styles.header_status}>สถานะ</th>
            <th>เวลาสิ้นสุด </th>
            <th className={styles.header_message}>คำร้อง</th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    </div>
  );
};
