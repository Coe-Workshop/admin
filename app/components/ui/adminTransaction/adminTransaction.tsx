"use client";

import useDisclosure from "@/app/hook/useDisclosure";
// import { mockAdminTableTransactions } from "@/app/mockdata/mockdata";
import { prefix } from "@/app/utils/prefix";
import React, { useState } from "react";
import SvgIconMono from "../../Icon/SvgIconMono";
import { StatusTag } from "../statusTag/statusTag";
import { Tooltip } from "../tooltip/tooltip";
import styles from "./adminTrasaction.module.scss";
import { AreaInput } from "../../form/AreaInput/AreaInput";
import { AdminTransactionProps, ResponseStatus } from "./adminTransaction.type";
import { ModalContainer } from "../../modal/modalContainer/modalContainer";
import { useGetToolTransactionQuery } from "@/lib/features/transactions/transactionsApiSlice";
import { useSearchParams } from "next/navigation";
import { ISODateString } from "@/lib/features/transactions/transaction.types";

export const AdminTransaction = ({
  message,
  onChange,
  onSubmit,
  responseStatus,
  setResponseStatus,
}: AdminTransactionProps) => {
  const [openTransaction, setOpenTransaction] = useState<number[]>([]);
  const [closeTransaction, setCloseTransaction] = useState<number[]>([]);
  const { opened, handle } = useDisclosure();

  // ใช้ param => /tranactions?item=__
  const searchParams = useSearchParams();
  const [itemQuery] = useState<number>(parseInt(searchParams.get("item") || "0", 0));
  const [userQuery] = useState<string>(searchParams.get("user") || "");
  const [dateQuery] = useState<ISODateString>((searchParams.get("date") || null) as ISODateString);
  const [pageQuery] = useState<number>(parseInt(searchParams.get("page") || "0", 0));

  const { data: toolTransaction, isLoading, isError } = useGetToolTransactionQuery(
    {toolId:itemQuery, 
     userId:userQuery, 
     date:dateQuery,
     page:pageQuery
    });

  const toggleTransaction = (idx: number) => {
    if (openTransaction.includes(idx)) {
      setCloseTransaction((prev) => [...prev, idx]);
      setTimeout(() => {
        setOpenTransaction((prev) => prev.filter((item) => item !== idx));
        setCloseTransaction((prev) => prev.filter((item) => item !== idx));
      }, 300);
    } else {
      setOpenTransaction((prev) => [...prev, idx]);
    }
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
          {isLoading && (
            <tr>
              <td colSpan={6} style={{ textAlign: "left", padding: "20px" }}>
                กำลังโหลดข้อมูล...
              </td>
            </tr>
          )}
          {isError && (
            <tr>
              <td colSpan={6} style={{ textAlign: "left", padding: "20px", color: "red" }}>
                เกิดข้อผิดพลาดในการดึงข้อมูล
              </td>
            </tr>
          )}
          {toolTransaction?.assets.map((item, index) => (
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
                    <Tooltip title={item.transactions?.[0]?.user.phone}>
                      <h2 className={styles.username}>{item.transactions?.[0]?.user?.userName}</h2>
                    </Tooltip>
                  </div>
                </td>
                <td colSpan={5}>
                  <button
                    onClick={() => {
                      setResponseStatus(ResponseStatus.ApproveAll);
                      handle.open();
                    }}
                    className={styles.allApprove}
                    type="button"
                  >
                    อนุมัติทั้งหมด
                  </button>
                </td>
              </tr>

              {item.transactions.map(
                (t, tIdx) =>
                  openTransaction.includes(index) && (
                    <tr
                      key={tIdx}
                      className={`${styles.transactionRow}  ${
                        closeTransaction.includes(index)
                          ? styles.slideOut
                          : styles.slideIn
                      }`}
                    >
                      <td>{item.assetID}</td>
                      <td className={styles.status}>
                        <StatusTag status={t.status} />
                      </td>
                      <td className={styles.endTime}>
                        {formatHourMinute(t.endedAt)}
                      </td>
                      <td className={styles.message}>{t.message}</td>
                      <td>
                        <div className={styles.action_content}>
                          <div style={{cursor: 'pointer'}}>
                            <SvgIconMono
                                className={styles.action_content_check}
                                src={`${prefix}/icon/double-check.svg`}
                                width={20}
                                height={20}
                                alt="check"
                            />
                          </div>
                          <div style={{cursor: 'pointer'}}>
                            <SvgIconMono
                                className={styles.action_content_stop}
                                src={`${prefix}/icon/stop.svg`}
                                width={20}
                                height={20}
                                alt="stop"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ),
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <ModalContainer opened={opened} onClose={handle.close}>
        <div className={styles.response}>
          <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault;
              onSubmit();
            }}
          >
            <div className={styles.response_header}>
              <h2 className={styles.response_title}>ส่งข้อความตอบกลับ</h2>
              <p className={styles.response_description}>
                สามารถทิ้งข้อความถึงผู้จองให้ทราบ เกี่ยวกับการจองอุปกรณ์ได้
                โดยจะเป็นการบอกถึงสาเหตุที่ยกเลิก
              </p>
              <div className={styles.response_input}>
                <AreaInput
                  value={message}
                  onChange={onChange}
                  placeholder="ทิ้งข้อความสั้นๆ บอกถึงการจองครั้งนี้"
                ></AreaInput>
              </div>
              <div className={styles.response_action}>
                <button
                  type="button"
                  className={styles.response_close}
                  onClick={() => handle.close()}
                >
                  ปิด
                </button>
                <button
                  className={styles.response_submit}
                  type="submit"
                  onClick={() => {
                    onSubmit();
                    handle.close();
                  }}
                >
                  ยืนยัน
                </button>
              </div>
            </div>
          </form>
        </div>
      </ModalContainer>
    </div>
  );
};
