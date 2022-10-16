import { styled } from '..';

export const Container = styled('div', {
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  
  height: '100vh',
  maxWidth: 1440,
  marginInline: 'auto',

  '@media(max-width: 500px)': {
    paddingInline: '1rem',
  },
})

export const Content = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  width: '100%',
  height: '100%',
  maxHeight: 900,
})
