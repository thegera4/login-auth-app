import axios from 'axios';
import { /*useContext,*/ useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
//import { AuthContext } from '../store/auth-context';
import { useSelector } from 'react-redux';

const AUTH_URL = 'https://expense-tracker-bfea8-default-rtdb.firebaseio.com/message.json?auth=';

function WelcomeScreen() {
  const [fetchedMessage, setFetchedMesssage] = useState('');
  //const authCtx = useContext(AuthContext);
  //const token = authCtx.token;
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    axios.get(AUTH_URL + token)
    .then((response) => {
        setFetchedMesssage(response.data);
    });
  }, [token]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchedMessage}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});