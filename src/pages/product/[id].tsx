import Head from 'next/head';
import { useRouter } from 'next/router';

import { ProductContainer, ImageContainer, ProductDetails } from '../../styles/pages/product';

export default function Product(){
  const { query } = useRouter()

  return (
    <ProductContainer>
      <Head>
        <title>Camiseta X | Ignite Shop</title>
      </Head>
      <ImageContainer>
      
      </ImageContainer>

      <ProductDetails>
        <h1>Camiseta X</h1>
        <span>R$ 79,90</span>

        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque hic unde, ex maxime voluptatum eius cum veritatis praesentium quisquam quidem dolorem at, ipsum doloremque similique consectetur. Voluptatibus atque asperiores officia?</p>

        <button>
          Comprar agora
        </button>
      </ProductDetails>
    </ProductContainer>
  )
}