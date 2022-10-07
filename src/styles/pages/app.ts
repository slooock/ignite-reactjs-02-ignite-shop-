import { styled } from '..';

export const Container = styled('div', {
  display: 'flex',
  alignItems: 'center',
  padding: '1rem',
  height: '100vh',
})

export const Content = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  maxHeight: 736,
  gap: '2rem',
  width: '100%',
})

export const Header = styled('header', {
  width: '100%',
  maxWidth: 1180,
  marginInline: 'auto',
})
