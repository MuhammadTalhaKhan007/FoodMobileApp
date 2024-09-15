import React, { useState } from "react";
import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
interface TopMenuBarProps {
  setSelectedCategory: (category: string) => void;
  selectedCategory: string;
}
const categories = ["Meals", "Sides", "Snacks", "Drinks"];

export default function TopMenuBar({
  setSelectedCategory,
  selectedCategory,
}: TopMenuBarProps) {
  return (
    <View style={styles.sliderContainer}>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable onPress={() => setSelectedCategory(item)}>
            <View
              style={[
                styles.categoryContainer,
                selectedCategory === item && styles.selectedCategoryContainer,
              ]}
            >
              <Text
                style={[
                  styles.category,
                  selectedCategory === item && styles.selectedCategory,
                ]}
              >
                {item}
              </Text>
            </View>
          </Pressable>
        )}
        keyExtractor={(item) => item}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sliderContainer: {
    height: 30,
    borderBottomWidth: 0,
    borderBottomColor: "#ccc",
    marginBottom: 20,
    marginTop: 20,
  },
  category: {
    marginHorizontal: 33,
    fontSize: 17,
    fontWeight: "bold",
    color: "black",
  },
  categoryContainer: {
    marginHorizontal: 10,
  },
  selectedCategoryContainer: {
    borderBottomWidth: 3,
    borderBottomColor: "brown",
    paddingBottom: 5,
    alignItems: "center",
  },
  selectedCategory: {
    color: "brown",
    fontWeight: "bold",
    borderBottomColor: "brown",
    paddingBottom: 1,
  },
});
