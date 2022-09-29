// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow strict-local
//  */

// import React from 'react';
// import type {Node} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// const Section = ({children, title}): Node => {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// };

// const App: () => Node = () => {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <Header />
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.js</Text> to change this
//             screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Routes} from './src/Routes';
import Examples from './src/Examples';
import Rainbow from './src/Rainbow';
import Chrome from './src/Chrome';
import Duolingo, {assets as duolingoAssets} from './src/Duolingo';
import Snapchat, {assets as snapChatAssets} from './src/Snapchat';
import PhilzCoffee, {assets as philzCoffeeAssets} from './src/PhilzCoffee';
import Chanel, {assets as chanelAssets} from './src/Chanel';
import {Reflectly, ColorSelection} from './src/Reflectly';
import {LoadAssets} from './src/components';
import Chess, {assets as chessAssets} from './src/Chess';
import Bedtime from './src/Bedtime';
import Darkroom, {assets as darkroomAssets} from './src/Darkroom';
import LiquidSwipe, {assets as liquidSwipeAssets} from './src/LiquidSwipe';
import YoutubeNavigator from './src/youtube/YoutubeNavigator';

const fonts = {
  'SFProDisplay-Bold': require('./assets/fonts/SFPro/SF-Pro-Display-Bold.otf'),
  'SFProDisplay-Semibold': require('./assets/fonts/SFPro/SF-Pro-Display-Semibold.otf'),
  'SFProDisplay-Regular': require('./assets/fonts/SFPro/SF-Pro-Display-Regular.otf'),
  'SFProDisplay-Medium': require('./assets/fonts/SFPro/SF-Pro-Display-Medium.otf'),
  'SFProRounded-Semibold': require('./assets/fonts/SFProRounded/SF-Pro-Rounded-Semibold.otf'),
  'SFProRounded-Medium': require('./assets/fonts/SFProRounded/SF-Pro-Rounded-Medium.otf'),
  'Nunito-Bold': require('./assets/fonts/Nunito/Nunito-Bold.ttf'),
  'Nunito-Regular': require('./assets/fonts/Nunito/Nunito-Regular.ttf'),
  'GothamRounded-Medium': require('./assets/fonts/GothamRounded/GothamRounded-Medium.otf'),
  'GothamRounded-Bold': require('./assets/fonts/GothamRounded/GothamRounded-Bold.otf'),
  'GothamRounded-Light': require('./assets/fonts/GothamRounded/GothamRounded-Light.otf'),
};

const assets = [
  ...duolingoAssets,
  ...snapChatAssets,
  ...philzCoffeeAssets,
  ...chanelAssets,
  ...chessAssets,
  ...darkroomAssets,
  ...liquidSwipeAssets,
];

const Stack = createStackNavigator<Routes>();
const AppNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Examples"
      component={Examples}
      options={{
        title: 'Can it be done in React Native?',
      }}
    />
    <Stack.Screen
      name="Duolingo"
      component={Duolingo}
      options={{
        title: '🦉 Duolingo',
      }}
    />
    <Stack.Screen
      name="Rainbow"
      component={Rainbow}
      options={{
        title: '🌈 Rainbow',
      }}
    />
    <Stack.Screen
      name="Chrome"
      component={Chrome}
      options={{
        title: '🧭 Google Chrome',
        header: () => null,
      }}
    />
    <Stack.Screen
      name="PhilzCoffee"
      component={PhilzCoffee}
      options={{
        title: '☕️ Philz Coffee',
      }}
    />
    <Stack.Screen
      name="Snapchat"
      component={Snapchat}
      options={{
        title: '👻 Snapchat',
        header: () => null,
      }}
    />
    <Stack.Screen
      name="Chanel"
      component={Chanel}
      options={{
        title: '👗 Chanel',
        header: () => null,
      }}
    />
    <Stack.Screen
      name="ColorSelection"
      component={ColorSelection}
      options={{
        title: '🤖 Color Selection',
      }}
    />
    <Stack.Screen
      name="Chess"
      component={Chess}
      options={{
        title: '♟ Chess',
        header: () => null,
      }}
    />
    <Stack.Screen
      name="Reflectly"
      component={Reflectly}
      options={{
        title: '🤖 Reflectly Tabbar',
      }}
    />
    <Stack.Screen
      name="Bedtime"
      component={Bedtime}
      options={{
        title: '⏰ Bedtime',
        header: () => null,
      }}
    />
    <Stack.Screen
      name="Darkroom"
      component={Darkroom}
      options={{
        title: '🏞 Darkroom',
        header: () => null,
      }}
    />
    <Stack.Screen
      name="LiquidSwipe"
      component={LiquidSwipe}
      options={{
        title: '💧 LiquidSwipe',
        header: () => null,
        gestureEnabled: false,
      }}
    />
    <Stack.Screen
      name="Youtube"
      component={YoutubeNavigator}
      options={{
        title: 'Youtube',
        header: () => null,
        gestureEnabled: false,
      }}
    />
  </Stack.Navigator>
);

const App = () => {
  return (
    <LoadAssets assets={assets} fonts={fonts}>
      <AppNavigator />
    </LoadAssets>
  );
};

export default App;
