"use client";
import styles from "./create.module.scss"
import { useState } from "react";
import { Category, crateProps } from "./types";

function CreateItem() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState<Category | "">("");
    const [images, setImages] = useState<File[]>([]);
    const [submitting, setSubmitting] = useState(false);
    const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        const filteredFiles: File[] = [];

        for (const file of files) {
            if (file.size > MAX_FILE_SIZE) {
                alert(`เกิดข้อผิดพลาดในการอัพโหลดไฟล์`);
                continue;
            }
            filteredFiles.push(file);
        }

        setImages(prev => [...prev, ...filteredFiles]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        const newItem: crateProps = {
            name,
            description,
            category,
            image: images.map(file => file.name).join(", ")
        };

        try {
            console.log("Submitting:", newItem);

            setName("");
            setDescription("");
            setCategory("");
            setImages([]);

        } catch (error) {
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.content}>

                        <div className={styles.formSection}>
                            <h2>สร้างอุปกรณ์รายการใหม่</h2>
                            <p>หรือข้อมูล และตารางข้อมูลสำหรับจัดการหมวดหมู่ของโปรเจกต์</p>

                            <div className={styles.field}>
                                <label htmlFor="name">ชื่ออุปกรณ์<span>*</span></label>
                                <input
                                    id="name"
                                    type="text"
                                    className={styles.name}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="ระบุชื่ออุปกรณ์"
                                    required
                                    disabled={submitting}
                                />
                            </div>

                            <div className={styles.field}>
                                <label htmlFor="description">คำอธิบาย</label>
                                <textarea
                                    id="description"
                                    className={styles.description}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="ระบุคำอธิบาย"
                                    disabled={submitting}
                                />
                            </div>

                            <div className={styles.field}>
                                <label>หมวดหมู่</label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value as Category)}
                                    disabled={submitting}
                                    required
                                >
                                    <option value="" disabled>ยังไม่ได้เลือกหมวดหมู่ใดๆ</option>
                                    {Object.values(Category).map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat.replace("_", " ")}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className={styles.rightSection}>

                            <div className={styles.imageBox}>
                                <label htmlFor="image">ไฟล์ภาพ</label>
                                <input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleFileChange}
                                    disabled={submitting}
                                />

                                {images.length > 0 && (
                                    <ul>
                                        {images.map((file, index) => (
                                            <li key={index}>📎 {file.name}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            <button type="submit" disabled={submitting}>
                                {submitting ? "กำลังบันทึก..." : "บันทึก"}
                            </button>
                        </div>
                        </div>


                    </form>

            </div>
        </div>
    );
}

export default CreateItem;
