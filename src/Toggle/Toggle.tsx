import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import Svg, {Circle, Path} from 'react-native-svg';
const {
  // atan,
  min,
  PI,
} = Math;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const AnimatedPath = Animated.createAnimatedComponent(Path);

const percentToRad = PI / 50;
const tau = 2 * PI; // One turn
const offset = tau * 0.25; // offset quarter turn, adjustable

const {width, height} = Dimensions.get('window');
const smallestSide = min(width, height);

const CircularSlider = () => {
  // const value = max(99, this.props.value) * percentToRad;

  // in case center changes we change this value and re-render whole circle
  const cx = useSharedValue(width / 2);
  const cy = useSharedValue(height / 2);

  const angle = useSharedValue(0);

  const r = smallestSide * 0.42;

  const polarToCartesian = (angle: number) => {
    'worklet';

    const a = angle - offset;
    const x = cx.value + r * Math.cos(a);
    const y = cy.value + r * Math.sin(a);
    return {x, y};
  };

  const cartesianToPolar = (x: number, y: number) => {
    'worklet';

    const polarOffset = x > cx.value ? offset : offset - PI;
    // return (atan((y - cy.value) / (x - cx.value)) + polarOffset) % tau; // issue with worklet and js Thread
    return (Math.atan((y - cy.value) / (x - cx.value)) + polarOffset) % tau;
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      //   ctx.startX = x.value;
    },
    onActive: (event, ctx) => {
      'worklet';

      angle.value = cartesianToPolar(event.x, event.y);
      // runOnJS(onPress)({ x, y }) // example how to use runOnJS
    },
    onEnd: _ => {
      //   x.value = withSpring(0);
    },
  });

  // handlePanResponderRelease = () => {
  //   this.setState({active: false});
  //   const value = Math.floor(this.state.value / percentToDegrees);
  //   const {onRelease} = this.props;
  //   if (onRelease) {
  //     onRelease(value);
  //   }
  // };

  const startCoord = polarToCartesian(0);
  const endCoord = useDerivedValue(() => {
    return polarToCartesian(angle.value);
  }, [angle]);

  const animatedCircleProps = useAnimatedProps(() => {
    // draw a circle
    const coords = polarToCartesian(angle.value);
    return {
      cx: coords.x,
      cy: coords.y,
    };
  });

  const animatedPathProps = useAnimatedProps(() => {
    // draw a circle
    const offsetVal = angle.value - offset;
    const negativeHalf = angle.value < 0 && angle.value > -PI;
    const moreThanHalf = offsetVal > PI || angle.value > PI;
    const largeArc = negativeHalf || moreThanHalf;

    const path = `
        M ${startCoord.x} ${startCoord.y}
        A ${r} ${r} ${offset} ${largeArc ? 1 : 0} 1 ${endCoord.value.x} ${
      endCoord.value.y
    }`;
    return {
      d: path,
    };
  });

  return (
    <Svg width={width} height={height} style={styles.container}>
      <Circle
        r={r}
        cx={cx.value}
        cy={cy.value}
        fill="none"
        stroke="#aaa"
        strokeWidth={7}
        strokeDasharray={[1, 6]}
      />
      <AnimatedPath
        stroke="#eee"
        strokeWidth={7}
        fill="none"
        animatedProps={animatedPathProps}
      />

      <PanGestureHandler onGestureEvent={gestureHandler}>
        <AnimatedSvg height="100%" width="100%">
          {/* always use animatedSVG before any other animated svg component*/}
          <AnimatedCircle
            fill="#fff"
            animatedProps={animatedCircleProps}
            r={16}
          />
        </AnimatedSvg>
      </PanGestureHandler>
    </Svg>
  );
};

export default CircularSlider;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
});
