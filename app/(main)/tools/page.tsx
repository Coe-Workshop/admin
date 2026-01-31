"use client";

import { useEffect } from "react";
import { useGetToolsQuery } from "@/lib/features/api/tools/toolsApiSlice";
import Tool from "./test/page";
const Tools = () => {
  const { data: Tools } = useGetToolsQuery();

  useEffect(() => {
    const tools = JSON.stringify(Tools);
    console.log("data" + tools);
  }, [Tools]);

  return <div>Hello tool</div>;
};

export default Tools;
