import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import styled from "styled-components";

import UserContext from "../contexts/UserContext";

import { ThreeDots } from 'react-loader-spinner';
import Logo from "../assets/logo.png";

export default function LoginPage() {
    const navigate = useNavigate();
    const { setUserData } = useContext(UserContext);

    const [loading, setLoading] = useState(false);
    const [login, setLogin] = useState({
        email: "",
        password: ""
    });

    function signIn() {
        const URL = "https://project-13-my-wallet.herokuapp.com/sign-in";
        
        setLoading(true);
        const promise = axios.post(URL, {
            email: login.email,
            password: login.password
        });

        promise.then(response => {
            setUserData(response.data);
            navigate("/main-page");
        })

        promise.catch(err => {
            alert(err.response.data);
            setLogin({
                email: "",
                password: ""
            });
            setLoading(false);
        })
    }

    function assembleForm() {
        if (!loading) {
            return (
                <>
                    <Input type="email" placeholder="E-mail" value={login.email} onChange={(e) => setLogin({ ...login, email: e.target.value })} ></Input>
                    <Input type="password" placeholder="Senha" value={login.password} onChange={(e) => setLogin({ ...login, password: e.target.value })}></Input>
                    <Button onClick={signIn}>Entrar</Button>
                </>
            )
        }
        else {
            return (
                <>
                    <Input type="email" placeholder="E-mail" value={login.email} onChange={(e) => setLogin({ ...login, email: e.target.value })} disabled={true} ></Input>
                    <Input type="password" placeholder="Senha" value={login.password} onChange={(e) => setLogin({ ...login, password: e.target.value })} disabled={true} ></Input>
                    <Button onClick={signIn} disabled={true}><ThreeDots width={51} height={13} color="#FFFFFF" /></Button>
                </>
            )
        }
    }

    return (
        <Container>
            <img src={Logo} alt=""></img>
            <h1>MyWallet</h1>

            {assembleForm()}

            <StyledLink to="/sign-up">
                Primeira vez? Cadastre-se!
            </StyledLink>
        </Container>
    )
}

const Container = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
        width: 120px;
        height: 100px;
        margin-bottom: 5px;
    }
    h1 {
        font-family: 'Saira Stencil One', cursive;
        font-size: 32px;
        color: #FFFFFF;
        margin-bottom: 35px;
    }
`

const Input = styled.input`
    width: 326px;
    height: 58px;
    border-radius: 5px;
    border: 0px;   
    padding: 10px;
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
    margin-bottom: 44px;
    display: flex;
    justify-content: center;
    align-items: center;    
`

const StyledLink = styled(Link)`
    font-size: 15px;
    font-weight: 700;
    color: #FFFFFF;
    text-decoration: none;
`