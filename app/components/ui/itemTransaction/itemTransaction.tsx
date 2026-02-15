"use client";

import SvgIconMono from "@/app/components/Icon/SvgIconMono";
import { prefix } from "@/app/utils/prefix";
import { useState } from "react";
import { StatusTag } from "../statusTag/statusTag";
import styles from "./tableTransaction.module.scss";
import { useGetToolTransactionQuery } from "@/lib/features/transactions/transactionsApiSlice";
import Loader from "../../layout/loader/loader";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { ErrorResponse, TransactionsStatus } from "@/lib/features/transactions/transaction.types";
export const ItemTransaction = ({ toolId = 0 }) => {
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

  // const tableContent: ReactNode | null = mockData.flatMap((item, index) => {
  //   return item.transactions.map((t, i) => {
  //     const now = new Date();
  //     const target = new Date(t.endedAt);
  //     if (i == 0) {
  //       if (target < now) {
  //         return (
  //           <React.Fragment key={item.assetID + i}>
  //             <tr>
  //               <td
  //                 className={styles.toggle}
  //                 onClick={() => toggleTransaction(index)}
  //               >
  //                 <div
  //                   style={{
  //                     transform: openTransaction.includes(index)
  //                       ? "rotate(-90deg)"
  //                       : "",
  //                   }}
  //                 >
  //                   <SvgIconMono
  //                     className={styles.toggle_image}
  //                     src={`${prefix}/icon/arrow.svg`}
  //                     alt="arrow"
  //                     width={10}
  //                     height={10}
  //                   ></SvgIconMono>
  //                 </div>
  //               </td>
  //               <td className={styles.assetID}>{item.assetID}</td>
  //               <td className={styles.username}></td>
  //               <td className={styles.status}>
  //                 <StatusTag status={Status.Blank}></StatusTag>
  //               </td>
  //               <td className={styles.endedAt}></td>
  //               <td className={styles.message}></td>
  //             </tr>
  //             {openTransaction.includes(index) && (
  //               <tr className={styles.oldTransaction} key={item.assetID + i}>
  //                 <td></td>
  //                 <td className={styles.assetID}>{item.assetID}</td>
  //                 <td className={styles.username}>{t.user.username}</td>
  //                 <td className={styles.status}>
  //                   <StatusTag status={Status.Finished}></StatusTag>
  //                 </td>
  //                 <td className={styles.endedAt}>{t.endedAt}</td>
  //                 <td className={styles.message}>{t.message}</td>
  //               </tr>
  //             )}
  //           </React.Fragment>
  //         );
  //       }
  //       return (
  //         <tr key={item.assetID + i}>
  //           <th
  //             className={styles.toggle}
  //             onClick={() => toggleTransaction(index)}
  //           >
  //             <div
  //               style={{
  //                 transform: openTransaction.includes(index)
  //                   ? "rotate(-90deg)"
  //                   : "",
  //               }}
  //             >
  //               <SvgIconMono
  //                 className={styles.toggle_image}
  //                 src={`${prefix}/icon/arrow.svg`}
  //                 alt="arrow"
  //                 width={10}
  //                 height={10}
  //               ></SvgIconMono>
  //             </div>
  //           </th>
  //           <th className={styles.assetID}>{item.assetID}</th>
  //           <th className={styles.username}>{t.user.username}</th>
  //           <th className={styles.status}>
  //             <StatusTag status={t.status}></StatusTag>
  //           </th>
  //           <th className={styles.endedAt}>{t.endedAt}</th>
  //           <th className={styles.message}>{t.message}</th>
  //         </tr>
  //       );
  //     }

  //     return (
  //       openTransaction.includes(index) && (
  //         <tr className={styles.oldTransaction} key={item.assetID + i}>
  //           <td></td>
  //           <td className={styles.assetID}>{item.assetID}</td>
  //           <td className={styles.username}>{t.user.username}</td>
  //           <td className={styles.status}>
  //             <StatusTag status={t.status}></StatusTag>
  //           </td>
  //           <td className={styles.endedAt}>{t.endedAt}</td>
  //           <td className={styles.message}>{t.message}</td>
  //         </tr>
  //       )
  //     );
  //   });
  // });
  const {
    data: toolTransaction,
    isError,
    error,
    isLoading,
  } = useGetToolTransactionQuery(Number(toolId));
  let toolTransactionErrorMessage = "There's some error occuring while try to fetching the transaction data";
  if (error && "data" in error) {
    const err = error as FetchBaseQueryError;
    if (err.data && typeof err.data === "object" && "error" in err.data) {
      toolTransactionErrorMessage = (err.data as ErrorResponse).error || "";
    }
  }
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
          {isLoading && (
            <tr>
              <td colSpan={7}>
                <div className={styles.loading}>
                  <Loader></Loader>
                </div>
              </td>
            </tr>
          )}
          {toolTransaction?.assets.map((item, index) =>
            item.transactions.map((t, i) =>
              i == 0 ? (
                <tr className={styles.firstItem} key={i}>
                  <td
                    className={styles.toggle}
                    onClick={() => toggleTransaction(index)}
                  >
                    <div
                      style={{
                        transform: openTransaction.includes(index)
                          ? ""
                          : "rotate(-90deg)",
                      }}
                    >
                      <SvgIconMono
                        className={styles.toggle_image}
                        src={`${prefix}/icon/arrow.svg`}
                        alt="arrow"
                        width={15}
                        height={15}
                      ></SvgIconMono>
                    </div>
                  </td>
                  <td className={styles.assetID}>{item.assetID}</td>
                  <td className={styles.username}>{t.user.userName}</td>
                  <td className={styles.status}>
                    <StatusTag status={t.status}></StatusTag>
                  </td>
                  <td className={styles.endedAt}>{t.endedAt}</td>
                  <td className={styles.message}>{t.message}</td>
                  <td className={styles.trashSpace}>
                    {t.status == TransactionsStatus.Blank && (
                      <SvgIconMono
                        className={styles.tashIcon}
                        src={`${prefix}/icon/tash.svg`}
                        width={20}
                        height={20}
                        alt="tash"
                      ></SvgIconMono>
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
                    key={item.assetID + i}
                  >
                    <td></td>
                    <td className={styles.assetID}>{item.assetID}</td>
                    <td className={styles.username}>{t.user.userName}</td>
                    <td className={styles.status}>
                      <StatusTag status={t.status}></StatusTag>
                    </td>
                    <td className={styles.endedAt}>{t.endedAt}</td>
                    <td className={styles.message}>{t.message}</td>
                    <td></td>
                  </tr>
                )
              ),
            ),
          )}
          {isError && (
            <tr>
              <td colSpan={7}>
                <div className={styles.error}>
                  error: {toolTransactionErrorMessage}
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
