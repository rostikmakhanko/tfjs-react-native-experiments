import React, { useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import ImagePicker from "react-native-image-picker";
import {TensorFlow} from "./TensorFlow";

type Options = {
  title: string;
  storageOptions: { skipBackup: boolean; path: string };
};

export default function App() {
  const [photoUri, setPhotoUri] = useState({ uri: "" });

  const openPhotoImagePickerOptions = {
    title: "Open Photo",
    storageOptions: {
      skipBackup: true,
      path: "images",
    },
  };

  const onOpenPhotoButtonPress = (options: Options) => {
    console.log('Choose photo');
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
      }
    });
  };

  return (
    <View style={styles.container}>
      <TensorFlow/>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Text>Hello Android and iOS</Text>
      <Button
        title={"Pick photo"}
        onPress={() => {
          onOpenPhotoButtonPress(openPhotoImagePickerOptions);
        }}
      />
      {photoUri.uri ? (
        <Image style={{ width: 200, height: 200 }} source={photoUri} />
      ) : (
        <></>
      )}
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
