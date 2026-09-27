import React, {
  createContext,
  useContext,
  useState,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  Pressable,
  TextInput,
  Switch,
  SafeAreaView,
  Alert,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import {
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import { Ionicons } from '@expo/vector-icons';


// =====================================================
// FILMORA THEME
// =====================================================

const darkTheme = {
  background: '#0D0D0D',
  card: '#181716',
  cardLight: '#24211D',

  gold: '#D4A72C',
  goldLight: '#F3D98A',
  goldDark: '#8F691B',

  text: '#F8F3E8',
  secondaryText: '#B9B1A4',

  border: '#4B3A18',
  input: '#171615',
  tabBar: '#11100F',
};


const lightTheme = {
  background: '#FAF7F0',
  card: '#FFFFFF',
  cardLight: '#F2EBDD',

  gold: '#B48720',
  goldLight: '#D9B85B',
  goldDark: '#856318',

  text: '#29241D',
  secondaryText: '#756D61',

  border: '#E2D3B2',
  input: '#FFFFFF',
  tabBar: '#FFFFFF',
};


// =====================================================
// THEME CONTEXT
// =====================================================

const ThemeContext = createContext();

function useTheme() {
  return useContext(ThemeContext);
}


// =====================================================
// MOVIE DATA
// =====================================================

const initialMovies = [
  {
    id: '1',
    title: 'Inception',
    genre: 'Sci-Fi, Action',
    price: 30,
    rating: '8.8',
    year: '2010',
    image:
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=700&q=80',
  },

  {
    id: '2',
    title: 'Interstellar',
    genre: 'Sci-Fi, Drama',
    price: 30,
    rating: '8.7',
    year: '2014',
    image:
      'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?auto=format&fit=crop&w=700&q=80',
  },

  {
    id: '3',
    title: 'The Dark Knight',
    genre: 'Action, Crime',
    price: 30,
    rating: '9.0',
    year: '2008',
    image:
      'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=700&q=80',
  },

  {
    id: '4',
    title: 'The Godfather',
    genre: 'Crime, Drama',
    price: 35,
    rating: '9.2',
    year: '1972',
    image:
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=700&q=80',
  },
];


// =====================================================
// MOVIE CONTEXT
// =====================================================

const MoviesContext = createContext();

function useMovies() {
  return useContext(MoviesContext);
}


// =====================================================
// CART CONTEXT
// =====================================================

const CartContext = createContext();

function useCart() {
  return useContext(CartContext);
}


// =====================================================
// APP
// =====================================================

export default function App() {

  const [darkMode, setDarkMode] = useState(true);

  const [movieList, setMovieList] = useState(
    initialMovies
  );

  const [cart, setCart] = useState([]);

  const theme = darkMode
    ? darkTheme
    : lightTheme;


  // ---------------------------------------------------
  // ADD TO CART
  // ---------------------------------------------------

  function addToCart(movie) {

    const alreadyInCart = cart.some(
      item => item.id === movie.id
    );

    if (alreadyInCart) {
      Alert.alert(
        'Already Added',
        `${movie.title} is already in your cart.`
      );

      return;
    }

    setCart([
      ...cart,
      movie,
    ]);

    Alert.alert(
      'Added to Cart',
      `${movie.title} has been added to your cart.`
    );
  }


  // ---------------------------------------------------
  // REMOVE FROM CART
  // ---------------------------------------------------

  function removeFromCart(movieId) {

    setCart(
      cart.filter(
        movie => movie.id !== movieId
      )
    );
  }


  return (

    <ThemeContext.Provider
      value={{
        theme,
        darkMode,
        setDarkMode,
      }}
    >

      <MoviesContext.Provider
        value={{
          movieList,
          setMovieList,
        }}
      >

        <CartContext.Provider
          value={{
            cart,
            addToCart,
            removeFromCart,
          }}
        >

          <NavigationContainer>

            <RootNavigator />

          </NavigationContainer>

        </CartContext.Provider>

      </MoviesContext.Provider>

    </ThemeContext.Provider>
  );
}


// =====================================================
// NAVIGATION
// =====================================================

const Tab =
  createBottomTabNavigator();

const Stack =
  createNativeStackNavigator();


function RootNavigator() {

  const { theme } =
    useTheme();

  return (

    <Stack.Navigator

      screenOptions={{
        headerStyle: {
          backgroundColor:
            theme.background,
        },

        headerTintColor:
          theme.gold,

        headerTitleStyle: {
          color: theme.text,
          fontFamily: 'serif',
          fontWeight: '700',
        },

        contentStyle: {
          backgroundColor:
            theme.background,
        },
      }}

    >

      <Stack.Screen
        name="Main"
        component={MainTabs}
        options={{
          headerShown: false,
        }}
      />


      <Stack.Screen
        name="MovieDetails"
        component={MovieDetailsScreen}
        options={{
          title: 'Movie Details',
        }}
      />


      <Stack.Screen
        name="RentalSummary"
        component={RentalSummaryScreen}
        options={{
          title: 'Rental Summary',
        }}
      />


      <Stack.Screen
        name="AdminPanel"
        component={AdminPanelScreen}
        options={{
          title: 'Filmora Admin',
        }}
      />

    </Stack.Navigator>
  );
}


// =====================================================
// BOTTOM TABS
// =====================================================

function MainTabs() {

  const { theme } =
    useTheme();

  return (

    <Tab.Navigator

      screenOptions={({ route }) => ({

        headerShown: false,

        tabBarStyle: {
          backgroundColor:
            theme.tabBar,

          borderTopColor:
            theme.border,

          borderTopWidth: 1,

          height: 76,

          paddingTop: 8,

          paddingBottom: 9,
        },

        tabBarActiveTintColor:
          theme.gold,

        tabBarInactiveTintColor:
          theme.secondaryText,

        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
          letterSpacing: 0.3,
        },

        tabBarIcon: ({
          color,
          size,
        }) => {

          let iconName =
            'ellipse-outline';


          if (route.name === 'Home') {
            iconName =
              'home-outline';
          }


          if (route.name === 'Movies') {
            iconName =
              'film-outline';
          }


          if (route.name === 'Watchlist') {
            iconName =
              'heart-outline';
          }


          if (route.name === 'Cart') {
            iconName =
              'cart-outline';
          }


          if (route.name === 'Settings') {
            iconName =
              'settings-outline';
          }


          return (

            <Ionicons
              name={iconName}
              size={size}
              color={color}
            />

          );
        },

      })}

    >

      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />

      <Tab.Screen
        name="Movies"
        component={MoviesScreen}
      />

      <Tab.Screen
        name="Watchlist"
        component={WatchlistScreen}
      />

      <Tab.Screen
        name="Cart"
        component={CartScreen}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
      />

    </Tab.Navigator>
  );
}


// =====================================================
// HOME
// =====================================================

function HomeScreen({
  navigation,
}) {

  const { theme } =
    useTheme();

  const { movieList } =
    useMovies();


  const featuredMovie =
    movieList[
      movieList.length - 1
    ] || initialMovies[0];


  return (

    <SafeAreaView
      style={[
        styles.safeArea,
        {
          backgroundColor:
            theme.background,
        },
      ]}
    >

      <ScrollView

        showsVerticalScrollIndicator={
          false
        }

        contentContainerStyle={
          styles.scrollContent
        }

      >

        {/* HEADER */}

        <View
          style={
            styles.headerRow
          }
        >

          <View>

            <Text
              style={[
                styles.logo,
                {
                  color:
                    theme.goldLight,

                  textShadowColor:
                    theme.gold,
                },
              ]}
            >
              FILMORA
            </Text>


            <View
              style={[
                styles.logoLine,
                {
                  backgroundColor:
                    theme.gold,
                },
              ]}
            />


            <Text
              style={[
                styles.tagline,
                {
                  color:
                    theme.secondaryText,
                },
              ]}
            >
              Your story. Your screen.
            </Text>

          </View>


          <View
            style={[
              styles.iconButton,
              {
                backgroundColor:
                  theme.card,

                borderColor:
                  theme.border,
              },
            ]}
          >

            <Ionicons
              name="notifications-outline"
              size={22}
              color={theme.gold}
            />

          </View>

        </View>


        {/* FEATURED */}

        <View
          style={
            styles.sectionSpacing
          }
        >

          <ImageBackground

            source={{
              uri:
                featuredMovie.image,
            }}

            style={[
              styles.featuredCard,
              {
                borderColor:
                  theme.border,
              },
            ]}

            imageStyle={
              styles.featuredImage
            }

          >

            <View
              style={
                styles.featuredOverlay
              }
            >

              <View
                style={[
                  styles.featuredBadge,
                  {
                    borderColor:
                      theme.gold,
                  },
                ]}
              >

                <Text
                  style={[
                    styles.featuredLabel,
                    {
                      color:
                        theme.goldLight,
                    },
                  ]}
                >
                  FEATURED
                </Text>

              </View>


              <Text
                style={
                  styles.featuredTitle
                }
              >
                {featuredMovie.title}
              </Text>


              <Text
                style={
                  styles.featuredInfo
                }
              >
                {featuredMovie.genre}
                {' • '}
                {featuredMovie.year}
              </Text>


              <Pressable

                onPress={() =>
                  navigation.navigate(
                    'MovieDetails',
                    {
                      movie:
                        featuredMovie,
                    }
                  )
                }

                style={[
                  styles.goldButton,
                  {
                    backgroundColor:
                      theme.gold,

                    borderColor:
                      theme.goldLight,
                  },
                ]}

              >

                <Text
                  style={
                    styles.goldButtonText
                  }
                >
                  RENT NOW
                </Text>


                <Ionicons
                  name="play"
                  size={14}
                  color="#17130A"
                />

              </Pressable>

            </View>

          </ImageBackground>


          <View
            style={styles.dots}
          >

            <View
              style={[
                styles.activeDot,
                {
                  backgroundColor:
                    theme.gold,
                },
              ]}
            />

            <View
              style={[
                styles.dot,
                {
                  backgroundColor:
                    theme.secondaryText,
                },
              ]}
            />

            <View
              style={[
                styles.dot,
                {
                  backgroundColor:
                    theme.secondaryText,
                },
              ]}
            />

          </View>

        </View>


        {/* POPULAR */}

        <View
          style={
            styles.sectionHeader
          }
        >

          <Text
            style={[
              styles.sectionTitle,
              {
                color:
                  theme.text,
              },
            ]}
          >
            Popular Movies
          </Text>


          <Pressable
            onPress={() =>
              navigation.navigate(
                'Main',
                {
                  screen: 'Movies',
                }
              )
            }
          >

            <Text
              style={[
                styles.seeAll,
                {
                  color:
                    theme.gold,
                },
              ]}
            >
              See all
            </Text>

          </Pressable>

        </View>


        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={
            false
          }
        >

          {movieList
            .slice(0, 4)
            .map(movie => (

              <MovieCard
                key={movie.id}
                movie={movie}
                navigation={navigation}
              />

            ))}

        </ScrollView>


        {/* MOVIE NIGHT */}

        <View
          style={[
            styles.movieNight,
            {
              backgroundColor:
                theme.card,

              borderColor:
                theme.border,
            },
          ]}
        >

          <Text
            style={styles.popcorn}
          >
            🍿
          </Text>


          <View
            style={{ flex: 1 }}
          >

            <Text
              style={[
                styles.movieNightTitle,
                {
                  color:
                    theme.goldLight,
                },
              ]}
            >
              Movie Night?
            </Text>


            <Text
              style={[
                styles.movieNightText,
                {
                  color:
                    theme.secondaryText,
                },
              ]}
            >
              Grab your popcorn and enjoy
              the best stories.
            </Text>


            <Pressable

              onPress={() =>
                navigation.navigate(
                  'Main',
                  {
                    screen: 'Movies',
                  }
                )
              }

              style={[
                styles.outlineButton,
                {
                  borderColor:
                    theme.gold,
                },
              ]}

            >

              <Text
                style={[
                  styles.outlineButtonText,
                  {
                    color:
                      theme.gold,
                  },
                ]}
              >
                BROWSE MOVIES
              </Text>

              <Ionicons
                name="chevron-forward"
                size={15}
                color={theme.gold}
              />

            </Pressable>

          </View>

        </View>


        {/* GENRES */}

        <View
          style={
            styles.sectionHeader
          }
        >

          <Text
            style={[
              styles.sectionTitle,
              {
                color:
                  theme.text,
              },
            ]}
          >
            Genres
          </Text>

        </View>


        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={
            false
          }
        >

          {[
            [
              'film-outline',
              'Action',
            ],

            [
              'musical-notes-outline',
              'Drama',
            ],

            [
              'happy-outline',
              'Comedy',
            ],

            [
              'eye-outline',
              'Thriller',
            ],

          ].map(
            ([icon, name]) => (

              <View
                key={name}
                style={[
                  styles.genreCard,
                  {
                    backgroundColor:
                      theme.card,

                    borderColor:
                      theme.border,
                  },
                ]}
              >

                <Ionicons
                  name={icon}
                  size={24}
                  color={theme.gold}
                />

                <Text
                  style={[
                    styles.genreText,
                    {
                      color:
                        theme.text,
                    },
                  ]}
                >
                  {name}
                </Text>

              </View>

            )
          )}

        </ScrollView>

      </ScrollView>

    </SafeAreaView>
  );
}


// =====================================================
// MOVIE CARD
// =====================================================

function MovieCard({
  movie,
  navigation,
}) {

  const { theme } =
    useTheme();


  return (

    <Pressable

      onPress={() =>
        navigation.navigate(
          'MovieDetails',
          {
            movie,
          }
        )
      }

      style={[
        styles.movieCard,
        {
          backgroundColor:
            theme.card,

          borderColor:
            theme.border,
        },
      ]}

    >

      <View>

        <Image
          source={{
            uri:
              movie.image,
          }}

          style={
            styles.moviePoster
          }
        />


        <View
          style={
            styles.heartButton
          }
        >

          <Ionicons
            name="heart-outline"
            size={19}
            color={theme.goldLight}
          />

        </View>

      </View>


      <View
        style={
          styles.movieInfo
        }
      >

        <Text
          numberOfLines={1}
          style={[
            styles.movieTitle,
            {
              color:
                theme.text,
            },
          ]}
        >
          {movie.title}
        </Text>


        <Text
          numberOfLines={1}
          style={[
            styles.movieGenre,
            {
              color:
                theme.secondaryText,
            },
          ]}
        >
          {movie.genre}
        </Text>


        <Text
          style={[
            styles.moviePrice,
            {
              color:
                theme.goldLight,
            },
          ]}
        >
          R{movie.price}
        </Text>

      </View>

    </Pressable>
  );
}


// =====================================================
// MOVIES
// =====================================================

function MoviesScreen({
  navigation,
}) {

  const { theme } =
    useTheme();

  const { movieList } =
    useMovies();

  const [search, setSearch] =
    useState('');


  const filteredMovies =
    movieList.filter(movie =>
      movie.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );


  return (

    <SafeAreaView
      style={[
        styles.safeArea,
        {
          backgroundColor:
            theme.background,
        },
      ]}
    >

      <ScrollView
        showsVerticalScrollIndicator={
          false
        }

        contentContainerStyle={
          styles.scrollContent
        }
      >

        <Text
          style={[
            styles.pageTitle,
            {
              color:
                theme.text,
            },
          ]}
        >
          Movies
        </Text>


        <Text
          style={[
            styles.pageSubtitle,
            {
              color:
                theme.secondaryText,
            },
          ]}
        >
          Find your next favourite story.
        </Text>


        {/* SEARCH */}

        <View
          style={[
            styles.searchContainer,
            {
              backgroundColor:
                theme.input,

              borderColor:
                theme.border,
            },
          ]}
        >

          <Ionicons
            name="search-outline"
            size={20}
            color={theme.gold}
          />


          <TextInput
            value={search}
            onChangeText={
              setSearch
            }

            placeholder=
              "Search movies..."

            placeholderTextColor={
              theme.secondaryText
            }

            style={[
              styles.searchInput,
              {
                color:
                  theme.text,
              },
            ]}
          />

        </View>


        {/* MOVIE LIST */}

        {filteredMovies.map(
          movie => (

            <Pressable

              key={movie.id}

              onPress={() =>
                navigation.navigate(
                  'MovieDetails',
                  {
                    movie,
                  }
                )
              }

              style={[
                styles.listMovie,
                {
                  backgroundColor:
                    theme.card,

                  borderColor:
                    theme.border,
                },
              ]}

            >

              <Image
                source={{
                  uri:
                    movie.image,
                }}

                style={
                  styles.listPoster
                }
              />


              <View
                style={{
                  flex: 1,
                }}
              >

                <Text
                  style={[
                    styles.listTitle,
                    {
                      color:
                        theme.text,
                    },
                  ]}
                >
                  {movie.title}
                </Text>


                <Text
                  style={[
                    styles.listGenre,
                    {
                      color:
                        theme.secondaryText,
                    },
                  ]}
                >
                  {movie.genre}
                </Text>


                <Text
                  style={[
                    styles.rating,
                    {
                      color:
                        theme.goldLight,
                    },
                  ]}
                >
                  ★ {movie.rating}
                  {' • '}
                  {movie.year}
                </Text>


                <Text
                  style={[
                    styles.moviePrice,
                    {
                      color:
                        theme.goldLight,
                    },
                  ]}
                >
                  R{movie.price}
                </Text>

              </View>


              <Ionicons
                name="chevron-forward"
                size={19}
                color={
                  theme.secondaryText
                }
              />

            </Pressable>

          )
        )}


        {filteredMovies.length === 0 && (

          <View
            style={
              styles.emptyState
            }
          >

            <Ionicons
              name="film-outline"
              size={45}
              color={theme.gold}
            />

            <Text
              style={[
                styles.emptyTitle,
                {
                  color:
                    theme.text,
                },
              ]}
            >
              No movies found
            </Text>

            <Text
              style={[
                styles.emptyText,
                {
                  color:
                    theme.secondaryText,
                },
              ]}
            >
              Try another search.
            </Text>

          </View>

        )}

      </ScrollView>

    </SafeAreaView>
  );
}


// =====================================================
// WATCHLIST
// =====================================================

function WatchlistScreen({
  navigation,
}) {

  const { theme } =
    useTheme();

  const { movieList } =
    useMovies();


  return (

    <SafeAreaView
      style={[
        styles.safeArea,
        {
          backgroundColor:
            theme.background,
        },
      ]}
    >

      <ScrollView
        contentContainerStyle={
          styles.scrollContent
        }
      >

        <Text
          style={[
            styles.pageTitle,
            {
              color:
                theme.text,
            },
          ]}
        >
          My Watchlist
        </Text>


        <Text
          style={[
            styles.pageSubtitle,
            {
              color:
                theme.secondaryText,
            },
          ]}
        >
          Stories you've saved for later.
        </Text>


        {movieList
          .slice(0, 2)
          .map(movie => (

            <Pressable

              key={movie.id}

              onPress={() =>
                navigation.navigate(
                  'MovieDetails',
                  {
                    movie,
                  }
                )
              }

              style={[
                styles.listMovie,
                {
                  backgroundColor:
                    theme.card,

                  borderColor:
                    theme.border,
                },
              ]}

            >

              <Image
                source={{
                  uri:
                    movie.image,
                }}

                style={
                  styles.listPoster
                }
              />


              <View
                style={{
                  flex: 1,
                }}
              >

                <Text
                  style={[
                    styles.listTitle,
                    {
                      color:
                        theme.text,
                    },
                  ]}
                >
                  {movie.title}
                </Text>


                <Text
                  style={[
                    styles.listGenre,
                    {
                      color:
                        theme.secondaryText,
                    },
                  ]}
                >
                  {movie.genre}
                </Text>


                <Text
                  style={[
                    styles.moviePrice,
                    {
                      color:
                        theme.goldLight,
                    },
                  ]}
                >
                  R{movie.price}
                </Text>

              </View>


              <Ionicons
                name="heart"
                size={22}
                color={theme.gold}
              />

            </Pressable>

          ))}

      </ScrollView>

    </SafeAreaView>
  );
}


// =====================================================
// CART
// =====================================================

function CartScreen({
  navigation,
}) {

  const { theme } =
    useTheme();

  const {
    cart,
    removeFromCart,
  } = useCart();


  const total =
    cart.reduce(
      (sum, movie) =>
        sum + Number(movie.price),
      0
    );


  return (

    <SafeAreaView
      style={[
        styles.safeArea,
        {
          backgroundColor:
            theme.background,
        },
      ]}
    >

      <ScrollView
        contentContainerStyle={
          styles.scrollContent
        }
      >

        <Text
          style={[
            styles.pageTitle,
            {
              color:
                theme.text,
            },
          ]}
        >
          Your Cart
        </Text>


        <Text
          style={[
            styles.pageSubtitle,
            {
              color:
                theme.secondaryText,
            },
          ]}
        >
          Your selected movies.
        </Text>


        {cart.length === 0 ? (

          <View
            style={
              styles.emptyState
            }
          >

            <Ionicons
              name="cart-outline"
              size={55}
              color={theme.gold}
            />


            <Text
              style={[
                styles.emptyTitle,
                {
                  color:
                    theme.text,
                },
              ]}
            >
              Your cart is empty
            </Text>


            <Text
              style={[
                styles.emptyText,
                {
                  color:
                    theme.secondaryText,
                },
              ]}
            >
              Add a movie to start your
              movie night.
            </Text>

          </View>

        ) : (

          <>

            {cart.map(movie => (

              <View
                key={movie.id}

                style={[
                  styles.cartItem,
                  {
                    backgroundColor:
                      theme.card,

                    borderColor:
                      theme.border,
                  },
                ]}
              >

                <Image
                  source={{
                    uri:
                      movie.image,
                  }}

                  style={
                    styles.cartPoster
                  }
                />


                <View
                  style={{
                    flex: 1,
                  }}
                >

                  <Text
                    style={[
                      styles.listTitle,
                      {
                        color:
                          theme.text,
                      },
                    ]}
                  >
                    {movie.title}
                  </Text>


                  <Text
                    style={[
                      styles.listGenre,
                      {
                        color:
                          theme.secondaryText,
                      },
                    ]}
                  >
                    {movie.genre}
                  </Text>


                  <Text
                    style={[
                      styles.moviePrice,
                      {
                        color:
                          theme.goldLight,
                      },
                    ]}
                  >
                    R{movie.price}
                  </Text>

                </View>


                <Pressable

                  onPress={() =>
                    removeFromCart(
                      movie.id
                    )
                  }

                  style={
                    styles.removeButton
                  }
                >

                  <Ionicons
                    name="trash-outline"
                    size={19}
                    color="#C95A5A"
                  />

                </Pressable>

              </View>

            ))}


            {/* TOTAL */}

            <View
              style={[
                styles.totalBox,
                {
                  backgroundColor:
                    theme.card,

                  borderColor:
                    theme.border,
                },
              ]}
            >

              <View
                style={
                  styles.totalRow
                }
              >

                <Text
                  style={[
                    styles.totalLabel,
                    {
                      color:
                        theme.secondaryText,
                    },
                  ]}
                >
                  Total
                </Text>


                <Text
                  style={[
                    styles.totalPrice,
                    {
                      color:
                        theme.goldLight,
                    },
                  ]}
                >
                  R{total}
                </Text>

              </View>


              <Pressable

                onPress={() =>
                  navigation.navigate(
                    'RentalSummary'
                  )
                }

                style={[
                  styles.fullGoldButton,
                  {
                    backgroundColor:
                      theme.gold,

                    borderColor:
                      theme.goldLight,
                  },
                ]}
              >

                <Text
                  style={
                    styles.fullGoldButtonText
                  }
                >
                  RENT MOVIES
                </Text>

              </Pressable>

            </View>

          </>

        )}

      </ScrollView>

    </SafeAreaView>
  );
}


// =====================================================
// SETTINGS
// =====================================================

function SettingsScreen({
  navigation,
}) {

  const {
    theme,
    darkMode,
    setDarkMode,
  } = useTheme();


  return (

    <SafeAreaView
      style={[
        styles.safeArea,
        {
          backgroundColor:
            theme.background,
        },
      ]}
    >

      <ScrollView
        contentContainerStyle={
          styles.scrollContent
        }
      >

        <Text
          style={[
            styles.pageTitle,
            {
              color:
                theme.text,
            },
          ]}
        >
          Settings
        </Text>


        <Text
          style={[
            styles.pageSubtitle,
            {
              color:
                theme.secondaryText,
            },
          ]}
        >
          Make Filmora feel like yours.
        </Text>


        {/* APPEARANCE */}

        <Text
          style={[
            styles.settingsHeading,
            {
              color:
                theme.gold,
            },
          ]}
        >
          APPEARANCE
        </Text>


        <View
          style={[
            styles.settingRow,
            {
              backgroundColor:
                theme.card,

              borderColor:
                theme.border,
            },
          ]}
        >

          <View
            style={[
              styles.settingIcon,
              {
                backgroundColor:
                  theme.cardLight,
              },
            ]}
          >

            <Ionicons
              name={
                darkMode
                  ? 'moon'
                  : 'sunny'
              }
              size={21}
              color={theme.gold}
            />

          </View>


          <View
            style={{
              flex: 1,
            }}
          >

            <Text
              style={[
                styles.settingTitle,
                {
                  color:
                    theme.text,
                },
              ]}
            >
              {darkMode
                ? 'Dark Mode'
                : 'Light Mode'}
            </Text>


            <Text
              style={[
                styles.settingDescription,
                {
                  color:
                    theme.secondaryText,
                },
              ]}
            >
              Choose your preferred appearance.
            </Text>

          </View>


          <Switch
            value={darkMode}
            onValueChange={
              setDarkMode
            }

            trackColor={{
              false: '#D8D0C0',
              true: '#765D19',
            }}

            thumbColor={
              darkMode
                ? theme.goldLight
                : '#FFFFFF'
            }
          />

        </View>


        {/* ADMIN */}

        <Text
          style={[
            styles.settingsHeading,
            {
              color:
                theme.gold,
            },
          ]}
        >
          MANAGEMENT
        </Text>


        <Pressable

          onPress={() =>
            navigation.navigate(
              'AdminPanel'
            )
          }

          style={[
            styles.settingRow,
            {
              backgroundColor:
                theme.card,

              borderColor:
                theme.border,
            },
          ]}

        >

          <View
            style={[
              styles.settingIcon,
              {
                backgroundColor:
                  theme.cardLight,
              },
            ]}
          >

            <Ionicons
              name="shield-checkmark-outline"
              size={21}
              color={theme.gold}
            />

          </View>


          <View
            style={{
              flex: 1,
            }}
          >

            <Text
              style={[
                styles.settingTitle,
                {
                  color:
                    theme.text,
                },
              ]}
            >
              Admin Panel
            </Text>


            <Text
              style={[
                styles.settingDescription,
                {
                  color:
                    theme.secondaryText,
                },
              ]}
            >
              Add, edit and remove movies.
            </Text>

          </View>


          <Ionicons
            name="chevron-forward"
            size={18}
            color={
              theme.secondaryText
            }
          />

        </Pressable>


        {/* ACCOUNT */}

        <Text
          style={[
            styles.settingsHeading,
            {
              color:
                theme.gold,
            },
          ]}
        >
          ACCOUNT
        </Text>


        <SettingRow
          icon="person-outline"
          title="My Profile"
          description="Manage your account"
        />


        <SettingRow
          icon="notifications-outline"
          title="Notifications"
          description="Manage movie notifications"
        />


        <SettingRow
          icon="information-circle-outline"
          title="About Filmora"
          description="Version 1.0.0"
        />

      </ScrollView>

    </SafeAreaView>
  );
}


// =====================================================
// SETTING ROW
// =====================================================

function SettingRow({
  icon,
  title,
  description,
}) {

  const { theme } =
    useTheme();


  return (

    <Pressable
      style={[
        styles.settingRow,
        {
          backgroundColor:
            theme.card,

          borderColor:
            theme.border,
        },
      ]}
    >

      <View
        style={[
          styles.settingIcon,
          {
            backgroundColor:
              theme.cardLight,
          },
        ]}
      >

        <Ionicons
          name={icon}
          size={21}
          color={theme.gold}
        />

      </View>


      <View
        style={{
          flex: 1,
        }}
      >

        <Text
          style={[
            styles.settingTitle,
            {
              color:
                theme.text,
            },
          ]}
        >
          {title}
        </Text>


        <Text
          style={[
            styles.settingDescription,
            {
              color:
                theme.secondaryText,
            },
          ]}
        >
          {description}
        </Text>

      </View>


      <Ionicons
        name="chevron-forward"
        size={18}
        color={
          theme.secondaryText
        }
      />

    </Pressable>
  );
}


// =====================================================
// MOVIE DETAILS
// =====================================================

function MovieDetailsScreen({
  route,
}) {

  const { theme } =
    useTheme();

  const {
    addToCart,
  } = useCart();


  const movie =
    route.params?.movie ||
    initialMovies[0];


  return (

    <SafeAreaView
      style={[
        styles.safeArea,
        {
          backgroundColor:
            theme.background,
        },
      ]}
    >

      <ScrollView
        contentContainerStyle={
          styles.detailsContent
        }
      >

        <Image
          source={{
            uri:
              movie.image,
          }}

          style={
            styles.detailsPoster
          }
        />


        <Text
          style={[
            styles.detailsTitle,
            {
              color:
                theme.text,
            },
          ]}
        >
          {movie.title}
        </Text>


        <Text
          style={[
            styles.detailsInfo,
            {
              color:
                theme.secondaryText,
            },
          ]}
        >
          {movie.genre}
          {' • '}
          {movie.year}
        </Text>


        <Text
          style={[
            styles.rating,
            {
              color:
                theme.goldLight,
            },
          ]}
        >
          ★ {movie.rating}
        </Text>


        <Text
          style={[
            styles.description,
            {
              color:
                theme.secondaryText,
            },
          ]}
        >
          Experience an unforgettable cinematic
          story with Filmora. Rent this movie and
          enjoy it from the comfort of your own
          screen.
        </Text>


        <View
          style={[
            styles.priceBox,
            {
              backgroundColor:
                theme.card,

              borderColor:
                theme.border,
            },
          ]}
        >

          <View>

            <Text
              style={[
                styles.priceLabel,
                {
                  color:
                    theme.secondaryText,
                },
              ]}
            >
              RENTAL PRICE
            </Text>


            <Text
              style={[
                styles.detailsPrice,
                {
                  color:
                    theme.goldLight,
                },
              ]}
            >
              R{movie.price}
            </Text>

          </View>


          <Ionicons
            name="film-outline"
            size={28}
            color={theme.gold}
          />

        </View>


        <Pressable

          onPress={() =>
            addToCart(movie)
          }

          style={[
            styles.fullGoldButton,
            {
              backgroundColor:
                theme.gold,

              borderColor:
                theme.goldLight,
            },
          ]}

        >

          <Text
            style={
              styles.fullGoldButtonText
            }
          >
            ADD TO CART
          </Text>

        </Pressable>

      </ScrollView>

    </SafeAreaView>
  );
}


// =====================================================
// RENTAL SUMMARY
// =====================================================

function RentalSummaryScreen() {

  const { theme } =
    useTheme();


  return (

    <SafeAreaView
      style={[
        styles.safeArea,
        {
          backgroundColor:
            theme.background,
        },
      ]}
    >

      <View
        style={
          styles.summary
        }
      >

        <View
          style={[
            styles.successCircle,
            {
              backgroundColor:
                theme.gold,

              borderColor:
                theme.goldLight,
            },
          ]}
        >

          <Ionicons
            name="checkmark"
            size={42}
            color="#17130A"
          />

        </View>


        <Text
          style={[
            styles.summaryTitle,
            {
              color:
                theme.text,
            },
          ]}
        >
          Ready for Movie Night?
        </Text>


        <Text
          style={[
            styles.summaryText,
            {
              color:
                theme.secondaryText,
            },
          ]}
        >
          Your selected movies are ready
          to be rented.
        </Text>

      </View>

    </SafeAreaView>
  );
}


// =====================================================
// ADMIN PANEL
// =====================================================

function AdminPanelScreen() {

  const { theme } =
    useTheme();

  const {
    movieList,
    setMovieList,
  } = useMovies();


  const [editingId, setEditingId] =
    useState(null);


  const [title, setTitle] =
    useState('');

  const [genre, setGenre] =
    useState('');

  const [price, setPrice] =
    useState('');

  const [rating, setRating] =
    useState('');

  const [year, setYear] =
    useState('');

  const [image, setImage] =
    useState('');


  const [errors, setErrors] =
    useState({});


  // ---------------------------------------------------
  // RESET FORM
  // ---------------------------------------------------

  function resetForm() {

    setEditingId(null);

    setTitle('');
    setGenre('');
    setPrice('');
    setRating('');
    setYear('');
    setImage('');

    setErrors({});
  }


  // ---------------------------------------------------
  // VALIDATION
  // ---------------------------------------------------

  function validateForm() {

    const newErrors = {};


    if (!title.trim()) {
      newErrors.title =
        'Movie title is required.';
    }


    if (!genre.trim()) {
      newErrors.genre =
        'Genre is required.';
    }


    if (!price.trim()) {

      newErrors.price =
        'Price is required.';

    } else if (
      isNaN(Number(price)) ||
      Number(price) <= 0
    ) {

      newErrors.price =
        'Enter a valid price.';

    }


    if (!rating.trim()) {

      newErrors.rating =
        'Rating is required.';

    } else if (
      isNaN(Number(rating)) ||
      Number(rating) < 0 ||
      Number(rating) > 10
    ) {

      newErrors.rating =
        'Rating must be between 0 and 10.';

    }


    if (!year.trim()) {

      newErrors.year =
        'Year is required.';

    } else if (
      isNaN(Number(year)) ||
      Number(year) < 1900 ||
      Number(year) > 2100
    ) {

      newErrors.year =
        'Enter a valid year.';

    }


    if (!image.trim()) {

      newErrors.image =
        'Image URL is required.';

    }


    setErrors(newErrors);

    return (
      Object.keys(newErrors)
        .length === 0
    );
  }


  // ---------------------------------------------------
  // SAVE MOVIE
  // ---------------------------------------------------

  function saveMovie() {

    if (!validateForm()) {
      return;
    }


    const movieData = {

      id:
        editingId ||
        Date.now().toString(),

      title:
        title.trim(),

      genre:
        genre.trim(),

      price:
        Number(price),

      rating:
        Number(rating).toFixed(1),

      year:
        year.trim(),

      image:
        image.trim(),
    };


    if (editingId) {

      setMovieList(
        movieList.map(movie =>
          movie.id === editingId
            ? movieData
            : movie
        )
      );


      Alert.alert(
        'Movie Updated',
        `${movieData.title} has been updated.`
      );

    } else {

      setMovieList([
        ...movieList,
        movieData,
      ]);


      Alert.alert(
        'Movie Added',
        `${movieData.title} has been added to Filmora.`
      );
    }


    resetForm();
  }


  // ---------------------------------------------------
  // EDIT MOVIE
  // ---------------------------------------------------

  function editMovie(movie) {

    setEditingId(movie.id);

    setTitle(movie.title);

    setGenre(movie.genre);

    setPrice(
      String(movie.price)
    );

    setRating(
      String(movie.rating)
    );

    setYear(
      String(movie.year)
    );

    setImage(movie.image);

    setErrors({});
  }


  // ---------------------------------------------------
  // DELETE MOVIE
  // ---------------------------------------------------

  function deleteMovie(movie) {

    Alert.alert(

      'Delete Movie',

      `Are you sure you want to delete "${movie.title}"?`,

      [

        {
          text: 'Cancel',
          style: 'cancel',
        },

        {
          text: 'Delete',

          style: 'destructive',

          onPress: () => {

            setMovieList(
              movieList.filter(
                item =>
                  item.id !== movie.id
              )
            );


            if (
              editingId === movie.id
            ) {
              resetForm();
            }

          },
        },

      ]

    );
  }


  return (

    <SafeAreaView
      style={[
        styles.safeArea,
        {
          backgroundColor:
            theme.background,
        },
      ]}
    >

      <ScrollView

        showsVerticalScrollIndicator={
          false
        }

        contentContainerStyle={
          styles.adminContent
        }

      >

        {/* ADMIN HEADER */}

        <View
          style={
            styles.adminHeader
          }
        >

          <View>

            <Text
              style={[
                styles.adminEyebrow,
                {
                  color:
                    theme.gold,
                },
              ]}
            >
              FILMORA MANAGEMENT
            </Text>


            <Text
              style={[
                styles.adminTitle,
                {
                  color:
                    theme.text,
                },
              ]}
            >
              Admin Panel
            </Text>


            <Text
              style={[
                styles.adminSubtitle,
                {
                  color:
                    theme.secondaryText,
                },
              ]}
            >
              Manage your movie collection.
            </Text>

          </View>


          <View
            style={[
              styles.adminIcon,
              {
                backgroundColor:
                  theme.card,

                borderColor:
                  theme.border,
              },
            ]}
          >

            <Ionicons
              name="shield-checkmark-outline"
              size={25}
              color={theme.gold}
            />

          </View>

        </View>


        {/* FORM */}

        <View
          style={[
            styles.adminForm,
            {
              backgroundColor:
                theme.card,

              borderColor:
                theme.border,
            },
          ]}
        >

          <View
            style={
              styles.formHeader
            }
          >

            <View>

              <Text
                style={[
                  styles.formTitle,
                  {
                    color:
                      theme.text,
                  },
                ]}
              >
                {editingId
                  ? 'Edit Movie'
                  : 'Add New Movie'}
              </Text>


              <Text
                style={[
                  styles.formSubtitle,
                  {
                    color:
                      theme.secondaryText,
                  },
                ]}
              >
                {editingId
                  ? 'Update movie information.'
                  : 'Add a movie to your collection.'}
              </Text>

            </View>


            {editingId && (

              <Pressable
                onPress={
                  resetForm
                }
              >

                <Text
                  style={[
                    styles.cancelText,
                    {
                      color:
                        theme.gold,
                    },
                  ]}
                >
                  CANCEL
                </Text>

              </Pressable>

            )}

          </View>


          {/* TITLE */}

          <AdminInput
            label="MOVIE TITLE"
            value={title}
            onChangeText={
              setTitle
            }
            placeholder="e.g. Avatar"
            error={errors.title}
            theme={theme}
          />


          {/* GENRE */}

          <AdminInput
            label="GENRE"
            value={genre}
            onChangeText={
              setGenre
            }
            placeholder="e.g. Sci-Fi, Drama"
            error={errors.genre}
            theme={theme}
          />


          {/* PRICE + RATING */}

          <View
            style={
              styles.formTwoColumns
            }
          >

            <View
              style={
                styles.formHalf
              }
            >

              <AdminInput
                label="PRICE"
                value={price}
                onChangeText={
                  setPrice
                }
                placeholder="30"
                keyboardType="numeric"
                error={errors.price}
                theme={theme}
              />

            </View>


            <View
              style={
                styles.formHalf
              }
            >

              <AdminInput
                label="RATING"
                value={rating}
                onChangeText={
                  setRating
                }
                placeholder="8.5"
                keyboardType="numeric"
                error={errors.rating}
                theme={theme}
              />

            </View>

          </View>


          {/* YEAR */}

          <AdminInput
            label="RELEASE YEAR"
            value={year}
            onChangeText={
              setYear
            }
            placeholder="2025"
            keyboardType="numeric"
            error={errors.year}
            theme={theme}
          />


          {/* IMAGE */}

          <AdminInput
            label="POSTER IMAGE URL"
            value={image}
            onChangeText={
              setImage
            }
            placeholder="https://..."
            error={errors.image}
            theme={theme}
            autoCapitalize="none"
          />


          {/* SAVE */}

          <Pressable

            onPress={
              saveMovie
            }

            style={[
              styles.fullGoldButton,
              {
                backgroundColor:
                  theme.gold,

                borderColor:
                  theme.goldLight,
              },
            ]}
          >

            <Ionicons
              name={
                editingId
                  ? 'checkmark-circle-outline'
                  : 'add-circle-outline'
              }
              size={19}
              color="#17130A"
            />


            <Text
              style={
                styles.fullGoldButtonText
              }
            >
              {editingId
                ? 'SAVE CHANGES'
                : 'ADD MOVIE'}
            </Text>

          </Pressable>

        </View>


        {/* CURRENT MOVIES */}

        <View
          style={
            styles.adminListHeader
          }
        >

          <View>

            <Text
              style={[
                styles.adminSectionTitle,
                {
                  color:
                    theme.text,
                },
              ]}
            >
              Movie Collection
            </Text>


            <Text
              style={[
                styles.adminSectionSubtitle,
                {
                  color:
                    theme.secondaryText,
                },
              ]}
            >
              {movieList.length}
              {' '}
              movies currently listed
            </Text>

          </View>

        </View>


        {movieList.map(movie => (

          <View
            key={movie.id}

            style={[
              styles.adminMovie,
              {
                backgroundColor:
                  theme.card,

                borderColor:
                  theme.border,
              },
            ]}
          >

            <Image
              source={{
                uri:
                  movie.image,
              }}

              style={
                styles.adminPoster
              }
            />


            <View
              style={{
                flex: 1,
              }}
            >

              <Text
                style={[
                  styles.adminMovieTitle,
                  {
                    color:
                      theme.text,
                  },
                ]}
              >
                {movie.title}
              </Text>


              <Text
                style={[
                  styles.adminMovieGenre,
                  {
                    color:
                      theme.secondaryText,
                  },
                ]}
              >
                {movie.genre}
              </Text>


              <Text
                style={[
                  styles.adminMovieMeta,
                  {
                    color:
                      theme.goldLight,
                  },
                ]}
              >
                R{movie.price}
                {' • '}
                ★ {movie.rating}
                {' • '}
                {movie.year}
              </Text>


              <View
                style={
                  styles.adminActions
                }
              >

                <Pressable

                  onPress={() =>
                    editMovie(movie)
                  }

                  style={[
                    styles.editButton,
                    {
                      borderColor:
                        theme.gold,
                    },
                  ]}
                >

                  <Ionicons
                    name="create-outline"
                    size={15}
                    color={theme.gold}
                  />

                  <Text
                    style={[
                      styles.editButtonText,
                      {
                        color:
                          theme.gold,
                      },
                    ]}
                  >
                    EDIT
                  </Text>

                </Pressable>


                <Pressable

                  onPress={() =>
                    deleteMovie(movie)
                  }

                  style={[
                    styles.deleteButton,
                    {
                      borderColor:
                        '#7B3535',
                    },
                  ]}
                >

                  <Ionicons
                    name="trash-outline"
                    size={15}
                    color="#D56B6B"
                  />

                  <Text
                    style={
                      styles.deleteButtonText
                    }
                  >
                    DELETE
                  </Text>

                </Pressable>

              </View>

            </View>

          </View>

        ))}

      </ScrollView>

    </SafeAreaView>
  );
}


// =====================================================
// ADMIN INPUT
// =====================================================

function AdminInput({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  theme,
  keyboardType,
  autoCapitalize,
}) {

  return (

    <View
      style={
        styles.adminInputWrapper
      }
    >

      <Text
        style={[
          styles.inputLabel,
          {
            color:
              theme.gold,
          },
        ]}
      >
        {label}
      </Text>


      <TextInput

        value={value}

        onChangeText={
          onChangeText
        }

        placeholder={
          placeholder
        }

        placeholderTextColor={
          theme.secondaryText
        }

        keyboardType={
          keyboardType ||
          'default'
        }

        autoCapitalize={
          autoCapitalize ||
          'sentences'
        }

        style={[
          styles.adminInput,
          {
            backgroundColor:
              theme.input,

            color:
              theme.text,

            borderColor:
              error
                ? '#B94A48'
                : theme.border,
          },
        ]}

      />


      {error && (

        <Text
          style={
            styles.errorText
          }
        >
          {error}
        </Text>

      )}

    </View>
  );
}


// =====================================================
// STYLES
// =====================================================

const styles =
  StyleSheet.create({

    safeArea: {
      flex: 1,
    },


    scrollContent: {
      paddingHorizontal: 20,
      paddingTop: 24,
      paddingBottom: 45,
    },


    // -------------------------------------------------
    // HEADER
    // -------------------------------------------------

    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 28,
    },


    logo: {
      fontFamily: 'serif',
      fontSize: 39,
      fontWeight: '800',
      letterSpacing: 7,

      textShadowOffset: {
        width: 0,
        height: 0,
      },

      textShadowRadius: 9,
    },


    logoLine: {
      width: 38,
      height: 2,
      borderRadius: 2,
      marginTop: 4,
      marginBottom: 5,
    },


    tagline: {
      fontSize: 12,
      letterSpacing: 1,
    },


    iconButton: {
      width: 45,
      height: 45,
      borderRadius: 23,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },


    // -------------------------------------------------
    // FEATURED
    // -------------------------------------------------

    sectionSpacing: {
      marginBottom: 27,
    },


    featuredCard: {
      height: 375,
      borderWidth: 1,
      borderRadius: 22,
      overflow: 'hidden',
    },


    featuredImage: {
      borderRadius: 22,
    },


    featuredOverlay: {
      flex: 1,
      justifyContent: 'flex-end',
      padding: 24,
      backgroundColor:
        'rgba(0,0,0,0.52)',
    },


    featuredBadge: {
      alignSelf: 'flex-start',
      borderWidth: 1,
      borderRadius: 20,
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginBottom: 10,
    },


    featuredLabel: {
      fontSize: 10,
      fontWeight: '900',
      letterSpacing: 2,
    },


    featuredTitle: {
      color: '#FFFFFF',
      fontFamily: 'serif',
      fontSize: 38,
      fontWeight: '800',
      marginBottom: 7,

      textShadowColor:
        '#000000',

      textShadowOffset: {
        width: 0,
        height: 2,
      },

      textShadowRadius: 5,
    },


    featuredInfo: {
      color: '#E8E2D8',
      fontSize: 13,
      marginBottom: 18,
    },


    goldButton: {
      alignSelf: 'flex-start',
      paddingHorizontal: 19,
      paddingVertical: 12,
      borderRadius: 25,
      borderWidth: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },


    goldButtonText: {
      color: '#17130A',
      fontSize: 11,
      fontWeight: '900',
      letterSpacing: 1,
    },


    // -------------------------------------------------
    // DOTS
    // -------------------------------------------------

    dots: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 13,
      gap: 6,
    },


    activeDot: {
      width: 19,
      height: 5,
      borderRadius: 5,
    },


    dot: {
      width: 6,
      height: 6,
      borderRadius: 5,
      opacity: 0.35,
    },


    // -------------------------------------------------
    // SECTION HEADERS
    // -------------------------------------------------

    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 7,
      marginBottom: 14,
    },


    sectionTitle: {
      fontFamily: 'serif',
      fontSize: 28,
      fontWeight: '700',
      letterSpacing: 0.5,
    },


    seeAll: {
      fontSize: 12,
      fontWeight: '700',
      letterSpacing: 0.5,
    },


    // -------------------------------------------------
    // MOVIE CARD
    // -------------------------------------------------

    movieCard: {
      width: 142,
      borderRadius: 16,
      borderWidth: 1,
      marginRight: 12,
      overflow: 'hidden',
    },


    moviePoster: {
      width: '100%',
      height: 180,
    },


    heartButton: {
      position: 'absolute',
      right: 8,
      top: 8,
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor:
        'rgba(0,0,0,0.58)',
      alignItems: 'center',
      justifyContent: 'center',
    },


    movieInfo: {
      padding: 11,
    },


    movieTitle: {
      fontFamily: 'serif',
      fontSize: 17,
      fontWeight: '700',
    },


    movieGenre: {
      fontSize: 10,
      marginTop: 5,
    },


    moviePrice: {
      fontSize: 15,
      fontWeight: '900',
      marginTop: 7,
    },


    // -------------------------------------------------
    // MOVIE NIGHT
    // -------------------------------------------------

    movieNight: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 17,
      borderWidth: 1,
      borderRadius: 18,
      marginTop: 28,
      marginBottom: 25,
    },


    popcorn: {
      fontSize: 52,
      marginRight: 12,
    },


    movieNightTitle: {
      fontFamily: 'serif',
      fontSize: 22,
      fontWeight: '700',
      marginBottom: 4,
    },


    movieNightText: {
      fontSize: 11,
      lineHeight: 18,
      marginBottom: 10,
    },


    outlineButton: {
      alignSelf: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: 20,
      paddingHorizontal: 13,
      paddingVertical: 8,
      gap: 3,
    },


    outlineButtonText: {
      fontSize: 9,
      fontWeight: '900',
      letterSpacing: 0.7,
    },


    // -------------------------------------------------
    // GENRES
    // -------------------------------------------------

    genreCard: {
      width: 92,
      height: 92,
      borderRadius: 16,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 10,
    },


    genreText: {
      fontSize: 12,
      marginTop: 8,
      fontWeight: '600',
    },


    // -------------------------------------------------
    // PAGE TITLES
    // -------------------------------------------------

    pageTitle: {
      fontFamily: 'serif',
      fontSize: 36,
      fontWeight: '700',
      letterSpacing: 0.5,
    },


    pageSubtitle: {
      fontSize: 13,
      marginTop: 5,
      marginBottom: 22,
    },


    // -------------------------------------------------
    // SEARCH
    // -------------------------------------------------

    searchContainer: {
      height: 52,
      borderRadius: 16,
      borderWidth: 1,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 15,
      marginBottom: 20,
    },


    searchInput: {
      flex: 1,
      fontSize: 14,
      marginLeft: 10,
    },


    // -------------------------------------------------
    // LIST MOVIES
    // -------------------------------------------------

    listMovie: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 17,
      borderWidth: 1,
      padding: 10,
      marginBottom: 12,
    },


    listPoster: {
      width: 75,
      height: 100,
      borderRadius: 10,
      marginRight: 14,
    },


    listTitle: {
      fontFamily: 'serif',
      fontSize: 19,
      fontWeight: '700',
    },


    listGenre: {
      fontSize: 11,
      marginTop: 5,
    },


    rating: {
      fontSize: 12,
      fontWeight: '800',
      marginTop: 7,
    },


    // -------------------------------------------------
    // EMPTY STATE
    // -------------------------------------------------

    emptyState: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 75,
    },


    emptyTitle: {
      fontFamily: 'serif',
      fontSize: 23,
      fontWeight: '700',
      marginTop: 15,
    },


    emptyText: {
      fontSize: 13,
      marginTop: 6,
      textAlign: 'center',
    },


    // -------------------------------------------------
    // CART
    // -------------------------------------------------

    cartItem: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 17,
      borderWidth: 1,
      padding: 10,
      marginBottom: 12,
    },


    cartPoster: {
      width: 60,
      height: 78,
      borderRadius: 9,
      marginRight: 13,
    },


    removeButton: {
      width: 38,
      height: 38,
      borderRadius: 19,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:
        'rgba(120,40,40,0.12)',
    },


    totalBox: {
      borderRadius: 19,
      borderWidth: 1,
      padding: 18,
      marginTop: 15,
    },


    totalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },


    totalLabel: {
      fontSize: 14,
      letterSpacing: 0.5,
    },


    totalPrice: {
      fontFamily: 'serif',
      fontSize: 28,
      fontWeight: '800',
    },


    fullGoldButton: {
      width: '100%',
      paddingVertical: 15,
      borderRadius: 28,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 12,
      flexDirection: 'row',
      gap: 8,
    },


    fullGoldButtonText: {
      color: '#17130A',
      fontWeight: '900',
      letterSpacing: 1,
      fontSize: 11,
    },


    // -------------------------------------------------
    // SETTINGS
    // -------------------------------------------------

    settingsHeading: {
      fontSize: 10,
      fontWeight: '900',
      letterSpacing: 2.2,
      marginTop: 20,
      marginBottom: 10,
    },


    settingRow: {
      minHeight: 70,
      borderRadius: 17,
      borderWidth: 1,
      padding: 13,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },


    settingIcon: {
      width: 42,
      height: 42,
      borderRadius: 21,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },


    settingTitle: {
      fontFamily: 'serif',
      fontSize: 17,
      fontWeight: '700',
    },


    settingDescription: {
      fontSize: 10,
      marginTop: 4,
    },


    // -------------------------------------------------
    // DETAILS
    // -------------------------------------------------

    detailsContent: {
      padding: 20,
      paddingBottom: 45,
    },


    detailsPoster: {
      width: '100%',
      height: 420,
      borderRadius: 21,
      marginBottom: 22,
    },


    detailsTitle: {
      fontFamily: 'serif',
      fontSize: 34,
      fontWeight: '700',
    },


    detailsInfo: {
      fontSize: 13,
      marginTop: 7,
    },


    description: {
      fontSize: 14,
      lineHeight: 23,
      marginTop: 20,
    },


    priceBox: {
      marginTop: 22,
      borderRadius: 17,
      borderWidth: 1,
      padding: 17,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },


    priceLabel: {
      fontSize: 9,
      fontWeight: '900',
      letterSpacing: 1.5,
    },


    detailsPrice: {
      fontFamily: 'serif',
      fontSize: 28,
      fontWeight: '800',
      marginTop: 2,
    },


    // -------------------------------------------------
    // RENTAL SUMMARY
    // -------------------------------------------------

    summary: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 30,
    },


    successCircle: {
      width: 86,
      height: 86,
      borderRadius: 43,
      borderWidth: 2,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 25,
    },


    summaryTitle: {
      fontFamily: 'serif',
      fontSize: 29,
      fontWeight: '700',
      textAlign: 'center',
    },


    summaryText: {
      fontSize: 13,
      textAlign: 'center',
      lineHeight: 22,
      marginTop: 10,
    },


    // =================================================
    // ADMIN
    // =================================================

    adminContent: {
      padding: 20,
      paddingBottom: 50,
    },


    adminHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 22,
    },


    adminEyebrow: {
      fontSize: 9,
      fontWeight: '900',
      letterSpacing: 2,
      marginBottom: 5,
    },


    adminTitle: {
      fontFamily: 'serif',
      fontSize: 35,
      fontWeight: '700',
    },


    adminSubtitle: {
      fontSize: 12,
      marginTop: 5,
    },


    adminIcon: {
      width: 54,
      height: 54,
      borderRadius: 27,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },


    adminForm: {
      borderWidth: 1,
      borderRadius: 20,
      padding: 17,
      marginBottom: 28,
    },


    formHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 18,
    },


    formTitle: {
      fontFamily: 'serif',
      fontSize: 24,
      fontWeight: '700',
    },


    formSubtitle: {
      fontSize: 11,
      marginTop: 4,
    },


    cancelText: {
      fontSize: 10,
      fontWeight: '900',
      letterSpacing: 1,
      marginTop: 4,
    },


    adminInputWrapper: {
      marginBottom: 14,
    },


    inputLabel: {
      fontSize: 9,
      fontWeight: '900',
      letterSpacing: 1.5,
      marginBottom: 7,
    },


    adminInput: {
      height: 48,
      borderRadius: 12,
      borderWidth: 1,
      paddingHorizontal: 13,
      fontSize: 13,
    },


    errorText: {
      color: '#D56B6B',
      fontSize: 10,
      marginTop: 5,
    },


    formTwoColumns: {
      flexDirection: 'row',
      gap: 10,
    },


    formHalf: {
      flex: 1,
    },


    adminListHeader: {
      marginBottom: 13,
    },


    adminSectionTitle: {
      fontFamily: 'serif',
      fontSize: 25,
      fontWeight: '700',
    },


    adminSectionSubtitle: {
      fontSize: 11,
      marginTop: 4,
    },


    adminMovie: {
      flexDirection: 'row',
      borderWidth: 1,
      borderRadius: 17,
      padding: 10,
      marginBottom: 11,
    },


    adminPoster: {
      width: 70,
      height: 92,
      borderRadius: 9,
      marginRight: 12,
    },


    adminMovieTitle: {
      fontFamily: 'serif',
      fontSize: 17,
      fontWeight: '700',
    },


    adminMovieGenre: {
      fontSize: 10,
      marginTop: 4,
    },


    adminMovieMeta: {
      fontSize: 10,
      fontWeight: '700',
      marginTop: 6,
    },


    adminActions: {
      flexDirection: 'row',
      gap: 7,
      marginTop: 9,
    },


    editButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      borderWidth: 1,
      borderRadius: 15,
      paddingHorizontal: 9,
      paddingVertical: 6,
    },


    editButtonText: {
      fontSize: 8,
      fontWeight: '900',
      letterSpacing: 0.5,
    },


    deleteButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      borderWidth: 1,
      borderRadius: 15,
      paddingHorizontal: 9,
      paddingVertical: 6,
    },


    deleteButtonText: {
      color: '#D56B6B',
      fontSize: 8,
      fontWeight: '900',
      letterSpacing: 0.5,
    },

  });