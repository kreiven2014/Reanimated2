import React, {memo, useEffect} from 'react';
import {View, Dimensions, StyleSheet, StatusBar} from 'react-native';
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  useSharedValue,
  withTiming,
  withSpring,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  State,
} from 'react-native-gesture-handler';

import {type Video as VideoModel} from '../videos';
import VideoContent from './VideoContent';
import PlayerControls, {PLACEHOLDER_WIDTH} from './PlayerControls';
// expo
import Constants from 'expo-constants';

const {width, height} = Dimensions.get('window');
// const statusBarHeight = 64;
const minHeight = 64;
const midBound = height - 64 * 3;
const upperBound = midBound + minHeight;

const AnimatedVideo = Animated.createAnimatedComponent(View);
const shadow = {
  alignItems: 'center',
  shadowColor: 'black',
  shadowOffset: {width: 0, height: 0},
  shadowOpacity: 0.18,
  shadowRadius: 2,
};

type VideoModalProps = {
  video: VideoModel;
};

//  class VideoModal extends React.PureComponent<VideoModalProps> {
const VideoModal = (props: VideoModalProps) => {
  const {statusBarHeight} = Constants;
  // animation values
  const translationY = useSharedValue(0);
  const translationYCurrentValue = useSharedValue(0);

  const offsetY2 = useSharedValue(0);

  const uas = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            translationY.value,
            [0, midBound],
            [0, midBound],
          ),
        },
      ],
    };
  });

  const videoWidthAnimatedStyle = useAnimatedStyle(() => {
    const videoWidth = interpolate(
      translationY.value,
      [0, midBound, upperBound],
      [width, width - 16, PLACEHOLDER_WIDTH],
    );

    return {
      width: videoWidth,
    };
  });

  const videoHeightStyle = useAnimatedStyle(() => {
    const videoHeight = interpolate(
      translationY.value,
      [0, midBound, upperBound],
      [width / 1.78, minHeight * 1.3, minHeight],
    );
    return {
      height: videoHeight,
    };
  });

  const videoContainerWidth = useAnimatedStyle(() => {
    const containerWidth = interpolate(
      translationY?.value || 0,
      [0, midBound],
      [width, width - 16],
      {
        extrapolateLeft: Extrapolate.CLAMP,
      },
    );
    return {
      width: containerWidth,
    };
  });

  const statusBarOpacityStyle = useAnimatedStyle(() => {
    const statusBarOpacity = interpolate(
      translationY.value,
      [0, statusBarHeight],
      [1, 0],
    );
    return {
      opacity: statusBarOpacity,
    };
  });

  const opacityStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translationY.value,
      [0, midBound - 100],
      [1, 0],
    );
    return {
      opacity,
    };
  });

  console.log('translationY.value', translationY.value);
  console.log('midBound', midBound);

  const containerHeightStyle = useAnimatedStyle(() => {
    const containerHeight = interpolate(
      translationY.value,
      [0, midBound],
      [height, 0],
    );
    return {
      height: containerHeight,
    };
  });

  const slideUp = () => {
    offsetY2.value = withTiming(-upperBound, {
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    });
  };

  const {video} = props;

  const pan = Gesture.Pan() // check how context pass params
    .minDistance(0)
    .onStart(() => {
      'worklet';

      translationYCurrentValue.value = translationY.value;
    })
    .onChange(event => {
      'worklet';

      translationY.value = translationYCurrentValue.value + event.translationY;
    })
    .onFinalize(event => {
      if (event.translationY > height / 2) {
        translationY.value = withSpring(upperBound);
      } else {
        translationY.value = withSpring(0);
      }
    });

  return (
    <>
      <Animated.View
        style={[
          statusBarOpacityStyle,
          {
            height: statusBarHeight,
            backgroundColor: 'black',
          },
        ]}
      />
      <GestureDetector gesture={pan}>
        <Animated.View style={[uas, shadow]}>
          <Animated.View
            style={[
              videoContainerWidth,
              videoHeightStyle,
              {backgroundColor: 'white'},
            ]}>
            <Animated.View
              style={{
                ...StyleSheet.absoluteFillObject,
              }}>
              <PlayerControls title={video.title} onPress={slideUp} />
            </Animated.View>
            <AnimatedVideo
              style={[videoWidthAnimatedStyle, styles.videoContainerStyle]}
            />
          </Animated.View>
          <Animated.View
            style={[
              videoContainerWidth,
              containerHeightStyle,
              {
                backgroundColor: 'white',
              },
            ]}>
            <Animated.View style={[opacityStyle]}>
              <VideoContent {...{video}} />
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    borderWidth: 1,
  },
  body: {
    backgroundColor: 'red',
    borderColor: 'red',
    borderWidth: 1,
  },
  videoContainerStyle: {
    backgroundColor: 'red',
    flex: 1,
  },
});

export default memo(VideoModal);
