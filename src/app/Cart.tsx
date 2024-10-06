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
  const navigation = useNavigation<NavigationProp<any>>();
  const [cartItems, setCartItems] = useState<CartItems>({
    meals: [],
    snacks: [],
    sides: [],
    drinks: [],
  });
  const [loading, setLoading] = useState(true);

  const loadProducts = async (category: string) => {
    try {
      const data = await AsyncStorage.getItem(category);
      if (data) {
        return JSON.parse(data);
      } else {
        console.log(`No data found for ${category}`);
        return [];
      }
    } catch (error) {
      console.error(`Error retrieving ${category} data:`, error);
      return [];
    }
  };

  const loadAllProducts = async () => {
    try {
      const [meals, snacks, sides, drinks] = await Promise.all([
        loadProducts("Meals"),
        loadProducts("Snacks"),
        loadProducts("Sides"),
        loadProducts("Drinks"),
      ]);

      setCartItems({
        meals: meals.filter((item: MyProduct) => item.added),
        snacks: snacks.filter((item: MyProduct) => item.added),
        sides: sides.filter((item: MyProduct) => item.added),
        drinks: drinks.filter((item: MyProduct) => item.added),
      });
      setLoading(false);
    } catch (error) {
      console.error("Error loading products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  const calculateTotalAmount = () => {
    AsyncStorage.removeItem("Total Amount");
    let total = 0;
    Object.values(cartItems).forEach((items) => {
      items.forEach((item: MyProduct) => {
        total += item.price * item.quantity;
      });
    });
    AsyncStorage.getItem("Total Amount")
      .then((isTotalPriceSet) => {
        if (!isTotalPriceSet) {
          AsyncStorage.setItem("Total Amount", JSON.stringify(total.toFixed(2)))
            .then(() => {
              return;
            })
            .catch((error) => {
              console.error("Error setting total amount:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error retrieving total amount:", error);
      });
    return total.toFixed(2);
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const saveItemsToAsyncStorage = async (
    category: string,
    updatedItems: MyProduct[]
  ) => {
    const storageCategory = capitalizeFirstLetter(category);
    try {
      const existingData = await AsyncStorage.getItem(storageCategory);
      let currentItems: MyProduct[] = [];

      if (existingData) {
        currentItems = JSON.parse(existingData);
      }

      const mergedItems = currentItems.map((item) => {
        const updatedItem = updatedItems.find((i) => i.id === item.id);
        return updatedItem ? updatedItem : item;
      });

      updatedItems.forEach((item) => {
        if (!currentItems.some((i) => i.id === item.id)) {
          mergedItems.push(item);
        }
      });
      await AsyncStorage.setItem(storageCategory, JSON.stringify(mergedItems));
    } catch (error) {
      console.error(`Error saving ${storageCategory} to AsyncStorage:`, error);
    }
  };

  const handleIncreaseQuantity = async (
    id: number,
    sectionKey: keyof CartItems
  ) => {
    setCartItems((prevItems) => {
      const updatedSection = prevItems[sectionKey].map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      saveItemsToAsyncStorage(sectionKey, updatedSection);

      return {
        ...prevItems,
        [sectionKey]: updatedSection,
      };
    });
  };

  const handleDecreaseQuantity = async (
    id: number,
    sectionKey: keyof CartItems
  ) => {
    setCartItems((prevItems) => {
      const updatedSection = prevItems[sectionKey].map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );

      saveItemsToAsyncStorage(sectionKey, updatedSection);

      return {
        ...prevItems,
        [sectionKey]: updatedSection,
      };
    });
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

      {Object.values(cartItems).some((section) => section.length > 0) && (
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>
            Total Amount: ${calculateTotalAmount()}
          </Text>
        </View>
      )}
      <View style={styles.buttonContainer}>
        {Object.values(cartItems).every((section) => section.length === 0) ? (
          <></>
        ) : (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("PayNow", {});
            }}
            style={styles.button}
          >
            <Icon name={"card"} size={20} color="#eee" style={styles.icon} />
            <Text style={styles.buttonText}>{"Proceed to Payment"}</Text>
          </TouchableOpacity>
        )}
      </View>

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
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
