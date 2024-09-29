import React, { useCallback, useState } from "react";
import { Platform, Pressable, StyleSheet, View, Text } from "react-native";
import { FontAwesomeIcon as RNFontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { FontAwesomeIcon as WebFontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faShoppingCart,
  faUtensils,
  faHome,
  faCommentDots,
  faHeart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link, Tabs } from "expo-router";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/src/components/useColorScheme";
import { useClientOnlyValue } from "@/src/components/useClientOnlyValue";
import Meals from "../../Data/Meals";
import Snacks from "../../Data/Snacks";
import Sides from "../../Data/Sides";
import Drinks from "../../Data/Drinks";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const FontAwesomeIcon =
  Platform.OS === "web" ? WebFontAwesomeIcon : RNFontAwesomeIcon;

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

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [cartItemCount, setCartItemCount] = useState(0);

  // Function to get all items from AsyncStorage and filter added items
  const getCartItems = async () => {
    try {
      const mealsData = await AsyncStorage.getItem("Meals");
      const snacksData = await AsyncStorage.getItem("Snacks");
      const sidesData = await AsyncStorage.getItem("Sides");
      const drinksData = await AsyncStorage.getItem("Drinks");

      const meals = mealsData ? JSON.parse(mealsData) : [];
      const snacks = snacksData ? JSON.parse(snacksData) : [];
      const sides = sidesData ? JSON.parse(sidesData) : [];
      const drinks = drinksData ? JSON.parse(drinksData) : [];

      const cartItems = [
        ...meals.filter((item: MyProduct) => item.added),
        ...snacks.filter((item: MyProduct) => item.added),
        ...sides.filter((item: MyProduct) => item.added),
        ...drinks.filter((item: MyProduct) => item.added),
      ];

      return cartItems;
    } catch (error) {
      console.error("Error retrieving cart items from AsyncStorage:", error);
      return [];
    }
  };

  useFocusEffect(
    useCallback(() => {
      const updateCartItemCount = async () => {
        const updatedCartItems = await getCartItems();
        setCartItemCount(updatedCartItems.length);
      };

      updateCartItemCount();
    }, [])
  );

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "brown",
        tabBarInactiveTintColor: "gray",
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="liveChat"
        options={{
          title: "Live Chat",
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon
              icon={faCommentDots}
              size={Platform.OS === "web" ? ("25px" as any) : 25}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon
              icon={faUser}
              size={Platform.OS === "web" ? ("25px" as any) : 25}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon
              icon={faHome}
              size={Platform.OS === "web" ? ("25px" as any) : 25}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="index"
        options={{
          title: "Menu",
          headerTitle: "Our Menu",
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon
              icon={faUtensils}
              size={Platform.OS === "web" ? ("25px" as any) : 25}
              color={color}
            />
          ),
          headerTitleAlign: "center",
          headerTitleStyle: { fontWeight: "bold" },
          headerLeft: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    size={Platform.OS === "web" ? ("25px" as any) : 25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ opacity: pressed ? 0.5 : 1, marginLeft: 10 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
          headerRight: () => (
            <Link href="/Cart" asChild>
              <Pressable>
                {({ pressed }) => (
                  <View style={{ position: "relative" }}>
                    <FontAwesomeIcon
                      icon={faShoppingCart}
                      size={Platform.OS === "web" ? ("25px" as any) : 25}
                      color={Colors[colorScheme ?? "light"].text}
                      style={{ opacity: pressed ? 0.5 : 1, marginRight: 10 }}
                    />
                    {cartItemCount > 0 && (
                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>{cartItemCount}</Text>
                      </View>
                    )}
                  </View>
                )}
              </Pressable>
            </Link>
          ),
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon
              icon={faHeart}
              size={Platform.OS === "web" ? ("25px" as any) : 25}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    right: 3,
    top: -9,
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});
