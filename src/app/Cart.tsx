import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";
import Meals from "../Data/Meals";
import Snacks from "../Data/Snacks";
import Sides from "../Data/Sides";
import Drinks from "../Data/Drinks";

export default function CartScreen() {
  const cartItems = [
    ...Meals.filter((item) => item.added),
    ...Snacks.filter((item) => item.added),
    ...Sides.filter((item) => item.added),
    ...Drinks.filter((item) => item.added),
  ];

  const renderCartItem = ({ item }: any) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>{item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.cartTitleContainer}>
        <Text style={styles.title}>Cart</Text>
        {cartItems.length > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{cartItems.length}</Text>
          </View>
        )}
      </View>
      <View style={styles.separator} />

      {cartItems.length > 0 ? (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCartItem}
        />
      ) : (
        <Text>Your cart is empty!</Text>
      )}

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  cartTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 10,
  },
  badge: {
    backgroundColor: "red",
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 24,
    marginBottom: 10,
  },
  badgeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: "80%",
    backgroundColor: "#eee",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemName: {
    fontSize: 16,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
