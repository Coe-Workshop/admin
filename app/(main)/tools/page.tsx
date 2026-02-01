"use client";

import { useEffect } from "react";
import { useGetToolsQuery } from "@/lib/features/api/tools/toolsApiSlice";
import Tool from "./test/page";
const Tools = () => {
  const { data: toolsInfo } = useGetToolsQuery();

  useEffect(() => {
    const tools = JSON.stringify(Tools);
    console.log("data" + tools);
  }, [Tools]);

  return (
    <div>
      <div>
        <h2>อุปกรณ์ทั้งหมด</h2>
      </div>
      <div>
        {toolsInfo?.map((t) => (
          <div key={t?.assets_id}></div>
        ))}
      </div>
    </div>
  );
};

export default Tools;
