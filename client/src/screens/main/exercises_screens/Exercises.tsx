import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  SectionList,
  StyleSheet,
} from "react-native";
import { ExercisesStackParamList } from "../../../types/navigation";
import { exercise_list } from "../../../models/exercise_list";
import { useTheme } from "../../../contexts/theme";
import { Exercise } from "../../../models/exercise";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSearch } from "../../../contexts/search";
import { List, Text } from "react-native-paper";
import ExerciseCard from "../../../components/organisms/ExerciseCard";

type ExercisesScreenProp = NativeStackScreenProps<
  ExercisesStackParamList,
  "ExerciseList"
>;

export interface IExercisesPageProps {
  navigation: ExercisesScreenProp["navigation"];
}

const get_sections = (list: Array<Exercise>) => {
  return Object.values(
    list.reduce((acc, obj) => {
      const firstLet = obj.getName()[0].toLocaleUpperCase();
      if (!acc[firstLet]) {
        acc[firstLet] = { title: firstLet, data: [obj] };
      } else {
        acc[firstLet].data.push(obj);
      }
      return acc;
    }, {} as { [letter: string]: { title: string; data: Array<Exercise> } })
  );
};

const ExercisesPage: React.FC<IExercisesPageProps> = ({ navigation }) => {
  const { searchQuery } = useSearch();
  const { theme } = useTheme();
  const [filteredExercises, setFilteredExercises] = useState(
    get_sections(exercise_list)
  );

  const filter = (query: string) => {
    if (query) {
      const filtered = exercise_list.filter((exercise) => {
        return (
          exercise.getName().toUpperCase().startsWith(query.toUpperCase()) ||
          exercise.getType().toUpperCase().startsWith(query.toUpperCase()) ||
          exercise
            .getMuscleGroup()
            .toUpperCase()
            .startsWith(query.toUpperCase())
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
        keyExtractor={(item, index) => item.getName() + index}
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
                exerciseId: item.getName(),
              })
            }
            name={item.getName()}
            type={item.getType()}
            muscleGroup={item.getMuscleGroup()}
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
