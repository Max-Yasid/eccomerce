import '../styles/globals.css';
import Layout from '../components/layout';
import { ProductsContext } from '../context/productsContext';

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || (page => page);
  return (
    <ProductsContext>
      <Layout>
        {getLayout(<Component {...pageProps} />)}
      </Layout>
    </ProductsContext>
  );
}

export default MyApp;
