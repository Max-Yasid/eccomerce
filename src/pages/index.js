import Link from 'next/link';
import styles from '../styles/Home.module.css'

export default function Home(props) {
  return (
    <div className={styles.container}>
    </div>
  )
}

export async function getStaticProps(){
  return {
      redirect: {
          destination: `/products/Fall_Limited_Edition_Sneakers/999`,
          permanent: false,
      },
      props: {
        
      }
  }
}