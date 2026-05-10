import { Alert } from "react-native";

type ConfirmOptions = {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
};

export const useConfirm = () => {
  const confirm = ({
    title = "Confirm",
    message,
    confirmText = "Yes",
    cancelText = "Cancel",
    onConfirm,
  }: ConfirmOptions) => {
    Alert.alert(title, message, [
      {
        text: cancelText,
        style: "cancel",
      },
      {
        text: confirmText,
        onPress: onConfirm,
      },
    ]);
  };

  return { confirm };
};
