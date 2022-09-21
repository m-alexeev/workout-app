import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import React, { SetStateAction, useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { useSearch } from "../../contexts/search";
import { useTheme } from "../../contexts/theme";
import CustomText from "../atoms/CustomText";
import IconButton from "../atoms/IconButton";
import SearchBarInput from "../atoms/SeachBarInput";

export interface ITitleBarProps extends NativeStackHeaderProps {
  title: string;
  search?: boolean;
  titleBarOptions?: any;
}

export interface ITitleBarSearchProps {
  setShowSearchBar: React.Dispatch<SetStateAction<boolean>>;
}

const TitleBarSearch: React.FC<ITitleBarSearchProps> = ({
  setShowSearchBar,
}) => {
  const { theme } = useTheme();
  const { updateSearch } = useSearch();

  return (
    <View
    style={[styles.container, {flexGrow: 3, backgroundColor: theme.surface}]}
    >
      <IconButton

        iconName="arrow-back"
        size={18}
        onPress={() => {
          setShowSearchBar(false);
          updateSearch("");
        }}
      />
      <View>
        <SearchBarInput style={{fontSize: 16}} onCancel={() => updateSearch("")}></SearchBarInput>
      </View>
    </View>
  );
};

const TitleBar: React.FC<ITitleBarProps> = ({
  title,
  titleBarOptions,
  search,
  ...props
}) => {
  const { theme } = useTheme();
  const navigation = props.navigation;

  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);

  return (
    <>
      {showSearchBar ? (
        <TitleBarSearch setShowSearchBar={setShowSearchBar} />
      ) : (
        <View style={[styles.container, { backgroundColor: theme.surface }]}>
          {props.back && (
            <IconButton
              style={{
                justifyContent: "center",
                marginVertical: "auto",
                marginRight: 5,
              }}
              iconName="arrow-back"
              size={16}
              onPress={() => navigation.goBack()}
            />
          )}
          <CustomText style={[styles.title, { color: theme.text_primary }]}>
            {title}
          </CustomText>
          <View style={styles.icons_container}>
            <View
              style={[
                styles.icons,
                { maxWidth: Dimensions.get("window").width / 2 },
              ]}
            >
              {search && (
                <IconButton
                  style={styles.search_icon}
                  size={18}
                  iconName={showSearchBar ? "close" : "search"}
                  onPress={() => {
                    setShowSearchBar(!showSearchBar);
                  }}
                />
              )}
              {titleBarOptions}
            </View>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 15,
    justifyContent: "space-between",
    padding: 15,
  },
  icons_container: {
    justifyContent: "flex-end",
    marginVertical: "auto",
  },
  icons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  search_icon: {
    marginHorizontal: 5,
  },
  title: {
    fontSize: 20,
    marginVertical: "auto",
    justifyContent: "center",
  },
});

export default TitleBar;
