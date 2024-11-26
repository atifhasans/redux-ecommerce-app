import { Card } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addQuantity, lessQuantity, removeItem } from '../Config/redux/reducers/cartSlice';

const Cart = () => {
    const selector = useSelector((state) => state.cart.cart);

    console.log("Cart items:", selector); // Debugging: Check the array structure

    // Calculate total price safely
    const totalPrice = selector.reduce((acc, cval) => {
        const price = cval.price ?? 0; // Fallback to 0 if price is undefined
        const quantity = cval.quantity ?? 0; // Fallback to 0 if quantity is undefined
        return acc + price * quantity;
    }, 0);

    console.log("Total Price:", totalPrice); // Debugging: Check total price

    const dispatch = useDispatch();

    const deleteCartItem = (item) => {
        dispatch(removeItem(item));
    };

    const cartItemAddQuantity = (item) => {
        dispatch(addQuantity(item));
    };

    const cartItemLessQuantity = (item) => {
        dispatch(lessQuantity(item));
    };

    return (
        <div className="container my-4">
            <h2 className="text-center mb-4">Shopping Cart</h2>
            {selector.length > 0 ? (
                <>
                    <div className="row g-3">
                        {selector.map((item, index) => {
                            const price = item.price ?? 0; // Fallback for rendering
                            const quantity = item.quantity ?? 0; // Fallback for rendering
                            return (
                                <div className="col-md-4" key={item.id || index}>
                                    <div className="card shadow-sm h-100">
                                        <img
                                            src={item.thumbnail}
                                            alt={item.title}
                                            className="card-img-top"
                                            style={{ height: '150px', objectFit: 'contain' }}
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">{item.title}</h5>
                                            <p className="card-text text-muted">
                                                Price: ${price.toFixed(2)}
                                            </p>
                                            <div className="d-flex align-items-center justify-content-between my-3">
                                                <button
                                                    className="btn btn-sm btn-outline-primary"
                                                    onClick={() => cartItemAddQuantity(item)}
                                                >
                                                    +
                                                </button>
                                                <span className="fw-bold">{quantity}</span>
                                                <button
                                                    className="btn btn-sm btn-outline-primary"
                                                    onClick={() => cartItemLessQuantity(item)}
                                                >
                                                    -
                                                </button>
                                            </div>
                                            <button
                                                className="btn btn-danger btn-sm w-100"
                                                onClick={() => deleteCartItem(item)}
                                            >
                                                Remove Item
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="text-center mt-4">
                        <h3>
                            <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
                        </h3>
                    </div>
                </>
            ) : (
                <h4 className="text-center text-muted">
                    Your cart is empty. Add some items!
                </h4>
            )}
        </div>
    );
};

export default Cart;
