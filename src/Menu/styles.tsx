import styled from 'styled-components'

export const ToggleButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-bottom: 10px;
`

export const MenuWrapper = styled.div`
  background-color: #fff;
  border-left: 1px solid #f0f0f0;
  box-shadow: 0 2px 15px 0 #f0f0f0;
  padding: 8px;
  transition: .1s;
  width: 25px;
  position: relative;
  z-index: 999999999;

  ${ToggleButton} i {
    transition: .2s;
  }

  &.opened {
    width: 300px;

    ${ToggleButton} i {
      transform: rotate(180deg);
    }
  }

  hr {
    margin: 20px 0;
    border: none;
    border-bottom: 1px solid #d0d0d0;
  }
`

export const MenuOptionsWrapper = styled.div``

export const MenuInput = styled.input`
  box-sizing: border-box;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  padding: 8px;
  width: 100%;
`

export const MenuInputLabel = styled.label`
  display: block;
  margin-bottom: 15px;

  span {
    display: block;
    margin: 10px 0;
  }
`

export const MenuButton = styled.button`
  background-color: #f0f0f0;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  cursor: pointer;
  padding: 8px;
  width: 100%;
`
