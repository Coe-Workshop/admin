"use client";
import styles from "./Tools.module.scss";
import { ToggleSegment } from "@/app/components/form/ToggleSegment/ToggleSegment";
import { useState } from "react";

const mockTool: ToolsList = {
  name: "SPECTROMETER X-9",
  status: "OPTIMAL",
  description: "A definitive standard in analytical measurements.The Spectrometer X-9 integrates quantum-well detection with thermal stabilization for unprecedented spectral purity. Engineered for researchers who demand structural integrity in every data point.",
  available: 2,
  total: 5,
  category: "ANALYTICAL TOOLS",
  location: "NODE ALPHA",
  class: "GRADE IV",
  imageUrl: "/TestTools/Tools.svg",
};

function Tools() {
    const [selected, setSelected] = useState("select1");

    return (
    <div className={styles.column_layout}>
        <div className={styles.column_left}>
            <img src={mockTool.imageUrl} alt={mockTool.name} className={styles.tool_image} />
        </div>
        <div className={styles.column_right}>
            <ToggleSegment
                value={selected}
                onChange={setSelected}
                data={[
                    "select1" ,
                     "selct2" ,
                     "ทดสอบความยาว 101 "
                ]}
            />
            <li>OPERATIONAL STATUS: {mockTool.status}</li>
            <h1>{mockTool.name}</h1>
            <h2>{mockTool.description}</h2>
            <div className={styles.info_layout}>
                <div className={styles.info_container}>
                    <div>
                        <h3>AVAILABILITY</h3>
                        <h4>{mockTool.available} <span>/ {mockTool.total} TOTAL AVAILABLE</span> </h4>
                    </div>
                    <div>
                        <h3>LOCATION</h3>
                        <h4>{mockTool.location}</h4> 
                    </div>
                </div>
                <div className={styles.info_container}>
                    <div>  
                        <h3>CATEGORY</h3>
                        <h4>{mockTool.category}</h4>   
                    </div>
                    <div>
                        <h3>PRECISION CLASS</h3>
                        <h4>{mockTool.class}</h4>
                    </div>
                </div>
            </div>
            <div className={styles.button_layout}>
                <button className={styles.request_button}>
                    <h3>REQUEST <br /> ALLOCATION</h3>
                </button>
                <button className={styles.documentation_button}>
                    <h3>DOCUMENTATION</h3>
                </button>
            </div>
        </div>
    </div>
  );
}
export default Tools;