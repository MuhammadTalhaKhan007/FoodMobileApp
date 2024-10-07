import { useNavigation, NavigationProp } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function ConfirmOrderScreen() {
  const navigation = useNavigation<NavigationProp<any>>();
  return (
    <View style={styles.container}>
      <Icon name="checkmark-circle-outline" size={80} color="green" />
      <Text style={styles.confirmationText}>
        Your Order has been Placed Successfully!
      </Text>

      <Image
        source={require("../../assets/videos/ConfirmPic.gif")}
        style={styles.gifBackground}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("index");
        }}
      >
        <Icon name={"pizza"} size={20} color="#eee" style={styles.icon} />
        <Text style={styles.buttonText}>Explore More Dishes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  confirmationText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  gifBackground: {
    width: "100%",
    height: "60%",
    resizeMode: "cover",
  },
  button: {
    height: 60,
    width: 220,
    backgroundColor: "#132233",
    borderColor: "rgb(182, 128, 128)",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginTop: 20,
    flexDirection: "row",
  },
  buttonText: {
    color: "#eee",
    fontSize: 15,
    fontWeight: "bold",
  },
  icon: {
    marginRight: 10,
  },
});
