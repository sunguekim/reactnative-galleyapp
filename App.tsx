import React, { useEffect,useState } from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';


import { store } from './src/redux/store';
import Routes from './src/routes';

const App = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 9,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 50,
    width: 278,
    height: 230,
  }
});

export default App
