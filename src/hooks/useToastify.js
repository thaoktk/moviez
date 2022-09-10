import { useToast } from "@chakra-ui/react";

function useToastify() {
  const toast = useToast();

  const showToast = (value) =>
    toast({
      ...value,
      position: "top-right",
      duration: 7000,
      isClosable: true,
    });

  return showToast;
}

export default useToastify;
