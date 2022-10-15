import AsyncStorage from "@react-native-async-storage/async-storage"

export default async function authHeader(){
    const user = JSON.parse(await AsyncStorage.getItem('user') || '');
    if (user && user.access_token){
        return {Authorization: "Bearer" + user.access_token};
    }else{
        return {};
    }
}
