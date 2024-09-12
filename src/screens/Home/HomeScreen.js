/* eslint-disable no-unused-vars */
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import {useStoreContext} from '../../stores';
import {useAuth} from '../../components/common/AuthContext';
import colors from '../../constants/colors';
import {HomeTopBackground} from '../../assets/images';
import {
  search,
  camera,
  message,
  cart,
  scan,
  wallet,
  coin,
} from '../../assets/icons';
import fontSettings from '../../assets/fonts/fontSettings';

const {width, height} = Dimensions.get('screen');
const statusBarHeight = StatusBar.currentHeight;
const WIDTH = width;
const HEIGHT = height - statusBarHeight * 1.5;
const topExtensionsContainerWidth = 65;
const searchBarItemPadding = 10;
const searchIconSize = 25;

const ExtensionsListHorizotal = () => {
  const [completeScrollBarWidth, setCompleteScrollBarWidth] = useState(1);
  const [visibleScrollBarWidth, setVisibleScrollBarWidth] = useState(0);
  const scrollIndicatorSize =
    completeScrollBarWidth > visibleScrollBarWidth
      ? (visibleScrollBarWidth * visibleScrollBarWidth) / completeScrollBarWidth
      : visibleScrollBarWidth;
  const scrollIndicator = useRef(new Animated.Value(0)).current;
  const difference =
    visibleScrollBarWidth > scrollIndicatorSize
      ? ((visibleScrollBarWidth - scrollIndicatorSize) * 50) / WIDTH
      : 1;

  const scrollIndicatorPosition = Animated.multiply(
    scrollIndicator,
    visibleScrollBarWidth / completeScrollBarWidth,
  ).interpolate({
    inputRange: [0, difference],
    outputRange: [0, difference],
    extrapolate: 'clamp',
  });
  const paddingScrollView = (WIDTH - 50) / 2;
  const DATA = [
    {id: '1', title: 'First Item'},
    {id: '2', title: 'Second Item'},
    {id: '3', title: 'Third Item'},
    {id: '4', title: 'A Item'},
    {id: '5', title: 'B Item'},
    {id: '6', title: 'C Item'},
    {id: '7', title: 'D Item'},
    {id: '8', title: 'E Item'},
    // Add more items as needed
  ];

  const renderItem = ({item}) => {
    return (
      <View style={styles_ExtensionsList.item}>
        <Text style={styles_ExtensionsList.title}>{item.title}</Text>
      </View>
    );
  };

  return (
    <>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{paddingRight: 14}}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={scrollWidth => {
          setCompleteScrollBarWidth(scrollWidth);
        }}
        onLayout={({
          nativeEvent: {
            // eslint-disable-next-line no-shadow
            layout: {width},
          },
        }) => {
          setVisibleScrollBarWidth(width);
        }}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollIndicator}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          numColumns={Math.ceil(DATA.length / 2)}
          columnWrapperStyle={styles_ExtensionsList.row}
        />
      </ScrollView>
      <View
        style={{
          ...styles_ExtensionsList.scrollbarContainer,
          paddingHorizontal: paddingScrollView,
        }}>
        <View style={styles_ExtensionsList.scrollbar}>
          <Animated.View
            style={{
              ...styles_ExtensionsList.visableScrollbar,
              width: (scrollIndicatorSize * 50) / WIDTH,
              transform: [{translateX: scrollIndicatorPosition}],
            }}
          />
        </View>
      </View>
    </>
  );
};

const styles_ExtensionsList = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    margin: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  row: {
    justifyContent: 'space-between', // Optional: space items evenly in each row
  },
  scrollbarContainer: {
    width: '100%',
    height: 6,
    flexDirection: 'column',
    // alignItems: 'center',
  },
  scrollbar: {
    width: '100%',
    height: 6,
    backgroundColor: '#52057b',
    borderRadius: 8,
  },
  visableScrollbar: {
    height: 6,
    borderRadius: 8,
    backgroundColor: '#bc6ff1',
  },
});

const Banners_Item = ({item}) => {
  return (
    <View style={styles_Banners.item}>
      <Text style={styles_ExtensionsList.title}>{item.title}</Text>
    </View>
  );
};

const Banners = () => {
  const DATA = [
    {id: '1', title: 'Banner 1'},
    {id: '2', title: 'Banner 2'},
    {id: '3', title: 'Banner 3'},
    // Add more items as needed
  ];

  const length = DATA.length();

  return <View>{DATA.map(({value}))}</View>;
};

const styles_Banners = StyleSheet.create({
  list: {
    padding: 0,
  },
  item: {
    width: (WIDTH - (20 + 10) * 3) / 3,
    backgroundColor: '#f9c2ff',
    padding: 20,
    margin: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const HomeScreen = () => {
  const {user, token} = useAuth();
  const {products, fetchProducts} = useStoreContext();
  const [searchText, setSearchText] = useState('');
  const totalItemsInCart = 0;
  const totalMessagesMiss = 0;
  const totalTokenDiscount = 300;

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  function CheckSearchModule() {
    console.log('');
  }

  function CheckCamera() {
    console.log('');
  }

  function CheckCartModule() {
    console.log('');
  }

  function CheckMessages() {
    console.log('');
  }

  function CheckScan() {
    console.log('');
  }

  function CheckShopeePay() {
    console.log('');
  }

  function CheckShopeeCoin() {
    console.log('');
  }

  return (
    <View style={styles.container}>
      <View style={styles.area1}>
        <View>
          <Image source={HomeTopBackground} style={styles.backgroundImage} />
          <View style={styles.searchBarItem}>
            <View style={styles.searchBarContainer}>
              <View style={styles.searchIconContainer}>
                <Image source={search} style={styles.searchIcon} />
              </View>
              <TextInput
                value={searchText}
                onChangeText={setSearchText}
                placeholder="Tìm kiếm"
                placeholderTextColor={colors.primary}
                style={styles.searchInput}
              />
              <TouchableOpacity
                onPress={() => {
                  CheckCamera();
                }}>
                <Image source={camera} style={styles.searchIcon} />
              </TouchableOpacity>
            </View>

            <View style={styles.topExtensionsContainer}>
              <TouchableOpacity
                onPress={() => {
                  CheckCartModule();
                }}>
                <Image source={cart} style={styles.icon3} />
                {totalItemsInCart > 0 && (
                  <View style={styles.notiCart}>
                    <Text
                      style={
                        totalItemsInCart > 99
                          ? styles.notiCartText2
                          : styles.notiCartText
                      }>
                      {totalItemsInCart > 999 ? '?' : totalItemsInCart}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  CheckMessages();
                }}>
                <Image source={message} style={styles.icon2} />
                {totalMessagesMiss > 0 && (
                  <View style={styles.notiCart}>
                    <Text
                      style={
                        totalMessagesMiss > 99
                          ? styles.notiCartText2
                          : styles.notiCartText
                      }>
                      {totalMessagesMiss > 999 ? '?' : totalMessagesMiss}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.paymentItem}>
            <View style={styles.paymentItemContainer}>
              <TouchableOpacity
                style={styles.scanContainer}
                onPress={() => {
                  CheckScan();
                }}>
                <Image source={scan} style={styles.searchIcon} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.shopeePayContainer}
                onPress={() => {
                  CheckShopeePay();
                }}>
                <View style={styles.shopeePayTopContainer}>
                  <Image source={wallet} style={styles.searchIcon} />
                  <Text style={styles.shopeePayTopText}>Shopee Pay</Text>
                </View>
                <Text style={styles.shopeePayBottomText}>
                  Voucher giảm đến 40.000Đ
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.shopeePayContainer2}
                onPress={() => {
                  CheckShopeeCoin();
                }}>
                <View style={styles.shopeePayTopContainer}>
                  <Image source={coin} style={styles.searchIcon} />
                  <Text style={styles.shopeePayTopText}>
                    {totalTokenDiscount} Xu
                  </Text>
                </View>
                <Text style={styles.shopeePayBottomText}>
                  Shopee Xu của tôi
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{marginTop: 40, backgroundColor: colors.error}}>
          <View>
            <ExtensionsListHorizotal />
          </View>
          <View>
            <Banners />
          </View>
        </View>
      </View>
      <View style={styles.area}>
        <Text>Shop Live Videos</Text>
      </View>
      <View style={styles.area}>
        <Text>Products here</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  area: {
    backgroundColor: colors.white,
    padding: 10,
    marginBottom: 10,
  },
  area1: {
    width: WIDTH,
    backgroundColor: colors.white,
    marginBottom: 10,
  },
  item: {
    padding: 16,
    backgroundColor: colors.primary,
  },
  backgroundImage: {
    position: 'absolute',
    height: '100%',
    width: WIDTH,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  searchBarItem: {
    width: '100%',
    height: 65,
    marginBottom: 200,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: searchBarItemPadding,
  },
  paymentItem: {
    position: 'absolute',
    bottom: -20,
    width: '100%',
    height: 60,
    alignItems: 'center',
  },
  paymentItemContainer: {
    width: '90%',
    height: '100%',
    backgroundColor: colors.white,
    borderRadius: 3,
    padding: 3,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // Shadow properties for iOS
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 10,
    // Elevation property for Android
    elevation: 5,
  },
  searchBarContainer: {
    width: WIDTH - topExtensionsContainerWidth - searchBarItemPadding * 2 - 10,
    height: 45,
    backgroundColor: colors.white,
    borderRadius: 3,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 3,
  },
  topExtensionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: topExtensionsContainerWidth,
    justifyContent: 'space-between',
  },
  searchIcon: {
    width: searchIconSize,
    height: searchIconSize,
    paddingLeft: 3,
    paddingRight: 3,
  },
  searchIconContainer: {
    paddingLeft: 4,
  },
  icon2: {
    width: 23,
    height: 23,
    marginTop: 2,
  },
  icon3: {
    width: 30,
    height: 30,
  },
  searchInput: {
    width:
      WIDTH -
      topExtensionsContainerWidth -
      searchBarItemPadding * 2 -
      10 -
      6 -
      4 -
      (searchIconSize + 6) * 2,
    ...fontSettings.h5.regular,
    color: colors.primary,
  },
  notiCart: {
    position: 'absolute',
    top: -5,
    right: -5,
    borderRadius: 999,
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderColor: colors.white,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notiCartText: {
    ...fontSettings.h7.regular,
    color: colors.white,
  },
  notiCartText2: {
    ...fontSettings.h8.regular,
    color: colors.white,
  },
  scanContainer: {
    width: 40,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderColor: colors.lightGray,
  },
  shopeePayContainer: {
    width: '50%',
    borderRightWidth: 1,
    borderColor: colors.lightGray,
    paddingLeft: 5,
  },
  shopeePayContainer2: {
    width: '40%',
    paddingLeft: 5,
  },
  shopeePayTopContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  shopeePayTopText: {
    marginLeft: 5,
    ...fontSettings.h5.regular,
    color: colors.black,
  },
  shopeePayBottomText: {
    paddingLeft: 3,
    ...fontSettings.h7_5.regular,
  },
});

export default HomeScreen;
