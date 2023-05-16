import { useNavigation } from "@react-navigation/native";

import CategoryList from "../components/Category/CategoryList";

import { TCategoryScreenNavigationProp } from "../types/types";

const CategoryScreen = () => {
  /* `const navigation = useNavigation<TCategoryScreenNavigationProp>();` is using the `useNavigation`
hook from the `@react-navigation/native` library to get the navigation object for the current
screen. The `TCategoryScreenNavigationProp` type is passed as a generic parameter to ensure that the
navigation object has the correct type for the `CategoryScreen` component. This allows the
`onNavigateHandler` function to use the `navigation.navigate` method to navigate to the
`Meals_Detail` screen with a `categoryId` parameter. */
  const navigation = useNavigation<TCategoryScreenNavigationProp>();

  /**
   * The function navigates to the "Meals_Detail" screen with a category ID parameter.
   * @param {string} id - string - This parameter is a string value representing the id of a category. It
   * is used to navigate to the Meals_Detail screen and pass the categoryId as a parameter.
   */
  const onNavigateHandler = (id: string) => {
    navigation.navigate("Meals_Detail", { categoryId: id });
  };

  return (
    <>
      <CategoryList onPress={onNavigateHandler} />
    </>
  );
};

export default CategoryScreen;
