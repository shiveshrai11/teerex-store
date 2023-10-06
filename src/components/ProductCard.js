import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product, handleAddToCart }) => {
  return (
    <Card className="card">
      <CardMedia 
        component="img" 
        height="140" 
        image={product?.imageURL} 
        alt={product?.name}
      />
      <CardContent>
        <Typography>{product?.name}</Typography>
        <Typography>{product?.cost}</Typography>
      </CardContent>
      <CardActions>
        <Button 
          className="card-button"
          variant="contained"
        >
          Add To Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
