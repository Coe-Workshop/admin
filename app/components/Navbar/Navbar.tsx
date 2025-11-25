import styles from './Navbar.module.scss';
import Image from "next/image";
import Link from "next/link";

function Blog({ Cover, Title, Url}: BlogProps) {
    return (
        <div className={styles.button_list}>
            <Image
                className={styles.blog_image}
                src={Cover}
                width={22}
                height={22}
                alt={Title}
                ></Image>
            <Link href={Url}>{Title}</Link>
            </div>
    )
}

function Navbar() {
    const BlogList: BlogProps[] = [
        {
            Cover: "/Navbar/transaction.png",
            Title: "Transaction",
            Url: "/transaction",
        },
        {
            Cover: "/Navbar/tools.png",
            Title: "Tools",
            Url: "/tools",
        },
        {
            Cover: "/Navbar/account.png",
            Title: "Account ManageMent",
            Url: "/account",
        },
    ];

    const Admin:AdminProps = {
        ProFile: "/Navbar/admin.jpg",
        Title: "Admin",
        Name: "username",
        Email: "Email@example.com",
        Icon: '/Navbar/meatBalls.png'
    };

    return (
        <div className={styles.navbar}>
            <div className={styles.navbar_inner}>
                <div>
                    <div className={styles.logo}>
                        <p className={styles.logo_mark}>EN</p>
                        <p className={styles.logo_dot}>.W</p>
                        <p className={styles.logo_status}>Admin</p>
                    </div>
                </div>
                <div className={styles.box}>
                    <div className={styles.button}>
                        <p className={styles.plus}>+</p>
                        <p className={styles.text}>Quick Create</p>
                    </div>
                    {BlogList.map((item,index) => (
                        <Blog
                            key={index}
                            Cover = {item.Cover}
                            Title =  {item.Title}
                            Url = {item.Url}
                        ></Blog>
                    ))}
                </div>
            </div>
            <div className={styles.tab_admin}>
                <div className={styles.admin}>
                    <Image
                        className={styles.blog_icon}
                        src={Admin.ProFile}
                        width={40}
                        height={40}
                        alt={Admin.Title}
                    ></Image>
                    <div>
                        <p className={styles.name}>{Admin.Name}</p>
                        <p className={styles.email}>{Admin.Email}</p>
                    </div>
                </div>
                <Image
                    className={styles.blog_icon}
                    src={Admin.Icon}
                    width={30}
                    height={30}
                    alt={Admin.Title}
                ></Image>
            </div>
        </div>
    );
}

export default Navbar;