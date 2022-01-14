import Link from 'next/link';
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

export async function getStaticProps(){
    return {
        redirect: {
            destination: `/products/Fall_Limited_Edition_Sneakers/999`,
            permanent: false,
        },
    }
}

export default Products;