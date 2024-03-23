import React, { useState } from "react";
import { format } from "date-fns";
import Image from "next/image";

import {
  ProjectContainer,
  TableContainer,
  Pesquisar,
  PesquisarSelect,
  Table,
  Tbody,
  Td,
  Th,
  Theader,
  Trbody,
  SubContainer,
} from "./styles";

import IconDonwload from "@/assets/icon-download.svg";
import IconEdit from "@/assets/icon-edit.svg";
import IconVisibility from "@/assets/icon-visibility.svg";
import IconVisibilityOff from "@/assets/icon-visibility-off.svg";
import IconDelete from "@/assets/icon-delete.svg";
import { Button } from "@/components/Button";

import { Modal } from "@/components/Modal";

export default function Project() {
  const projetosMock = [
    {
      autor: "John Doe",
      nome: "Projeto A",
      data_inicio: "2022-01-01",
      razao_social: "Empresa XYZ",
      cnpj: "123.456.789/0001-01",
      ativo: "true",
    },
    {
      autor: "Jane Doe",
      nome: "Projeto B",
      data_inicio: "2022-02-01",
      razao_social: "Empresa ABC",
      cnpj: "987.654.321/0001-02",
      ativo: "false",
    },
    {
      autor: "Bob Johnson",
      nome: "Projeto C",
      data_inicio: "2022-03-01",
      razao_social: "Empresa 123",
      cnpj: "456.789.012/0001-03",
      ativo: "true",
    },
    {
      autor: "Alice Smith",
      nome: "Projeto D",
      data_inicio: "2022-04-01",
      razao_social: "Empresa XYZ",
      cnpj: "111.222.333/0001-04",
      ativo: "false",
    },
  ];

  //Delete
  const handleDelete = (id) => {};

  // Modal
  const [isOpenDownload, setIsOpenDownload] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenVisibility, setIsOpenVisibility] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  // Filtragem de projetos
  const [filter, setFilter] = useState({
    autor: "",
    nome: "",
    data_inicio: "",
    razao_social: "",
    cnpj: "",
    ativo: "",
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

  const filteredProjetos = projetosMock?.filter((p) => {
    return (
      (filter.autor === "" ||
        p.autor.toLowerCase().includes(filter.autor.toLowerCase())) &&
      (filter.nome === "" ||
        p.nome.toLowerCase().includes(filter.nome.toLowerCase())) &&
      (filter.data_inicio === "" ||
        p.data_inicio.includes(filter.data_inicio)) &&
      (filter.razao_social === "" ||
        p.razao_social
          .toLowerCase()
          .includes(filter.razao_social.toLowerCase())) &&
      (filter.cnpj === "" || p.cnpj.includes(filter.cnpj)) &&
      (filter.ativo === "" || p.ativo.toString() === filter.ativo)
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
    <ProjectContainer>
      <TableContainer>
        <Table>
          <caption>Projetos</caption>
          <Theader>
            <tr>
              {renderPesquisaInput("Autor", "autor", "text", filter.autor)}
              {renderPesquisaInput("Nome", "nome", "text", filter.nome)}
              {renderPesquisaInput(
                "Data Início",
                "data_inicio",
                "text",
                filter.data_inicio
              )}
              {renderPesquisaInput(
                "Razão Social",
                "razao_social",
                "text",
                filter.razao_social
              )}
              {renderPesquisaInput("CNPJ", "cnpj", "text", filter.cnpj)}
              <Th>
                <PesquisarSelect
                  placeholder="Ativo"
                  name="ativo"
                  as="select"
                  value={filter.ativo}
                  onChange={handleInputValueChange("ativo")}
                >
                  <option value="">Todos</option>
                  <option value="true">Ativo</option>
                  <option value="false">Inativo</option>
                </PesquisarSelect>
              </Th>
              <Th></Th>
              <Th></Th>
              <Th></Th>
              <Th></Th>
            </tr>
          </Theader>
          <Tbody>
            {filteredProjetos?.map((p, i) => (
              <Trbody key={i}>
                <Td>{p.autor}</Td>
                <Td>{p.nome}</Td>
                <Td>
                  {p.data_inicio
                    ? format(new Date(p.data_inicio), "dd/MM/yyyy")
                    : ""}
                </Td>
                <Td>{p.razao_social}</Td>
                <Td>{p.cnpj}</Td>
                <Td>{p.ativo.toString()}</Td>
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
                  {p.ativo === "true" ? (
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
        <Button type="button" text="Voltar" />
        <Button type="button" text="Novo Projeto" />
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
