import { Button, HamburgerLine } from './styles';

export const Hamburger = ({ isOpen, onClick, ariaLabel }) => (
  <Button aria-label={ariaLabel} onClick={onClick}>
    <HamburgerLine isOpen={isOpen} />
    <HamburgerLine isOpen={isOpen} />
    <HamburgerLine isOpen={isOpen} />
  </Button>
);
