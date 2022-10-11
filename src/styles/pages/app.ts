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

  '@bp': {
    marginTop: '2rem',
  },
})
