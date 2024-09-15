import React from "react";
import { Platform, Pressable } from "react-native";
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

const FontAwesomeIcon =
  Platform.OS === "web" ? WebFontAwesomeIcon : RNFontAwesomeIcon;

export default function TabLayout() {
  const colorScheme = useColorScheme();

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
            <Pressable>
              {({ pressed }) => (
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  size={Platform.OS === "web" ? ("25px" as any) : 25}
                  color={Colors[colorScheme ?? "light"].text}
                  style={{ opacity: pressed ? 0.5 : 1, marginRight: 10 }}
                />
              )}
            </Pressable>
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
