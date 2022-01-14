import { NextResponse } from 'next/server';
import ProductsLayout from '../components/productsLayout';

function Products(props) {
    return NextResponse.redirect('/hello-nextjs');
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