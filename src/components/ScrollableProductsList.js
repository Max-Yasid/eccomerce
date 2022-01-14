import React, { useRef, useEffect, useState } from 'react';
import styles from './../styles/scrollableProductsList.module.css';
import Image from 'next/image';
import Link from 'next/link';
import NextIcon from './../assets/icons/icon-next.svg';
import PreviousIcon from './../assets/icons/icon-previous.svg';

import ScrollContainer from 'react-indiana-drag-scroll';

function ScrollableProductsList({ products, selectedProductID, componentParent }) {
    const [isScrollbarAtStartOrTheEnd, setIsScrollbarAtStartOrTheEnd] = useState({ start: false, end: false });
    const scrollBarRef = useRef(null);

    function showArrows(scrollBarComponent){
        scrollBarComponent.previousElementSibling.classList.add(styles["opacity1"]);
        scrollBarComponent.nextElementSibling.classList.add(styles["opacity1"]);
    }
    function removeArrows(scrollBarComponent){
        scrollBarComponent.previousElementSibling.classList.remove(styles["opacity1"]);
        scrollBarComponent.nextElementSibling.classList.remove(styles["opacity1"]);
    }

    //this function is called when scroll event is happening and finishing too. 
    //argument otherActions saves the scrollBar position when scroll event ends
    //for that reason the argument is optional because we don't have save scroll position if it's scrolling.
    function hideOrShowArrowsWhenScrollHitsOrLeaveCorners(scrollBarComponent){
        if(!scrollBarComponent.previousElementSibling.classList.contains(styles["opacity1"])){
            showArrows(scrollBarComponent);
        }
        if(scrollBarComponent.scrollLeft === 0){
            return setIsScrollbarAtStartOrTheEnd({ start: true, end: false })
        }
        if((scrollBarComponent.offsetWidth + scrollBarComponent.scrollLeft) >= scrollBarComponent.scrollWidth){
            return setIsScrollbarAtStartOrTheEnd({ start: false, end: true });
        }
        const { start, end } = isScrollbarAtStartOrTheEnd;
        if(start == false && end == false){
            return;
        }
        setIsScrollbarAtStartOrTheEnd({ start: false, end: false });
    }
    function scrollTo(position, behavior){
        scrollBarRef.current.scrollTo({ left: position, behavior});
    }
    function scrollAbitWhenClickArrows(quantity){
        scrollTo(scrollBarRef.current.scrollLeft + quantity, "smooth");
    }
    return (
        <section className={styles.ScrollableProductsList__container}>
            <div
                className={`
                    ${styles.ScrollableProductsList__ProductLink} 
                    ${isScrollbarAtStartOrTheEnd.start && styles["scrollableProductsList__ProductLink--hidden"]}
                `}
                onClick={() => scrollAbitWhenClickArrows(-113)}
            >
                <PreviousIcon className={styles.ScrollableProductsList__productLinkIcon} />
            </div>
            <ScrollContainer
                className={`
                    ${styles.scrollable__productsList} 
                    ${componentParent === "lightBox" && styles["scrollable__productsList--lightBox"]}`
                }
                onScroll={() => hideOrShowArrowsWhenScrollHitsOrLeaveCorners(scrollBarRef.current)}
                innerRef={scrollBarRef}
                onEndScroll={() => removeArrows(scrollBarRef.current)}
            >
                <section className={styles.scrollable__productsImages}>
                    {products.map((product) =>
                            <ImageLinkWithPlaceholder
                                key={product.id}
                                isThisTheSelectedProduct={selectedProductID == product.id} 
                                product={product}
                                scrollTo={selectedProductID == product.id && scrollTo}
                            />
                    )}
                </section>
            </ScrollContainer>
            <div
                className={`
                    ${styles.ScrollableProductsList__ProductLink} 
                    ${styles['ScrollableProductsList__ProductLink--next']}
                    ${isScrollbarAtStartOrTheEnd.end && styles["scrollableProductsList__ProductLink--hidden"]}`
                }
                onClick={() => scrollAbitWhenClickArrows(113)}
            >
                <NextIcon className={styles.ScrollableProductsList__productLinkIcon}/>
            </div>
        </section>
    );
}


const ImageLinkWithPlaceholder = React.memo(function Component({ product, isThisTheSelectedProduct, scrollTo }){
    const [didImageLoad, setDidImageLoad] = useState(false);
    const [didUrlChangeByClickingThisComponent, setDidUrlChangeByClickingThisComponent] = useState(false);
    const linkRef = useRef(null);
    useEffect(() => {
        if(isThisTheSelectedProduct){
            const componentLink = linkRef.current;
            if(componentLink){
                const scrollbarComponentHalfWidth = componentLink.parentElement.parentElement.clientWidth / 2;
                const componentHalfWidth = componentLink.clientWidth / 2;
                const bonusOffsetToCenterElementInTheScrollbar = scrollbarComponentHalfWidth - componentHalfWidth;
                scrollTo(componentLink.offsetLeft - bonusOffsetToCenterElementInTheScrollbar, "auto");
            }
        }
    }, []);
    useEffect(() => {
        if(isThisTheSelectedProduct){
            if(didUrlChangeByClickingThisComponent)
                return didUrlChangeByClickingThisComponent && setDidUrlChangeByClickingThisComponent(false);
            const componentLink = linkRef.current;
            if(componentLink){
                const scrollbarComponentHalfWidth = componentLink.parentElement.parentElement.clientWidth / 2;
                const componentHalfWidth =  componentLink.clientWidth / 2;
                const bonusOffsetToCenterElementInTheScrollbar = scrollbarComponentHalfWidth - componentHalfWidth;
                scrollTo(componentLink.offsetLeft - bonusOffsetToCenterElementInTheScrollbar, "smooth");
            }
        }
    }, [isThisTheSelectedProduct]);
    return (
        <Link
            href={`/products/[...id]`}
            as={`/products/${product.title?.replace(/ /g, "_")}/${product.id}`}
            scroll={false}
        >
            <a 
                onClick={() => setDidUrlChangeByClickingThisComponent(true)}
                ref={linkRef}
                className={`
                    ${styles.imageLink_productsListImage} 
                    ${isThisTheSelectedProduct && styles.imageLink_selectedProductsListImage}
                    ${!didImageLoad && styles["imageLink_productsImagePlaceholder"]}`
                }
            >
                <Image
                    src={product.image.includes('.com') ? product.image : `/images/${product.image}`}
                    layout='fill'
                    objectFit='contain'
                    alt={product.title}
                    priority
                    onLoadingComplete={() => setDidImageLoad(true)}
                />
            </a>
        </Link>
    )
});

export default ScrollableProductsList;