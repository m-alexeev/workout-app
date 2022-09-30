import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import React, { SetStateAction, useState } from "react";
import { StyleSheet, View, Dimensions, SafeAreaView } from "react-native";
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
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <SafeAreaView style={[styles.content, { backgroundColor: theme.surface }]}>
        <IconButton
          iconName="arrow-back"
          size={24}
          onPress={() => {
            setShowSearchBar(false);
            updateSearch("");
          }}
        />
        <View style={{ flex: 1 }}>
          <SearchBarInput
            style={{ fontSize: 18 }}
            onCancel={() => updateSearch("")}
          ></SearchBarInput>
        </View>
      </SafeAreaView>
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
          <SafeAreaView style={styles.content}>
            {props.back && (
              <IconButton
                style={{
                  justifyContent: "center",
                  marginVertical: "auto",
                  marginRight: 5,
                }}
                iconName="arrow-back"
                size={24}
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
          </SafeAreaView>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  content: {
    marginTop: 20,
    flexDirection: "row",
    padding: 15,
    paddingVertical: 15,
    justifyContent: "space-between",
    alignItems: "center",
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
