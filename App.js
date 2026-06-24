import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import TaskModal from "./components/TaskModal";
import {useEffect, useState} from "react";
import CompletionModal from "./components/CompletionModal";
import ReflectionModal from "./components/ReflectionModal";
import {
  getDailyTasks, addDailyTask, updateDailyTask,
  getStreak, updateStreak, addXP, getTotalXP,
  saveSession
} from './utills/SaveManager'
import { calculateXP } from "./utills/XpManager";
import XPBar from "./components/XPBar";
import { getWorldState } from "./utills/WorldManager";
import TaskOverviewModal from "./components/TaskOverviewModal";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [totalXP, setTotalXP] = useState(0)
  const [streak, setStreak] = useState(0)

  const [modalVisible, setModalVisible] = useState(false);
  const [activeTask, setActiveTask] = useState(null);
  const [completionVisible, setCompletionVisible] = useState(false)
  const [reflectionVisible, setReflectionVisible] = useState(false)
  const [completionStatus, setCompletionStatus] = useState(null)
  const [overviewVisible, setOverviewVisible] = useState(false)

  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const init = async () => {
      const savedTasks = await getDailyTasks()
      console.log('Daily tasks bij opstarten:', savedTasks)
      const XP = await getTotalXP()
      const streakData = await getStreak()
      setTasks(savedTasks)
      setTotalXP(XP)
      setStreak(streakData.count)

      if (savedTasks.length === 0) {
        setModalVisible(true)
      }
      setLoaded(true)
    }
    init()
  }, []);

  const handleAddTask = async (taskData) => {
    const updated = await addDailyTask(taskData)
    console.log(`TASKDATA ontvangen, oke top! ${taskData}`)
    if (updated) setTasks(updated)
    setModalVisible(false);
  }
  const handleComplete = (task) => {
    setActiveTask(task)
    setOverviewVisible(false)
    setCompletionVisible(true)
  }

  const handleReflect = (task) => {
    setActiveTask(task)
    setOverviewVisible(false)
    setReflectionVisible(true)
  }

  const handleCancel = async (taskId) => {
    const updated = await updateDailyTask(taskId, { status: 'cancelled' })
    if (updated) setTasks(updated)
  }

  const handleCompletionConfirm = async (result) => {
    setCompletionStatus(result)
    const updated = await updateDailyTask(activeTask.id, {
      status: 'completed',
      completionStatus: result,
    })
    if (updated) setTasks(updated)
    setCompletionVisible(false)
    setReflectionVisible(true)
  }

  const handleReflectionFinish = async (reflectionData) => {
    const streakData = await updateStreak()
    const { xp } = calculateXP({
      completionStatus: completionStatus ?? activeTask.completionStatus,
      expectedTime: activeTask.expectedTime,
      reflection: reflectionData,
      streak: streakData.count,
    })

    const newTotalXP = await addXP(xp)

    const updated = await updateDailyTask(activeTask.id, {
      reflection: reflectionData,
      xp,
    })
    if (updated) setTasks(updated)

    await saveSession({
      task: activeTask.task,
      expectedTime: activeTask.expectedTime,
      completionStatus: completionStatus ?? activeTask.completionStatus,
      reflection: reflectionData,
      xp,
    })

    setTotalXP(newTotalXP)
    setStreak(streakData.count)
    setReflectionVisible(false)
    setActiveTask(null)
    setCompletionStatus(null)
  }

  const canAddTask = tasks.filter(t => t.status !== 'cancelled').length < 3
  const world = getWorldState(totalXP)

  if (!loaded) return null

  return (
      <View style={styles.container}>

        <View style={styles.leftTree}>
          <Image source={world.treeAsset} />
          <Image source={world.treeAsset} />
          <Image source={world.treeAsset} />
          <Image source={world.treeAsset} />
          <Image source={world.treeAsset} />
          <Image source={world.treeAsset} />
          <Image source={world.treeAsset} />
          <Image source={world.treeAsset} />
        </View>

        <View style={styles.content} />

        <View style={styles.rightTree}>
          <Image source={world.treeAsset} />
          <Image source={world.treeAsset} />
          <Image source={world.treeAsset} />
          <Image source={world.treeAsset} />
          <Image source={world.treeAsset} />
          <Image source={world.treeAsset} />
          <Image source={world.treeAsset} />
          <Image source={world.treeAsset} />
        </View>

        <View style={styles.grassContainer}>
          <Image source={world.grassAsset} />
          <Image source={world.grassAsset} />
          <Image source={world.grassAsset} />
        </View>

        <Image source={world.pebbleAsset} style={styles.pebble1} />
        <Image source={world.pebbleAsset} style={styles.pebble2} />
        <Image source={world.pebbleAsset} style={styles.pebble3} />
        <Image source={world.pebbleAsset} style={styles.pebble4} />

        {world.showHouse1 && <Image source={require('./assets/house1.png')} style={styles.house1} />}
        {world.showHouse2 && <Image source={require('./assets/house2.png')} style={styles.house2} />}
        {world.showHouse3 && <Image source={require('./assets/house3.png')} style={styles.house3} />}
        {world.showHouse4 && <Image source={require('./assets/house4.png')} style={styles.house4} />}
        {world.showHouse5 && <Image source={require('./assets/house5.png')} style={styles.house5} />}
        {world.showHuman1 && <Image source={require('./assets/human1.png')} style={styles.human1} />}
        {world.showHuman2 && <Image source={require('./assets/human2.png')} style={styles.human2} />}

        <View style={styles.firestoneContainer}>
          <Image source={require('./assets/firestonegrid.png')} style={styles.firestoneGrid} />
          <Image source={require('./assets/fire.png')} style={styles.fire} />
        </View>

        <XPBar totalXP={totalXP} streak={streak} />

        {canAddTask && (
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => setModalVisible(true)}
            >
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        )}

        <View style={styles.fabContainer}>
          <Text style={styles.fabLabel}>
            Taken ({tasks.filter(t => t.status !== 'cancelled').length}/3)
          </Text>
          <TouchableOpacity
              style={styles.fab}
              onPress={() => setOverviewVisible(true)}
          >
            <Text style={styles.fabIcon}>📋</Text>
          </TouchableOpacity>
        </View>
        <TaskModal
            visible={modalVisible}
            onConfirm={handleAddTask}
            onClose={() => setModalVisible(false)}
        />

        <TaskOverviewModal
            visible={overviewVisible}
            tasks={tasks}
            onClose={() => setOverviewVisible(false)}
            onComplete={handleComplete}
            onReflect={handleReflect}
            onCancel={handleCancel}
        />

        <CompletionModal
            visible={completionVisible}
            onConfirm={handleCompletionConfirm}
        />

        <ReflectionModal
            visible={reflectionVisible}
            completionStatus={completionStatus}
            onFinish={handleReflectionFinish}
        />

        <StatusBar style="auto" />
      </View>
  )
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
  firestoneGrid: { width: 128, height: 128, resizeMode: 'contain' },
  fire: { position: 'absolute', width: 50, height: 50, resizeMode: 'contain' },
  house1: { position: 'absolute', bottom: 120, left: 80, width: 70, height: 70, resizeMode: 'contain' },
  house2: { position: 'absolute', bottom: 120, right: 80, width: 70, height: 70, resizeMode: 'contain' },
  house3: { position: 'absolute', bottom: 200, left: 100, width: 70, height: 70, resizeMode: 'contain' },
  house4: { position: 'absolute', bottom: 200, right: 100, width: 70, height: 70, resizeMode: 'contain' },
  house5: { position: 'absolute', top: 200, left: '45%', width: 70, height: 70, resizeMode: 'contain' },
  human1: { position: 'absolute', bottom: 160, left: '40%', width: 40, height: 40, resizeMode: 'contain' },
  human2: { position: 'absolute', bottom: 160, right: '35%', width: 40, height: 40, resizeMode: 'contain' },

  addButton: {
    position: 'absolute',
    bottom: 40,
    right: 80,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000',
  },
  addButtonText: {
    fontSize: 28,
    color: '#7FB77E',
    fontWeight: 'bold',
    lineHeight: 32,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
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
  },
  demoPanel: {
    position: 'absolute',
    top: 100,
    right: 10,
    gap: 6,
  },
  demoButton: {
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#000',
  },
  debugButton2: {
    position: 'absolute',
    top: 100,
    right: 10,
    backgroundColor: '#ffcccc',
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
  },

});
