import {useEffect, useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, ScrollView } from 'react-native'

export default function ReflectionModal({ visible, completionStatus, onFinish }) {
    const [wentWell, setWentWell] = useState('')
    const [wentBad, setWentBad] = useState('')
    const [feeling, setFeeling] = useState('')

    useEffect(() => {
        if (visible) {
            setWentWell('')
            setWentBad('')
            setFeeling('')
        }
    }, [visible]);

    return (
        <Modal visible={visible} transparent={true} animationType="fade">
            <View style={styles.modalOverlay}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.modalBox}>
                        <Text style={styles.title}>Reflectie</Text>

                        <Text style={styles.label}>Wat ging goed vandaag?</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Bijv. Ik heb me goed kunnen focussen..."
                            placeholderTextColor="#aaa"
                            value={wentWell}
                            onChangeText={setWentWell}
                            multiline={true}
                        />

                        <Text style={styles.label}>Wat ging minder goed vandaag?</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Bijv. Ik raakte snel afgeleid..."
                            placeholderTextColor="#aaa"
                            value={wentBad}
                            onChangeText={setWentBad}
                            multiline={true}
                        />

                        <Text style={styles.label}>Hoe voelde je tijdens het uitvoeren van je taak?</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Bijv. Ik voelde me gemotiveerd maar moe..."
                            placeholderTextColor="#aaa"
                            value={feeling}
                            onChangeText={setFeeling}
                            multiline={true}
                        />

                        <TouchableOpacity
                            style={styles.confirmButton}
                            onPress={() =>
                                    onFinish({ wentWell, wentBad, feeling })
                            }
                        >
                            <Text style={styles.buttonText}>Reflectie Afronden ✓</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    modalBox: {
        backgroundColor: '#F4F7F5',
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#000',
        padding: 24,
        width: '100%',
        gap: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 4,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 10,
        fontSize: 14,
        color: '#3a3a3a',
        minHeight: 70,
        textAlignVertical: 'top',
        backgroundColor: '#fff',
    },
    confirmButton: {
        backgroundColor: '#7FB77E',
        borderRadius: 6,
        paddingVertical: 12,
        width: '100%',
        alignItems: 'center',
        marginTop: 8,
    },
    confirmButtonDisabled: {
        backgroundColor: '#ccc',
    },
    buttonText: {
        color: '#000',
        fontSize: 16,
    },
})