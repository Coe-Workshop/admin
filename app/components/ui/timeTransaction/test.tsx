"use client";

import { mockData } from "@/app/mockdata/mockdata";
import { useState } from "react";
import React from "react";
import styles from "./timeTransaction.module.scss";
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

  const getColspanLenght = (startedAt: string, endedAt: string): number => {
    const t1 = new Date(startedAt);
    const t2 = new Date(endedAt);
    const timeDiff = t2.getTime() - t1.getTime();
    return Math.ceil(timeDiff / (1000 * 60) / 30);
  };

  return (
    <div>
      <table className={styles.table}>
        <colgroup>
          {timeAxis.map((index) => (
            <col key={index} />
          ))}
        </colgroup>
        <thead>
          <tr>
            {timeAxis.map((item, index) => (
              <React.Fragment key={index}>
                <th>{item}</th>
                <th></th>
              </React.Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          {mockData.map((item) => {
            //เดิ๋ยวมาแก้ให้เหลือแค่เวลา
            const firstColumnTime = "2025-01-10T09:00:00";
            const lastColumnTime = "2025-01-10T16:00:00";
            return (
              <tr key={item.assetID}>
                {(() => {
                  const firstColSpan = getColspanLenght(
                    firstColumnTime,
                    item.transactions[0].startedAt,
                  );
                  if (firstColSpan != 0)
                    return <td colSpan={firstColSpan}>{firstColSpan}</td>;
                })()}
                {item.transactions.map((t, i) => {
                  const currentColSpan = getColspanLenght(
                    item.transactions[i].startedAt,
                    item.transactions[i].endedAt,
                  );
                  const nextColspan = getColspanLenght(
                    item.transactions[i].endedAt,
                    item.transactions[i + 1]?.startedAt ?? lastColumnTime,
                  );
                  return (
                    <React.Fragment key={i}>
                      <td colSpan={currentColSpan}>
                        {getColspanLenght(
                          item.transactions[i].startedAt,
                          item.transactions[i].endedAt,
                        )}
                      </td>
                      {nextColspan != 0 && (
                        <td colSpan={nextColspan}>
                          {getColspanLenght(
                            item.transactions[i].endedAt,
                            item.transactions[i + 1]?.startedAt ??
                              "2025-01-10T16:00:00",
                          )}
                        </td>
                      )}
                    </React.Fragment>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
