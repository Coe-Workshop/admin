// page.jsx
import React from "react";
import styles from "./testnav.module.scss";

function page() {
  return (
    <div className={styles.testnav}>
      <h1>หน้าทดสอบการเลื่อน</h1>

      <section className={styles.section}>
        <h2>Section 1</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Section 2</h2>
        <p>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Section 3</h2>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Section 4</h2>
        <p>
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
          officia deserunt mollit anim id est laborum.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Section 5</h2>
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Section 6</h2>
        <p>
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
          fugit, sed quia consequuntur magni dolores.
        </p>
      </section>

      <div className={styles.footer}>
        <p>สิ้นสุดหน้า - ทดสอบเลื่อนสำเร็จ ✓</p>
      </div>
    </div>
  );
}

export default page;
