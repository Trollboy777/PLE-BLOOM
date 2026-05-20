import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import TaskModal from "./components/TaskModal";
import {useState} from "react";
export default function App() {
  const [modalVisible, setModalVisible] = useState(true);
  const [currentTask, setCurrentTask] = useState(null);

  const handleConfirm = (taskData) => {
    setCurrentTask(taskData);
    setModalVisible(false);
  }
  return (
    <View style={styles.container}>
      <View style={styles.leftTree}>
        <Image source={require('./assets/tree-basic.png')} />
        <Image source={require('./assets/tree-basic.png')} />
        <Image source={require('./assets/tree-basic.png')} />
        <Image source={require('./assets/tree-basic.png')} />
        <Image source={require('./assets/tree-basic.png')} />
        <Image source={require('./assets/tree-basic.png')} />
        <Image source={require('./assets/tree-basic.png')} />
        <Image source={require('./assets/tree-basic.png')} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>PLE-Bloom</Text>
      </View>

      <View style={styles.grassContainer}>
        <Image source={require('./assets/grass-small.png')} />
        <Image source={require('./assets/grass-small.png')} />
        <Image source={require('./assets/grass-small.png')} />
      </View>

      <View style={styles.rightTree}>
        <Image source={require('./assets/tree-basic.png')} />
        <Image source={require('./assets/tree-basic.png')} />
        <Image source={require('./assets/tree-basic.png')} />
        <Image source={require('./assets/tree-basic.png')} />
        <Image source={require('./assets/tree-basic.png')} />
        <Image source={require('./assets/tree-basic.png')} />
        <Image source={require('./assets/tree-basic.png')} />
        <Image source={require('./assets/tree-basic.png')} />
      </View>

      <Image source={require('./assets/pebble.png')} style={styles.pebble1} />
      <Image source={require('./assets/pebble.png')} style={styles.pebble2} />
      <Image source={require('./assets/pebble.png')} style={styles.pebble3} />
      <Image source={require('./assets/pebble.png')} style={styles.pebble4} />

      <View style={styles.firestoneContainer}>
        <Image source={require('./assets/firestonegrid.png')} style={styles.firestoneGrid} />
        <Image source={require('./assets/fire.png')} style={styles.fire} />
      </View>

      <TaskModal visible={modalVisible} onConfirm={handleConfirm}>

      </TaskModal>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7FB77E',
    // alignItems: 'center',
    // justifyContent: 'center',
    flexDirection: 'row'
  },
  leftTree: {
    width: 60,
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    marginLeft: -25

  },
  rightTree: {
    width: 60,
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    marginRight: -25,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  grassContainer: {
    position: 'absolute',
    bottom: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 55,
  },
  pebble1: {
    position: 'absolute',
    top: 120,
    left: 30,
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  pebble2: {
    position: 'absolute',
    top: 300,
    right: 40,
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  pebble3: {
    position: 'absolute',
    bottom: 180,
    left: 60,
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  pebble4: {
    position: 'absolute',
    bottom: 100,
    right: 25,
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  firestoneContainer: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: [{ translateX: -64 }],
    alignItems: 'center',
    justifyContent: 'center',
  },
  firestoneGrid: {
    width: 128,
    height: 128,
    resizeMode: 'contain',
  },
  fire: {
    position: 'absolute',
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },

});
