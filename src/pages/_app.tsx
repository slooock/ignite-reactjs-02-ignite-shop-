import { AppProps } from 'next/app';

import { CartShoppingContextProvider } from '../contexts/CartShoppingContext';
import { Header } from '../components/Header';

import { globalStyles } from '../styles/global';
import { Container, Content } from '../styles/pages/app';

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartShoppingContextProvider>
      <Container>
        <Content>
          <Header /> 
          <Component {...pageProps} />
        </Content>
      </Container>
    </CartShoppingContextProvider>
  ) 
}
