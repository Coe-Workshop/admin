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
import { useScrollToRightEnd } from "@/app/hook/useScrollToRightEnd";

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
  const itemQuery = parseInt(searchParams.get("item") || "0", 10);
  const userQuery = searchParams.get("user") || "";
  const dateQuery = searchParams.get("date") as ISODateString;
  const pageQuery = parseInt(searchParams.get("page") || "0", 10);

  const { data: toolTransaction, isLoading, isError, isFetching } = useGetToolTransactionQuery({
    toolId: itemQuery,
    userId: userQuery,
    date: dateQuery,
    page: pageQuery,
  });

  const { scrollRef, isScrolledToRightEnd, handleScroll } = useScrollToRightEnd<HTMLDivElement>([toolTransaction]);

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
    <div 
      className={`${styles.tableWrapper} ${isScrolledToRightEnd ? styles.isAtRightEnd : ""}`}
      ref={scrollRef}
      onScroll={handleScroll}
    >
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
          {(isLoading || isFetching) ? (
            <tr>
              <td colSpan={6} style={{ textAlign: "left", padding: "20px" }}>
                กำลังโหลดข้อมูล...
              </td>
            </tr>
          ) : (
          isError ? (
            <tr>
              <td colSpan={6} style={{ textAlign: "left", padding: "20px", color: "red" }}>
                เกิดข้อผิดพลาดในการดึงข้อมูล
              </td>
            </tr> 
          ) : (
            toolTransaction?.assets.map((assets, assetsIndex) => (
              <React.Fragment key={assetsIndex}>
                <tr className={styles.userRow}>
                  <td colSpan={1}>
                    <div 
                      className={styles.userInfo}
                      onClick={() => toggleTransaction(assetsIndex)}>
                      <div
                        style={{
                          transform: openTransaction.includes(assetsIndex)
                            ? "translateY(12.5%)"
                            : "rotate(-90deg) translateY(0)",
                          transition: "all ease 0.1s",
                        }}
                      >
                        <SvgIconMono
                          src={`${prefix}/icon/arrow.svg`}
                          width={15}
                          height={15}
                          alt="arrowDown"
                        ></SvgIconMono>
                      </div>
                      <Tooltip title={assets.transactions?.[0]?.user.phone}>
                        <h2 className={styles.username}>{assets.transactions?.[0]?.user?.userName}</h2>
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
  
                {assets.transactions.map((transactions, transactionsIndex) => 
                openTransaction.includes(assetsIndex) && (
                  <tr
                    key={transactionsIndex}
                    className={`${styles.transactionRow}  ${
                      closeTransaction.includes(assetsIndex)
                        ? styles.slideOut
                        : styles.slideIn
                    }`}
                  >
                    <td>{"TEMP ITEM NAME"}</td> {/* ช่วยปลอบใจดวงนี้ ที่ยังคงคอย และยังรอคอย เธอกลับมาหา */}
                    <td>{assets.assetID}</td>
                    <td className={styles.status}>
                      <StatusTag status={transactions.status} />
                    </td>
                    <td className={styles.endTime}>
                      {formatHourMinute(transactions.endedAt)}
                    </td>
                    <td className={styles.message}>{transactions.message}</td>
                    <td className={styles.stickyAction}>
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
            ))
          ))
        }
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
