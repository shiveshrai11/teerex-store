import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom"
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';


const Header = ({children}) => {
const history = useHistory();
  return (
      <Box className="header">
        <Box className="header-title">
          {/* <Link to="/"> */}
            <span className="teerex-logo">TeeRex</span>
          {/* </Link> */}
        </Box>
        {children}
        <Stack direction="row" spacing={1} alignItems="center">
            <Button
                className="explore-button"
                variant="text"
                onClick={()=>{
                    history.push("/");
                }}
            >
                Products
            </Button>
            <button style={{color:"rgb(8,165,124)", cursor: "pointer"}}>
                <ShoppingCartOutlinedIcon onClick={() => history.push("/cart")} />
            </button>
            
        </Stack>
    </Box>
    );


};

export default Header;
