import { createContext, useContext, useEffect, useReducer } from "react";

const ProductContext = createContext();

const productModel = {
    id: 999,
    image: null,
    title: "Fall Limited Edition Sneakers",
    price: 250.00,
    description: "These low-profile sneakers are your perfect casual wear companion. Featuring a" +
    "durable rubber outer sole, they\’ll withstand everything the weather can offer."
};
const productsImagesName = [
    "image-product-1.jpg",
    "image-product-2.jpg",
    "image-product-3.jpg",
    "image-product-4.jpg"
];
const productsInitialState = new Array(4)
    .fill(productModel)
    .map((product, i) => ({
        ...product,
        id: product.id + i,
        image: productsImagesName[i],
}));
export const initialState = {
    products: productsInitialState,
    selectedProductID: null,
    cartProducts: [],
};
const productsReducer = (state, action) => {
    switch(action.type){
        case "addProducts": 
        return {
            ...state,
            products: [...state.products, ...action.payload],
        };
        case "setProductItemPage": 
        return {
            ...state,
            productItemPage: action.payload
        };
        case "addProductToCart":
        const productExistsInState = state.cartProducts.some(product => product.id === action.payload.id);
        
        if(productExistsInState){
            const duplicatedProductIndex = state.cartProducts.findIndex(product => product.id === action.payload.id);
            const newState = {
                ...state,
                cartProducts: [...state.cartProducts]
            };
            newState.cartProducts[duplicatedProductIndex].quantity +=  action.payload.quantity;
            return newState;
        }
        return {
            ...state, 
            cartProducts: [...state.cartProducts, action.payload]
        };
        case "removeProductFromCart":
            return {
                ...state,
                cartProducts: state.cartProducts.filter(product => product.id !== action.payload),
            }
        case "setSelectedProductID":
            return {
                ...state,
                selectedProductID: action.payload,
            }
        default:
            return state;
    }
};
export const ProductsContext = ({ children }) => {
    const [store, dispatch] = useReducer(productsReducer, initialState);
    useEffect(async () => {
        const productsData = await fetch('https://fakestoreapi.com/products?limit=30')
            .then(res => res.json());
        const productsAction = {
            type: "addProducts",
            payload: [...productsData],
        };
        dispatch(productsAction);
    }, []);
    return <ProductContext.Provider value={{ store, dispatch }}>
        {children}
    </ProductContext.Provider>;
}

export const useProductsContext = () => useContext(ProductContext);