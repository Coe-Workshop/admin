"use client";

import { mockAdminTableTransactions } from "@/app/mockdata/mockdata";
import { prefix } from "@/app/utils/prefix";
import React, { useState } from "react";
import SvgIconMono from "../../Icon/SvgIconMono";
import { StatusTag } from "../statusTag/statusTag";
import { Tooltip } from "../tooltip/tooltip";
import styles from "./adminTrasaction.module.scss";
export const AllTransaction = () => {
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
          <tr className={styles.header}>
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
                    <div
                      style={{
                        transform: openTransaction.includes(index)
                          ? ""
                          : "rotate(-90deg)",
                      }}
                      onClick={() => toggleTransaction(index)}
                    >
                      <SvgIconMono
                        src={`${prefix}/icon/arrow.svg`}
                        width={15}
                        height={15}
                        alt="arrowDown"
                      ></SvgIconMono>
                    </div>
                    <Tooltip title={item.user.phone}>
                      <h2 className={styles.username}>{item.user.userName}</h2>
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
                    <tr
                      key={t.assetID}
                      className={`${styles.transactionRow}  ${
                        closeTransaction.includes(index)
                          ? styles.slideOut
                          : styles.slideIn
                      }`}
                    >
                      <td>{t.itemName}</td>
                      <td>{t.assetID}</td>
                      <td className={styles.status}>
                        <StatusTag status={t.status} />
                      </td>
                      <td className={styles.endTime}>
                        {formatHourMinute(t.endedAt)}
                      </td>
                      <td className={styles.message}>{t.message}</td>
                      <td>
                        <div className={styles.action_content}>
                          <SvgIconMono
                            className={styles.action_content_check}
                            src={`${prefix}/icon/double-check.svg`}
                            width={20}
                            height={20}
                            alt="check"
                          />
                          <SvgIconMono
                            className={styles.action_content_stop}
                            src={`${prefix}/icon/stop.svg`}
                            width={20}
                            height={20}
                            alt="stop"
                          />
                        </div>
                      </td>
                    </tr>
                  ),
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};
