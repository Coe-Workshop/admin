"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Tools.module.scss";
import Pagination from "@/app/components/ui/pagination/pagination";
import SearchBar from "../filters/serchBar/serchBar";
import CategoryFilter from "../filters/categoryFilter/categoryFilter";
function ToolsAction({
  url,
  title,
  description,
  available,
  quatity,
}: ToolsMatches) {
  return (
    <div className={styles.column_layout}>
      <div className={styles.box_products}>
        <Image
          src={url}
          alt={title}
          width={80}
          height={80}
          className={styles.img}
        />
        <div className={styles.tab}>
          <div className={styles.details}>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
          <Image
            src={"/Tools/operator.svg"}
            alt={"tool"}
            width={30}
            height={30}
            className={styles.operator}
          />
        </div>
      </div>
      <div className={styles.stoke}>
        <h3>{available}</h3>
        <h4>/ {quatity}</h4>
      </div>
    </div>
  );
}

function Tools() {
  const [tools, setTools] = useState<ToolsMatches[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchItem, setSearchItem] = useState<string>("");
  const itemPerPage = 15;
  const filterTools = tools.filter((tool) => {
    const matchCategory = selectedCategory
      ? tool.category === selectedCategory
      : true;

    const matchSearch = searchItem
      ? tool.title.toLowerCase().includes(searchItem.toLowerCase())
      : true;

    return matchCategory && matchSearch;
  });
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = filterTools.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filterTools.length / itemPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearch = (term: string) => {
    setSearchItem(term);
    setCurrentPage(1);
  };

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setTools(data));
  }, []);
  return (
    <div className={styles.page_container}>
      <div className={styles.title_banner}>
        <div className={styles.title_layout}>
          <h1>Tools List</h1>
        </div>
        <div className={styles.filters}>
          <SearchBar onSearch={handleSearch} placeholder="Search by name ..." />
          <CategoryFilter onCategoryChange={handleCategoryChange} />
        </div>
      </div>
      <div className={styles.box}>
        {currentItems.map((item, id) => (
          <ToolsAction
            key={id}
            url={item.image}
            title={item.category}
            description={item.title}
            available={item.rating?.count - 1 || 0} //ค่อยแก้ตอนดึงข้อมูล
            quatity={item.rating?.count || 0}
          ></ToolsAction>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="pagination_wrapper">
          <Pagination
            total={totalPages}
            currentPage={currentPage}
            onChange={handlePageChange}
            siblings={1}
            boundaries={1}
          />
        </div>
      )}
    </div>
  );
}
export default Tools;
