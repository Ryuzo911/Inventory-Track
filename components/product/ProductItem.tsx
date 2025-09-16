import React, { FC } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import Text from "../Text";
import { useColor } from "@/hooks/useColor";

type ProductItemProps = {
  image_url?: string;
  name: string;
  stock: number;
  onPress?: () => void;
};

const ProductItem: FC<ProductItemProps> = ({ image_url, name, stock, onPress }) => {
  const { color } = useColor();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        marginVertical: 6,
        borderRadius: 8,
        backgroundColor: color.card.bg,
      }}
    >
      <Image
        source={image_url ? { uri: image_url } : require("@/assets/images/favicon.png")}
        style={{
          width: 50,
          height: 50,
          borderRadius: 8,
          marginRight: 12,
          backgroundColor: "#e5e7eb",
        }}
        resizeMode="cover"
      />
      <View style={{ flex: 1 }}>
        <Text
          variant="subtitle"
          style={{
            color: color.info.content,
            marginBottom: 4,
          }}
        >
          {name}
        </Text>
        <Text style={{ fontSize: 12, color: color.info.content }}>
          Total stok: {stock}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem;
