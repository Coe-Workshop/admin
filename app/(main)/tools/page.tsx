"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetToolsQuery } from "@/lib/features/tools/toolsApiSlice";
import styles from "./tool.module.scss";
import { ItemBlog } from "@/app/components/ui/ItemBlog/ItemBlog";
const Tools = () => {
  const { data: toolsInfo } = useGetToolsQuery();
  const router = useRouter();
  useEffect(() => {
    const tools = JSON.stringify(Tools);
  }, [toolsInfo]);

  return (
    <div>
      <div>
        <h2>อุปกรณ์ทั้งหมด</h2>
      </div>
      <div className={styles.tools}>
        {toolsInfo?.map((t) => (
          <div onClick={() => router && router.push(`/tools/${t.id}`)} key={t.id}>
            <ItemBlog
              key={t.id}
              id={t.id}
              name={t.name}
              description={t.description ?? ""}
              avaliable={0}
              quatity={0}
              imageUrl={t.imageUrl ?? ""}
            ></ItemBlog>
          </div>
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
