"use client";

import { mockAdminTableTransactions } from "@/app/mockdata/mockdata";
import React, { useState } from "react";
import { StatusTag } from "../statusTag/statusTag";
import { Tooltip } from "../tooltip/tooltip";
import styles from "./adminTrasaction.module.scss";
import Image from "next/image";
import { prefix } from "@/app/utils/prefix";
export const AllTransaction = () => {
  const [openTransaction, setOpenTransaction] = useState<number[]>([]);

  const toggleOpenTransaction = (idx: number) => {
    setOpenTransaction((prev) =>
      prev.includes(idx) ? prev.filter((item) => item !== idx) : [...prev, idx]
    );
    console.log("openTransaction", openTransaction);
  };

  const formatHourMinute = (iso: string): string => {
    return new Date(iso).toLocaleTimeString("th-TH", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <colgroup>
          <col className={styles.itemName} />
          <col className={styles.assetID} />
          <col className={styles.status} />
          <col className={styles.endTime} />
          <col className={styles.message} />
          <col className={styles.action} />
        </colgroup>

        <thead>
          <tr>
            <th>ชื่ออุปกรณ์</th>
            <th>เลขครุภัณฑ์</th>
            <th>สถานะ</th>
            <th>เวลาสิ้นสุด</th>
            <th>คำร้อง</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {mockAdminTableTransactions.map((item, index) => (
            <React.Fragment key={index}>
              <tr className={styles.userRow}>
                <td colSpan={1}>
                  <div className={styles.userInfo}>
                    <Image
                      style={{
                        transform: openTransaction.includes(index)
                          ? ""
                          : "rotate(-90deg)",
                      }}
                      onClick={() => toggleOpenTransaction(index)}
                      src={`${prefix}/icon/arrow.svg`}
                      width={15}
                      height={15}
                      alt="arrowDown"
                    ></Image>
                    <Tooltip title={item.user.tel}>
                      <h2 className={styles.username}>{item.user.username}</h2>
                    </Tooltip>
                  </div>
                </td>
                <td colSpan={5}>
                  <button className={styles.allApprove} type="button">
                    อนุมัติทั้งหมด
                  </button>
                </td>
              </tr>

              {item.adminTransactions.map(
                (t) =>
                  openTransaction.includes(index) && (
                    <tr key={t.assetId} className={styles.transactionRow}>
                      <td>{t.itemName}</td>
                      <td>{t.assetId}</td>
                      <td>
                        <StatusTag status={t.status} />
                      </td>
                      <td className={styles.endTime}>
                        {formatHourMinute(t.endTime)}
                      </td>
                      <td className={styles.message}>{t.message}</td>
                      <td>
                        <div className={styles.action_content}>
                          <Image
                            src={`${prefix}/icon/double-check.svg`}
                            width={20}
                            height={20}
                            alt="check"
                          />
                          <Image
                            src={`${prefix}/icon/stop.svg`}
                            width={20}
                            height={20}
                            alt="stop"
                          />
                        </div>
                      </td>
                    </tr>
                  )
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};
