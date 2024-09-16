import { StyleSheet, Image } from "react-native";
import { View, Text, FlatList, Pressable } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
interface MyProduct {
  id: number;
  name: string;
  price: string;
  image: string;
}

interface MyProductProps {
  MyProduct: MyProduct[];
}

const PizzaComponent = ({ MyProduct }: MyProductProps) => {
  const navigation: any = useNavigation();
  return (
    <FlatList
      data={MyProduct}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => {
            navigation.navigate("ProductDetails", {
              name: item.name,
              image: item.image,
              price: item.price,
            });
          }}
          style={({ pressed }) => [
            styles.itemContainer,
            { opacity: pressed ? 0.9 : 1 }, // Change opacity on press for visual feedback
          ]}
        >
          <View style={styles.textContainer}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>{item.price}</Text>
          </View>
        </Pressable>
      )}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.listContent}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    margin: 10,
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 10,
  },
  textContainer: {
    alignItems: "center",
    marginTop: 5,
  },
  image: {
    width: "100%",
    borderRadius: 10,
    aspectRatio: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
  },
  price: {
    fontSize: 16,
    color: "#888",
    marginTop: 2,
  },
  row: {
    justifyContent: "space-between",
  },
  listContent: {
    paddingBottom: 80,
  },
});

export default PizzaComponent;
