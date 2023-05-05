import React from "react";
import { useState } from "react";
import styles from "./Search.module.css";
import Link from "next/link";

export default function Search({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form className={styles.header} onSubmit={handleSubmit}>
      <Link href={"/searchScreen"}>
        {/* <img className={styles.header__logo} src="./searchpngs/logo.png" /> */}
        <img
          className={styles.header__logo}
          src="https://i.imgur.com/ZuQjVcx.png"
        />
      </Link>

      <input
        type="text"
        value={searchTerm}
        className={styles.header__searchInput}
        onChange={handleInputChange}
      />
      <button type="submit" className={styles.header__search}>
        <img src="https://i.imgur.com/pa0HqqX.png" />
        {/* <img src={search} /> */}
      </button>
      <div className={styles.header__filter}>
        <p>Filter</p>
      </div>
      <div className={styles.header__right}>
        <a className={styles.header__rightimg}>
          <img src="https://i.imgur.com/dPRZSgg.png" alt="" />
          {/* <img src={pound} /> */}
        </a>
        <a className={styles.header__rightimg}>
          <img src="https://i.imgur.com/n70msJB.png" alt="" />
          {/* <img src={language} /> */}
        </a>
        <Link href={"/favOwnedListingPage"} className={styles.header__rightimg}>
          <img src="https://i.imgur.com/9uzHgBY.png" alt="" />
        </Link>
        <Link href={"/profilePage"} className={styles.header__rightimg}>
          <img src="https://i.imgur.com/3vNcZYs.png" alt="" />
          {/* <img src={profile} /> */}
        </Link>
      </div>
    </form>
  );
}
