import React, { useCallback, useRef } from 'react';
import { 
  FiArrowLeft, FiMail, FiLock, FiUser 
} from 'react-icons/fi'
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import logoImg from '../../assets/logo.svg';
import getValidationErrors from '../../utils/getValidationErros';
import { Link } from 'react-router-dom';

import { Container, Content, Background } from './styles';

import Input from '../../components/input';
import Button from '../../components/button';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
    const handleSubmit = useCallback (async (data: object) => {
      try { 
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string()
            .min(6, 'No minimo 6 digitos')
        });
        await schema.validate(data, {
          abortEarly: false,
        });
      } catch (error) {
        //console.log(error);
        const errors = getValidationErrors(error);
        formRef.current?.setErrors(errors);
      }
   }, []);
 return (
    <Container>
        <Background />
        <Content>
          <img src={logoImg} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1> Faça seu cadastro </h1>

            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input name="password" icon={FiLock} type="password" placeholder="Senha" />
            <Button type="submit"> Cadastrar </Button>
          </Form>
          <Link to='/'>
            <FiArrowLeft />
            Voltar para login
          </Link>
        </Content>
    </Container>
  );
} 

export default SignUp