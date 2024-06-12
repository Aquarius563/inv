import React, { useState } from 'react';
import axiosInstance from './axiosConfig'; // Import the configured Axios instance

const InventoryManagement = () => {
    const [productId, setProductId] = useState('');
    const [quantity, setQuantity] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [cartValue, setCartValue] = useState('');
    const [discountId, setDiscountId] = useState('');
    const [discountedPrice, setDiscountedPrice] = useState('');
    const [couponDiscountId, setCouponDiscountId] = useState('');
    const [couponPercentage, setCouponPercentage] = useState('');
    const [couponMaxDiscount, setCouponMaxDiscount] = useState(0);

    const handleAddToInventory = async () => {
        try {
            await axiosInstance.post('/api/addItemToInventory', { productId, quantity });
            alert('Item added to inventory');
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleRemoveFromInventory = async () => {
        try {
            await axiosInstance.post('/api/removeItemFromInventory', { productId, quantity });
            alert('Item removed from inventory');
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleAddToCart = async () => {
        try {
            await axiosInstance.post('/api/addItemToCart', { customerId, productId, quantity });
            alert('Item added to cart');
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleAddDiscountCoupon = async () => {
        try {
            await axiosInstance.post('/api/addDiscountCoupon', {
                discountId: couponDiscountId,
                percentage: couponPercentage,
                maxDiscount: couponMaxDiscount,
            });
            alert('Discount coupon added');
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleApplyDiscount = async () => {
        try {
            const response = await axiosInstance.post('/api/applyDiscountCoupon', { cartValue, discountId });
            setDiscountedPrice(response.data.discountedPrice);
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div>
            <h1>Inventory Management</h1>
            <div>
                <h2>Add Item to Inventory</h2>
                <label>Product ID:</label>
                <input type="text" placeholder="Product ID" value={productId} onChange={(e) => setProductId(e.target.value)} />
                <label>Quantity:</label>
                <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
                <button onClick={handleAddToInventory}>Add to Inventory</button>
            </div>
            <div>
                <h2>Remove Item from Inventory</h2>
                <label>Product ID:</label>
                <input type="text" placeholder="Product ID" value={productId} onChange={(e) => setProductId(e.target.value)} />
                <label>Quantity:</label>
                <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
                <button onClick={handleRemoveFromInventory}>Remove from Inventory</button>
            </div>
            <div>
                <h2>Add Item to Cart</h2>
                <label>Customer ID:</label>
                <input type="text" placeholder="Customer ID" value={customerId} onChange={(e) => setCustomerId(e.target.value)} />
                <label>Product ID:</label>
                <input type="text" placeholder="Product ID" value={productId} onChange={(e) => setProductId(e.target.value)} />
                <label>Quantity:</label>
                <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
                <button onClick={handleAddToCart}>Add to Cart</button>
            </div>
            <div>
                <h2>Add Discount Coupon (Done in Admin side)</h2>
                <label>Discount ID:</label>
                <input type="text" placeholder="Discount ID" value={couponDiscountId} onChange={(e) => setCouponDiscountId(e.target.value)} />
                <label>Discount Percentage (%):</label>
                <input type="number" placeholder="Discount Percentage" value={couponPercentage} onChange={(e) => setCouponPercentage(Number(e.target.value))} />
                <label>Maximum Discount Cap:</label>
                <input type="number" placeholder="Max Discount" value={couponMaxDiscount} onChange={(e) => setCouponMaxDiscount(Number(e.target.value))} />
                <button onClick={handleAddDiscountCoupon}>Add Discount Coupon</button>
            </div>
            <div>
                <h2>Apply Discount</h2>
                <label>Cart Value:</label>
                <input type="number" placeholder="Cart Value" value={cartValue} onChange={(e) => setCartValue(Number(e.target.value))} />
                <label>Discount ID:</label>
                <input type="text" placeholder="Discount ID" value={discountId} onChange={(e) => setDiscountId(e.target.value)} />
                <button onClick={handleApplyDiscount}>Apply Discount</button>
                <p>Discounted Price: {discountedPrice}</p>
            </div>
        </div>
    );
};

export default InventoryManagement;
