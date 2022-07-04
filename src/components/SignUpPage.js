import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";

import { ThreeDots } from 'react-loader-spinner';
import Logo from "../assets/logo.png";

export default function SignUpPage() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    function signUp() {
        const URL = "https://project-13-my-wallet.herokuapp.com/sign-up";

        if (user.password === user.confirmPassword) {
            setLoading(true);
            const promise = axios.post(URL, {
                name: user.name,
                email: user.email,
                password: user.password,
            });
            promise.then(response => {
                navigate("/");
            })
            promise.catch(err => {
                alert(err.response.data.message);
                setUser({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                });
                setLoading(false);
            })

        } else { alert("Preencha todos os campos.") }
    }

    function assembleForm() {
        if (!loading) {
            return (
                <>
                    <Input type="text" placeholder="Nome" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} ></Input>
                    <Input type="email" placeholder="E-mail" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} ></Input>
                    <Input type="password" placeholder="Senha" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} ></Input>
                    <Input type="password" placeholder="Confirme a senha" value={user.confirmPassword} onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })} ></Input>
                    <Button onClick={signUp}>Cadastrar</Button>
                </>
            )
        }
        else {
            return (
                <>
                    <Input type="text" placeholder="Nome" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} disabled={true}></Input>
                    <Input type="email" placeholder="E-mail" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} disabled={true}></Input>
                    <Input type="password" placeholder="Senha" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} disabled={true}></Input>
                    <Input type="password" placeholder="Confirme a senha" value={user.confirmPassword} onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })} ></Input>
                    <Button onClick={signUp} disabled={true}><ThreeDots width={51} height={13} color="#FFFFFF" /></Button>
                </>
            )
        }
    }

    return (
        <Container>
            <img src={Logo} alt=""></img>
            <h1>MyWallet</h1>

            {assembleForm()}

            <StyledLink to="/">
                Já tem uma conta? Entre agora!
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