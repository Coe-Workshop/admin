import { ModalConfirmProps } from "./types";
import styles from "./confirmModal.module.scss";

const ModalConfirmPopup = ({
  title,
  description,
  action,
  confirmTypes,
}: ModalConfirmProps) => {
  return (
    <div>
      <div>
        <h1>{title}</h1>
        {description && <h2>{description}</h2>}
      </div>
      <form action="" onSubmit={action}>
        <div>
          <button type="button"></button>
          <button type="submit"></button>
        </div>
      </form>
    </div>
  );
};

export default ModalConfirmPopup;
