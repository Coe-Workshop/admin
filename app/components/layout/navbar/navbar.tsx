"use client";

import NavSlide from "@/app/components/layout/navbar/navslide";
import useDisclosure from "@/app/hook/useDisclosure";
import { prefix } from "@/app/utils/prefix";
import IconSvgMono from "@/app/components/Icon/SvgIcon";
import Image from "next/image";
import Link from "next/link";
import styles from "./navbar.module.scss";
import { AdminProps, BlogProps, MenuMapProps } from "./types";
import CreateItem from "../../modal/create_item/create";
import { ModalContainer } from "../../modal/modalContainer/modalContainer";
function Navbar() {
  const { opened, handle } = useDisclosure();
  const { opened: createItem, handle: handlecreateItem } = useDisclosure();
  const menuMapProps: MenuMapProps[] = [
    { title: "Quick Create", path: "/create" },
    { title: "Transaction", path: "/transaction" },
    { title: "Tools", path: "/tools" },
  ];
  const BlogList: BlogProps[] = [
    {
      cover: "/navbar/transaction.svg",
      title: "Transaction",
      url: "/transaction",
    },
    {
      cover: "/navbar/tools.svg",
      title: "Tools",
      url: "/tools",
    },
    {
      cover: "/navbar/account.svg",
      title: "Account",
      url: "/account",
    },
  ];

  const Admin: AdminProps = {
    profile: `${prefix}/navbar/admin.svg`,
    title: "Admin",
    name: "username",
    email: "Email@example.com",
    icon: `${prefix}/Navbar/meatBalls.svg`,
  };

  const menuBlog = BlogList.map((item, index) => {
    return (
      <Link key={index} className={styles.button_list} href={item.url}>
        <IconSvgMono
          className={styles.blog_image}
          src={`${prefix}${item.cover}`}
          width={22}
          height={22}
          alt={item.title}
        ></IconSvgMono>
        <h3>{item.title}</h3>
      </Link>
    );
  });

  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.navbar_inner}>
          <div>
            <Link href={"/"} className={styles.logo}>
              <p className={styles.logo_mark}>EN</p>
              <p className={styles.logo_dot}>.W</p>
              <p className={styles.logo_status}>Admin</p>
            </Link>
          </div>
          <div className={styles.box}>
            <button
              className={styles.button_create}
              onClick={() => handlecreateItem.open()}
            >
              <Image
                className={styles.action_plus}
                width={120}
                height={120}
                alt="plus_icon"
                src={`${prefix}/navbar/plus.svg`}
              ></Image>
              <h3 className={styles.quickCreate}>Quick Create</h3>
            </button>
            <div onClick={() => handle.open()}>
              <IconSvgMono
                className={styles.action_hamberger}
                width={120}
                height={120}
                alt="hamberger_icon"
                src={`${prefix}/navbar/hamberger.svg`}
              ></IconSvgMono>
            </div>
            {menuBlog}
          </div>
        </div>
        <div className={styles.tab_admin}>
          <div className={styles.admin}>
            <Image
              className={styles.blog_icon}
              src={`${prefix}${Admin.profile}`}
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
            src={`${prefix}${Admin.icon}`}
            width={20}
            height={20}
            alt={Admin.title}
          ></Image>
        </div>
        <ModalContainer opened={opened} onClose={handle.close}>
          <NavSlide
            menuMapPropsList={menuMapProps}
            onClose={handle.close}
          ></NavSlide>
        </ModalContainer>
      </div>
      <div>
        <ModalContainer
          opened={createItem}
          onClose={() => handlecreateItem.close()}
        >
          <CreateItem onClose={() => handlecreateItem.close()}></CreateItem>
        </ModalContainer>
      </div>
    </>
  );
}

export default Navbar;
//
