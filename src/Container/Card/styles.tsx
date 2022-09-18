import styled from 'styled-components'
import BackFace from 'assets/images/backface.png'

export const CardWrapper = styled.div`
  border-radius: 5px;
  user-select: none;
`

export const CardFace = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 25px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.1);
  width: 100px;
  height: 150px;
  padding: 10px;

  &.back {
    background-image: url(${BackFace});
    background-size: 100% 100%;
    font-size: 16px;
    text-shadow: 0 0 10px #000;

    &:before {
      content: attr(data-index);
      color: white;
    }
  }

  & > div {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    font-size: 40px;
    font-weight: bold;
  }
`