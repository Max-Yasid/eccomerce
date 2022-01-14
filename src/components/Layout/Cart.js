import React from 'react';
import styles from './../../styles/layout/cart.module.css';
import Image from 'next/image';
import DeletetIcon from '../../assets/icons/icon-delete.svg';

function Cart({ cartProducts, dispatch }) {
    function removeProductFromCart(productId){
        const action = {
            type: "removeProductFromCart",
            payload: productId,
        }
        dispatch(action);
    };
    return (
        <section className={styles.cart}>
            <div className={`${styles.cart__title}`}>
                Cart
            </div>
            {cartProducts.length ?
                <React.Fragment>
                {cartProducts.map((product) =>
                    <div className={styles.cart__product} key={product.id}>
                        <div className={styles.cart__productImage}>
                            {
                                <Image 
                                    src={product?.image.includes('.com') ? 
                                        product?.image : `/images/${product?.image}`
                                    }
                                    layout='fill'
                                    objectFit='contain'
                                    alt="avatar" 
                                />
                            }
                        </div>
                        <div className={styles.cart__productDescription}>
                            <span className={styles.cart__productTitle}>{product.title}</span>
                            ${product.price} x {product.quantity}
                            <span className={styles.product__finalPrice}> ${(product.price * product.quantity).toFixed(2)}</span> 
                        </div>
                        <div className={styles.cart__productDelete}>
                            <DeletetIcon 
                            className={styles.cart_removeProductIcon}
                            onClick={() => removeProductFromCart(product.id)} />
                        </div>
                    </div>
                )}
                <button className={styles.cart__btnAdd}>
                    Checkout
                </button></React.Fragment>
                :
                <div className={styles.cart__emptyMessage}>
                    Your car is empty.
                </div>
            }
        </section>
    );
}

export default Cart;