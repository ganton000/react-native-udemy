import { useState } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
import { StatusBar } from "expo-status-bar";

import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
    const [showModal, setShowModal] = useState(false);
    const [courseGoals, setCourseGoals] = useState([]);

    function startAddGoalHandler() {
        setShowModal(true);
    }

    function endAddGoalHandler() {
        setShowModal(false);
    }

    function addGoalHandler(enteredGoalText) {
        setCourseGoals((currentCourseGoals) => [
            ...currentCourseGoals,
            { text: enteredGoalText, id: Math.random().toString() },
        ]);
        setShowModal(false);
    }

    function deleteGoalHandler(id) {
        setCourseGoals((currentCourseGoals) => {
            return currentCourseGoals.filter((goal) => goal.id !== id);
        });
    }

    function renderList(itemData) {
        const { item } = itemData;

        return (
            <GoalItem
                text={item.text}
                id={item.id}
                onDeleteItem={deleteGoalHandler}
            />
        );
    }

    return (
        <>
            <StatusBar style="light" />
            <View style={styles.appContainer}>
                <Button
                    title="Add New Goal"
                    color="#a065ec"
                    onPress={startAddGoalHandler}
                />
                <GoalInput
                    visible={showModal}
                    onAddGoal={addGoalHandler}
                    onCancel={endAddGoalHandler}
                />
                <View style={styles.goalsContainer}>
                    <FlatList
                        data={courseGoals}
                        renderItem={renderList}
                        keyExtractor={(item, index) => item.id}
                        alwaysBounceVertical={false}
                    />
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 16,
    },
    goalsContainer: {
        flex: 5,
    },
});
