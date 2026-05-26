import { useState } from "react";
import {StyleSheet, Text, View, TouchableOpacity, Modal} from "react-native";

const options = [
    {
        id: "complete",
        label: "Volledig Voltooid",
        color: "#7FB77E"
    },
    {
        id: "partial",
        label: "Deels Voltooid",
        color: "#F5C842"
    },
    {
        id: "incomplete",
        label: "Niet Voltooid",
        color: "#B0BEC5"
    }
]

export default function CompletionModal ({visible, onConfirm}) {
    const [selected, setSelected] = useState(null)

    return (
        <Modal visible={visible} transparent={true} animationType="fade">
            <View style={styles.modalOverlay}>
                <View style={styles.modalBox}>
                    <Text style={styles.title}>Hoe is je taak gegaan?</Text>

                    {options.map((option) => (
                        <TouchableOpacity
                            key={option.id}
                            style={[
                                styles.optionButton,
                                selected === option.id && { borderColor: option.color, borderWidth: 2 }
                            ]}
                            onPress={() => setSelected(option.id)}
                        >
                            <Text style={styles.optionLabel}>{option.label}</Text>
                            <Text style={styles.optionDescription}>{option.description}</Text>
                        </TouchableOpacity>
                    ))}

                    <TouchableOpacity
                        style={[styles.confirmButton, !selected && styles.confirmButtonDisabled]}
                        onPress={() => {
                            if (selected) onConfirm(selected)
                        }}
                    >
                        <Text style={styles.buttonText}>Doorgaan -> Reflectie</Text>
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
        width: '85%',
        alignItems: 'center',
        gap: 12,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'left',
        width: '100%',
        marginBottom: 4,
    },
    optionButton: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 14,
        gap: 4,
    },
    optionLabel: {
        fontSize: 15,
        fontWeight: '600',
        color: '#000',
    },
    optionDescription: {
        fontSize: 13,
        color: '#666',
    },
    confirmButton: {
        backgroundColor: '#7FB77E',
        borderRadius: 6,
        paddingVertical: 12,
        width: '100%',
        alignItems: 'center',
        marginTop: 4,
    },
    confirmButtonDisabled: {
        backgroundColor: '#ccc',
    },
    buttonText: {
        color: '#000',
        fontSize: 16,
    },
})