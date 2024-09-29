import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SectionList,
  SectionListData,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";
import Meals from "../Data/Meals";
import Snacks from "../Data/Snacks";
import Sides from "../Data/Sides";
import Drinks from "../Data/Drinks";

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

export default function CartScreen() {
  const [cartItems, setCartItems] = useState<CartItems>({
    meals: Meals.filter((item) => item.added),
    snacks: Snacks.filter((item) => item.added),
    sides: Sides.filter((item) => item.added),
    drinks: Drinks.filter((item) => item.added),
  });

  const handleIncreaseQuantity = (id: number, sectionKey: keyof CartItems) => {
    setCartItems((prevItems) => ({
      ...prevItems,
      [sectionKey]: prevItems[sectionKey].map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      ),
    }));
  };

  const handleDecreaseQuantity = (id: number, sectionKey: keyof CartItems) => {
    setCartItems((prevItems) => ({
      ...prevItems,
      [sectionKey]: prevItems[sectionKey].map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ),
    }));
  };

  const renderCartItem = ({
    item,
    section,
  }: {
    item: MyProduct;
    section: SectionListData<MyProduct>;
  }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          onPress={() =>
            handleDecreaseQuantity(item.id, section.key as keyof CartItems)
          }
          style={styles.quantityButton}
        >
          <Text style={styles.quantityText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <TouchableOpacity
          onPress={() =>
            handleIncreaseQuantity(item.id, section.key as keyof CartItems)
          }
          style={styles.quantityButton}
        >
          <Text style={styles.quantityText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const sections = [
    { key: "meals", title: "Meals", data: cartItems.meals },
    { key: "snacks", title: "Snacks", data: cartItems.snacks },
    { key: "sides", title: "Sides", data: cartItems.sides },
    { key: "drinks", title: "Drinks", data: cartItems.drinks },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.cartTitleContainer}>
        <Text style={styles.title}>Cart</Text>
        {Object.values(cartItems).some((items) => items.length > 0) && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {Object.values(cartItems).reduce(
                (total, section) => total + section.length,
                0
              )}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.separator} />

      {Object.values(cartItems).every((section) => section.length === 0) ? (
        <Text>Your cart is empty!</Text>
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCartItem}
          renderSectionHeader={({ section }) => (
            <View>
              <Text style={styles.sectionHeader}>{section.title}</Text>
              {section.data.length === 0 && (
                <Text style={styles.emptySectionText}>
                  No {section.title.toLowerCase()}
                </Text>
              )}
            </View>
          )}
          contentContainerStyle={styles.listContent}
        />
      )}

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  cartTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: 16,
    color: "#888",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ddd",
    borderRadius: 15,
  },
  quantityText: {
    fontSize: 20,
    color: "#333",
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "#f8f8f8",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  emptySectionText: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontStyle: "italic",
    color: "#888",
  },
  listContent: {
    paddingBottom: 80,
  },
});
