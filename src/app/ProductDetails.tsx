import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

const ProductDetails = () => {
  let { name, price, image } = useLocalSearchParams();

  const imageUri = Array.isArray(image) ? image[0] : image;
  const defaultImage = "https://via.placeholder.com/200";

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageUri ? imageUri : defaultImage }}
        style={styles.image}
      />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.price}>{price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 10,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    color: "#888",
  },
});

export default ProductDetails;
