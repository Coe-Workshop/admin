"use client";

import styles from "./Navbar.module.scss";
import Image from "next/image";
import Link from "next/link";
import useDisclosure from "@/app/hook/useDisclosure";
import ModalContainer from "../NavbarContainer/modalContainer";
import NavSlide from "./navslide";
import Modal from "@/app/components/ui/modal/modal";
import {useModal} from "@/app/hook/useModal";

function Navbar() {
  const { opened, handle } = useDisclosure();
  const { modalState, handle:handleModal } = useModal();
  const menuMapProps: MenuMapProps[] = [
    { title: "Quick Create", path: "/create" },
    { title: "Transaction", path: "/transaction" },
    { title: "Tools", path: "/tools" },
  ];
  const BlogList: BlogProps[] = [
    {
      cover: "/Navbar/transaction.svg",
      title: "Transaction",
      url: "/transaction",
    },
    {
      cover: "/Navbar/tools.svg",
      title: "Tools",
      url: "/tools",
    },
    {
      cover: "/Navbar/account.svg",
      title: "Account ManageMent",
      url: "/account",
    },
  ];

  const Admin: AdminProps = {
    profile: "/Navbar/admin.svg",
    title: "Admin",
    name: "username",
    email: "Email@example.com",
    icon: "/Navbar/meatBalls.svg",
  };

  const menuBlog = BlogList.map((item, index) => {
    return (
      <div key={index} className={styles.button_list}>
        <Image
          className={styles.blog_image}
          src={item.cover}
          width={22}
          height={22}
          alt={item.title}
        ></Image>
        <Link href={item.url}>{item.title}</Link>
      </div>
    );
  });

  return (
    <div className={styles.navbar}>
      <Modal modalState={modalState} onClose={handle.close}></Modal>
      <div className={styles.navbar_inner}>
        <div>
          <div className={styles.logo}>
            <p className={styles.logo_mark}>EN</p>
            <p className={styles.logo_dot}>.W</p>
            <p className={styles.logo_status}>Admin</p>
          </div>
        </div>
        <div className={styles.box}>
          <button className={styles.button_create} onClick={()=> handleModal.open("create")}>
            <Image
              className={styles.action_plus}
              width={22}
              height={22}
              alt="plus_icon"
              src={"/Navbar/plus.svg"}
            ></Image>
            <p className={styles.text}>Quick Create</p>
          </button>
          <Image
            onClick={() => handle.open()}
            className={styles.action_hamberger}
            width={120}
            height={120}
            alt="hamberger_icon"
            src={"/Navbar/hamberger.svg"}
          ></Image>
          {menuBlog}
        </div>
      </div>
      <div className={styles.tab_admin}>
        <div className={styles.admin}>
          <Image
            className={styles.blog_icon}
            src={Admin.profile}
            width={40}
            height={40}
            alt={Admin.title}
          ></Image>
          <div>
            <p className={styles.name}>{Admin.name}</p>
            <p className={styles.email}>{Admin.email}</p>
          </div>
        </div>
        <Image
          className={styles.blog_icon}
          src={Admin.icon}
          width={20}
          height={20}
          alt={Admin.title}
        ></Image>
      </div>
      <ModalContainer margin="0" opened={opened} onClose={handle.close}>
        <NavSlide
          menuMapPropsList={menuMapProps}
          onClose={handle.close}
        ></NavSlide>
      </ModalContainer>
    </div>
  );
}

export default Navbar;
