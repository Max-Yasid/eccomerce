import Link from 'next/link';
import { initialState } from '../../context/productsContext';
import React, { useEffect, useState } from 'react';
import styles from './../../styles/productID.module.css';
import Image from 'next/image';

import ProductsLayout from '../../components/productsLayout';
import CartLogo from '../../assets/icons/icon-cart.svg';
import NextIcon from '../../assets/icons/icon-next.svg';
import PreviousIcon from '../../assets/icons/icon-previous.svg';
import CloseIcon from '../../assets/icons/icon-close.svg';

import { useProductsContext } from '../../context/productsContext';
import ScrollableProductsList from '../../components/ScrollableProductsList';

function Id({ params, productInfo }) {
  const { store: { products }, dispatch } = useProductsContext();
  const [quantity, setQuantity] = useState(1);
  const [isLightBoxShowing, setIsLightBoxShowing] = useState(false);
  const [productDiscount, setProductDiscount] = useState(undefined);
  const currentlyProductIndex = products.findIndex(product => parseInt(product.id) == parseInt(params.id[1]));
  if(!productInfo){ 
    productInfo = products[currentlyProductIndex];
  }

  useEffect(() => {
    const setSelectedProductIDAction = {
      type: "setSelectedProductID",
      payload: params.id[1],
    };
    dispatch(setSelectedProductIDAction);
    setProductDiscount((Math.random() * 80 + 10).toFixed());
    setQuantity(1);
  },[params]);

  const nextProduct = products[currentlyProductIndex + 1];
  const previousProduct = products[currentlyProductIndex - 1];
  const productFinalPrice = (productInfo.price - productInfo.price/100 * productDiscount).toFixed(2);

  const deviceSizeObserver = typeof window !== "undefined" && window.matchMedia("(min-width: 600px)").matches;
  
  function incrementProductQuantity(){
    setQuantity(quantity + 1);  
  }

  function decrementProductQuantity(){
    if(quantity <= 1) 
      return;
    setQuantity(quantity - 1);
  }

  function addProductToCart(){
    const product = {
      ...productInfo,
      quantity,
      price: productFinalPrice
    };
    const action = {
      type: "addProductToCart",
      payload: product
    };
    dispatch(action);
  }
  const changeToPreviousProduct = previousProduct?.id && <Link
    href={`/products/[...id]`}
    as={`/products/${previousProduct.title.replace(/ /g, "_")}/${previousProduct.id}`}
    scroll={false}
  >
    <a className={styles.product__ProductLink}>
      <PreviousIcon className={styles.product__productLinkIcon} />
    </a>
  </Link>;

  const changeToNextProduct = nextProduct?.id && <Link
    href={`/products/[...id]`}
    as={`/products/${nextProduct.title.replace(/ /g, "_")}/${nextProduct.id}`}
    scroll={false}
  >
      <a className={`${styles.product__ProductLink} ${styles['product__ProductLink--next']}`}>
        <NextIcon className={styles.product__productLinkIcon}/>
      </a>
  </Link>;

  return (
    <React.Fragment>
      <section className={`${styles.product__imageContainer}`}>
        {changeToPreviousProduct}
        <div 
          className={styles.product__image} 
          onClick={() => deviceSizeObserver && setIsLightBoxShowing(true)}
        >
          <Image
            src={productInfo?.image.includes('.com') ? productInfo?.image : `/images/${productInfo?.image}`}
            layout='fill'
            objectFit='contain'
            alt={productInfo?.title}
            priority
          />
        </div>
        {changeToNextProduct}
      </section>
      <section className={styles.product__itemInfo}>
        <h2 className={styles.product__subtitle}>
          SNEAKER COMPANY
        </h2>
        <h1 className={styles.product__title}>
          {productInfo.title}
        </h1>
        <p className={styles.product__description}>
          {productInfo.description}
        </p>
        <div className={styles.product__priceSection}>
          <div className={styles.product__finalPrice}>
            ${productFinalPrice}
          </div>
          <div className={styles.product__discountContainer}>
            <span className={`${styles.product__discount}`}>
              {productDiscount}%
            </span>
          </div>
          <div className={`${styles.product__price}`}>
            ${productInfo.price}{!productInfo.price.toString().includes(".") && ".00"}
          </div>
        </div>
        <div className={styles.product__inputAddContainer}>
          <div className={styles.product__customInputCounter}>
            <div onClick={decrementProductQuantity} className={styles.product__minus}>-</div>
              <input className={styles.product__quantityInput} type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            <div onClick={incrementProductQuantity} className={styles.product__plus}>+</div>
          </div>
          <br className={styles.product__br} />
          <button onClick={() => addProductToCart()} className={styles.product__btnAdd}>
            <CartLogo className={styles.product__cart} />
            Add to cart
          </button>
        </div>
      </section>
      {isLightBoxShowing &&
          <div className={styles.lightBox} onClick={() => setIsLightBoxShowing(false)}>
              <div className={styles.lightBox__content} onClick={(e) => e.stopPropagation()}>
                <div className={styles.lightBox__producImageContainer}>
                  <div className={styles.lightBox__closeContainer}>
                    <CloseIcon 
                      className={styles.lightBox__closeIcon} 
                      onClick={() => setIsLightBoxShowing(false)} 
                    />
                  </div>
                  <div className={styles.lightBox__productImage}>
                      {changeToPreviousProduct}
                      <div className={styles.ligthBox__selectedProductImage}>
                        <Image
                          src={productInfo?.image.includes('.com') ? productInfo?.image : `/images/${productInfo?.image}`}
                          layout='fill'
                          objectFit='contain'
                          alt={productInfo?.title}
                          priority
                        />
                      </div>
                      {changeToNextProduct}
                  </div>
                </div>
                <ScrollableProductsList componentParent={"lightBox"} selectedProductID={productInfo.id} products={products} />
              </div>
          </div>
      }
    </React.Fragment>
  );
}

Id.getLayout = function(page){
  return <ProductsLayout>
    {page}
  </ProductsLayout>
}

export async function getStaticProps({ params }){
  const productInfo = await fetch(`https://fakestoreapi.com/products/${params.id[1]}`)
    .then(res=> res.json())
    .then(res => res);
  return {
    props: {
      params,
      productInfo
    }
  }
}

export async function getStaticPaths(){
  const productsData = initialState.products.concat(await fetch('https://fakestoreapi.com/products?limit=30')
    .then(res=> res.json()));
  const paths = productsData.map((product) => ({
    params: { 
      id: [product.title.replace(/ /g,'_'), product.id.toString()] 
    } 
  }));
  paths.forEach((path) => console.log(path.params.id));
  return {
    paths,
    fallback: false,
  }
}

export default Id;