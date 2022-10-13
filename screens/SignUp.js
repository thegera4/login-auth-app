//import { useContext, useState } from 'react';
import { useState } from 'react';
import { Alert } from 'react-native';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
//import { AuthContext } from '../store/auth-context';
import { createUser } from '../util/auth';
import { useDispatch } from 'react-redux';
import { authenticate } from '../redux/AuthSlice';


function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  //const authCtx = useContext(AuthContext);
  const dispatch = useDispatch();

  async function signupHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      //authCtx.authenticate(token);
      dispatch(authenticate(token));
    } catch (error) {
      Alert.alert(
        'Authentication failed',
        'Could not create user, please check your info and try again later.'
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;