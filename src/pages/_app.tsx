import { AppProps } from 'next/app';
import Image from 'next/future/image';

import { globalStyles } from '../styles/global';
import { Container, Content, Header } from '../styles/pages/app';

import logoImg from '../assets/logo.svg';

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Content>
        <Header>
          <Image src={logoImg} alt="" />
        </Header>

        <Component {...pageProps} />
      </Content>
    </Container>
  ) 
}
