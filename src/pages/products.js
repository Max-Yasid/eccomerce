import React from 'react';
import ProductsLayout from '../components/productsLayout';

function Products(props) {
    return (
        <div>
        </div>
    );
}

Products.getLayout = function getLayout(page){
    return (
        <ProductsLayout>
            {page}
        </ProductsLayout>
    );
}

export default Products;