// In App.js in a new project

import * as React from 'react';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PlayerProvider from '../youtube/PlayerProvider';

import Home from './Home';

// const Stack = createNativeStackNavigator();

const YoutubeNavigator = () => {
  return (
    <PlayerProvider>
      <Home />
    </PlayerProvider>
  );
};

export default YoutubeNavigator;
