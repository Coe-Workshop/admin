"use client";

import { mockData } from "@/app/mockdata/mockdata";
import { useState } from "react";
import React from "react";
import styles from "./timeTransaction.module.scss";
import { timeEnd } from "console";
import { ItemTransaction } from "../itemTransaction/itemTransaction";
import { ModalContainer } from "../../modal/modalContainer/modalContainer";
import { TransactionInfo } from "../../modal/transactionInfo/transactionInfo";
import useDisclosure from "@/app/hook/useDisclosure";
export const TimeTransaction = () => {
  const [timeAxis] = useState<string[]>([
    "09.00",
    "10.00",
    "11.00",
    "12.00",
    "13.00",
    "14.00",
    "15.00",
  ]);
  const firstColumnTime = "2025-01-10T09:00:00";
  const lastColumnTime = "2025-01-10T16:00:00";
  const [opened, setOpened] = useState<number[]>([]);
  const getColspanLenght = (startTime: string, endTime: string): number => {
    const t1 = new Date(startTime);
    const t2 = new Date(endTime);
    const timeDiff = t2.getTime() - t1.getTime();

    return Math.ceil(timeDiff / (1000 * 60) / 30);
  };

  const toggleOpened = (idx: number) => {
    setOpened((prev) =>
      prev.includes(idx) ? prev.filter((item) => item != idx) : [...prev, idx]
    );
    console.log("opened", opened);
  };

  const getTimeFormat = (date: string): string => {
    const time = new Date(date)
      .toLocaleTimeString("th-TH", {
        hour: "2-digit",
        minute: "2-digit",
      })
      .replace(":", ".");
    return time;
  };

  return (
    <div className={styles.calendarWrapper}>
      <section className={styles.header}>
        <h3 className={styles.header_blank}></h3>
        {timeAxis.map((time, index) => (
          <React.Fragment key={index}>
            <h1 className={styles.header_time}>{time}</h1>
            <h3 className={styles.header_time}></h3>
          </React.Fragment>
        ))}
      </section>
      <section className={styles.table}>
        <div className={styles.grid_overlay}>
          {Array.from({ length: timeAxis.length * 2 + 1 }).map((_, index) => (
            <div key={index} className={styles.grid_line} />
          ))}
        </div>
        <div className={styles.tableContent}>
          {mockData.map((item, index) => {
            return (
              <div key={index} className={styles.row_container}>
                <div className={styles.row}>
                  <h3 className={styles.assetId}>{item.assetId}</h3>
                  {(() => {
                    if (firstColumnTime < item.itemTransaction[0].startTime) {
                      const firstGapColspan = getColspanLenght(
                        firstColumnTime,
                        item.itemTransaction[0].startTime
                      );
                      return (
                        <div
                          className={styles.first}
                          style={
                            {
                              "--grid-colspan": `span ${firstGapColspan}`,
                            } as React.CSSProperties
                          }
                        ></div>
                      );
                    }
                  })()}
                  {item.itemTransaction.map((event, id) => {
                    const cuerrentColSpan = getColspanLenght(
                      event.startTime,
                      event.endTime
                    );
                    const gapColSpan = getColspanLenght(
                      event.endTime,
                      item.itemTransaction[id + 1]?.startTime ?? lastColumnTime
                    );
                    return (
                      <React.Fragment key={id}>
                        <ModalContainer
                          opened={opened.includes(id)}
                          onClose={() => toggleOpened(id)}
                        >
                          <TransactionInfo
                            user={event.user}
                            startTime={event.startTime}
                            endTime={event.endTime}
                            message={event.message}
                            status={event.status}
                          ></TransactionInfo>
                        </ModalContainer>
                        <div
                          onClick={() => toggleOpened(id)}
                          className={styles.event}
                          style={
                            {
                              "--grid-colspan": `span ${cuerrentColSpan}`,
                            } as React.CSSProperties
                          }
                        >
                          <div className={styles.event_content}>
                            <div className={styles.event_line}></div>
                            <div>
                              <div>
                                <h3>{event.user.username}</h3>
                              </div>
                              <p>
                                {getTimeFormat(event.startTime)} -
                                {getTimeFormat(event.endTime)}
                              </p>
                            </div>
                          </div>
                        </div>
                        {gapColSpan != 0 && (
                          <div
                            className={styles.gap}
                            style={
                              {
                                "--grid-colspan": `span ${gapColSpan}`,
                              } as React.CSSProperties
                            }
                          ></div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
