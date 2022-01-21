import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { colors, Container, Button } from 'ui';

const HeaderContainer = styled(Container)`
  display: flex;
  flex-direction: row nowrap;
  align-items: center;
  justify-content: space-between;
`;

const Header = styled.header`
  background: white;
  font-size: calc(10px + 2vmin);
  color: white;
  flex: 0 0 auto;
  border-bottom: 1px solid ${colors.headerBorder};
  border-top: 4px solid ${colors.primary};
  position: relative;
`;
Header.displayName = 'Header'

Header.defaultProps = {
  role: 'banner',
};

const HeaderLogo = styled(Link)`
  font-family: Montserrat, sans-serif;
  font-weight: 900;
  font-size: 32px;
  background: ${colors.primary};
  background: linear-gradient(180deg, ${colors.primary} 0%, ${colors.primaryDarker} 100%);
  -webkit-background-clip: text;
  background-clip: text;
  text-decoration: none;
  color: transparent;
`;

const HeaderNav = styled.nav`
  display: flex;
  flex-flow: row;
  align-items: stretch;
  margin: 0;

  a {
    display: block;
    flex: 1 0 auto;
    text-decoration: none;
    color: ${colors.headerLink};
    padding: 30px 20px;
    transition: all 150ms;
    font-size: 1rem;

    &:hover,
    &:active {
      color: ${colors.headerLinkHover};
      background: ${colors.headerLinkBgHover};
    }
  }
`;

export const Navigation: React.FC = () => {
  return <Header>
    <HeaderContainer>
      <HeaderLogo to="/" data-testid="link-app-logo">Training</HeaderLogo>
      <HeaderNav>
        <Link to="/authorize-device" data-testid="link-authorize-device">Authorize Device</Link>
        <Link to="/change-limits" data-testid="link-change-limits">Change Limits</Link>
      </HeaderNav>
    </HeaderContainer>
  </Header>
}
