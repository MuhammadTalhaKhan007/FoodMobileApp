import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SectionList,
  SectionListData,
  Pressable,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";
import {
  useNavigation,
  NavigationProp,
  useFocusEffect,
} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";

export default function PayNowScreen() {
  const navigation = useNavigation<NavigationProp<any>>();
  const [totalAmount, setTotalAmount] = useState(0);
  const loadTotalAmount = async () => {
    const data = await AsyncStorage.getItem("Total Amount");
    if (data) {
      return JSON.parse(data);
    } else {
      console.log(`No data found for Total Amount`);
      return 0;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const amount = await loadTotalAmount();
      setTotalAmount(amount);
    };

    fetchData();
  }, []);

  return (
    <View>
      <Text>${totalAmount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
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
    backgroundColor: "#CED0CE",
    alignSelf: "center",
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
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  itemName: {
    fontSize: 16,
  },
  itemPrice: {
    fontSize: 14,
    color: "green",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    backgroundColor: "#ddd",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  quantityText: {
    fontSize: 18,
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  totalContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },

  listContent: {
    paddingBottom: 80,
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
