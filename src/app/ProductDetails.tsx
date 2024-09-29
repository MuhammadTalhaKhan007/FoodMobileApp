import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

interface MyProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  added: boolean;
  quantity: number;
}

interface CartItems {
  meals: MyProduct[];
  snacks: MyProduct[];
  sides: MyProduct[];
  drinks: MyProduct[];
}

const ProductDetails = () => {
  const { id, name, price, image, type } = useLocalSearchParams();

  const [added, setAdded] = useState(false);
  const imageUri = Array.isArray(image) ? image[0] : image;
  const defaultImage = "https://via.placeholder.com/200";

  useEffect(() => {
    const loadProductState = async () => {
      try {
        const data = await AsyncStorage.getItem(String(type));
        const products = data ? JSON.parse(data) : [];
        const product = products.find(
          (item: MyProduct) => item.id === Number(id)
        );
        setAdded(product?.added || false);
      } catch (error) {
        console.error("Error loading product state:", error);
      }
    };

    loadProductState();
  }, [id, type]);

  // Show toast messages
  const showAddToast = () => {
    Toast.show({
      type: "success",
      text1: `${name} has been added to cart!`,
      text2: "You can proceed to checkout 👋",
    });
  };

  const showRemoveToast = () => {
    Toast.show({
      type: "info",
      text1: `${name} has been removed from cart!`,
      text2: "You can explore more items 🔍",
    });
  };

  const handlePress = async () => {
    try {
      const data = await AsyncStorage.getItem(String(type));
      const products = data ? JSON.parse(data) : [];
      const productIndex = products.findIndex(
        (item: MyProduct) => item.id === Number(id)
      );

      if (productIndex !== -1) {
        products[productIndex].added = !added;
      }

      await AsyncStorage.setItem(String(type), JSON.stringify(products));
      setAdded(!added);

      !added ? showAddToast() : showRemoveToast();
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Image
          source={{ uri: imageUri ? imageUri : defaultImage }}
          style={styles.image}
        />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>${price}</Text>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Icon
            name={added ? "cart" : "cart-outline"}
            size={20}
            color="#eee"
            style={styles.icon}
          />
          <Text style={styles.buttonText}>
            {added ? "Added" : "Add to cart"}
          </Text>
        </TouchableOpacity>
      </View>
      <Toast />
    </>
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
