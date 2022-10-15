import { useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/future/image';
import Stripe from 'stripe';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { Handbag } from 'phosphor-react';

import { stripe } from '../lib/stripe';

import { HomeContainer, Product, ArrowLeft, ArrowRight } from '../styles/pages/home';

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
  }[]
}

export default function Home({ products }: HomeProps) {
  const [current, setCurrent] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      origin: 'center',
      perView: 2,
      spacing: 48,
    },
    breakpoints: {
      '(max-width: 768px)': {
        slides: {
          perView: 1,
          spacing: 24,
        },
      },
    },

    animationEnded(event) {
      setCurrent(event.track.details.abs);

      event.container.children[event.track.details.abs].children[0].classList.add('active');
    },

    animationStarted(event) {
      event.container.children[event.track.details.abs].children[0].classList.remove('active');
    },
  })

  useEffect(() => instanceRef.current.container.children[0].children[0].classList.add('active'), [instanceRef]);
 
  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer>
        {current === 0 
          ?
            <></>
          :
            <ArrowLeft
              onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()}
            >
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M31.0607 7.93934C30.4749 7.35355 29.5251 7.35355 28.9393 7.93934L13.9393 22.9393C13.3536 23.5251 13.3536 24.4749 13.9393 25.0607L28.9393 40.0607C29.5251 40.6464 30.4749 40.6464 31.0607 40.0607C31.6464 39.4749 31.6464 38.5251 31.0607 37.9393L17.1213 24L31.0607 10.0607C31.6464 9.47487 31.6464 8.52513 31.0607 7.93934Z" fill="#C4C4CC"/>
              </svg>
            </ArrowLeft>
        }

        <div ref={sliderRef} className="keen-slider">
          {products.map(product => {
            return (
              <Link href={`/product/${product.id}`} key={product.id} prefetch={false}>
                <Product className="keen-slider__slide">
                  <Image src={product.imageUrl} width={520} height={480} alt="" />

                  <footer>
                    <div className="title">
                      <strong>{product.name}</strong>
                      <span>{product.price}</span>
                    </div>

                    <div className="icon">
                      <Handbag weight="bold" size={32} />
                    </div>
                  </footer>
                </Product> 
              </Link>
            )
          })}
        </div>

        {current === products.length - 1
          ?
            <></>
          :
            <ArrowRight
              onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}
            >
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M16.9393 7.93934C17.5251 7.35355 18.4749 7.35355 19.0607 7.93934L34.0607 22.9393C34.6464 23.5251 34.6464 24.4749 34.0607 25.0607L19.0607 40.0607C18.4749 40.6464 17.5251 40.6464 16.9393 40.0607C16.3536 39.4749 16.3536 38.5251 16.9393 37.9393L30.8787 24L16.9393 10.0607C16.3536 9.47487 16.3536 8.52513 16.9393 7.93934Z" fill="#C4C4CC"/>
              </svg>
            </ArrowRight>
        }
        
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount / 100),
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  }
}
