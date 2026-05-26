import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import TaskModal from "./components/TaskModal";
import {useEffect, useState} from "react";
import CompletionModal from "./components/CompletionModal";
import ReflectionModal from "./components/ReflectionModal";
import {saveSession, getSessions, getDailyProgress, saveDailyProgress} from "./utills/SaveManager";

const FLOW = {
  LOADING: 'loading',
  TASK: 'task',
  IDLE: 'idle',
  COMPLETION: "completion",
  REFLECTION: "reflection",
  DONE: "done"
}

export default function App() {
  const [flow, setFlow] = useState(FLOW.LOADING)
  const [modalVisible, setModalVisible] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [completionVisible, setCompletionVisible] = useState(false)
  const [reflectionVisible, setReflectionVisible] = useState(false)
  const [completionStatus, setCompletionStatus] = useState(null)

  useEffect(() => {
    const init = async () => {
      const progress = await getDailyProgress()
      console.log('Daily progress bij opstarten:', progress)
      if (!progress) {
        setFlow(FLOW.TASK)
        setModalVisible(true)
      }
      else if (progress.step === `done`) {
        setCurrentTask(progress.task)
        setCompletionStatus(progress.completionStatus)
        setFlow(FLOW.DONE)
      }
      else if (progress.step === 'idle') {
        setCurrentTask(progress.task)
        setFlow(FLOW.IDLE)
      }
    }
    init()
  }, []);

  const handleTaskConfirm = async (taskData) => {
    console.log(`TASKDATA ontvangen, oke top! ${taskData}`)
    setCurrentTask(taskData);
    await saveDailyProgress({step: 'idle', task: taskData})
    setModalVisible(false);
    setFlow(FLOW.IDLE)
  }
  const handleFabPress = () => {
    if (flow === FLOW.IDLE) {
      setCompletionVisible(true)
    } else if (flow === FLOW.TASK) {
      setModalVisible(true)
    }
  }
  const fabLabel = () => {
    if (flow === FLOW.DONE) return '✓ Reflectie Voltooid'
    if (flow === FLOW.IDLE) return 'Taak Voltooien'
    if (flow === FLOW.TASK) return 'Taak Invoeren'
    return ''
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

      {flow !== FLOW.LOADING && (
          <View style={styles.fabContainer}>
            <Text style={styles.fabLabel}>{fabLabel()}</Text>
            <TouchableOpacity
                style={[styles.fab, flow === FLOW.DONE && styles.fabDone]}
                onPress={handleFabPress}
            >
              <Text style={styles.fabIcon}>✓</Text>
            </TouchableOpacity>
          </View>
      )}

      <TaskModal visible={modalVisible} onConfirm={handleTaskConfirm}/>

      <CompletionModal visible={completionVisible} onConfirm={(result)=> {
        console.log(`Taak resultaat: ${result}`)
        setCompletionStatus(result)
        setCompletionVisible(false)
        setReflectionVisible(true)
        setFlow(FLOW.REFLECTION)
      }}>

      </CompletionModal>
      <ReflectionModal visible={reflectionVisible}
                       completionStatus={completionStatus} onFinish={async (reflectionData) => {
                         await saveSession({
                           task: currentTask.task,
                           expectedTime: currentTask.expectedTime,
                           completionStatus: currentTask.completionStatus,
                           reflection: reflectionData
                             })
        await saveDailyProgress({
          step: 'done',
          task: currentTask,
          completionStatus: completionStatus
        })
        console.log(`Reflectie data: ${reflectionData}`)
        setReflectionVisible(false)
        setTaskDone(true)
        setFlow(FLOW.DONE)
      }}>

      </ReflectionModal>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7FB77E',
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
  fabContainer: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    alignItems: 'center',
    left: 0,
    right: 0,
    gap: 6,
  },
  fabLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
  },
  fab: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000',
  },
  fabIcon: {
    fontSize: 28,
    color: '#7FB77E',
  },
  fabDone: {
    backgroundColor: '#ccc',
    borderColor: '#999',
  },

});
