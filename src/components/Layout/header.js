import React, { useState } from 'react';
import styles from './../../styles/layout/header.module.css';
import Image from 'next/image';
import Link from 'next/link';
import CartIcon from './../../assets/icons/icon-cart.svg';
import Cart from './../../components/Layout/Cart';
import Sidebar from './sidebar';

import { useProductsContext } from '../../context/productsContext';
import { useRouter } from 'next/router';

function Header(props) {
    const { store: { cartProducts }, dispatch } = useProductsContext();
    const [isCartDisplayed, toggleCart] = useState(false);
    const [isSidebarShowing, toggleSidebar] = useState(false);
    const router = useRouter();
    return (
        <header className={`${styles.header}`}>
            <nav className={`${styles.navbar}`}>
                <section className={`${styles.navbar__hamburgerContainer}`}>
                    <div
                        onClick={() => toggleSidebar(true)}
                        className={`${styles.navbar__hamburger}`}
                    >
                        <Image
                            src="/images/icon-menu.svg"
                            layout='fill'
                            objectFit='contain'
                            alt="hamburger"
                        />
                    </div>
                </section>
                <section className={`${styles['navbar__logoContainer']}`}>
                    <Link href="/products">
                        <a 
                            className={`${styles.navbar__logo}`}
                        >
                            <Image
                                src="/images/logo.svg"
                                layout='fill'
                                objectFit='contain'
                                alt="logo"
                            />
                        </a>
                    </Link>
                </section>
                <section className={styles.navbar__navigationMenu}>
                    <div 
                        className={`${styles.navbar__LinkContainer} ${router.pathname === "/collections" && styles["navbar__LinkContainer--active"]}`}
                    >
                        <a
                            href="#"
                            className={`${styles.navbar__link} `}
                        >
                            Collections
                        </a>
                    </div>
                    <div 
                        className={`${styles.navbar__LinkContainer} ${router.pathname === "/men" && styles["navbar__LinkContainer--active"]}`}
                    >
                        <a
                            href="#"
                            className={`${styles.navbar__link}`}
                        >
                            Men
                        </a>
                    </div>
                    <div 
                        className={`${styles.navbar__LinkContainer} ${router.pathname === "/products/[...id]" && styles["navbar__LinkContainer--active"]}`}
                    >
                        <a
                            href="#"
                            className={`${styles.navbar__link}`}
                        >
                            Women
                        </a>
                    </div>
                    <div 
                        className={`${styles.navbar__LinkContainer} ${router.pathname === "/about" && styles["navbar__LinkContainer--active"]}`}
                    >
                        <a 
                            href="#"
                            className={`${styles.navbar__link}`}
                        >
                            About
                        </a>
                    </div>
                    <div 
                        className={`${styles.navbar__LinkContainer} ${router.pathname === "/contact" && styles["navbar__LinkContainer--active"]}`}
                    >
                        <a
                            href="#"
                            className={`${styles.navbar__link}`}
                        >
                            Contact
                        </a>
                    </div>
                </section>
                <section className={`${styles['navbar__optionsMenu']}`}>
                    <div className={`${styles.navbar__cartContainer}`}>
                        <div className={styles.navbar__cart}>
                            {cartProducts.length > 0 &&
                                <span className={styles.navbar__cartItemsCounter}>
                                    {cartProducts.length}
                                </span>
                            }
                            <CartIcon onClick={() => toggleCart(!isCartDisplayed)} className={styles.navbar__cartIcon} />
                        </div>
                    </div>
                    <div className={`${styles.navbar__avatarContainer}`}>
                        <div className={`${styles.navbar__avatar}`}>
                            {
                                <Image 
                                    src="/images/image-avatar.png"
                                    layout='fill'
                                    objectFit='contain'
                                    alt="avatar" 
                                />
                            }
                        </div>
                    </div>
                </section>
            </nav>
            <Sidebar isSidebarShowing={isSidebarShowing} closeSidebar={() => toggleSidebar(false)} />
            {isCartDisplayed && <Cart cartProducts={cartProducts} dispatch={dispatch} /> }
        </header>
    );
}

export default Header;