import * as React from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-react-native";
import { Text, View } from "react-native";
import * as iris from "./iris.json";
import * as irisTesting from "./testing.json";

type State = {
  isTfReady: boolean;
};

const trainingData = tf.tensor2d(
  iris.map((item) => [
    item.sepal_length,
    item.sepal_width,
    item.petal_length,
    item.petal_width,
  ]),
  [130, 4]
);

const testingData = tf.tensor2d(
  irisTesting.map((item) => [
    item.sepal_length,
    item.sepal_width,
    item.petal_length,
    item.petal_width,
  ]),
  [14, 4]
);

export class TensorFlow extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      isTfReady: false,
    };
  }

  async componentDidMount() {
    // Wait for tf to be ready.
    await tf.ready();
    // Signal to the app that tensorflow.js can now be used.
    this.setState({
      isTfReady: true,
    });
  }

  render() {
    //
    return (
      <View>
        <Text>
          {this.state.isTfReady ? "TF is ready!" : "TF is not ready:("}
        </Text>
      </View>
    );
  }
}
