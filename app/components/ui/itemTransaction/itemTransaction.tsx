"use client";

import IconSvgMono from "@/app/components/Icon/SvgIcon";
import { mockData } from "@/app/mockdata/mockdata";
import { Status } from "@/app/types/api/transaction";
import { prefix } from "@/app/utils/prefix";
import { useState } from "react";
import { StatusTag } from "../statusTag/statusTag";
import styles from "./tableTransaction.module.scss";
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

  // const tableContent: ReactNode | null = mockData.flatMap((item, index) => {
  //   return item.itemTransaction.map((t, i) => {
  //     const now = new Date();
  //     const target = new Date(t.endTime);
  //     if (i == 0) {
  //       if (target < now) {
  //         return (
  //           <React.Fragment key={item.assetId + i}>
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
  //                   <IconSvgMono
  //                     className={styles.toggle_image}
  //                     src={`${prefix}/icon/arrow.svg`}
  //                     alt="arrow"
  //                     width={10}
  //                     height={10}
  //                   ></IconSvgMono>
  //                 </div>
  //               </td>
  //               <td className={styles.assetID}>{item.assetId}</td>
  //               <td className={styles.username}></td>
  //               <td className={styles.status}>
  //                 <StatusTag status={Status.Blank}></StatusTag>
  //               </td>
  //               <td className={styles.endTime}></td>
  //               <td className={styles.message}></td>
  //             </tr>
  //             {openTransaction.includes(index) && (
  //               <tr className={styles.oldTransaction} key={item.assetId + i}>
  //                 <td></td>
  //                 <td className={styles.assetID}>{item.assetId}</td>
  //                 <td className={styles.username}>{t.user.username}</td>
  //                 <td className={styles.status}>
  //                   <StatusTag status={Status.Finished}></StatusTag>
  //                 </td>
  //                 <td className={styles.endTime}>{t.endTime}</td>
  //                 <td className={styles.message}>{t.message}</td>
  //               </tr>
  //             )}
  //           </React.Fragment>
  //         );
  //       }
  //       return (
  //         <tr key={item.assetId + i}>
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
  //               <IconSvgMono
  //                 className={styles.toggle_image}
  //                 src={`${prefix}/icon/arrow.svg`}
  //                 alt="arrow"
  //                 width={10}
  //                 height={10}
  //               ></IconSvgMono>
  //             </div>
  //           </th>
  //           <th className={styles.assetId}>{item.assetId}</th>
  //           <th className={styles.username}>{t.user.username}</th>
  //           <th className={styles.status}>
  //             <StatusTag status={t.status}></StatusTag>
  //           </th>
  //           <th className={styles.endTime}>{t.endTime}</th>
  //           <th className={styles.message}>{t.message}</th>
  //         </tr>
  //       );
  //     }

  //     return (
  //       openTransaction.includes(index) && (
  //         <tr className={styles.oldTransaction} key={item.assetId + i}>
  //           <td></td>
  //           <td className={styles.assetID}>{item.assetId}</td>
  //           <td className={styles.username}>{t.user.username}</td>
  //           <td className={styles.status}>
  //             <StatusTag status={t.status}></StatusTag>
  //           </td>
  //           <td className={styles.endTime}>{t.endTime}</td>
  //           <td className={styles.message}>{t.message}</td>
  //         </tr>
  //       )
  //     );
  //   });
  // });

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
                    <div
                      style={{
                        transform: openTransaction.includes(index)
                          ? ""
                          : "rotate(-90deg)",
                      }}
                    >
                      <IconSvgMono
                        className={styles.toggle_image}
                        src={`${prefix}/icon/arrow.svg`}
                        alt="arrow"
                        width={15}
                        height={15}
                      ></IconSvgMono>
                    </div>
                  </td>
                  <td className={styles.assetID}>{item.assetId}</td>
                  <td className={styles.username}>{t.user.username}</td>
                  <td className={styles.status}>
                    <StatusTag status={t.status}></StatusTag>
                  </td>
                  <td className={styles.endTime}>{t.endTime}</td>
                  <td className={styles.message}>{t.message}</td>
                  <td className={styles.trashSpace}>
                    {t.status == Status.Blank && (
                      <IconSvgMono
                        className={styles.tashIcon}
                        src={`${prefix}/icon/tash.svg`}
                        width={20}
                        height={20}
                        alt="tash"
                      ></IconSvgMono>
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
                    <td className={styles.assetID}>{item.assetId}</td>
                    <td className={styles.username}>{t.user.username}</td>
                    <td className={styles.status}>
                      <StatusTag status={t.status}></StatusTag>
                    </td>
                    <td className={styles.endTime}>{t.endTime}</td>
                    <td className={styles.message}>{t.message}</td>
                    <td></td>
                  </tr>
                )
              ),
            ),
          )}
        </tbody>
      </table>
    </div>
  );
};
