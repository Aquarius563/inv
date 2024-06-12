const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

class InventoryManagementSystem {
    constructor() {
        this.inventory = {}; // { productId: quantity }
        this.carts = {}; // { customerId: { productId: quantity } }
        this.discountCoupons = {}; // { discountId: { percentage: number, maxDiscount: number } }
    }

    addItemToInventory(productId, quantity) {
        if (!this.inventory[productId]) {
            this.inventory[productId] = 0;
        }
        this.inventory[productId] += quantity;
    }

    removeItemFromInventory(productId, quantity) {
        if (this.inventory[productId]) {
            this.inventory[productId] -= quantity;
            if (this.inventory[productId] <= 0) {
                delete this.inventory[productId];
            }
        }
    }

    addItemToCart(customerId, productId, quantity) {
        if (!this.inventory[productId] || this.inventory[productId] < quantity) {
            throw new Error('Insufficient inventory');
        }

        if (!this.carts[customerId]) {
            this.carts[customerId] = {};
        }

        if (!this.carts[customerId][productId]) {
            this.carts[customerId][productId] = 0;
        }

        this.carts[customerId][productId] += quantity;
        this.inventory[productId] -= quantity;
    }

    addDiscountCoupon(discountId, percentage, maxDiscount) {
        this.discountCoupons[discountId] = {
            percentage,
            maxDiscount,
        };
    }

    applyDiscountCoupon(cartValue, discountId) {
        if (!this.discountCoupons[discountId]) {
            throw new Error('Invalid discount coupon');
        }

        const { percentage, maxDiscount } = this.discountCoupons[discountId];
        const discount = (percentage / 100) * cartValue;

        return Math.min(discount, maxDiscount);
    }
}

// Initialize the Inventory Management System
const ims = new InventoryManagementSystem();

// API Endpoints
app.post('/api/addItemToInventory', (req, res) => {
    const { productId, quantity } = req.body;
    ims.addItemToInventory(productId, quantity);
    res.send('Item added to inventory');
});

app.post('/api/removeItemFromInventory', (req, res) => {
    const { productId, quantity } = req.body;
    try {
        ims.removeItemFromInventory(productId, quantity);
        res.send('Item removed from inventory');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.post('/api/addItemToCart', (req, res) => {
    const { customerId, productId, quantity } = req.body;
    try {
        ims.addItemToCart(customerId, productId, quantity);
        res.send('Item added to cart');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.post('/api/addDiscountCoupon', (req, res) => {
    const { discountId, percentage, maxDiscount } = req.body;
    ims.addDiscountCoupon(discountId, percentage, maxDiscount);
    res.send('Discount coupon added');
});

app.post('/api/applyDiscountCoupon', (req, res) => {
    const { cartValue, discountId } = req.body;
    try {
        const discount = ims.applyDiscountCoupon(cartValue, discountId);
        const finalPrice = cartValue - discount;
        res.send({ discountedPrice: finalPrice });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
