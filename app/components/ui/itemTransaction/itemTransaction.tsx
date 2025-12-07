"use client";

import { useState } from "react";
import styles from "./tableTransaction.module.scss";

export const ItemTransaction = () => {
  const [click, setCheck] = useState(false);
  return (
    <div className={styles.item_transaction}>
      <table>
        <thead>
          <tr>
            <th className={styles.toggle}></th>
            <th className="">เลขครุภัณฑ์</th>
            <th>ผู้ยืม</th>
            <th>สถานะ</th>
            <th>วันสิ้นสุด</th>
            <th>คำร้อง</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>
              <button type="button" onClick={() => setCheck((prev) => !prev)}>
                click
              </button>
            </th>
            <th>ตาม</th>
            <th>13</th>
            <th>13</th>
            <th></th>
            <th></th>
          </tr>

          {click && (
            <tr>
              <th>
                <p></p>
              </th>
              <th>ตาม</th>
              <th>13</th>
              <th>13</th>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
