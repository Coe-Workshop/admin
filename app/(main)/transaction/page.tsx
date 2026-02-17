"use client";
import { Select } from "@/app/components/form/Select/Select";
import DatePicker from "@/app/components/ui/Datepicker/Datepicker";
import { AllTransaction } from "@/app/components/ui/adminTransaction/adminTransaction";
import { Status } from "@/app/types/api/transaction";
import { useState } from "react";
import styles from "./transaction.module.scss";
const Transaction = () => {
  const [statusFilter, setStatusFilter] = useState<Status | null>(null);

  return (
    <div>
      <div className={styles.filter}>
        <DatePicker placeholder="--/--/----" required={true}></DatePicker>
        <Select
          placeholder="ตัวกรองสถานะ"
          onChange={setStatusFilter}
          value={statusFilter}
          options={Object.keys(Status)}
        ></Select>
      </div>

      <AllTransaction></AllTransaction>
    </div>
  );
};
export default Transaction;
