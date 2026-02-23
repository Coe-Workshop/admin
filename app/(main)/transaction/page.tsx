import { Suspense } from "react";
import { Transaction } from "./transactionClient";
const PageTransaction = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Transaction />
    </Suspense>
  );
};
export default PageTransaction;
