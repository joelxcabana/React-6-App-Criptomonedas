import React,{useEffect,useState} from 'react';
import styled from 'styled-components';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import axios from 'axios';
import Error from './Error';
import PropTypes from 'prop-types';

const Boton = styled.input`
margin-top: 20px;
font-weight: bold;
font-size: 20px;
padding: 10px;
background-color: #66a2fe;
border: none;
width: 100%;
border-radius: 10px;
color: #fff;
transition: background-color .3s ease;

&:hover{
    background-color: #326ac0;
    cursor: pointer;
}
`;

const Formluario = ({setMoneda,setCriptomoneda}) => {

    const [listaCripto,setListaCripto] = useState([]);
    const [error,setError] = useState(false);

    const MONEDAS = [
        { codigo:'USD',nombre:'Dolar de Estado Unidos' },
        { codigo:'ARG',nombre:'Peso Argentino' },
        { codigo:'EUR',nombre:'Euro' },
        { codigo:'MXN',nombre:'Peso Mexicano' },
        { codigo:'GBP',nombre:'Libra Esterlina' }
    ]

    //utilizar useMoneda
    const [moneda,SelectMoneda] = useMoneda('Elige tu moneda','',MONEDAS);
    //uitilizar useCriptomoneda
    const [criptomoneda,SelectCripto] = useCriptomoneda('Elige una criptomoneda','',listaCripto);

    //ejecutar llamado al api
    useEffect(()=>{
        const consultarApi = async () => {
            const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;
            const resultado = await axios.get(url);
            setListaCripto(resultado.data.Data);
        }
        consultarApi();
    },[])

    //cuando el usuario hace submit
    const cotizarMoneda = e =>{
        e.preventDefault();

        //validar si ambos campos estan llenos
        if(moneda.trim() === '' || criptomoneda.trim() === ''){
            setError(true);
            return;
        }
        setError(false);
        //pasar datos al componente principal
        setMoneda(moneda);
        setCriptomoneda(criptomoneda);

    }
    return ( 
       <form
        onSubmit={cotizarMoneda}
       >
        {error ? <Error mensaje="Todos los campos son obligatorios"/>: null }
        <SelectMoneda/>
        <SelectCripto/>
       <Boton
        type="submit"
        value="Calcular"
       />
       </form>
     );
}

Formluario.propTypes = {
    setMoneda : PropTypes.func.isRequired,
    setCriptomoneda : PropTypes.func.isRequired
}

 
export default Formluario;