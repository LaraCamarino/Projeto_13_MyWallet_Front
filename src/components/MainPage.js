import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";

import Exit from "../assets/exit-icon.png"
import Plus from "../assets/plus-circle-outlined.png";
import Minus from "../assets/minus-circle-outlined.png";


export default function MainPage() {
    const navigate = useNavigate();

    const { userData } = useContext(UserContext);

    const URL = "https://project-13-my-wallet.herokuapp.com/transactions";
    const config = {
        headers: {
            "Authorization": `Bearer ${userData.token}`
        }
    };

    const [allTransactions, setAllTransactions] = useState([]);

    function getAllTransactions() {
        const promise = axios.get(URL, config);

        promise.then((response) => {
            setAllTransactions(response.data);
        });
        promise.catch((err) => alert(err.response.data));
    }

    useEffect(() => getAllTransactions(), []);

    function deleteTransaction(id) {
        if (window.confirm("Você deseja realmente excluir este registro?")) {
            const promise = axios.delete(`https://project-13-my-wallet.herokuapp.com/transactions/${id}`, config);
            promise.then(() => getAllTransactions());
            promise.catch((err) => alert(err.response.data));
        }
    }

    function assembleTransactions() {

        function Transaction({ id, day, description, value, type }) {
            value = value.toFixed(2);
            return (
                <MyTransaction>
                    <h1>{day}</h1>
                    <h2>{description}</h2>
                    <Number color={type}>{value}</Number>
                    <h4 onClick={() => deleteTransaction(id)}>X</h4>
                </MyTransaction>
            )
        }

        if (allTransactions.length === 0) {
            return (
                <BoxNoTransactions>Não há registros de entrada ou saída</BoxNoTransactions>
            )
        }
        return (
            <BoxMyTransactions>
                {
                    allTransactions.map((item, index) => <Transaction key={index} id={item._id} day={item.day} description={item.description} value={item.value} type={item.type} />)
                }
            </BoxMyTransactions>
        )
    }

    function assembleBalance() {
        const balance = addValues();

        function addValues() {
            let totalSum = 0;

            if (allTransactions.length > 0) {
                allTransactions.forEach((item) => {
                    if (item.type === "entrada") {
                        totalSum = totalSum + item.value;
                    }
                    else if (item.type === "saida") {
                        totalSum = totalSum - item.value;
                    }
                })
            }
            return totalSum.toFixed(2);
        }
        return (
            <Balance>
                <h1>SALDO</h1>
                <BalanceTotal color={balance}>{addValues()}</BalanceTotal>
            </Balance>
        )
    }

    return (
        <Container>
            <Header>
                <h1>Olá, {userData.name}</h1>
                <img src={Exit} alt="" onClick={() => navigate("/")}></img>
            </Header>

            <BoxTransactions>
                {assembleTransactions()}
                {assembleBalance()}
            </BoxTransactions>

            <Footer>
                <AddTransaction onClick={() => navigate("/new-deposit")}>
                    <img src={Plus} alt=""></img>
                    <h2>Nova entrada</h2>
                </AddTransaction>
                <AddTransaction onClick={() => navigate("/new-withdrawal")}>
                    <img src={Minus} alt=""></img>
                    <h2>Nova saída</h2>
                </AddTransaction>

            </Footer>


        </Container>
    )
}

const Container = styled.div`
    height: 100vh;
    padding: 30px 25px 15px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;   
`

const Header = styled.div`
    width: 326px;
    margin-bottom: 22px;
    display: flex;
    justify-content: space-between;
    align-items: center;  

    h1 {
        font-size: 26px;
        font-weight: 700;
        color: #FFFFFF;
    }
    img {
        width: 23px;
        height: 23px;
        color: #FFFFFF;
    }

`

const BoxTransactions = styled.div`
    width: 326px;
    height: 446px;
    border-radius: 5px;
    background-color: #FFFFFF;
    margin-bottom: 15px;
    padding: 23px 12px 10px;   
`

const BoxNoTransactions = styled.div`
    height: 390px;
    font-size: 20px;
    color: #868686;
    display: flex;
    align-items: center;
    text-align: center;
`

const BoxMyTransactions = styled.div`
    height: 390px;
    overflow: scroll;
`

const MyTransaction = styled.div`
    margin-bottom: 15px;
    font-size: 16px;
    display: flex;
    align-items: center;

    h1 {
        width: 48px;
        margin-right: 7px;
        color: #C6C6C6;
    }
    h2 {
        width: 195px;
        margin-right: 7px;
        color: #000000;
    }
    h4 {
        width: 10px;
        font-size: 15px;
        color: #C6C6C6;
    }
`

const Number = styled.p`
    width: 65px;
    color: ${props => props.color === "entrada" ? "#03AC00" : "#C70000"}; 
    display: flex;
    justify-content: flex-end;
    margin-right: 10px;
`

const Balance = styled.div`
    width: 300px;
    margin-top: 7px;
    display: flex;
    justify-content: space-between;
    
    h1 {
        font-size: 17px;
        font-weight: 700;
        color: #000000;
    }
`

const BalanceTotal = styled.p`
    font-size: 17px;
    color: ${props => props.color >= 0 ? "#03AC00" : "#C70000"};
`

const Footer = styled.div`
    width: 326px;
    display: flex;
    justify-content: space-between;

    div {
        width: 155px;
        height: 114px;
        border-radius: 5px;
        background-color: #A328D6;
        color: #FFFFFF;
        font-size: 17px;
        font-weight: 700;
        padding: 10px;
    }
    ion-icons {
        width: 21px;
        height: 21px;
        color: #FFFFFF;
    }
`

const AddTransaction = styled.div`
    width: 155px;
    height: 114px;
    border-radius: 5px;
    background-color: #A328D6;
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    img {
        width: 21px;
        height: 21px;
        color: #FFFFFF;
        margin-bottom: 32px;
    }
    h2 {
        font-size: 17px;
        font-weight: 700;
        color: #FFFFFF;
    }
`