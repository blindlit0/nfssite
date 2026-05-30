
import React from 'react';
import styled from 'styled-components';

interface NavButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const NavButton = ({ children, onClick }: NavButtonProps) => {
  return (
    <StyledWrapper onClick={onClick}>
      <button className="btn2">
        <span className="spn2">{children}</span>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .btn2 {
    position: relative;
    display: inline-block;
    padding: 5px 15px;
    border: 2px solid #fefefe;
    text-transform: uppercase;
    color: #fefefe;
    text-decoration: none;
    font-weight: 500;
    font-size: 12px;
    transition: 0.3s;
    background-color: transparent;
    cursor: pointer;
  }

  .btn2::before {
    content: "";
    position: absolute;
    top: -2px;
    left: -2px;
    width: calc(100% + 6px);
    height: calc(100% + 2px);
    background-color: #212121;
    transition: 0.3s ease-out;
    transform: scaleY(1);
  }

  .btn2::after {
    content: "";
    position: absolute;
    top: -2px;
    left: -2px;
    width: calc(100% + 4px);
    height: calc(100% - 50px);
    background-color: #212121;
    transition: 0.3s ease-out;
    transform: scaleY(1);
  }

  .btn2:hover::before {
    transform: translateY(-25px);
    height: 0;
  }

  .btn2:hover::after {
    transform: scaleX(0);
    transition-delay: 0.15s;
  }

  .btn2:hover {
    border: 2px solid #fefefe;
  }

  .btn2 .spn2 {
    position: relative;
    z-index: 3;
    text-decoration: none;
    border: none;
    background-color: transparent;
  }`;

export default NavButton;
