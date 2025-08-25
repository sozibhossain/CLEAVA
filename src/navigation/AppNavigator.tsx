import { View, StyleSheet } from 'react-native';
import { NavigationContainer, type ParamListBase } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, type DrawerNavigationProp } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '~/screens/HomeScreen';
import BuchungScreen from '~/screens/BuchungScreen';
import FAQScreen from '~/screens/FAQScreen';
import AblaufScreen from '~/screens/AblaufScreen';
import ImpressumScreen from '~/screens/ImpressumScreen';
import DatenschutzScreen from '~/screens/DatenschutzScreen';
import AktuellesScreen from '~/screens/AktuellesScreen';

// Define Drawer ParamList for type safety
type DrawerParamList = {
  MainTabs: undefined;
  Ablauf: undefined;
  FAQ: undefined;
  Impressum: undefined;
  Datenschutz: undefined;
  Aktuelles: undefined;
  BuchungDrawer: undefined;
};

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator<DrawerParamList>();

const MenuPlaceholder = () => <View />;

// Bottom Tabs
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Buchung') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else {
            iconName = focused ? 'menu' : 'menu-outline'; // Fallback for Menu
          }

          return (
            <View style={[styles.tabIcon, focused && styles.tabIconFocused]}>
              <Ionicons name={iconName} size={26} color="#000" />
            </View>
          );
        },
        tabBarStyle: styles.tabBar,
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Buchung" component={BuchungScreen} />
      <Tab.Screen
        name="Menu"
        component={MenuPlaceholder}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            (navigation.getParent() as DrawerNavigationProp<DrawerParamList>)?.openDrawer();
          },
        })}
      />
    </Tab.Navigator>
  );
};

// Drawer Menu
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          drawerPosition: 'right',
          headerShown: false,
          drawerStyle: {
            width: '70%',
            backgroundColor: '#f9f9f9',
          },
          drawerActiveTintColor: '#2ecc71',
          drawerInactiveTintColor: '#000',
          drawerLabelStyle: {
            fontSize: 18,
            marginLeft: 10,
          },
        }}>
        <Drawer.Screen
          name="MainTabs"
          component={TabNavigator}
          options={{ drawerItemStyle: { display: 'none' } }}
        />
        <Drawer.Screen name="Ablauf" component={AblaufScreen} />
        <Drawer.Screen name="FAQ" component={FAQScreen} />
        <Drawer.Screen name="Impressum" component={ImpressumScreen} />
        <Drawer.Screen name="Datenschutz" component={DatenschutzScreen} />
        <Drawer.Screen name="Aktuelles" component={AktuellesScreen} />
        <Drawer.Screen name="BuchungDrawer" component={BuchungScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    width: 48,
    height: 48,
  },
  tabIconFocused: {
    backgroundColor: '#90C8B9',
  },
  tabBar: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    elevation: 5,
    borderRadius: 30,
    height: 70,
    paddingHorizontal: 25,
    backgroundColor: '#e0f2f1',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
});

export default AppNavigator;
