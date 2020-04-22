import * as React from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-react-native";
import { Text, View } from "react-native";

type State = {
  isTfReady: boolean;
};

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
