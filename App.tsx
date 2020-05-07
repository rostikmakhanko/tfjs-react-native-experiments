import React, { useState } from "react";
import {
  Button,
  Image,
  ImageLoadEventData,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ImagePicker from "react-native-image-picker";
import { TensorFlow } from "./TensorFlow";
import * as tf from "@tensorflow/tfjs";
import * as tf_rn from "@tensorflow/tfjs-react-native";

type Options = {
  title: string;
  storageOptions: { skipBackup: boolean; path: string };
};

export default function App() {
  const [photoUri, setPhotoUri] = useState({ uri: "" });
  const [imageTensor, setImageTensor] = useState("No imageTensor yet");

  const openPhotoImagePickerOptions = {
    title: "Open Photo",
    storageOptions: {
      skipBackup: true,
      path: "images",
    },
  };

  const onOpenPhotoButtonPress = (options: Options) => {
    console.log("Choose photo");
    ImagePicker.showImagePicker(options, (response) => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        console.log(response.uri);
        setPhotoUri({ uri: response.uri });
        convertImageToTensor(response.uri);
      }
    });
  };

  const convertImageToTensor = async (uri: string) => {
    const image = require('./photo.jpeg');
    const imageAssetPath = Image.resolveAssetSource(image);
    console.log("hello");
    const response = await tf_rn.fetch(imageAssetPath.uri, {}, { isBinary: true });
    console.log("hello1");
    const rawImageData = await response.arrayBuffer();
    console.log("hello2");
    const imageTensor = tf_rn.decodeJpeg(new Uint8Array(rawImageData));
    console.log("hello3");
    setImageTensor(imageTensor.toString());
    console.log("hello", imageTensor);
    return imageTensor;
  };

  return (
    <View style={styles.container}>
      <TensorFlow />
      <Text>Hello</Text>
      <Button
        title={"Pick photo"}
        onPress={() => {
          onOpenPhotoButtonPress(openPhotoImagePickerOptions);
        }}
      />
      <ScrollView>
        {photoUri.uri ? (
          <Image
            style={{ width: 200, height: 200 }}
            source={photoUri}
            onLoad={(
              loadImageEvent: NativeSyntheticEvent<ImageLoadEventData>
            ) => console.log(loadImageEvent)}
          />
        ) : (
          <></>
        )}

        <Text>{imageTensor}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
