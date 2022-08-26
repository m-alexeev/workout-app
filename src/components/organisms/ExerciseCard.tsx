import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../contexts/theme";
import { exerciseMuscleGroup, exerciseType } from "../../types/exercise";
import CustomText from "../atoms/CustomText";

export interface IExerciseCardProps {
  name: string;
  type: exerciseType;
  muscleGroup: exerciseMuscleGroup;
  onPress: () => void
}

const ExerciseCard: React.FC<IExerciseCardProps> = ({
  name,
  type,
  muscleGroup,
  onPress,
}) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.textContainer}>
        <View style={{ flex: 1 }}>
          <CustomText style={[styles.header, { color: theme.text_primary }]}>
            {name}
          </CustomText>
          <CustomText style={{ color: theme.text_secondary, fontSize: 13 }}>
            {type}
          </CustomText>
        </View>
        <View>
          <CustomText style={{}}>{muscleGroup}</CustomText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 7.5,
  },
  textContainer: {
    marginHorizontal: 35,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  header: {
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 5,
  },
});

export default ExerciseCard;
