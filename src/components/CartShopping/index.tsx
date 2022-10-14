import { useContext } from 'react';
import Image from 'next/future/image';
import { Minus, Plus, TrashSimple, X } from 'phosphor-react';

import { CartShoppingContext } from '../../contexts/CartShoppingContext';

import { CartShoppingContainer, CloseButton, Items, Item, PurchaseDetails, Actions } from './styles';

interface CartShoppingProps {
  styles: any;
  closeCartShopping: () => void;
}

export function CartShopping({ styles, closeCartShopping }: CartShoppingProps) {
  const { amount, cartShopping, removeItem, decreaseItemQuantity, increaseItemQuantity } = useContext(CartShoppingContext)

  return (
    <CartShoppingContainer style={styles}>
      <CloseButton
        onClick={closeCartShopping}
      >
        <X weight="bold" size={24} />
      </CloseButton>

      <h2>Sacola de compras</h2>

      <Items>
        {
          cartShopping.map(product => {
            return (
              <Item key={product.id}>
                <div className="image-container">
                  <Image src={product.imageUrl} width={100} height={100} alt="" />
                </div>
                <div className="info">
                  <div>
                    <span>{product.name}</span>
                    <strong>{product.price}</strong>
                  </div>
                  
                  <Actions>

                    <div className="quantity">
                      <button onClick={() => decreaseItemQuantity(product)}>
                        <Minus weight="bold" color="white" size={18} />
                      </button>

                      <span>{product.quantity}</span>

                      <button onClick={() => increaseItemQuantity(product)}>
                       <Plus weight="bold" color="white" size={18} />
                      </button>
                    </div>


                    <button 
                      className="remove"
                      onClick={() => removeItem(product)}
                    >
                      <TrashSimple weight="bold" color="white"  size={18} />
                      Remover
                    </button>
                  </Actions>
                </div>
              </Item>
            )
          })
        }
      </Items>

      <PurchaseDetails>
        <div>
          <p>Quantidade</p>
          <span>{cartShopping.length} items</span>
        </div>

        <div>
          <p>Valor total</p>
          <span>{amount}</span>
        </div>

        <button>Finalizar compra</button>
      </PurchaseDetails>
    </CartShoppingContainer>
  )
}
