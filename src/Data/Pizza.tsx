import { StyleSheet, Image } from "react-native";
import EditScreenInfo from "@/src/components/EditScreenInfo";
import { Text, View } from "@/src/components/Themed";

import pizza from "@/src/Data/Product";

const PizzaComponent = () => {
  return (
    <View>
      <Image source={{ uri: pizza[0].image }} style={styles.image} />

      <Text style={styles.name}> {pizza[0].name} </Text>
      <Text style={styles.name}> {pizza[0].price} </Text>

      <Image source={{ uri: pizza[1].image }} style={styles.image} />

      <Text style={styles.name}> {pizza[1].name} </Text>
      <Text style={styles.name}> {pizza[1].price} </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  image: {
    width: "100%",
    aspectRatio: 2 / 1,
  },
  name: {
    fontSize: 42,
  },
});

export default PizzaComponent;
