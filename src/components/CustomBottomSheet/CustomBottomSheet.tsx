import React, {
  useMemo,
  ReactNode,
  createRef,
  useImperativeHandle,
} from "react";

import BottomSheet, { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";

import { CustomBackdrop } from "./CustonBackDrop";
import { View } from "react-native";
import { theme } from "native-base";

export type MyBottonShetHandle = {
  handleParentCloseBottonShet: () => void;
  handleParentOpenBottonShet: () => void;
};

interface MyBottonShetProps {
  children: ReactNode;
  height: number;
  hasImageOnTop?: boolean;
}

export const CustomBottomSheet = React.forwardRef<
  MyBottonShetHandle,
  MyBottonShetProps
>(({ children, height, hasImageOnTop = false }, ref) => {
  const snapPoints = useMemo(() => [0.01, height], [height]);

  const bottomSheetRef = createRef<BottomSheet>();

  const handleCloseBottonShet = () => {
    bottomSheetRef.current?.collapse();
  };
  const handleOpenBottonShet = () => {
    bottomSheetRef.current?.expand();
  };

  useImperativeHandle(ref, () => ({
    handleParentCloseBottonShet() {
      handleCloseBottonShet();
    },
    handleParentOpenBottonShet() {
      handleOpenBottonShet();
    },
  }));

  const renderBackdrop = (props: BottomSheetBackdropProps) => (
    <CustomBackdrop onPress={() => handleCloseBottonShet()} {...props} />
  );

  return (
    <BottomSheet
      index={0}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      snapPoints={snapPoints}
      detached
      ref={bottomSheetRef}
      style={{
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: "hidden",
      }}
      handleIndicatorStyle={{
        backgroundColor: theme.colors.gray[400],
        width: 81,
        height: 9,
      }}
      handleStyle={
        hasImageOnTop ? { position: "absolute", right: 0, left: 0 } : null
      }
    >
      <View
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        {children}
      </View>
    </BottomSheet>
  );
});
