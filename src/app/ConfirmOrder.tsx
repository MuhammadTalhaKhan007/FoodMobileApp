import React from "react";
import { Image, StyleSheet, View } from "react-native";

export default function ConfirmOrderScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/videos/ConfirmPic.gif")}
        style={styles.gifBackground}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gifBackground: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
