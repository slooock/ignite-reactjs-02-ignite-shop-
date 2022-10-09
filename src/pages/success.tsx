import Link from 'next/link';

import { SuccessContainer, ImageContainer } from '../styles/pages/success';

export default function Success() {
  return (
    <SuccessContainer>
      <h1>Compra efetuada!</h1>

      <ImageContainer>
      </ImageContainer>

      <p>
        Uhuul <strong>Diego Fernandes</strong>, sua <strong>Camiseta Beyond the Limits</strong> já está a caminho da sua casa.
      </p>

      <Link href="/">
        <a>
          Voltar ao catálogo
        </a>
      </Link>
    </SuccessContainer>
  )
}
