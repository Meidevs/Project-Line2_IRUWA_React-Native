import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions
} from 'react-native';
const { width, height } = Dimensions.get('window');

const TabBar = ({ state, descriptors, navigation }) => {
    const focusedOptions = descriptors[state.routes[state.index].key].options;
    if (focusedOptions.tabBarVisible === false) {
        return null;
    }

    return (
        <View style={{ flexDirection: 'row' }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                // Label is the Way to Put Name on BottomTabNavigator using Route Name
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;
                const icons =
                    options.tabBarLabel == '홈'
                        ? [require('../bottom_menu_ico1.png'), require('../bottom_menu_ico1_selected.png')]
                        : options.tabBarLabel == '카테고리'
                            ? [require('../bottom_menu_ico2.png'), require('../bottom_menu_ico2_selected.png')]
                            : options.tabBarLabel == '채팅'
                                ? [require('../bottom_menu_ico3.png'), require('../bottom_menu_ico3_selected.png')]
                                : [require('../bottom_menu_ico4.png'), require('../bottom_menu_ico4_selected.png')]

                const isFocused = state.index === index;
                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityStates={isFocused ? ['selected'] : []}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        key={index}
                        style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', marginBottom: 5, }}
                    >{isFocused ? <Image source={icons[1]} style={{ marginTop: 10, width: 20, height: 20, resizeMode: 'contain' }} /> : <Image source={icons[0]} style={{ marginTop: 10, width: 20, height: 20, resizeMode: 'contain' }} />}
                        <Text style={{ fontSize: 12, color: isFocused ? '#000000' : '#C4C4C4' }}>
                            {label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

export default TabBar