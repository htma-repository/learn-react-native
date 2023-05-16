import { View, FlatList, StyleSheet } from "react-native";

import { CATEGORIES } from "../../data/dummy-data";

import CategoryItem from "./CategoryItem";

interface ICategoryList {
  onPress: (id: string) => void;
}

const CategoryList = ({ onPress }: ICategoryList) => {
  /**
   * This function calls the onPress function with an id parameter when the viewDetailHandler is
   * triggered.
   * @param {string} id - The parameter `id` is a string type, which is used as an argument in the
   * `viewDetailHandler` function. The function takes the `id` as input and calls the `onPress` function
   * with the `id` as its argument.
   */
  const viewDetailHandler = (id: string) => {
    onPress(id);
  };

  return (
    <View style={styles.categoryListContainer}>
      <FlatList
        data={CATEGORIES}
        renderItem={({ item }) => (
          <CategoryItem
            categoryName={item.title}
            backgroundColor={item.color}
            onPress={viewDetailHandler.bind(this, item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
    </View>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  categoryListContainer: {
    flex: 1,
  },
});
