import React, {Dispatch, useEffect} from 'react'
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'


export interface ILoadingScreenInterface {
  setLoading:  Dispatch<React.SetStateAction<boolean>> 
};

const LoadingScreen: React.FC<ILoadingScreenInterface> = ({setLoading}) => {
  
  const isLoggedIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user){
        console.log(user)
      }else{
        console.log('no user') 
      }
      setLoading(false);
    })
  }

  useEffect(() => {
    isLoggedIn();
  },[]);

  return (
    <View>
      <ActivityIndicator size='large'/>
    </View>
  )
}

export default LoadingScreen;