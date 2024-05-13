import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import {
  ContainerButton,
  FormContainer,
  ProfileContainer,
  ProfileSubContainer,
} from "../../styles/pages/profile/style";

import {
  getUserDataFromFirestore,
  updateUserDataInFirestore,
} from "@/service/firebase";

import { useForm } from "@/hooks/useForm";
import { UserContext } from "@/context/UserContext";

import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

import IconLogo from "../../assets/icon-logo.png";

export default function Profile() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState(null);

  const { data, login } = useContext(UserContext);

  const name = useForm("");
  const email_contact = useForm("email");
  const name_contact = useForm("");
  const cep = useForm("cep");
  const number = useForm("");
  const street = useForm("");
  const neighborhood = useForm("");
  const city = useForm("");

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    if (
      name.validation() &&
      email_contact.validation() &&
      name_contact.validation() &&
      cep.validation() &&
      number.validation() &&
      street.validation() &&
      neighborhood.validation() &&
      city.validation()
    ) {
      await updateUserDataInFirestore(data.uid, {
        name: name.value,
        name_contact: name_contact.value,
        email_contact: email_contact.value,
        cep: cep.value,
        number: number.value,
        street: street.value,
        neighborhood: neighborhood.value,
        city: city.value,
      });
    }
    setLoading(false);
  }

  async function fetchData() {
    setLoading(true);
    if (data) {
      const userDataFromFirestore = await getUserDataFromFirestore(data.uid);
      setUserData(userDataFromFirestore);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (!login) {
      router.push("/auth");
    }
    fetchData();
  }, [data]);

  useEffect(() => {
    if (userData) {
      setLoading(true);
      name.setValue(userData.name);
      name_contact.setValue(userData.name_contact);
      email_contact.setValue(userData.email_contact);
      cep.setValue(userData.cep);
      number.setValue(userData.number);
      street.setValue(userData.street);
      neighborhood.setValue(userData.neighborhood);
      city.setValue(userData.city);
      setLoading(false);
    }
  }, [userData]);

  return (
    <ProfileContainer className="animeLeft">
      <FormContainer onSubmit={handleSubmit}>
        <ProfileSubContainer>
          <Image src={IconLogo} alt="ErgoViewer" width={60} height={60} />
          <div>
            <label>Nome</label>
            <Input type="text" {...name} />
          </div>
        </ProfileSubContainer>
        <h2>Contato</h2>
        <ProfileSubContainer>
          <lable>Nome do Contato</lable>
          <Input type="text" {...name_contact} />
        </ProfileSubContainer>
        <ProfileSubContainer>
          <lable>Email de Contato</lable>
          <Input type="email" {...email_contact} />
        </ProfileSubContainer>
        <h2>Endereço</h2>
        <ProfileSubContainer>
          <lable>Cep</lable>
          <Input type="text" {...cep} />
        </ProfileSubContainer>
        <ProfileSubContainer>
          <lable>Número</lable>
          <Input type="text" {...number} />
        </ProfileSubContainer>
        <ProfileSubContainer>
          <lable>Rua</lable>
          <Input type="text" {...street} />
        </ProfileSubContainer>
        <ProfileSubContainer>
          <lable>Bairro</lable>
          <Input type="text" {...neighborhood} />
        </ProfileSubContainer>
        <ProfileSubContainer>
          <lable>Cidade</lable>
          <Input type="text" {...city} />
        </ProfileSubContainer>
        <ContainerButton>
          <Button
            type="button"
            text="Voltar"
            disabled={loading}
            onClick={() => {
              router.back();
            }}
          />
          <Button type="submit" disabled={loading} text="Atualizar" />
        </ContainerButton>
      </FormContainer>
    </ProfileContainer>
  );
}
