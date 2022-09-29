// @flow
import * as React from 'react'
import { ScrollView, StatusBar, StyleSheet } from 'react-native'

import VideoThumbnail from './components/VideoThumbnail'
import videos from './videos'

type HomeProps = {}

// eslint-disable-next-line react/prefer-stateless-function
const Home = (props: HomeProps) => {
  return (
    <ScrollView style={styles.container}>
      {videos.map((video) => (
        <VideoThumbnail key={video.id} {...{ video }} />
      ))}
    </ScrollView>
  )
}
export default Home

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
  },
})
