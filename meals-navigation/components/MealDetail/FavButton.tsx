import { Button } from "react-native";

interface IFavButton {
  onPress: () => void;
}

const FavButton = ({ onPress }: IFavButton) => {
  return <Button title="Favorite" onPress={onPress} />;
};

export default FavButton;
