import { ItemBlogProps } from "./ItemBlog.types";
import Image from "next/image";
import IconSvgMono from "../../Icon/SvgIcon";
import styles from "./ItemBlog.module.scss";
export const ItemBlog = ({
  name,
  description = "",
  avaliable,
  quatity,
  imageUrl,
}: ItemBlogProps) => {
  return (
    <button>
      <div>
        <Image src="" width={200} height={200} alt={name}></Image>
      </div>
      <section>
        <div>
          <h2>{name}</h2>
          <p>
            {description.length > 20 ? description.slice(0, 20) : description}
          </p>
          <div>
            <h3>{avaliable}</h3>
            <h3>{quatity}</h3>
          </div>
        </div>
        <div>
          <IconSvgMono
            src="./icon/dot.svg"
            width={14}
            height={14}
            alt="dot"
          ></IconSvgMono>
        </div>
      </section>
    </button>
  );
};
