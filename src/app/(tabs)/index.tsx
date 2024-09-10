import { StyleSheet, Image } from "react-native";

import EditScreenInfo from "@/src/components/EditScreenInfo";
import { Text, View } from "@/src/components/Themed";

import pizza from "@/src/Data/Product";
import PizzaComponent from "@/src/Data/Pizza";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <PizzaComponent MyProduct={pizza} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
