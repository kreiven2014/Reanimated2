import * as React from 'react'
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native'
import PlayIcon from '../assets/play.svg'
import Close from '../assets/close.svg'
// import {Icon} from 'expo';
import PlayerContext from '../PlayerContext'

const { width } = Dimensions.get('window')
export const PLACEHOLDER_WIDTH = width / 3

type PlayerControlsProps = {
  title: string
  onPress: () => void
}

// export default class PlayerControls extends React.PureComponent<PlayerControlsProps> {
const PlayerControls = (props: PlayerControlsProps) => {
  const { setVideo } = React.useContext(PlayerContext)
  const { title, onPress } = props
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.placeholder} />
        <Text style={styles.title} numberOfLines={3}>
          {title}
        </Text>
        <PlayIcon color="black" />
        <TouchableWithoutFeedback onPress={() => setVideo(null)}>
          <Close color="black" height={16} width={16} />
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default PlayerControls

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 10,
  },
  title: {
    flex: 1,
    flexWrap: 'wrap',
    paddingLeft: 8,
    color: 'black',
  },
  placeholder: {
    width: PLACEHOLDER_WIDTH,
    color: 'black',
  },
  icon: {
    fontSize: 24,
    color: 'gray',
    padding: 8,
  },
})
