"use client";
import { Select } from "@/app/components/form/Select/Select";
import DatePicker from "@/app/components/ui/Datepicker/Datepicker";
import { AdminTransaction } from "@/app/components/ui/adminTransaction/adminTransaction";
import { Status } from "@/app/types/api/transaction";
import { useState } from "react";
import styles from "./transaction.module.scss";
import { ResponseStatus } from "@/app/components/ui/adminTransaction/adminTransaction.type";
import { ISODateString } from "@/lib/features/transactions/transaction.types";
import { useSetQuery } from "@/app/hook/SearchQuery";
import { toISODateStringOrNull } from "@/app/utils/ISODateStringHandle";
import { TextInput } from "@/app/components/form/TextInput/TextInput";

const Transaction = () => {
  const setQuery = useSetQuery();

  const [itemId, setItemId] = useState<string>("");
  const [responseStatus, setResponseStatus] = useState<ResponseStatus>(
    ResponseStatus.Approve,
  );
  const [message, setMessage] = useState<string>("");
  const hadleStutusChange = () => {
    console.log("submit");
  };
  const [dateFilter, setDateFilter] = useState<ISODateString | null>(null);
  const [statusFilter, setStatusFilter] = useState<Status | null>(null);

  const handleDateChange = (newDate: Date | null | undefined) => {
    setDateFilter(toISODateStringOrNull(newDate));
    // idk why it เลื่อนไปข้างหลังวันนึง
    newDate?.setDate(newDate.getDate()+1);
    setQuery("date", toISODateStringOrNull(newDate));
    newDate?.setDate(newDate.getDate()-1);
  }
  return (
    <div>
      <div className={styles.filter}>
        <TextInput
          label="ไอดีของอุปกรณ์"
          placeholder="กด 1 เพื่อขึ้นเรือ, 47 เพื่อเทส"
          require
          value={itemId}
          onChange={(newVar) => {
            setItemId(newVar);
            setQuery("item", newVar);
          }}
        ></TextInput>
        <DatePicker 
          placeholder="--/--/----" 
          required={true}
          onChange={handleDateChange}>
        </DatePicker>
        <Select
          placeholder="ตัวกรองสถานะ"
          onChange={(newValue) => {
            setStatusFilter(newValue);
            setQuery("status", newValue);
          }}
          value={statusFilter}
          options={Object.keys(Status)}
        ></Select>
      </div>

      <AdminTransaction
        message={message}
        onChange={setMessage}
        onSubmit={hadleStutusChange}
        responseStatus={responseStatus}
        setResponseStatus={setResponseStatus}
      ></AdminTransaction>
    </div>
  );
};
export default Transaction;
