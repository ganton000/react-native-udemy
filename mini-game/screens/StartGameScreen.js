import {
    TextInput,
    View,
    StyleSheet,
    useWindowDimensions,
    Dimensions,
    Alert,
} from "react-native";
import React, { useState } from "react";

import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import Title from "../components/ui/Title";

import Colors from "../constants/colors";

const StartGameScreen = ({ onPickedNumber }) => {
    const [enteredNumber, setEnteredNumber] = useState("");

    //re-renders everytime device orientation changes
    const { width, height } = useWindowDimensions();

    const numberInputHandler = (enteredText) => {
        setEnteredNumber(enteredText);
    };

    const resetInputHandler = () => {
        setEnteredNumber("");
    };

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredNumber);

        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert(
                "Invalid number!",
                "Number has to be a number between 1 and 99.",
                [
                    {
                        text: "Okay",
                        style: "destructive",
                        onPress: resetInputHandler,
                    },
                ]
            );
            return;
        }

        onPickedNumber(chosenNumber);
    };

    const marginTopDistance = height < 380 ? 30 : 100;

    return (
        <View style={[styles.rootContainer, { marginTop: marginTopDistance }]}>
            <Title>Guess My Number</Title>
            <Card style={styles.inputContainer}>
                <InstructionText>Enter a number</InstructionText>
                <TextInput
                    style={styles.numberInput}
                    maxLength={2}
                    keyboardType="number-pad"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={numberInputHandler}
                    value={enteredNumber}
                />
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={resetInputHandler}>
                            Reset
                        </PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={confirmInputHandler}>
                            Confirm
                        </PrimaryButton>
                    </View>
                </View>
            </Card>
        </View>
    );
};

export default StartGameScreen;

//const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        //marginTop: deviceHeight < 380 ? 30 : 100,
        alignItems: "center",
    },
    numberInput: {
        height: 50,
        width: 50,
        fontSize: 32,
        borderBottomColor: Colors.accent500,
        borderBottomWidth: 2,
        color: Colors.accent500,
        marginVertical: 8,
        fontWeight: "bold",
        textAlign: "center",
    },
    buttonsContainer: {
        flexDirection: "row",
    },
    buttonContainer: {
        flex: 1,
    },
});
