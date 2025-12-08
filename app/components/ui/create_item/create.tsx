"use client";
import styles from "./create.module.scss"
import { useState } from "react";
import {Category, crateProps} from "./types";
import Image from "next/image";
import imageCompression from "browser-image-compression";

function CreateItem({ onCancel , onSubmit}: { onCancel: () => void , onSubmit?: (formData: FormData) => void })  {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState<Category | "">("");
    const [images, setImages] = useState<File[]>([]);
    const [submitting, setSubmitting] = useState(false);
    const [uploadStatus, setUploadStatus] = useState<{
        [key: string]: "compressing" | "done" | "error"
    }>({});
    const [tempFiles, setTempFiles] = useState<File[]>([]);
    const [fileError, setFileError] = useState("");

    const [errors, setErrors] = useState({
        name: "",
        category: ""
    });

    const formatFilename = (name: string, containerWidth = 290) => {
        const maxLength = Math.floor(containerWidth / 10);
        if (name.length <= maxLength) return name;

        const ext = name.substring(name.lastIndexOf("."));
        const slicedName = name.substring(0, maxLength - ext.length - 3);

        return `${slicedName}...${ext}`;
    };

    const handleFileChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        if (files.length === 0) return;

        const duplicates = files.filter(file =>
            images.some(f => f.name === file.name) ||
            tempFiles.some(f => f.name === file.name)
        );

        const newFiles = files.filter(file =>
            !images.some(f => f.name === file.name) &&
            !tempFiles.some(f => f.name === file.name)
        );

        if (duplicates.length > 0) {
            setFileError(``);

            setTempFiles(prev => [...prev, ...duplicates]);

            const errorStatus: typeof uploadStatus = {};
            duplicates.forEach(file => {
                errorStatus[file.name] = "error";
            });
            setUploadStatus(prev => ({ ...prev, ...errorStatus }));
        }

        if (newFiles.length === 0) {
            e.target.value = "";
            return;
        }

        const newStatus: typeof uploadStatus = {};
        newFiles.forEach(file => newStatus[file.name] = "compressing");
        setUploadStatus(prev => ({ ...prev, ...newStatus }));

        e.target.value = "";

        setTempFiles(prev => [...prev, ...newFiles]);

        await new Promise(resolve => setTimeout(resolve, 0));

        const processedFiles: File[] = [];
        for (const file of newFiles) {
            try {
                const options = {
                    maxSizeMB: 10,
                    maxWidthOrHeight: 1920,
                    useWebWorker: true
                };

                const compressedFile = await imageCompression(file, options);

                processedFiles.push(
                    new File([compressedFile], file.name, { type: file.type })
                );

                setUploadStatus(prev => ({
                    ...prev,
                    [file.name]: "done"
                }));
            } catch (err) {
                console.error(err);
                setUploadStatus(prev => ({
                    ...prev,
                    [file.name]: "error"
                }));
            }
        }

        setImages(prev => [...prev, ...processedFiles]);
    };

    const handleRemoveFile = (fileName: string) => {
        setTempFiles(prev => prev.filter(f => f.name !== fileName));

        setImages(prev => prev.filter(f => f.name !== fileName));

        setUploadStatus(prev => {
            const newStatus = { ...prev };
            delete newStatus[fileName];
            return newStatus;
        });
    };

    const validateForm = (): boolean => {
        const newErrors = {
            name: "",
            category: ""
        };

        if (!name.trim()) {
            newErrors.name = "กรุณากรอกชื่ออุปกรณ์";
        }

        if (!category) {
            newErrors.category = "กรุณาเลือกหมวดหมู่";
        }

        setErrors(newErrors);

        return !newErrors.name && !newErrors.category;
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        if (errors.name) {
            setErrors(prev => ({ ...prev, name: "" }));
        }
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.target.value as Category);
        if (errors.category) {
            setErrors(prev => ({ ...prev, category: "" }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setSubmitting(true);

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("category", category);

        images.forEach(file => {
            formData.append("images", file);
        });

        try {
            if (onSubmit) {
                onSubmit(formData);
            }
            console.log("Submitting:", formData);

            setName("");
            setDescription("");
            setCategory("");
            setImages([]);
            setTempFiles([]);
            setUploadStatus({});
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
                                    className={`${styles.name} ${errors.name ? styles.error : ''}`}
                                    value={name}
                                    onChange={handleNameChange}
                                    placeholder="ระบุชื่ออุปกรณ์"
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
                                <label>หมวดหมู่<span>*</span></label>
                                <select
                                    value={category}
                                    onChange={handleCategoryChange}
                                    disabled={submitting}
                                    className={`${styles.option} ${errors.category ? styles.error : ''}`}
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
                            <div className={`${tempFiles.length === 0 ? styles.imageBox : styles.imageBoxPreview}`}>
                                {tempFiles.length === 0 ? (
                                    <>
                                        <div>
                                            <Image
                                                src={"/create-item/upload.svg"}
                                                alt="upload"
                                                width={80}
                                                height={80}
                                                className={styles.image}
                                            />
                                            <p className={styles.uploadText}>
                                                <span>เลือกไฟล์ภาพ </span>ของคุณเพื่ออัพโหลด
                                            </p>
                                            <p className={styles.text_size}>รองรับขนาดสูงสุด 10 MB</p>
                                        </div>

                                        <input
                                            id="image"
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={handleFileChange}
                                            disabled={submitting}
                                            className={styles.imageFileMain}
                                        />
                                    </>
                                ) : (
                                    <div>
                                        <div className={styles.fileList}>
                                            {tempFiles.map((file, index) => {
                                                const isError = uploadStatus[file.name] === "error";
                                                return (
                                                    <div
                                                        key={index}
                                                        className={`${styles.blog} ${isError ? styles.error : styles[uploadStatus[file.name]] || ''}`}
                                                    >
                                                        <div className={styles.detail}>
                                                            <Image
                                                                src={uploadStatus[file.name] === "error"
                                                                    ? "/create-item/error.svg"
                                                                    : "/create-item/image.svg"}
                                                                width={30}
                                                                height={30}
                                                                alt="error-image"
                                                            />
                                                            <div className={styles.text}>
                                                                <p>{formatFilename(file.name)}</p>
                                                                <p className={`${styles.status} ${uploadStatus[file.name] === "error" ? styles.error : ''}`}>
                                                                    {uploadStatus[file.name] === "compressing" && "กำลังบีบอัดไฟล์..."}
                                                                    {uploadStatus[file.name] === "done" && "อัปโหลดเสร็จสิ้น"}
                                                                    {uploadStatus[file.name] === "error" && "Error message"}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <Image
                                                            src={"/create-item/close.svg"}
                                                            width={10}
                                                            height={10}
                                                            alt="close-button"
                                                            onClick={() => handleRemoveFile(file.name)}
                                                            className={styles.removeButton}
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </div>


                                        <label htmlFor="image-upload" className={styles.button}>
                                            <Image
                                                src={"/create-item/button.svg"}
                                                alt="image"
                                                width={20}
                                                height={20}
                                                className={styles.image}
                                            />
                                            <p className={styles.uploadText}>
                                                อัพโหลดรูปภาพ
                                            </p>
                                        </label>

                                        <input
                                            id="image-upload"
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={handleFileChange}
                                            disabled={submitting}
                                            className={styles.imageFile}
                                            style={{ display: 'none' }}
                                        />
                                    </div>
                                )}
                            </div>

                            {(errors.name || errors.category) && (
                                <span className={styles.errorMessage}>
                                    ไม่สามารถสร้างรายการได้ : error message
                                </span>
                            )}

                            <div className={styles.buttonGroup}>
                                <button
                                    type="button"
                                    className={styles.cancelButton}
                                    disabled={submitting}
                                    onClick={onCancel}
                                >
                                    ยกเลิก
                                </button>

                                <button
                                    type="submit"
                                    className={styles.submitButton}
                                    disabled={submitting}
                                >
                                    {submitting ? "กำลังบันทึก..." : "บันทึก"}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

        </div>

    );
}

export default CreateItem;