import { NextResponse } from 'next/server';


export default function Home(props) {
  return NextResponse.redirect('/hello-nextjs');
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