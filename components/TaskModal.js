import {useState, useEffect} from 'react'
import {StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, Keyboard} from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'

const timeOptions = [15, 30, 45, 60, 75, 90, 120]
export default function TaskModal({visible, onConfirm}) {
    const [taskInput, setTaskInput] = useState('');
    const [selectedTime, setSelectedTime] = useState(null)

    return (
        <Modal visible={visible} transparent={true} animationType={"fade"}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalBox}>
                    <Text style={styles.taskQuestion}>
                        Voer hier de taak in die je vandaag gaat doen</Text>
                    <Text style={styles.taskLabel}>Taak:</Text>
                    <TextInput style={styles.taskInput}
                               placeholder={"Bijv. aan mijn scriptie werken"}
                               placeholderTextColor={"#aaa"}
                               value={taskInput}
                               onChangeText={setTaskInput}
                    ></TextInput>
                    <Text style={styles.taskQuestion}>Hoe lang verwacht je bezig te zijn?</Text>
                    <Text style={styles.taskLabel}>Tijd (in minuten)</Text>
                    <Dropdown
                        style={styles.dropdown}
                        data={timeOptions.map(t => ({ label: `${t} min`, value: t }))}
                        labelField="label"
                        valueField="value"
                        placeholder="Selecteer tijd..."
                        value={selectedTime}
                        onChange={(item) => setSelectedTime(item.value)}
                        dropdownPosition={"top"}
                        onFocus={() => Keyboard.dismiss()}
                    />
                    <TouchableOpacity style={[styles.confirmButton, (!taskInput || !selectedTime) && styles.confirmButtonDisabled
                    ]} onPress={() => {
                        if (taskInput && selectedTime) {
                            onConfirm({task: taskInput, expectedTime: selectedTime})
                            console.log(taskInput, selectedTime)
                        }
                    }}>
                        <Text style={styles.buttonText}>Start Taak:</Text>
                    </TouchableOpacity>
                </View>
                </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBox: {
        backgroundColor: '#F4F7F5',
        borderRadius: 4,
        borderWidth: 2,
        borderColor: 'black',
        padding: 24,
        width: '85%',
        alignItems: 'center',
        gap: 20,
    },
    taskQuestion: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'left',
        width: '100%',
    },
    fieldGroup: {
        width: '100%',
        gap: 8,
    },
    taskLabel: {
        fontSize: 14,
        color: '#000',
        textAlign: 'left',
        width: '100%',
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#555',
    },
    taskInput: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 10,
        fontSize: 15,
        color: '#3a3a3a',

    },
    dropdown: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        paddingHorizontal: 12,
        height: 44,
    },
    confirmButton: {
        backgroundColor: '#7FB77E',
        borderRadius: 6,
        paddingVertical: 12,
        paddingHorizontal: 32,
        width: '100%',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        marginTop: 8
    },
    confirmButtonDisabled: {
        backgroundColor: '#ccc',
    },
    buttonText: {
        color: '#000',
        fontSize: 16,
    },
});