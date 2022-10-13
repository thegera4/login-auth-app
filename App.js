import { useCallback, useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';
import LoginScreen from './screens/Login';
import SignupScreen from './screens/SignUp';
import WelcomeScreen from './screens/Welcome';
import { Colors } from './constants/styles';
//import AuthContextProvider, { AuthContext } from './store/auth-context';
import IconButton from './components/ui/IconButton';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate, logout } from './redux/AuthSlice';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  //const authCtx = useContext(AuthContext);
  const dispatch = useDispatch();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              //onPress={authCtx.logout}
              onPress={() => dispatch(logout())}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  //const authCtx = useContext(AuthContext);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  return (
    <NavigationContainer>
      {/*!authCtx.isAuthenticated && <AuthStack />*/}
      {/*authCtx.isAuthenticated && <AuthenticatedStack />*/}
      {!isAuthenticated && <AuthStack />}
      {isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root() {
  //const authCtx = useContext(AuthContext);
  const dispatch = useDispatch();
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        //authCtx.authenticate(storedToken);
        dispatch(authenticate(storedToken));
      }
      setAppIsReady(true);
    }
    fetchToken();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if(appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Navigation />
    </View>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      {/* <AuthContextProvider> */}
      <Provider store={store}>
        <Root />
      </Provider>
      {/* </AuthContextProvider> */}
    </>
  );
}