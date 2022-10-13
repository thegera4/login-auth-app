//import { useContext } from 'react';
import { useState } from 'react';
import { Alert } from 'react-native';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
//import { AuthContext } from '../store/auth-context';
import { login } from '../util/auth';
import { useDispatch } from 'react-redux';
import { authenticate } from '../redux/AuthSlice';

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  //const authCtx = useContext(AuthContext);
  const dispatch = useDispatch();

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      //authCtx.authenticate(token);
      dispatch(authenticate(token));
    } catch (error) {
      Alert.alert(
        'Authentication failed!',
        'Could not log you in. Please check your credentials or try again later!'
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;