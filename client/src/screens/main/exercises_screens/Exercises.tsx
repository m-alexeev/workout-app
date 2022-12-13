import React, { useEffect, useState } from "react";
import { SafeAreaView, SectionList, StyleSheet } from "react-native";
import { ExercisesStackParamList } from "../../../types/navigation";

import { useTheme } from "../../../contexts/theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSearch } from "../../../contexts/search";
import { Text } from "react-native-paper";
import ExerciseCard from "../../../components/organisms/ExerciseCard";
import { exercise_list } from "../../../redux/types/exercise.types";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { fetchExercises } from "../../../services/exercise.service";
import { get_sections } from "./utils";

type ExercisesScreenProp = NativeStackScreenProps<
  ExercisesStackParamList,
  "ExerciseList"
>;

export interface IExercisesPageProps {
  navigation: ExercisesScreenProp["navigation"];
}

const ExercisesPage: React.FC<IExercisesPageProps> = ({ navigation }) => {
  const { searchQuery } = useSearch();
  const { theme } = useTheme();

  const dispatch = useAppDispatch();
  const exerciseState = useAppSelector((state) => state.exercises);

  const [filteredExercises, setFilteredExercises] = useState(
    get_sections(exerciseState.exercises)
  );

  useEffect(() => {
    if (exerciseState.need_update && exerciseState.status !== "loading") {
      dispatch(fetchExercises());
    }
    if (exerciseState.status === "succeeded") {
      setFilteredExercises(get_sections(exerciseState.exercises));
    }
  }, [exerciseState]);

  const filter = (query: string) => {
    if (query) {
      const filtered = exercise_list.filter((exercise) => {
        return (
          exercise.name.toUpperCase().startsWith(query.toUpperCase()) ||
          exercise.category.toUpperCase().startsWith(query.toUpperCase()) ||
          exercise.body_part.toUpperCase().startsWith(query.toUpperCase())
        );
      });
      setFilteredExercises(get_sections(filtered));
    } else {
      setFilteredExercises(get_sections(exercise_list));
    }
  };

  useEffect(() => {
    filter(searchQuery);
  }, [searchQuery]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <SectionList
        sections={filteredExercises}
        keyExtractor={(item, index) => item.name + index}
        ListHeaderComponent={() => (
          <Text style={[styles.header, { color: theme.text_primary }]}>
            Exercises
          </Text>
        )}
        ListEmptyComponent={() => <Text>No Exercises...</Text>}
        renderItem={({ item }) => (
          <ExerciseCard
            onPress={() =>
              navigation.navigate("ExerciseDetails", {
                exerciseId: item.name,
              })
            }
            name={item.name}
            type={item.category}
            muscleGroup={item.body_part}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text
            style={{
              color: theme.text_secondary,
              fontSize: 14,
              flex: 1,
              marginHorizontal: 20,
              marginVertical: 20,
            }}
          >
            {title}
          </Text>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    flex: 1,
    paddingStart: 20,
    paddingTop: 20,
  },
});

export default ExercisesPage;
