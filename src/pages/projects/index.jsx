import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { format } from "date-fns";
import Image from "next/image";

import {
  ProjectContainer,
  TableContainer,
  Pesquisar,
  Table,
  Tbody,
  Td,
  Th,
  Theader,
  Trbody,
  SubContainer,
} from "./styles";

import { UserContext } from "@/context/UserContext";
import { listUserProjects } from "@/service/firebase";

import { Modal } from "@/components/Modal";
import { Button } from "@/components/Button";

import IconDonwload from "@/assets/icon-download.svg";
import IconEdit from "@/assets/icon-edit.svg";
import IconVisibility from "@/assets/icon-visibility.svg";
import IconVisibilityOff from "@/assets/icon-visibility-off.svg";
import IconDelete from "@/assets/icon-delete.svg";

export default function Project() {
  const router = useRouter();
  const [projects, setProjects] = useState([]);

  const { data, login } = useContext(UserContext);

  // Modal
  const [isOpenDownload, setIsOpenDownload] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenVisibility, setIsOpenVisibility] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!login) {
          router.push("/");
        } else {
          const userProjects = await listUserProjects(data.uid);
          setProjects(userProjects);
        }
      } catch (error) {
        console.error("Erro ao carregar os projetos do usuário:", error);
      }
    };

    fetchData();
  }, []);

  const projetosMock = [
    {
      author: "John Doe",
      name: "Projeto A",
      created_at: "2022-01-01",
      social_reason: "Empresa XYZ",
      cnpj: "123.456.789/0001-01",
      active: "true",
    },
    {
      author: "Jane Doe",
      name: "Projeto B",
      created_at: "2022-02-01",
      social_reason: "Empresa ABC",
      cnpj: "987.654.321/0001-02",
      active: "false",
    },
    {
      author: "Bob Johnson",
      name: "Projeto C",
      created_at: "2022-03-01",
      social_reason: "Empresa 123",
      cnpj: "456.789.012/0001-03",
      active: "true",
    },
    {
      author: "Alice Smith",
      name: "Projeto D",
      created_at: "2022-04-01",
      social_reason: "Empresa XYZ",
      cnpj: "111.222.333/0001-04",
      active: "false",
    },
  ];

  // Filtragem de projetos
  const [filter, setFilter] = useState({
    author: "",
    name: "",
    created_at: "",
    social_reason: "",
    cnpj: "",
    active: "",
  });

  const handleInputChange = (columnName, value) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [columnName]: value,
    }));
  };

  const handleInputValueChange = (columnName) => (e) => {
    const { value } = e.target;
    handleInputChange(columnName, value);
  };

  const filteredProjetos = projects?.filter((p) => {
    return (
      (filter.author === "" ||
        p.author.toLowerCase().includes(filter.author.toLowerCase())) &&
      (filter.name === "" ||
        p.name.toLowerCase().includes(filter.name.toLowerCase())) &&
      (filter.created_at === "" || p.created_at.includes(filter.created_at)) &&
      (filter.social_reason === "" ||
        p.social_reason
          .toLowerCase()
          .includes(filter.social_reason.toLowerCase())) &&
      (filter.cnpj === "" || p.cnpj.includes(filter.cnpj)) &&
      (filter.active === "" || p.active.toString() === filter.active)
    );
  });

  const renderPesquisaInput = (placeholder, name, type, value) => (
    <Th>
      <Pesquisar
        placeholder={placeholder}
        name={name}
        type={type}
        value={value}
        onChange={handleInputValueChange(name)}
      />
    </Th>
  );

  return (
    <ProjectContainer className="animeLeft">
      <TableContainer>
        <Table>
          <caption>Projetos</caption>
          <Theader>
            <tr>
              {renderPesquisaInput("Autor", "author", "text", filter.author)}
              {renderPesquisaInput("Nome", "name", "text", filter.name)}
              {renderPesquisaInput(
                "Data Início",
                "created_at",
                "text",
                filter.created_at
              )}
              {renderPesquisaInput(
                "Razão Social",
                "social_reason",
                "text",
                filter.social_reason
              )}
              {renderPesquisaInput("CNPJ", "cnpj", "text", filter.cnpj)}
              <Th></Th>
              <Th></Th>
              <Th></Th>
              <Th></Th>
            </tr>
          </Theader>
          <Tbody>
            {filteredProjetos?.map((p, i) => (
              <Trbody key={i}>
                <Td>{p.author}</Td>
                <Td>{p.name}</Td>
                <Td>
                  {p.created_at
                    ? format(new Date(p.created_at), "dd/MM/yyyy")
                    : ""}
                </Td>
                <Td>{p.social_reason}</Td>
                <Td>{p.cnpj}</Td>
                <Td>
                  <Image
                    src={IconDonwload}
                    alt="Download Projeto"
                    onClick={() => {
                      setIsOpenDownload(!isOpenDownload);
                    }}
                  />
                </Td>
                <Td>
                  <Image
                    src={IconEdit}
                    alt="Editar Projeto"
                    onClick={() => {
                      setIsOpenEdit(!isOpenEdit);
                    }}
                  />
                </Td>
                <Td>
                  {p.active === "true" ? (
                    <Image
                      src={IconVisibility}
                      alt="Projeto Visível"
                      onClick={() => {
                        setIsOpenVisibility(!isOpenVisibility);
                      }}
                    />
                  ) : (
                    <Image
                      src={IconVisibilityOff}
                      alt="Projeto não Visível"
                      onClick={() => {
                        setIsOpenVisibility(!isOpenVisibility);
                      }}
                    />
                  )}
                </Td>
                <Td>
                  <Image
                    src={IconDelete}
                    alt="Deletar Projeto"
                    onClick={() => {
                      setIsOpenDelete(!isOpenDelete);
                    }}
                  />
                </Td>
              </Trbody>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <SubContainer>
        <Button type="button" text="Voltar" onClick={() => router.back()} />
        <Button
          type="button"
          text="Novo Projeto"
          onClick={() => router.push("/register-project")}
        />
      </SubContainer>
      <Modal
        isOpen={isOpenDownload}
        onClose={() => {
          setIsOpenDownload(!isOpenDownload);
        }}
        onSubmit={() => {}}
      >
        <h1>Download Projeto</h1>
        <p>Tem certeza que deseja fazer o download deste projeto?</p>
      </Modal>
      <Modal
        isOpen={isOpenEdit}
        onClose={() => {
          setIsOpenEdit(!isOpenEdit);
        }}
        onSubmit={() => {}}
      >
        <h1>Editar Projeto</h1>
        <p>Tem certeza que deseja editar este projeto?</p>
      </Modal>
      <Modal
        isOpen={isOpenVisibility}
        onClose={() => {
          setIsOpenVisibility(!isOpenVisibility);
        }}
        onSubmit={() => {}}
      >
        <h1>Visibilidade do Projeto</h1>
        <p>Tem certeza que deseja alterar a visibilidade deste projeto?</p>
      </Modal>
      <Modal
        isOpen={isOpenDelete}
        onClose={() => {
          setIsOpenDelete(!isOpenDelete);
        }}
        onSubmit={() => {}}
      >
        <h1>Deletar Projeto</h1>
        <p>Tem certeza que deseja deletar este projeto?</p>
      </Modal>
    </ProjectContainer>
  );
}
