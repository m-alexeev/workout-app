import React from "react";
import { View } from "react-native";
import CustomText from "../../../components/atoms/CustomText";
import { useTheme } from "../../../contexts/theme";

export interface IRecordsProps {}

const Records: React.FC<IRecordsProps> = () => {
  const { theme } = useTheme();

  return (
    <View>
      <CustomText>Records</CustomText>
    </View>
  );
};

export default Records;
