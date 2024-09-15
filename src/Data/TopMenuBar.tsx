import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const categories = ["Meals", "Sides", "Snacks", "Drinks"];

export default function TopMenuBar() {
  const [selectedCategory, setSelectedCategory] = useState("Meals");

  return (
    <View style={styles.sliderContainer}>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedCategory(item)}>
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
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sliderContainer: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#fff",
  },
  category: {
    marginHorizontal: 35,
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
