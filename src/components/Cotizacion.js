import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ReasultadoDiv = styled.div`
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
`;

const Info = styled.p`
 font-size: 18px;

 span {
     font-weight: bold;
 }
`;

const Precio = styled.p`
 font-size: 30px;

 span{
 font-weight: bold;
 }
`;

const Cotizacion = ({resultado}) => {
    //validad que no llege vacio
    if(Object.keys(resultado).length === 0) return null;

    return ( 
        <ReasultadoDiv>
            <Precio>El precio es: <span>{resultado.PRICE}</span></Precio>
            <Info>Precio mas alto del dia: <span>{resultado.HIGHDAY}</span></Info>
            <Info>Precio mas bajo del dia : <span>{resultado.LOWDAY}</span></Info>
            <Info>Variacion ultimas 24hs: <span>{resultado.CHANGEPCT24HOUR}</span></Info>
            <Info>Ultima Actualizacion: <span>{resultado.LASTUPDATE}</span></Info>
        </ReasultadoDiv>
     );
}

Cotizacion.propTypes = {
    resultado : PropTypes.object.isRequired
}
 
export default Cotizacion;