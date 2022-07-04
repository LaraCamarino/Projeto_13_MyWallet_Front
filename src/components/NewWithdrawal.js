import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";

import { ThreeDots } from 'react-loader-spinner';

export default function NewWithdrawal() {
    const navigate = useNavigate();
    const { userData } = useContext(UserContext);

    const [loading, setLoading] = useState(false);
    const [transaction, setTransaction] = useState({
        value: "",
        description: "",
        type: "saida"
    });

    function assembleForm() {
        if (!loading) {
            return (
                <>
                    <Input type="number" placeholder="Valor" value={transaction.value} onChange={(e) => setTransaction({ ...transaction, value: parseFloat(e.target.value) })}></Input>
                    <Input type="text" placeholder="Descrição" value={transaction.description} onChange={(e) => setTransaction({ ...transaction, description: e.target.value })}></Input>
                    <Button onClick={sendForm}>Salvar saída</Button>
                </>
            )
        }
        else {
            return (
                <>
                    <Input type="number" placeholder="Valor" value={transaction.value} onChange={(e) => setTransaction({ ...transaction, value: e.target.value })} disabled={true}></Input>
                    <Input type="text" placeholder="Descrição" value={transaction.description} onChange={(e) => setTransaction({ ...transaction, description: e.target.value })} disabled={true}></Input>
                    <Button onClick={sendForm} disabled={true}><ThreeDots width={51} height={13} color="#FFFFFF"/></Button>
                </>
            )
        }
    }

    function sendForm() {
        const URL = "https://project-13-my-wallet.herokuapp.com/transactions";
        const config = {
            headers: {
                "Authorization": `Bearer ${userData.token}`
            }
        };

        setLoading(true);
        const promise = axios.post(URL, transaction, config);

        promise.then(response => {
            navigate("/main-page");
        });
        promise.catch(err => {
            alert(err.response.data);
            setTransaction({
                value: "",
                description: "",
                type: "saida"
            });
            setLoading(false);
        });
    }

    return (
        <Container>

            <Header>
                <h1>Nova saída</h1>
            </Header>

            {assembleForm()}

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
    margin-bottom: 40px;
    
    h1 {
        font-size: 26px;
        font-weight: 700;
        color: #FFFFFF;
    }
`

const Input = styled.input`
    width: 326px;
    height: 58px;
    border-radius: 5px;
    border: 0px;   
    padding: 15px;
    margin-bottom: 10px;
    font-size: 20px;
    background-color: ${props => props.disabled ? "#F2F2F2" : "#FFFFFF"};

    ::placeholder {
        color: #000000;
        font-size: 20px;
    }
`

const Button = styled.button`
    width: 326px;
    height: 46px;
    background-color: ${props => props.disabled ? "#A328D6" : "#48ac20"};
    border-radius: 5px;
    border: 0px;
    font-size: 20px;
    font-weight: 700;
    color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;    
`