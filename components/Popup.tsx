// components/Popup.tsx
import React, { FC } from "react";
import { Modal, ModalProps } from "react-native";
import Button from "./Button";
import Card from "./Card";
import ErrorMessage from "./ErrorMessage";
import Text from "./Text";
import Wrapper from "./Wrapper";

type PopupProps = ModalProps & {
  title: string;
  message?: string;
  error?: string;
  loading?: boolean;
  onConfirm?: () => void;
  onRequestClose: () => void; // Dibuat wajib agar popup bisa ditutup
};

const Popup: FC<PopupProps> = ({
  title,
  message,
  onConfirm,
  loading,
  error,
  onRequestClose,
  ...props
}) => {
  return (
    <Modal
      animationType="fade"
      transparent
      statusBarTranslucent
      onRequestClose={onRequestClose}
      {...props}
    >
      <Wrapper
        alignItems="center"
        justifyContent="center"
        padding={30}
        flex={1}
        backgroundColor={"rgba(0,0,0,0.7)"}
      >
        <Card
          wrapperStyle={{ width: "100%" }}
          header={<Text variant="menutitle">{title}</Text>}
          footer={
            <Wrapper flexDirection="row" gap={10}>
              <Button
                label="Batal"
                color="base"
                style={{ flex: 1 }}
                onPress={onRequestClose}
              />
              <Button
                label="Lanjut"
                style={{ flex: 1 }}
                loading={loading}
                onPress={onConfirm}
              />
            </Wrapper>
          }
        >
          {error && <ErrorMessage message={error} />}
          {message && <Text variant="label">{message}</Text>}
        </Card>
      </Wrapper>
    </Modal>
  );
};

export default Popup;