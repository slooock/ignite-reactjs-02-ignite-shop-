import { styled } from '..';

export const Container = styled('div', {
  display: 'flex',
  alignItems: 'center',
  height: '100vh',

  '@bp': {
    height: 'auto',
  },
})

export const Content = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  width: '100%',
  
  '@bp': {
    paddingInline: '2rem',
  },
})

export const Header = styled('header', {
  width: '100%',
  maxWidth: 1180,
  marginInline: 'auto',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  '@bp': {
    marginTop: '2rem',
  },
})

export const ShoppingCartButton = styled('button', {
  position: 'relative',
  width: '3rem',
  height: '3rem',
  border: 0,
  borderRadius: 6,
  padding: '.75rem',
  
  cursor: 'pointer',
  background: '$gray800',
  
  span: {
    position: 'absolute',
    boxSizing: 'content-box',
    top: '-20%',
    right: '-20%',
    
    width: '1.5rem',
    height: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    
    color: '$white',
    fontWeight: 'bold',
    fontSize: '.875rem',
    borderRadius: '50%',
    border: '3px solid $gray900',
    background: '$green500',
  },

  '&:hover': {
    svg: {
      path: {
        fill: '$gray300',
      },
    },
  },
})
