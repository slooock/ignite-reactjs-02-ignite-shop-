import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/future/image';
import { keyframes } from '@stitches/react';
import { Handbag } from 'phosphor-react';

import { CartShopping } from '../CartShopping';
import { CartShoppingContext } from '../../contexts/CartShoppingContext';

import { HeaderContainer, ShoppingCartButton } from './styles';

import logoImg from '../../assets/logo.svg';

export function Header() {
  const [cartShoppingIsOpen, setCartShoppingIsOpen] = useState(false)
  const [aimation, setAnimation] = useState('')
  
  const { cartShopping } = useContext(CartShoppingContext)

  const { pathname } = useRouter();

  const openAnimation = keyframes({
    '0%': { transform: 'translateX(100%)' },
    '100%': { transform: 'translateX(0%)' },
  });
    
  const closeAnimation = keyframes({
    '0%': { transform: 'translateX(0%)' },
    '100%': { transform: 'translateX(100%)' },
  });

  function openCartShopping() {
    setAnimation(`${openAnimation} 200ms`)

    setCartShoppingIsOpen(true)
  }

  function closeCartShopping() {
    setAnimation(`${closeAnimation} 200ms`)

    setTimeout(() => {
      setCartShoppingIsOpen(false)
    }, 200)
  }

  if(pathname === '/success') {
    return (
      <HeaderContainer
        style={{
          justifyContent: 'center',
        }}
      >
        <Link href="/">
          <Image src={logoImg} alt="" />
        </Link>
      </HeaderContainer>
    )
  }

  return (
    <HeaderContainer>
      <Link href="/">
        <Image src={logoImg} alt="" />
      </Link>
      
      <ShoppingCartButton
        onClick={openCartShopping}
      >
        {cartShopping.length > 0 && <span>{cartShopping.length}</span>}

        <Handbag weight="bold" size={24} />
      </ShoppingCartButton>

      {cartShoppingIsOpen &&
        <CartShopping 
          styles={{ animation: `${aimation}` }}
          closeCartShopping={closeCartShopping}
        />
      }
    </HeaderContainer>
  )
}
