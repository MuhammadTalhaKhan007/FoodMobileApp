import { StyleSheet, Image, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { Text, View } from "@/src/components/Themed";
import PizzaComponent from "@/src/Data/Pizza";
import TopMenuBar from "@/src/Data/TopMenuBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import cat1 from "../../Data/Meals";
import cat2 from "../../Data/Snacks";
import cat3 from "../../Data/Drinks";
import cat4 from "../../Data/Sides";
interface MyProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  added: boolean;
  type: string;
  quantity: number;
}

export default function TabOneScreen() {
  const [selectedCategory, setSelectedCategory] = useState("Meals");
  const [products, setProducts] = useState<MyProduct[] | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProducts = async (category: string) => {
    try {
      const mealData = await AsyncStorage.getItem(category);
      if (mealData) {
        const parsedData = JSON.parse(mealData);
        setProducts(parsedData);
      } else {
        console.log("No data found for the selected category.");
        setProducts(null);
      }
    } catch (error) {
      console.error("Error retrieving data:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  useEffect(() => {
    setLoading(true);
    loadProducts(selectedCategory);
  }, [selectedCategory]);

  // Just to initialize the data in AsyncStorage
  useEffect(() => {
    cat1;
    cat2;
    cat3;
    cat4;
  });

  return (
    <View style={styles.wrapper}>
      <TopMenuBar
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={50} color={"brown"} />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : products && products.length > 0 ? (
        <PizzaComponent MyProduct={products} />
      ) : (
        <Text>No products available</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  loadingText: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "brown",
  },
});
