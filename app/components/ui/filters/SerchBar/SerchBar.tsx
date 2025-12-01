// "use client";
// import { useState } from "react";
// import styles from "./SerchBar.module.scss";
// import Image from "next/image";
//
// interface SearchBarProps {
//     onSearch: (searchTerm: string) => void;
//     placeholder?: string;
// }
//
// function SearchBar({ onSearch, placeholder = "Search by name ..." }: SearchBarProps) {
//     const [searchItem, setSearchItem] = useState("");
//
//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const value = e.target.value;
//         setSearchItem(value);
//         onSearch(value);
//     };
//
//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         onSearch(searchItem);
//     };
//
//
//     return (
//         <form onSubmit={handleSubmit} className={styles.searchForm}>
//             <div className={styles.searchContainer}>
//                 <Image
//                     src={"/Tools/serch.svg"}
//                     alt={"serch icon"}
//                     width={20}
//                     height={20}
//                     className={styles.img}
//                 />
//                 <input
//                     type="text"
//                     value={searchItem}
//                     onChange={handleChange}
//                     placeholder={placeholder}
//                     className={styles.searchInput}
//                 />
//             </div>
//         </form>
//     );
// }
//
// export default SearchBar;