import { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Modal, ScrollView } from 'react-native'

const statusLabel = (task) => {
    if (task.status === 'cancelled') return '✕ Geannuleerd'
    if (task.status === 'completed') return '✅ Voltooid'
    return '⏳ Bezig'
}

const statusColor = (task) => {
    if (task.status === 'cancelled') return '#ccc'
    if (task.status === 'completed') return '#7FB77E'
    return '#F5C842'
}

export default function TaskOverviewModal({visible, tasks, onClose, onComplete, onReflect, onCancel,}) {
    return (
        <Modal visible={visible} transparent={true} animationType="fade">
            <View style={styles.modalOverlay}>
                <View style={styles.modalBox}>

                    <Text style={styles.title}>Taken van vandaag ({tasks.length}/3)</Text>

                    {tasks.length === 0 && (
                        <Text style={styles.emptyText}>Nog geen taken vandaag.</Text>
                    )}

                    <ScrollView style={styles.taskList}>
                        {tasks.map((task) => (
                            <View key={task.id} style={styles.taskCard}>

                                <View style={styles.taskHeader}>
                                    <Text style={styles.taskName} numberOfLines={1}>{task.task}</Text>
                                    <Text style={styles.taskTime}>{task.expectedTime} min</Text>
                                </View>

                                <Text style={[styles.taskStatus, { color: statusColor(task) }]}>
                                    {statusLabel(task)}
                                </Text>

                                {task.xp > 0 && (
                                    <Text style={styles.taskXP}>+{task.xp} XP verdiend</Text>
                                )}

                                {task.status === 'pending' && (
                                    <View style={styles.actions}>
                                        <TouchableOpacity
                                            style={styles.completeButton}
                                            onPress={() => onComplete(task)}
                                        >
                                            <Text style={styles.completeButtonText}>Voltooien →</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={styles.cancelButton}
                                            onPress={() => onCancel(task.id)}
                                        >
                                            <Text style={styles.cancelButtonText}>✕</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}

                                {task.status === 'completed' && !task.reflection && (
                                    <TouchableOpacity
                                        style={styles.reflectButton}
                                        onPress={() => onReflect(task)}
                                    >
                                        <Text style={styles.reflectButtonText}>Reflecteer →</Text>
                                    </TouchableOpacity>
                                )}

                                {task.status === 'completed' && task.reflection && (
                                    <Text style={styles.reflectedText}>✓ Reflectie ingevuld</Text>
                                )}

                            </View>
                        ))}
                    </ScrollView>

                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeButtonText}>Sluiten</Text>
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
        borderColor: '#000',
        padding: 24,
        width: '90%',
        maxHeight: '80%',
        gap: 12,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    emptyText: {
        color: '#888',
        fontSize: 14,
        textAlign: 'center',
        paddingVertical: 20,
    },
    taskList: {
        maxHeight: 400,
    },
    taskCard: {
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 12,
        marginBottom: 10,
        gap: 6,
    },
    taskHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    taskName: {
        fontSize: 15,
        fontWeight: '600',
        color: '#000',
        flex: 1,
    },
    taskTime: {
        fontSize: 13,
        color: '#888',
        marginLeft: 8,
    },
    taskStatus: {
        fontSize: 13,
        fontWeight: '600',
    },
    taskXP: {
        fontSize: 12,
        color: '#7FB77E',
        fontWeight: '600',
    },
    actions: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 4,
    },
    completeButton: {
        flex: 1,
        backgroundColor: '#7FB77E',
        borderRadius: 6,
        paddingVertical: 8,
        alignItems: 'center',
    },
    completeButtonText: {
        color: '#000',
        fontWeight: '600',
        fontSize: 14,
    },
    cancelButton: {
        backgroundColor: '#eee',
        borderRadius: 6,
        paddingVertical: 8,
        paddingHorizontal: 14,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#888',
        fontWeight: '600',
        fontSize: 14,
    },
    reflectButton: {
        backgroundColor: '#F5C842',
        borderRadius: 6,
        paddingVertical: 8,
        alignItems: 'center',
        marginTop: 4,
    },
    reflectButtonText: {
        color: '#000',
        fontWeight: '600',
        fontSize: 14,
    },
    reflectedText: {
        fontSize: 13,
        color: '#7FB77E',
        fontWeight: '600',
    },
    closeButton: {
        backgroundColor: '#fff',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 10,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#000',
        fontSize: 15,
    },
})