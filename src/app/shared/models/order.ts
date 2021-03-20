import { ShoppingCartService } from '../services/shopping-cart.service';
import { ShoppingCartItem } from './shopping-cart-item';
import { Shipping } from "./shipping";
import { ShoppingCart } from './shopping-cart';

export class Order {
    datePlaced: number;
    items: {
        product: {
            title: string;
            imageUrl: string;
            price: number;
        };
        quantity: number;
        totalPrice: number;
    }[] = [];

    constructor(public userID: string, public shipping: Shipping, cart: ShoppingCart) {
        this.datePlaced = new Date().getTime();
        cart.itemsArr.map(cartItem => {
        this.items.push(
            {
                product: {
                    title: cartItem.title,
                    imageUrl: cartItem.imageUrl,
                    price: cartItem.price
                },
                quantity: cartItem.quantity,
                totalPrice: cartItem.totalPrice
            }
        )});
    }
}