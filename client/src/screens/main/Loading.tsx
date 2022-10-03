import React, {Dispatch, useCallback, useEffect} from 'react'
import {View, ActivityIndicator} from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'


export interface ILoadingScreenInterface {
  setSignedIn: Dispatch<React.SetStateAction<boolean>>
  setLoading: Dispatch<React.SetStateAction<boolean>>
};

const LoadingScreen: React.FC<ILoadingScreenInterface> = ({setLoading, setSignedIn}) => {
  
  const isLoggedIn = useCallback(() => {
    firebase.auth().onAuthStateChanged((user)=> {
      if (user){
        setSignedIn(true);
      }
      setLoading(false);
    });

  }, []);

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