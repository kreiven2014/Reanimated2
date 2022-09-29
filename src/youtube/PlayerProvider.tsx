// @flow
import * as React from 'react';
import {useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions, StatusBar, Platform} from 'react-native';

import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import PlayerContext from './PlayerContext';
import VideoModal from './components/VideoModal';
import {type Video} from './videos';

const {height} = Dimensions.get('window');
// const { Animated, Easing } = DangerZone;
// const { Value, timing } = Animated;
const isOS = Platform.OS === 'ios';

// type PlayerProviderProps = {
//   children: React.Node,
// };

// type PlayerProviderState = {
//   video: Video | null,
// };

// const  PlayerProvider  = ():<PlayerProviderProps, PlayerProviderState> =>  {
const PlayerProvider = props => {
  const [video, setVideo] = useState();
  const animation = useSharedValue(0);

  const {children} = props;

  const transaformStyle = useAnimatedStyle(() => {
    const translateY = interpolate(animation.value, [0, 1], [height, 0]);
    return {transform: [{translateY}]};
  });

  useEffect(() => {
    toggleVideo();
  }, [video]);

  const toggleVideo = () => {
    animation.value = withTiming(video ? 1 : 0, {
      duration: 500,
      easing: Easing.inOut(Easing.ease),
    });
  };

  return (
    <PlayerContext.Provider value={{video, setVideo}}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={StyleSheet.absoluteFill}>{children}</View>
        <Animated.View style={transaformStyle}>
          {video && <VideoModal {...{video}} />}
        </Animated.View>
      </View>
    </PlayerContext.Provider>
  );
};

export default PlayerProvider;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
