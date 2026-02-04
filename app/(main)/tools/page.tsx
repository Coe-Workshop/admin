"use client";

import { useEffect } from "react";
import { useGetToolsQuery } from "@/lib/features/api/tools/toolsApiSlice";
import styles from "./tool.module.scss";
import { ItemBlogProps } from "@/app/components/ui/ItemBlog/ItemBlog.types";
import { ItemBlog } from "@/app/components/ui/ItemBlog/ItemBlog";
const Tools = () => {
  const { data: toolsInfo } = useGetToolsQuery();

  useEffect(() => {
    const tools = JSON.stringify(Tools);
    console.log("data" + tools);
  }, [toolsInfo]);

  return (
    <div>
      <div>
        <h2>อุปกรณ์ทั้งหมด</h2>
      </div>
      <div className={styles.tools}>
        {toolsInfo?.map((t) => (
          <ItemBlog
            key={t.id}
            id={t.id}
            name={t.name}
            description={t.description ?? ""}
            avaliable={0}
            quatity={0}
            imageUrl={t.imageUrl ?? ""}
          ></ItemBlog>
          // <div key={t.id}>
          //   <h2>{t.name}</h2>
          //   <p>{t.description}</p>
          //   <div>
          //     <span>{t.avaliable}</span>
          //     <span>/</span>
          //     <span>{t.quatity}</span>
          //   </div>
          // </div>
        ))}
      </div>
    </div>
  );
};

export default Tools;
