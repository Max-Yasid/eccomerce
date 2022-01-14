import React from 'react';
import { useProductsContext } from '../context/productsContext';
import styles from './../styles/layout/productsLayout.module.css';
import ScrollableProductsList from './ScrollableProductsList';

function ProductsLayout({ children }) {
    const { store: { selectedProductID, products } } = useProductsContext();
        return (
            <main className={styles.products}>
                <ScrollableProductsList selectedProductID={selectedProductID} products={products} />
                { children }
            </main>
        );
};


export default ProductsLayout;