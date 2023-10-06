import { Search, SentimentDissatisfied } from "@mui/icons-material";
import {
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import ProductCard from "./ProductCard";
import "./Products.css";

// Definition of Data Structures used
/**
 * @typedef {Object} Product - Data on product available to buy
 *
 * @property {string} imageURL - The image of the product
 * @property {string} name - The name or title of the product
 * @property {number} price - The price to buy the product
 * @property {number} quantity - The total quantity of the product available in the inventory
 * @property {string} type - The type of the T-shirt
 * @property {string} id - Unique ID for the product
 * @property {string} currency - Unique ID for the product
 * @property {string} color - Unique ID for the product
 * @property {string} gender - The gender of the product's audience
 */

const Products = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
//   const [searchText, setSearchText] = useState("");
  const [timer, setTimer] = useState(null);

  
  /**
   * Make API call to get the products list and store it to display the products
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on all available products
   *
   * API endpoint - "GET /products"
   *
   * Example for successful response from backend:
   * HTTP 200
   * [
   *      {
   *         id: 1,
   *         imageURL: "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/black-polo-men.png",
   *         name: "Black Polo",
   *         type: "Polo",
   *         price: 250,
   *         currency: "INR",
   *         color: "Black",
   *         gender: "Men",
   *         quantity: 3
   *     },
   *     {
   *         id: 2,
   *         imageURL: "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/blue-polo-women.png",
   *         name: "Blue Polo",
   *         type: "Polo",
   *         price: 350,
   *         currency: "INR",
   *         color: "Blue",
   *         gender: "Women",
   *         quantity: 3
   *     },
   * ]
   *
   * Example for failed response from backend:
   * HTTP 500
   * {
   *      "success": false,
   *      "message": "Something went wrong. Check the backend console for more details"
   * }
   */
  const performAPICall = async () => {
    setLoading(true);
    try {
      let res = await axios.get("https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json");
      console.log(res.data);
      setProducts(res.data);
      setFilteredProducts(res.data);
      setLoading(false);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    performAPICall();
  }, []);

  
  /**
   * Definition for search handler
   * This is the function that is called on adding new search keys
   *
   * @param {string} text
   *    Text user types in the search bar. To filter the displayed products based on this text.
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on filtered set of products
   *
   * API endpoint - "GET /products/search?value=<search-query>"
   *
   */
//   const performSearch = async (text) => {
//     try {
//       let res = await axios.get(
//         `${config.endpoint}/products/search?value=${text}`
//       );
//       setFilteredProducts(res.data);
//     } catch (e) {
//       if (e.response) {
//         if (e.response.status === 404) {
//           setFilteredProducts([]);
//         } else {
//           enqueueSnackbar(e.response.data.message, {
//             variant: "error",
//           });
//           setFilteredProducts(products);
//         }
//       } else {
//         enqueueSnackbar(
//           "Could not fetch products. Check that the backend is running, reachable and returns valid JSON.",
//           {
//             variant: "error",
//           }
//         );
//       }
//     }
//   };

  
  /**
   * Definition for debounce handler
   * With debounce, this is the function to be called whenever the user types text in the searchbar field
   *
   * @param {{ target: { value: string } }} event
   *    JS event object emitted from the search input field
   *
   * @param {NodeJS.Timeout} debounceTimeout
   *    Timer id set for the previous debounce call
   *
   */
  const debounceSearch = (event, debounceTimeout) => {
    // if (debounceTimeout) clearTimeout(debounceTimeout);

    // let timerId = setTimeout(async () => {
    //   await performSearch(event.target.value);
    // }, 500);

    // setTimer(timerId);
  };

  const getGridItems = (filteredProducts) => {
    return filteredProducts.length ? (
      filteredProducts.map((product) => (
        <Grid key={product.id} item xs={6} md={3}>
          <ProductCard product={product} />
        </Grid>
      ))
    ) : (
      <Box className="loading">
        <SentimentDissatisfied color="action" />
        <h4>No Products Found</h4>
      </Box>
    );
  };

  return (
    <div>
      <Header>
      <TextField
          className="search-desktop"
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search color="primary" />
              </InputAdornment>
            ),
          }}
          placeholder="Search for items/categories"
          name="search"
          // value={searchText}
          onChange={(e) => {
            // setSearchText(e.target.value);
            console.log(e.target.value);
          }}
        />
      </Header>

      {/* Search view for mobiles */}
      <TextField
        className="search-mobile"
        size="small"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        placeholder="Search for items/categories"
        name="search"
        // value={searchText}
        onChange={(e) => {
          // setSearchText(e.target.value);
        //   debounceSearch(e, timer);
        console.log(e.target.value);
        }}
      />
      <Grid container>
        <Grid item className="product-grid">
            <Grid container spacing={2} marginY={2} paddingX={2}>
                {loading 
                ? 
                (
                    <Box className="loading">
                        <CircularProgress />
                        <h4>Loading Products...</h4>
                    </Box>
                )
                :
                getGridItems(filteredProducts)
                }
            </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Products;
