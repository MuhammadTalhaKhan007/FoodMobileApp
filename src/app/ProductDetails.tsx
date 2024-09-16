import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";
import Meals from "../Data/Meals";
import Snacks from "../Data/Snacks";
import Sides from "../Data/Sides";
import Drinks from "../Data/Drinks";

const ProductDetails = () => {
  let { id, name, price, image, type } = useLocalSearchParams();

  let initialMeal;
  if (type === "Meals") {
    initialMeal = Meals.find((item) => item.id === Number(id));
  } else if (type === "Snacks") {
    initialMeal = Snacks.find((item) => item.id === Number(id));
  } else if (type === "Drinks") {
    initialMeal = Drinks.find((item) => item.id === Number(id));
  } else if (type === "Sides") {
    initialMeal = Sides.find((item) => item.id === Number(id));
  }

  const [added, setAdded] = useState(initialMeal?.added || false);
  const imageUri = Array.isArray(image) ? image[0] : image;
  const defaultImage = "https://via.placeholder.com/200";

  const handlePress = () => {
    const newState = !added;
    setAdded(newState);

    if (type === "Meals") {
      const itemIndex = Meals.findIndex((item) => item.id === Number(id));
      if (itemIndex !== -1) {
        Meals[itemIndex].added = newState;
      }
    } else if (type === "Snacks") {
      const itemIndex = Snacks.findIndex((item) => item.id === Number(id));
      if (itemIndex !== -1) {
        Snacks[itemIndex].added = newState;
      }
    } else if (type === "Sides") {
      const itemIndex = Sides.findIndex((item) => item.id === Number(id));
      if (itemIndex !== -1) {
        Sides[itemIndex].added = newState;
      }
    } else if (type === "Drinks") {
      const itemIndex = Drinks.findIndex((item) => item.id === Number(id));
      if (itemIndex !== -1) {
        Drinks[itemIndex].added = newState;
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageUri ? imageUri : defaultImage }}
        style={styles.image}
      />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.price}>{price}</Text>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <>
          <Icon
            name="cart-outline"
            size={20}
            color="#eee"
            style={styles.icon}
          />
          <Text style={styles.buttonText}>
            {added ? "Added" : "Add to cart"}
          </Text>
        </>
      </TouchableOpacity>
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
  button: {
    height: 60,
    width: 200,
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
  },
  icon: {
    marginRight: 10,
  },
});

export default ProductDetails;
