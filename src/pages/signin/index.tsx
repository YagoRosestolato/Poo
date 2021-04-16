import React, { useRef, useCallback} from 'react';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErros'
import { useToast } from '../../hooks/toastContext';
import { Link } from 'react-router-dom';

import { Form } from '@unform/web';
import { AuthContext, useAuth } from '../../hooks/AuthContext';

import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import logoImg from '../../assets/logo.svg';
import { Container, Content, Background } from './styles';

import Input from '../../components/input';
import Button from '../../components/button';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const { signIn } = useAuth();
    const { addToast } = useToast();
   
    
    const handleSubmit = useCallback (async (data: SignInFormData) => {
      try { 
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatoria')
            
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
        }
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description:'Ocorreu um erro ao fazer login, cheque as credencias',
        });
      }   
   }, [signIn, addToast]);
   return(
    <Container>
        <Content>
          <img src={logoImg} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit}> 
            <h1> Faça seu Logon</h1>

            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input type ="password"name="password" icon={FiLock} placeholder="Senha" />
            <Button type="submit"> Entrar </Button>
            <a href="forgot">Esqueci minha senha</a>
          </Form>
          <Link to='/signUp'>
            <FiLogIn />
            Criar Conta
          </Link>
        </Content>
        <Background />
    </Container>
   );
}

export default SignIn;