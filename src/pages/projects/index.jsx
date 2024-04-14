import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { format } from "date-fns";
import Image from "next/image";

import {
  ProjectContainer,
  TableContainer,
  Filter,
  Table,
  Tbody,
  Td,
  Th,
  Theader,
  Trbody,
  SubContainer,
} from "./styles";

import { UserContext } from "@/context/UserContext";
import {
  deleteProjectFirebase,
  downloadPdfFromStorage,
  getUserDataFromFirestore,
  listUserProjects,
  toggleProjectActiveStatus,
} from "@/service/firebase";

import { useForm } from "@/hooks/useForm";
import { useProjectFilter } from "@/hooks/useProjectFilter";

import { Modal } from "@/components/Modal";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

import IconDonwload from "@/assets/icon-download.svg";
import IconEdit from "@/assets/icon-edit.svg";
import IconVisibility from "@/assets/icon-visibility.svg";
import IconVisibilityOff from "@/assets/icon-visibility-off.svg";
import IconDelete from "@/assets/icon-delete.svg";

export default function Project() {
  const router = useRouter();

  const [user, setUser] = useState({});
  const [project, setProject] = useState({});
  const [projects, setProjects] = useState([]);

  const [edit, setEdit] = useState("");

  const { data, login } = useContext(UserContext);

  const admin_password = useForm("number");

  const [isOpenDownload, setIsOpenDownload] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenVisibility, setIsOpenVisibility] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const fetchData = async () => {
    try {
      if (!login) {
        router.push("/");
      } else {
        const userData = await getUserDataFromFirestore(data.uid);
        setUser(userData);
        const userProjects = await listUserProjects(data.uid);
        setProjects(userProjects);
      }
    } catch (error) {
      console.error("Erro ao carregar os projetos do usuário:", error);
    }
  };

  const initialFilter = {
    author: "",
    name: "",
    created_at: "",
    social_reason: "",
    cnpj: "",
    active: "",
  };

  // prettier-ignore
  const { filter, handleInputValueChange, filterProjects } = useProjectFilter(initialFilter,projects);
  const filteredProjects = filterProjects(projects);

  // async function handleDownloadClick(project) {
  //   if (project) {
  //     try {
  //       // Faz a solicitação para o endpoint do servidor
  //       const response = await fetch(
  //         `http://localhost:5000/download-pdf/${project.id}`
  //       );
  //       if (!response.ok) {
  //         throw new Error("Erro ao baixar o arquivo PDF.");
  //       }

  //       // Converte a resposta para um Blob
  //       const blob = await response.blob();

  //       // Cria um objeto URL para o Blob
  //       const blobURL = URL.createObjectURL(blob);

  //       // Cria um link de download
  //       const link = document.createElement("a");
  //       link.href = blobURL;
  //       link.download = `project_${project.id}_file.pdf`; // Nome do arquivo para download
  //       link.click();

  //       // Limpa o objeto URL após o download
  //       URL.revokeObjectURL(blobURL);
  //     } catch (error) {
  //       console.error("Erro ao baixar o arquivo PDF:", error);
  //     }
  //   }
  // }

  async function handleEditClick(project) {
    if (edit) {
      if (edit === "info") {
        router.push(`/edit-project/${project.id}`);
      } else if (edit === "content") {
        router.push(`/document/${project.id}`);
      }
    }
  }

  async function handleVisibilityClick(project) {
    if (data && user && admin_password.validation()) {
      const autorization = admin_password.value === user.admin_password;
      if (!autorization) {
        admin_password.setError("Senha inválida");
      } else if (project) {
        const change = await toggleProjectActiveStatus(data.uid, project.id);
        admin_password.setValue("");
        if (change) fetchData();
      }
    }
  }

  async function handleDeleteClick(project) {
    if (data && user && admin_password.validation()) {
      const autorization = admin_password.value === user.admin_password;
      if (!autorization) {
        admin_password.setError("Senha inválida");
      } else if (project) {
        const deleted = await deleteProjectFirebase(data.uid, project.id);
        admin_password.setValue("");
        if (deleted) fetchData();
      }
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ProjectContainer className="animeLeft">
      <TableContainer>
        <Table>
          <caption>Projetos</caption>
          <Theader>
            <tr>
              <th>
                <Filter
                  placeholder="Autor"
                  name="author"
                  type="text"
                  value={filter.author}
                  onChange={handleInputValueChange("author")}
                />
              </th>
              <th>
                <Filter
                  placeholder="Nome"
                  name="name"
                  type="text"
                  value={filter.name}
                  onChange={handleInputValueChange("name")}
                />
              </th>
              <th>
                <Filter
                  placeholder="Data Início"
                  name="created_at"
                  type="text"
                  value={filter.created_at}
                  onChange={handleInputValueChange("created_at")}
                />
              </th>
              <th>
                <Filter
                  placeholder="Razão Social"
                  name="social_reason"
                  type="text"
                  value={filter.social_reason}
                  onChange={handleInputValueChange("social_reason")}
                />
              </th>
              <th>
                <Filter
                  placeholder="CNPJ"
                  name="cnpj"
                  type="text"
                  value={filter.cnpj}
                  onChange={handleInputValueChange("cnpj")}
                />
              </th>
              <Th></Th>
              <Th></Th>
              <Th></Th>
              <Th></Th>
            </tr>
          </Theader>
          <Tbody>
            {filteredProjects?.map((p, i) => (
              <Trbody key={i}>
                <Td>{p.author}</Td>
                <Td>{p.name}</Td>
                <Td>{p.created_at}</Td>
                <Td>{p.social_reason}</Td>
                <Td>{p.cnpj}</Td>
                <Td>
                  <Image
                    src={IconDonwload}
                    alt="Download Projeto"
                    title="Download Projeto"
                    onClick={() => {
                      setProject(p);
                      setIsOpenDownload(!isOpenDownload);
                    }}
                  />
                </Td>
                <Td>
                  <Image
                    src={IconEdit}
                    alt="Editar Projeto"
                    title="Editar Projeto"
                    onClick={() => {
                      setProject(p);
                      setIsOpenEdit(!isOpenEdit);
                    }}
                  />
                </Td>
                <Td>
                  {p.active === true ? (
                    <Image
                      src={IconVisibility}
                      alt="Projeto Visível"
                      title="Projeto Visível"
                      onClick={() => {
                        setProject(p);
                        setIsOpenVisibility(!isOpenVisibility);
                      }}
                    />
                  ) : (
                    <Image
                      src={IconVisibilityOff}
                      alt="Projeto não Visível"
                      title="Projeto não Visível"
                      onClick={() => {
                        setProject(p);
                        setIsOpenVisibility(!isOpenVisibility);
                      }}
                    />
                  )}
                </Td>
                <Td>
                  <Image
                    src={IconDelete}
                    alt="Deletar Projeto"
                    title="Deletar Projeto"
                    onClick={() => {
                      setProject(p);
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
        onSubmit={() => {
          // handleDownloadClick(project);
          setIsOpenDownload(!isOpenDownload);
        }}
      >
        <h1>Download Projeto</h1>
        {project.content ? (
          <>
            <p>Tem certeza que deseja baixar este projeto?</p>
            <button type="submit">Download</button>
          </>
        ) : (
          <p>O projeto não possui conteúdo.</p>
        )}
      </Modal>
      <Modal
        isOpen={isOpenEdit}
        onClose={() => {
          setIsOpenEdit(!isOpenEdit);
        }}
        onSubmit={() => {
          handleEditClick(project);
          setIsOpenEdit(!isOpenEdit);
        }}
      >
        <h1>Informações do Projeto</h1>
        <h3>Nome</h3>
        <span>{project.name}</span>
        <h3>Descrição</h3>
        <span>{project.description}</span>
        <h3>Razão Social</h3>
        <span>{project.social_reason}</span>
        <h3>CNPJ</h3>
        <span>{project.cnpj}</span>
        <h3>Data Início</h3>
        <span>{project.created_at}</span>
        <h3>Autor</h3>
        <span>{project.author}</span>
        <button type="submit" onClick={() => setEdit("info")}>
          Editar Informações
        </button>
        <button type="submit" onClick={() => setEdit("content")}>
          Criar/Editar Contéudo
        </button>
      </Modal>
      <Modal
        isOpen={isOpenVisibility}
        onClose={() => {
          setIsOpenVisibility(!isOpenVisibility);
        }}
        onSubmit={() => {
          handleVisibilityClick(project);
          setIsOpenVisibility(!isOpenVisibility);
        }}
      >
        <h1>Visibilidade do Projeto</h1>
        <p>Tem certeza que deseja alterar a visibilidade deste projeto?</p>
        <div>
          <Input
            type="password"
            placeholder="Senha de Admin"
            {...admin_password}
          />
        </div>
        {project.active === true ? (
          <button type="submit">Desativar</button>
        ) : (
          <button type="submit">Ativar</button>
        )}
      </Modal>
      <Modal
        isOpen={isOpenDelete}
        onClose={() => {
          setIsOpenDelete(!isOpenDelete);
        }}
        onSubmit={() => {
          handleDeleteClick(project);
          setIsOpenDelete(!isOpenDelete);
        }}
      >
        <h1>Deletar Projeto</h1>
        <p>Tem certeza que deseja deletar este projeto?</p>
        <div>
          <Input
            type="password"
            placeholder="Senha de Admin"
            {...admin_password}
          />
        </div>
        <button type="submit">Deletar</button>
      </Modal>
    </ProjectContainer>
  );
}
