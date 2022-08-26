import * as React from "react";
import { SafeAreaView, SectionList, StyleSheet } from "react-native";
import { ExercisesStackParamList } from "../../../types/navigation";
import { exercise_list } from "../../../models/exercise_list";
import ExerciseCard from "../../../components/organisms/ExerciseCard";
import { useTheme } from "../../../contexts/theme";
import { Exercise } from "../../../models/exercise";
import CustomText from "../../../components/atoms/CustomText";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type ExercisesScreenProp = NativeStackScreenProps<
  ExercisesStackParamList,
  "Exercises"
>;

export interface IExercisesPageProps {
  navigation: ExercisesScreenProp['navigation'];
}

const ExercisesPage: React.FC<IExercisesPageProps> = ({ navigation }) => {
  const { theme } = useTheme();
  //format exercise_list
  const get_sections = () => {
    return Object.values(
      exercise_list.reduce((acc, obj) => {
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <CustomText style={[styles.header, { color: theme.text_primary }]}>
        Exercises
      </CustomText>
      <SectionList
        sections={get_sections()}
        keyExtractor={(item, index) => item.getName() + index}
        renderItem={({ item }) => (
          <ExerciseCard
            onPress={() => navigation.navigate('ExerciseDetails', {exerciseId: item.getName()})}
            name={item.getName()}
            type={item.getType()}
            muscleGroup={item.getMuscleGroup()}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <CustomText
            style={{
              color: theme.text_secondary,
              fontSize: 12,
              flex: 1,
              marginHorizontal: 20,
              marginVertical: 20,
            }}
          >
            {title}
          </CustomText>
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