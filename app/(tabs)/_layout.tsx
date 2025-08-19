import Loading from "@/components/Loading";
import Text from "@/components/Text";
import Wrapper from "@/components/Wrapper";
import { useColor } from "@/hooks/useColor"
import { useSession } from "@/hooks/useSession";
import { Octicons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";

const TabsLayout = () => {
  const {color} = useColor();
  const {session, isLoading} = useSession();
  
  if (isLoading) {
    return (
      <Wrapper backgroundColor={color.base.bg} flex={1}>
        <Loading/>
      </Wrapper>
    );
  }

  if (!session) {
    return <Redirect href="/login"/>
  }

  return (
    <Tabs screenOptions={{
      sceneStyle: {backgroundColor: color.base.bg, paddingBottom: 90},
      headerStyle: {
        backgroundColor: color.base.bg,
        borderBottomWidth: 0,
        elevation: 0,
      },
      headerTitleAlign: "center",
      headerTitleStyle: {
        fontFamily: 'SemiBold',
        color: color.base.content
      },
      headerTintColor: color.base.content as string,
      tabBarActiveTintColor: color.primary.bg as string,
      tabBarStyle: {
        backgroundColor: color.card.bg,
        borderRadius: 20,
        borderTopWidth: 0,
        elevation: 0, 
        height: 70,
        position: "absolute",
        margin: 20
      },
      tabBarItemStyle: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
      },
      tabBarIconStyle: {
        flex: 1,
      },
      tabBarShowLabel: false,
      tabBarLabelStyle: {
        fontFamily: "Medium",
      },
      tabBarHideOnKeyboard: true
    }}>
      <Tabs.Screen 
      name="index" 
      options={{
        title: "Dashboard",
        tabBarLabel: "Home",
        tabBarIcon: (other) => (
          <CustomTabBarIcon label="Home" icon="home" {...other} />
        ),
      }} 
    />
     <Tabs.Screen 
      name="product" 
      options={{
        title: "List-Product",
        tabBarLabel: "Product",
        tabBarIcon: (other) => (
          <CustomTabBarIcon label="Product" icon="package" {...other} />
        ),
      }} 
    />
    <Tabs.Screen
      name="transaction" 
      options={{
        title: "Add-Transaction",
        tabBarIcon: (other) => (
          <CustomTabBarIcon label="Transaction" icon="plus" {...other} />
        )
      }}/>
      <Tabs.Screen 
      name="profile" 
      options={{
        title: "Profile",
        tabBarIcon: (other) => (
          <CustomTabBarIcon label="Profile" icon="person" {...other} />
        ),
      }} 
    />
    </Tabs>
  )
};

const CustomTabBarIcon = ({
  label,
  icon,
  focused,
  size,
  color
}: {
  label: string;
  focused: boolean;
  color: string;
  size: number;
  icon: keyof typeof Octicons.glyphMap;
}) => {
  return (
    <Wrapper flex={1} justifyContent="center" alignItems="center" aspectRatio={1} opacity={focused ? 1 : 0.5} gap={2}>
      <Octicons name={icon} color={color} size={22}/>
      {focused && (
        <Text variant="small" color={color}>{label}</Text>
      )}
    </Wrapper>
  )
};

export default TabsLayout;