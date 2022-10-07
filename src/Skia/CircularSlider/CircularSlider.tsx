import {
  Canvas,
  Group,
  Circle,
  useComputedValue,
  useValue,
  vec,
  Path,
  useTouchHandler,
  dist,
  DashPathEffect,
} from '@shopify/react-native-skia';
import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {Cursor} from '../Wallet/components/Cursor';
const {min, PI} = Math;

const tau = 2 * PI; // One turn
const offset = tau * 0.25; // offset quarter turn, adjustable

const {width, height} = Dimensions.get('window');
const smallestSide = min(width, height);

const CircularSlider = () => {
  const c = vec(width / 2, height / 2);

  const angle = useValue(0);

  const r = smallestSide * 0.42;
  const strokeWidth = 7;

  const polarToCartesian = (angle: number) => {
    const a = angle - offset;
    const x = c.x + r * Math.cos(a);
    const y = c.y + r * Math.sin(a);
    return {x, y};
  };

  const cartesianToPolar = (x: number, y: number) => {
    const polarOffset = x > c.x ? offset : offset - PI;
    return (Math.atan((y - c.y) / (x - c.x)) + polarOffset) % tau;
  };

  /* GESTURE HANDLER*/
  const isGestureActive = useValue(false);
  const onTouch = useTouchHandler({
    onStart: pt => {
      if (
        dist(
          vec(animatedCircleX.current, animatedCircleY.current),
          vec(pt.x, pt.y),
        ) < 50
      ) {
        isGestureActive.current = true;
      }
    },
    onActive: ({x, y}) => {
      if (isGestureActive.current) {
        angle.current = cartesianToPolar(x, y);
      }
    },
    onEnd: _ => {},
  });

  /* RENDER PROPS*/
  const startCoord = polarToCartesian(0);
  const endCoord = useComputedValue(() => {
    return polarToCartesian(angle.current);
  }, [angle]);
  const path = useComputedValue(() => {
    const offsetVal = angle.current - offset;
    const negativeHalf = angle.current < 0 && angle.current > -PI;
    const moreThanHalf = offsetVal > PI || angle.current > PI;
    const largeArc = negativeHalf || moreThanHalf;

    const path = `
        M ${startCoord.x} ${startCoord.y}
        A ${r} ${r} ${offset} ${largeArc ? 1 : 0} 1 ${endCoord.current.x} ${
      endCoord.current.y
    }`;
    return path;
  }, [angle]);

  const animatedCircleX = useComputedValue(() => {
    const coords = polarToCartesian(angle.current);
    return coords.x;
  }, [angle]);

  const animatedCircleY = useComputedValue(() => {
    const coords = polarToCartesian(angle.current);
    return coords.y;
  }, [angle]);

  return (
    <Canvas style={[{width, height}, styles.container]} onTouch={onTouch}>
      <Group>
        <Circle
          r={r}
          c={c}
          color="#aaa"
          style="stroke"
          strokeWidth={strokeWidth}>
          <DashPathEffect intervals={[1, 6]} />
        </Circle>
        <Path
          style="stroke"
          strokeWidth={strokeWidth}
          path={path}
          color="lightblue"
        />
        <Cursor x={animatedCircleX} y={animatedCircleY} width={width} />
      </Group>
    </Canvas>
  );
};

export default CircularSlider;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
});
