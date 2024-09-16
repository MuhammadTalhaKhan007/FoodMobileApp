import { StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import EditScreenInfo from "@/src/components/EditScreenInfo";
import { Text, View } from "@/src/components/Themed";
import Meals from "@/src/Data/Meals";
import Sides from "@/src/Data/Sides";
import Snacks from "@/src/Data/Snacks";
import Drinks from "@/src/Data/Drinks";
import PizzaComponent from "@/src/Data/Pizza";
import TopMenuBar from "@/src/Data/TopMenuBar";

interface MyProduct {
  id: number;
  name: string;
  price: string;
  image: string;
}

export default function TabOneScreen() {
  const [selectedCategory, setSelectedCategory] = useState("Meals");
  const getProducts = (): MyProduct[] => {
    switch (selectedCategory) {
      case "Meals":
        return Meals;
      case "Sides":
        return Sides;
      case "Snacks":
        return Snacks;
      case "Drinks":
        return Drinks;
      default:
        return Meals;
    }
  };
  return (
    <View>
      <TopMenuBar
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
      <PizzaComponent MyProduct={getProducts()} />
    </View>
  );
}
