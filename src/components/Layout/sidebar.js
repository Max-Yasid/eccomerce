import React from 'react';
import styles from './../../styles/layout/sidebar.module.css';
import CloseIcon from './../../assets/icons/icon-close.svg';

function sidebar({ isSidebarShowing, closeSidebar }) {
    return (
        <div className={`${styles.sidebar} ${!isSidebarShowing && styles["sidebar--hide"]}`}>
            <section className={`${styles.sidebar__sidebar} ${isSidebarShowing && styles["sidebar__sidebar--displayed"]}`}>
                <div>
                    <CloseIcon onClick={closeSidebar} />
                </div>
                <div className={`${styles.sidebar__menu}`}>
                    <div className="">Collections</div>
                    <div className="">Men</div>
                    <div className="">Women</div>
                    <div className="">About</div>
                    <div className="">Contact</div>
                </div>
            </section>
        </div>
    );
}

export default sidebar;