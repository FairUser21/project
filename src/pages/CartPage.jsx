import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { useCart } from "../contexts/CartContextProvider";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart, getCart } = useCart();

  return (
    <div>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Ship To</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.products.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <img src={row.image} alt="" width={30} />
              </TableCell>
              <TableCell>{row.price}</TableCell>
              {/* <TableCell>{row.}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{`$${row.amount}`}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        <Typography variant="h5">TotalPrice: ${cart.totalPrice}</Typography>
        <Button variant="outlined" component={Link} to="/">
          Buy
        </Button>
      </Box>
    </div>
  );
};

export default CartPage;
