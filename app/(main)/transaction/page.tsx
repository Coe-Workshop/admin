"use client";

import { AdminTransaction } from "@/app/components/ui/adminTransaction/adminTransaction";
import { ResponseStatus } from "@/app/components/ui/adminTransaction/adminTransaction.type";
import { useState } from "react";
const Transaction = () => {
  const [responseStatus, setResponseStatus] = useState<ResponseStatus>(
    ResponseStatus.Approve,
  );
  const [message, setMessage] = useState<string>("");
  const hadleStutusChange = () => {
    console.log("submit");
  };
  return (
    <div>
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
