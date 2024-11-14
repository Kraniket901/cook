import * as React from 'react';
import { View, Text, Dimensions, StatusBar, TouchableOpacity, Image, ScrollView, Animated, Easing } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Chip, Searchbar, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get("window");

export default function BottomTabs() {
    const Tab = createBottomTabNavigator();
    const [index, setIndex] = React.useState(0);
    const [input, setInput] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [selectedChips, setSelectedChips] = React.useState([false, false, false, false]);

    const handleChipPress = (index) => {
        const updatedChips = [...selectedChips];
        updatedChips[index] = !updatedChips[index];  // Toggle the selected state of the clicked chip
        setSelectedChips(updatedChips);
    };

    const rotateValue = React.useRef(new Animated.Value(0)).current;
    const startRotation = () => {
        rotateValue.setValue(0); // Reset rotation

        Animated.loop(
            Animated.sequence([
                Animated.timing(rotateValue, {
                    toValue: 1,
                    duration: 800, // Fast rotation
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(rotateValue, {
                    toValue: 2,
                    duration: 1200, // Slow rotation
                    easing: Easing.ease,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    };
    const rotation = rotateValue.interpolate({
        inputRange: [0, 1, 2],
        outputRange: ['0deg', '180deg', '360deg'],
    });
    return (
        <View className="flex justify-between bg-gray-200" style={{ width, height }}>
            <View className="flex items-center">
                <StatusBar backgroundColor={'#FF0004'} barStyle={"light-content"} hidden={false} />
                <View style={{ backgroundColor: '#FF0004', width: wp(100), height: hp(6), alignItems: 'center', display: 'flex', flexDirection: 'row', paddingHorizontal: wp(8), justifyContent:"space-between" }} >
                    <TouchableOpacity onPress={()=>setIndex(0)}><Icon name="home" color="white" size={30}/></TouchableOpacity>
                    <Text style={{ color: 'white', fontSize: wp(5), fontWeight: 500 }} >Ma-Recipe</Text>
                    <View className="mx-5"></View>
                </View>

                {index==0 && <View className="w-full p-4">
                <TextInput
                    label="Search Ingredients"
                    underlineColor="transparent"
                    onChange={setInput}
                    value={input}
                    //   left={<TextInput.Icon name="search" />} 
                    className="bg-white border-[1px] rounded-2xl w-[100%] mb-4"
                />

                <View className="flex flex-row flex-wrap justify-center">
                    {['Ingredient 1', 'Ingredient 2', 'Ingredient 3', 'Ingredient 4'].map((ingredient, index) => (
                        <Chip
                            key={index}
                            icon={() => selectedChips[index] && <Icon name="check" size={20} color="black" />}  // Only show icon if selected
                            onPress={() => handleChipPress(index)}  // Pass the index to toggle specific chip
                            mode={selectedChips[index] ? 'flat' : 'outlined'}  // Change mode based on selection
                            className="my-2 mx-4"
                        >
                            {ingredient}
                        </Chip>
                    ))}
                </View>
                </View>}


                {index==1 && <TouchableOpacity onPress={()=>{setIndex(2)}} className="rounded-xl bg-white h-[80%] w-[85%] p-4 mt-6">
                    <View className="flex justify-between items-center">
                        <Image source={{ uri: 'https://halloessen.de/blog/wp-content/uploads/2020/11/ravioli.png' }} style={{ width: '100%', height: 300 }} className="rounded-lg" />
                    </View>
                    <Text className="text-black font-bold text-[17px] mt-3">Name of the Recipe</Text>
                    <Text className="mt-3 text-[14px] text-gray-900 font-medium">Ingredients List</Text>

                    <Text className="mt-2 leading-[18px] text-gray-700" numberOfLines={13} ellipsizeMode="tail">
                        Here's a simple and flavorful recipe for Garlic Butter Chicken with Herbs. Start by seasoning four boneless, skinless chicken breasts with salt and pepper. Heat two tablespoons of olive oil in a skillet over medium heat and cook the chicken breasts for 5-7 minutes per side until golden brown and fully cooked. Remove the chicken from the skillet and set it aside. In the same skillet, reduce the heat and melt four tablespoons of butter. Add four minced garlic cloves and cook for about a minute until fragrant, then stir in a teaspoon each of fresh thyme and rosemary. Return the chicken to the skillet, spoon the garlic butter over the chicken, and cook for an additional minute to let the flavors meld. Garnish with fresh parsley and serve with lemon wedges for added brightness. This dish pairs beautifully with mashed potatoes, roasted vegetables, or a light salad for a complete meal.
                    </Text>
                </TouchableOpacity>}

                {isLoading && <View className="rounded-xl bg-white h-[80%] w-[85%] p-4 mt-6 flex justify-center">
                    <View className="flex justify-between items-center">
                        <Animated.Image
                            source={require('../components/loading.png')}
                            style={{ width: '100%', height: 300, transform: [{ rotate: rotation }] }}
                            className="rounded-lg"
                        />
                    </View>
                    <Text className="text-black font-bold text-[20px] mt-3 text-center my-10">
                        Crafting Your Recipe...
                    </Text>
                </View>}

                {index==2 && <View className="rounded-xl bg-white h-[80%] w-[90%] p-4 mt-6">
                <ScrollView>
                    <View className="flex justify-start items-center flex-row">
                        <Image source={{ uri: 'https://halloessen.de/blog/wp-content/uploads/2020/11/ravioli.png' }} style={{ width: 100, height: 100 }} className="rounded-lg" />
                    <Text className="text-black font-bold text-[17px] mx-auto px-4">
                        Name of the Recipe
                        </Text>
                    </View>
                    <Text className="mt-5 text-[18px] text-gray-900 font-medium">Ingredients List</Text>

                    <Text className="mt-3 leading-[20px] text-gray-700 text-[16px]">
                        Here's a simple and flavorful recipe for Garlic Butter Chicken with Herbs. Start by seasoning four boneless, skinless chicken breasts with salt and pepper. Heat two tablespoons of olive oil in a skillet over medium heat and cook the chicken breasts for 5-7 minutes per side until golden brown and fully cooked. Remove the chicken from the skillet and set it aside. In the same skillet, reduce the heat and melt four tablespoons of butter. Add four minced garlic cloves and cook for about a minute until fragrant, then stir in a teaspoon each of fresh thyme and rosemary. Return the chicken to the skillet, spoon the garlic butter over the chicken, and cook for an additional minute to let the flavors meld. Garnish with fresh parsley and serve with lemon wedges for added brightness. This dish pairs beautifully with mashed potatoes, roasted vegetables, or a light salad for a complete meal.
                        Here's a simple and flavorful recipe for Garlic Butter Chicken with Herbs. Start by seasoning four boneless, skinless chicken breasts with salt and pepper. Heat two tablespoons of olive oil in a skillet over medium heat and cook the chicken breasts for 5-7 minutes per side until golden brown and fully cooked. Remove the chicken from the skillet and set it aside. In the same skillet, reduce the heat and melt four tablespoons of butter. Add four minced garlic cloves and cook for about a minute until fragrant, then stir in a teaspoon each of fresh thyme and rosemary. Return the chicken to the skillet, spoon the garlic butter over the chicken, and cook for an additional minute to let the flavors meld. Garnish with fresh parsley and serve with lemon wedges for added brightness. This dish pairs beautifully with mashed potatoes, roasted vegetables, or a light salad for a complete meal.
                        Here's a simple and flavorful recipe for Garlic Butter Chicken with Herbs. Start by seasoning four boneless, skinless chicken breasts with salt and pepper. Heat two tablespoons of olive oil in a skillet over medium heat and cook the chicken breasts for 5-7 minutes per side until golden brown and fully cooked. Remove the chicken from the skillet and set it aside. In the same skillet, reduce the heat and melt four tablespoons of butter. Add four minced garlic cloves and cook for about a minute until fragrant, then stir in a teaspoon each of fresh thyme and rosemary. Return the chicken to the skillet, spoon the garlic butter over the chicken, and cook for an additional minute to let the flavors meld. Garnish with fresh parsley and serve with lemon wedges for added brightness. This dish pairs beautifully with mashed potatoes, roasted vegetables, or a light salad for a complete meal.
                    </Text>
                </ScrollView>
                </View>}


            </View>
            <View style={{ marginBottom: 50, width: wp(100), height: hp(6), justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'row', paddingHorizontal: wp(8) }} >
                <TouchableOpacity onPress={()=>{
                        setIndex(4);
                        setIsLoading(true);
                        startRotation();
                    setTimeout(()=>{
                        setIsLoading(false)
                        setIndex(1)},3000)
                    }} className="bg-[#FF0004] rounded-lg p-2 w-[95%]"><Text className="text-white text-center font-bold text-lg">{index==0?'Search':'Regenerate'}</Text></TouchableOpacity>
            </View>
        </View>
    )
}