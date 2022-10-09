import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/future/image';
import Head from 'next/head';
import Stripe from 'stripe';

import { stripe } from '../../lib/stripe';

import { ProductContainer, ImageContainer, ProductDetails, ImageContainerSkeleton, ProductDetailsSkeleton } from '../../styles/pages/product';

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
    defaultPriceId: string;
  }
}

export default function Product({ product }: ProductProps){
  const { isFallback } = useRouter()

  function handleBuyProduct() {
    console.log(product.defaultPriceId);
  }

  if (isFallback) {
    return (
      <ProductContainer>
        <Head>
          <title>Ignite Shop</title>
        </Head>

        <ImageContainerSkeleton />
        <ProductDetailsSkeleton>
          <div />
          <div />
          <div />
        </ProductDetailsSkeleton>
      </ProductContainer>
    )
  }

  return (
    <ProductContainer>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ImageContainer>
        <Image src={product.imageUrl} width={520} height={480} alt="" />
      </ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>
        <p>{product.description}</p>

        <button onClick={handleBuyProduct}>
          Comprar agora
        </button>
      </ProductDetails>
    </ProductContainer>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: 'prod_MZXF2CeU1LmfrO' } } 
    ],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price.unit_amount / 100),
        description: product.description,
        defaultPriceId: price.id,
      }
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}
