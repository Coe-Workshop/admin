"use client";
import { useEffect, useState } from "react";
import styles from "./categoryFilter.module.scss";

function CategoryFilter({
                            onCategoryChange,
                        }: {
    onCategoryChange: (category: string | null) => void;
}) {
    const [categories, setCategories] = useState<string[]>([]);
    const [selected, setSelected] = useState<string>("");

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then((data: ToolsMatches[]) => {
                const eachCategory = [...new Set(data.map((item) => item.category))];
                setCategories(eachCategory);
            });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelected(value);
        onCategoryChange(value || null);
    };

    return (
        <div className={styles.container}>
            <select value={selected} onChange={handleChange} className={styles.select}>
                <option value="">Category</option>
                {categories.map((cat, index) => (
                    <option key={index} value={cat}>
                        {cat}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default CategoryFilter;
