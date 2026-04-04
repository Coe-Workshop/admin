"use client";
import SearchBar from "@/app/components/form/SearchBar/SearchBar";
import { Select } from "@/app/components/form/Select/Select";
import DatePicker from "@/app/components/ui/Datepicker/Datepicker";
import { AdminTransaction } from "@/app/components/ui/adminTransaction/adminTransaction";
import { Status } from "@/app/types/api/transaction";
import { useState } from "react";
import styles from "./transaction.module.scss";
import { ResponseStatus } from "@/app/components/ui/adminTransaction/adminTransaction.type";
import { useSetQuery } from "@/app/hook/SearchQuery";
import { toISODateStringOrNull } from "@/app/utils/ISODateStringHandle";
import { TextInput } from "@/app/components/form/TextInput/TextInput";

export const Transaction = () => {
  const setQuery = useSetQuery();

  const [itemId, setItemId] = useState<string>("");
  const [responseStatus, setResponseStatus] = useState<ResponseStatus>(
    ResponseStatus.Approve,
  );
  const [message, setMessage] = useState<string>("");
  const hadleStutusChange = () => {
    console.log("submit");
  };
  // const [dateFilter, setDateFilter] = useState<ISODateString | undefined>(undefined);
  const [statusFilter, setStatusFilter] = useState<Status | undefined>(
    undefined,
  );

  const handleDateChange = (newDate: Date | null | undefined) => {
    // setDateFilter(toISODateStringOrUndefined(newDate));
    // idk why it เลื่อนไปข้างหลังวันนึง
    newDate?.setDate(newDate.getDate() + 1);
    setQuery("date", toISODateStringOrNull(newDate));
    newDate?.setDate(newDate.getDate() - 1);
  };
  return (
    <div>
      <div className={styles.filter}>
            <h2>ประวัติการจองอุปกรณ์</h2>
        <div className={styles.filter_action}>
            <div className="">
              <SearchBar placeholder="ตัวกรองค้นหา"></SearchBar>
        </div>
        <DatePicker
          placeholder="ค้นหาจากวันที่"
          required={true}
          onChange={handleDateChange}
        ></DatePicker>
        <Select
          placeholder="ตัวกรองสถานะ"
          onChange={(newValue) => {
            setStatusFilter(newValue as Status | undefined);
            setQuery("status", newValue as Status | null);
          }}
          value={statusFilter}
          options={Object.keys(Status)}
        ></Select>
      </div>
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
