import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSearch } from "../../contexts/search";
import { useTheme } from "../../contexts/theme";
import CustomInputText from "../atoms/CustomInputText";
import CustomText from "../atoms/CustomText";
import IconButton from "../atoms/IconButton";
import SearchBarInput from "../atoms/SeachBarInput";

export interface ITitleBarProps extends NativeStackHeaderProps {
  title: string;
  search?: boolean;
  optionsMenu?: any;
}

const TitleBar: React.FC<ITitleBarProps> = ({
  title,
  optionsMenu,
  search,
  ...props
}) => {
  const { theme } = useTheme();
  const {searchQuery, updateSearch} = useSearch();
  const navigation = props.navigation;

  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);


  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      {props.back && (
        <IconButton
          style={{
            justifyContent: "center",
            marginVertical: "auto",
            marginRight: 5,
          }}
          iconName="arrow-left"
          color={theme.text_primary}
          size={16}
          onPress={() => navigation.goBack()}
        />
      )}
      <CustomText style={[styles.title, { color: theme.text_primary }]}>
        {title}
      </CustomText>
      <View>{showSearchBar && <SearchBarInput onCancel={() => updateSearch("")}/>}</View>
      <View style={styles.icons_container}>
        <View style={styles.icons}>
          {search && (
            <IconButton
              size={16}
              iconName={showSearchBar ? "close" : 'search'}
              onPress={() => {
                setShowSearchBar(!showSearchBar)
                updateSearch("");
              }}
            />
          )}
          {optionsMenu}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 10,
    justifyContent: "space-between",
    padding: 10,
  },
  icons_container: {
    justifyContent: 'flex-end',
    marginVertical: "auto",
  },
  icons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    marginVertical: "auto",
    justifyContent: "center",
  },
});

export default TitleBar;
