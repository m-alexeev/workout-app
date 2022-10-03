import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaView, View, Text, StyleSheet} from 'react-native';
import CustomText from '../../../components/atoms/CustomText';
import { useTheme } from '../../../contexts/theme';
import { ExercisesStackParamList } from '../../../types/navigation';

type ExerciseDetailScreenProp = NativeStackScreenProps<
  ExercisesStackParamList, "ExerciseDetails"
>;

export interface IExerciseDetailProps { 
  navigation:  ExerciseDetailScreenProp['navigation']
  route: ExerciseDetailScreenProp['route']
}

const ExerciseDetails: React.FC<IExerciseDetailProps> = ({navigation, route})=> {
  const {theme} = useTheme();
  
  console.log(route);
  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]}>
      <CustomText style={{color: theme.text_primary}}>{route.params.exerciseId}</CustomText>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
});

export default ExerciseDetails;