import React, { useEffect, useState } from 'react';
import {getAuth, onAuthStateChanged, User} from 'firebase/auth';

const auth = getAuth();

export default function useAuthentication(){
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubfromAuthStatusChanged = onAuthStateChanged(auth, (user) => {
      if (user){
        setUser(user);
      }else{
        setUser(undefined);
      }
    })
    return unsubfromAuthStatusChanged; 
  }, []) ;
  return {
    user
  };
}
