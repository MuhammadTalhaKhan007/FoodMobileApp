import { StyleSheet, Image } from "react-native";
import { Text, View } from "@/src/components/Themed";

interface MyProduct {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface MyProductProps {
  MyProduct: MyProduct[];
}

const PizzaComponent = ({ MyProduct }: MyProductProps) => {
  return (
    <View>
      {MyProduct.map((data) => (
        <View key={data.id}>
          <Image source={{ uri: data.image }} style={styles.image} />
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.name}>{data.price}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    aspectRatio: 2 / 1,
  },
  name: {
    fontSize: 42,
  },
});

export default PizzaComponent;
