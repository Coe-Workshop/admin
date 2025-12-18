"use client";

import React, { ReactNode, useState } from "react";
import styles from "./tableTransaction.module.scss";
import { mockData } from "@/app/mockdata/mockdata";
import { Status } from "@/app/types/api/transaction";
import { prefix } from "@/app/utils/prefix";
import Image from "next/image";
import { StatusTag } from "../statusTag/statusTag";
export const ItemTransaction = () => {
  const [openTransaction, setOpenTransaction] = useState<number[]>([]);
  const [closeTransaction, setCloseTransaction] = useState<number[]>([]);
  const toggleTransaction = (idx: number) => {
    if (openTransaction.includes(idx)) {
      setCloseTransaction((prev) => [...prev, idx]);
      setTimeout(() => {
        setOpenTransaction((prev) => prev.filter((item) => item !== idx));
        setCloseTransaction((prev) => prev.filter((item) => item !== idx));
      }, 300);
    }
    setOpenTransaction((prev) => [...prev, idx]);
  };

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
            <th className={styles.header_action}></th>
          </tr>
        </thead>
        <tbody>
          {mockData.map((item, index) =>
            item.itemTransaction.map((t, i) =>
              i == 0 ? (
                <tr className={styles.firstItem} key={i}>
                  <td
                    className={styles.toggle}
                    onClick={() => toggleTransaction(index)}
                  >
                    <Image
                      style={{
                        transform: openTransaction.includes(index)
                          ? ""
                          : "rotate(-90deg)",
                      }}
                      className={styles.toggle_image}
                      src={`${prefix}/icon/arrow.svg`}
                      alt="arrow"
                      width={15}
                      height={15}
                    ></Image>
                  </td>
                  <td className={styles.assetId}>{item.assetId}</td>
                  <td className={styles.username}>{t.user.username}</td>
                  <td>
                    <StatusTag status={t.status}></StatusTag>
                  </td>
                  <td className={styles.endTime}>{t.endTime}</td>
                  <td className={styles.message}>{t.message}</td>
                  <td>
                    {t.status == Status.Blank && (
                      <Image
                        className={styles.tashIcon}
                        src={`${prefix}/icon/tash.svg`}
                        width={20}
                        height={20}
                        alt="tash"
                      ></Image>
                    )}
                  </td>
                </tr>
              ) : (
                openTransaction.includes(index) && (
                  <tr
                    className={`${styles.oldTransaction} ${
                      closeTransaction.includes(index)
                        ? styles.slideOut
                        : styles.slideIn
                    }`}
                    key={item.assetId + i}
                  >
                    <td></td>
                    <td className={styles.assetId}>{item.assetId}</td>
                    <td className={styles.username}>{t.user.username}</td>
                    <td>
                      <StatusTag status={t.status}></StatusTag>
                    </td>
                    <td className={styles.endTime}>{t.endTime}</td>
                    <td className={styles.message}>{t.message}</td>
                    <td></td>
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
