import { usePermissions } from "@/hooks/authentication/usePermissions";
import { useGetCategory } from "@/hooks/useCategory";
import { useColor } from "@/hooks/useColor";
import { useState } from "react"
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { FlatList, RefreshControl, TouchableOpacity, View } from "react-native";
import { Octicons } from "@expo/vector-icons";
import Wrapper from "@/components/Wrapper";
import Input from "@/components/Input";
import Text from "@/components/Text";
import CreateCategorySheet from "@/components/category/CreateCategory";
import { Category } from "@/utils/types/category";
import EditCategorySheet from "@/components/category/EditCategory";
import DeleteCategory from "@/components/category/DeleteCategory";

const CategoryList = () => {
    const [showSheet, setShowSheet] = useState(false);
    const [search, setSearch] = useState("");
    const {color} = useColor();
    const {hasPermission} = usePermissions();
    const {data, isLoading, refetch} = useGetCategory();

    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [selectedCategoryForDelete, setSelectedCategoryForDelete] = useState<Category | null>(null);
    const [showEditSheet, setShowEditSheet] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);

    const filteredData = data?.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));

    const handleEdit = (category: Category) => {
        setSelectedCategory(category);
        setShowEditSheet(true);
    };

    const handleDelete = (category: Category) => {
        setSelectedCategoryForDelete(category);
        setShowDeletePopup(true);
        
    };

    return (
        <GestureHandlerRootView>
            <Wrapper flex={1}>
                <Wrapper key={"header"} padding={20}>
                    <Input placeholder="Cari Kategori" value={search} onChangeText={setSearch}/>
                </Wrapper>

                <FlatList data={filteredData} keyExtractor={(item) => item.id?.toLocaleString() ?? ""} renderItem={({item}) => (
                    <Wrapper flexDirection="row" justifyContent="space-between" alignItems="center" backgroundColor={color.card.bg} borderRadius={16} paddingVertical={14} paddingHorizontal={18} marginBottom={10} shadowColor="#000" shadowOpacity={0.05} shadowRadius={3}>
                        <Text variant="subtitle" color={color.base.content}>
                            {item.name}
                        </Text>

                        {hasPermission("manage_category") && (
                            <Wrapper flexDirection="row" gap={16}>
                                <TouchableOpacity onPress={() => handleEdit(item)}>
                                    <Octicons name="pencil" size={20} color={color.primary.bg}/>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => handleDelete(item)}>
                                    <Octicons name="trash" size={20} color={color.warning.bg}/>
                                </TouchableOpacity>
                            </Wrapper>
                        )}
                    </Wrapper>
                )} contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 100,
                }} refreshControl={
                    <RefreshControl refreshing={isLoading} onRefresh={refetch} colors={[color.primary.bg]} tintColor={color.primary.bg}/>
                }/>

                {hasPermission("manage_category") && (
                    <View pointerEvents="box-none" style={{
                        position: "absolute",
                        bottom: 24,
                        right: 24,
                        zIndex: 9999,
                        elevation: 99
                    }}>
                        <TouchableOpacity onPress={() => setShowSheet(true)} activeOpacity={0.85} hitSlop={{top: 16, bottom: 16, left: 16, right: 16}} style={{
                        backgroundColor: color.primary.bg,
                        borderRadius: 999,
                        padding: 14,
                        alignItems: "center",
                        justifyContent: "center",
                }}>
                            <Octicons name="plus" size={20} color={color.base.content}/>
                         </TouchableOpacity>

                         <CreateCategorySheet visible={showSheet} onRequestClose={() => setShowSheet(false)}/>
                         <EditCategorySheet visible={showEditSheet} onRequestClose={() => setShowEditSheet(false)} category={selectedCategory}/>
                        {selectedCategoryForDelete && (
                        <DeleteCategory visible={showDeletePopup} onRequestClose={() => setShowDeletePopup(false)} category={selectedCategoryForDelete} />
                        )}
                    </View>
                )}
            </Wrapper>
        </GestureHandlerRootView>
    );
};

export default CategoryList;