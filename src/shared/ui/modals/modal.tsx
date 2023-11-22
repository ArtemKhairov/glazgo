import { Modal } from "antd";
import { FC, ReactNode } from "react";

interface ModalWindowProps {
  title?: string;
  children: ReactNode;
  onCancel(): void;
  open: boolean;
}

const ModalWindow: FC<ModalWindowProps> = ({
  children,
  title,
  onCancel,
  open,
}) => {
  return (
    <Modal
      onCancel={onCancel}
      open={open}
      title={title ?? "Заголовок модального окна"}
    >
      {children}
    </Modal>
  );
};

export { ModalWindow };
