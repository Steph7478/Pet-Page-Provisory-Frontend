"use client";

import React, {useState, useMemo, useCallback} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {FaHeart, FaMapMarkerAlt, FaCalendarAlt, FaPlus} from "react-icons/fa";
import {toast} from "@/ui/CustomToaster";
import {PetInfos} from "@/api/dtos/pet.dto";
import Button from "@/ui/button";

import ProtectedRoute from "@/common/routes/ProtectedRoute";
import Image from "next/image";
import Modal from "@/components/Anunciante/modal";
import {
  listSectionVariants,
  detailSectionVariants,
  dogItemVariants,
  getDogItemTransition,
} from "@/ui/motionVariants";
import {usePetsByAdvertiser} from "@/api/services/user/useAnunciante";
import {isValidUrl} from "@/utils/isValidUrl";
import {
  useAllowAdoption,
  useDenyAdoption,
  useCancelAdoption,
} from "@/api/services/adoption/adoption";
import {useFormularioByPetId} from "@/api/services/formulario/useFormulario";
import {useFormularioByClientId} from "@/api/services/user/useAdotante";
import {usePetsByIds} from "@/api/services/pet/usePetInfo";

interface AdoptionPanelProps {
  type: "adopter" | "advertiser";
  userId: string;
}

const STATUS_ORDER = {pendente: 0, adotado: 1, disponivel: 2};

const AdoptionPanel: React.FC<AdoptionPanelProps> = ({type, userId}) => {
  const {data: form} = useFormularioByClientId(userId);
  const {data: dog} = usePetsByAdvertiser(userId);

  const [dogs, setDogs] = useState<PetInfos[]>([]);
  const [selectedDog, setSelectedDog] = useState<PetInfos | null>(null);

  const {mutate: allowAdoption, isPending: approving} = useAllowAdoption();
  const {mutate: denyAdoption, isPending: denying} = useDenyAdoption();
  const {mutate: cancelAdoption, isPending: cancelling} = useCancelAdoption();
  const [isOpen, setIsOpen] = useState(false);
  const {data: dogSelecionado} = useFormularioByPetId(selectedDog?.petId ?? "");

  const filteredForms = useMemo(() => {
    if (type === "adopter" && form) {
      const formArray = Array.isArray(form) ? form : [form];
      return formArray.filter((f) => String(f.clientId) === String(userId));
    }
    return [];
  }, [form, type, userId]);

  const petIds = useMemo(
    () => filteredForms.map((form) => form.petId),
    [filteredForms]
  );

  const {data: pets = []} = usePetsByIds(petIds);

  const sortedform = useMemo(() => {
    if (type === "adopter") {
      return [...pets].sort(
        (a, b) =>
          STATUS_ORDER[a.status as keyof typeof STATUS_ORDER] -
          STATUS_ORDER[b.status as keyof typeof STATUS_ORDER]
      );
    }

    if (type === "advertiser" && dog) {
      const sorted = [...dog].sort(
        (a, b) =>
          STATUS_ORDER[a.status as keyof typeof STATUS_ORDER] -
          STATUS_ORDER[b.status as keyof typeof STATUS_ORDER]
      );
      return sorted.filter((dog) => dog.ownerId === userId);
    }

    return [];
  }, [pets, dog, type, userId]);

  const getDogNameByPetId = useCallback(
    (petId: string) =>
      dogs.find((dog) => dog.petId === petId)?.nome || "cachorro",
    [dogs]
  );

  const updateDogStatus = useCallback(
    (petId: string, status: PetInfos["status"], adoptionDate = "") => {
      setDogs((prev) =>
        prev.map((dog) =>
          dog.petId === petId ? {...dog, status, adoptionDate} : dog
        )
      );
    },
    []
  );

  const handleCancelAdoption = useCallback(
    (petId: string, clientId: string) => {
      cancelAdoption(
        {petId, clientId},
        {
          onSuccess: () => {
            updateDogStatus(petId, "disponivel");
            if (selectedDog?.petId === petId) setSelectedDog(null);
            toast.error(`Adoção de ${getDogNameByPetId(petId)} foi cancelada!`);
          },
          onError: () => toast.error("Falha ao cancelar a adoção"),
        }
      );
    },
    [cancelAdoption, selectedDog, updateDogStatus, getDogNameByPetId]
  );

  const handleApproveAdoption = useCallback(
    (petId: string, clientId: string) => {
      allowAdoption(
        {petId, clientId},
        {
          onSuccess: () => {
            updateDogStatus(petId, "adotado", new Date().toISOString());
            toast.success(
              `Adoção de ${getDogNameByPetId(petId)} foi aprovada!`
            );
          },
          onError: () => toast.error("Falha ao aprovar a adoção."),
        }
      );
    },
    [allowAdoption, updateDogStatus, getDogNameByPetId]
  );

  const handleRejectAdoption = useCallback(
    (petId: string, clientId: string) => {
      denyAdoption(
        {petId, clientId},
        {
          onSuccess: () => {
            updateDogStatus(petId, "disponivel");
            if (selectedDog?.petId === petId) setSelectedDog(null);
            toast.error(
              `Solicitação de adoção de ${getDogNameByPetId(
                petId
              )} foi rejeitada.`
            );
          },
          onError: () => toast.error("Falha ao rejeitar a adoção."),
        }
      );
    },
    [denyAdoption, selectedDog, updateDogStatus, getDogNameByPetId]
  );

  const getTitle = useMemo(() => {
    const pendenteCount = sortedform.filter(
      (d) => d.status === "pendente"
    ).length;
    return type === "adopter"
      ? `Meus Animais Adotados (${sortedform.length})`
      : `Solicitações de Adoção (${pendenteCount})`;
  }, [type, sortedform]);

  const getStatusBadge = useCallback((dog: PetInfos) => {
    const baseClass = "px-2 py-1 rounded-md text-xs font-medium";
    switch (dog.status) {
      case "adotado":
        return (
          <span className={`${baseClass} bg-green-100 text-green-800`}>
            Adotado
          </span>
        );
      case "pendente":
        return (
          <span className={`${baseClass} bg-yellow-100 text-yellow-800`}>
            Pendente
          </span>
        );
      default:
        return (
          <span className={`${baseClass} bg-gray-100 text-gray-800`}>
            Disponível
          </span>
        );
    }
  }, []);

  return (
    <ProtectedRoute>
      <div className="min-h-screen w-full bg-[var(--light-yellow)] px-6 pt-20 pb-10 flex flex-col">
        {isOpen && <Modal setIsOpen={setIsOpen} />}
        <div className="max-w-[1000px] w-full mx-auto">
          <header className="text-center mb-8 flex-shrink-0">
            <h1 className="text-4xl font-bold text-[var(--brown)] mb-2">
              {type === "adopter"
                ? "Painel do Adotante"
                : "Painel do Anunciante"}
            </h1>
            <p className="text-[var(--gray)] text-lg">
              {type === "adopter"
                ? "Gerencie seus cachorros adotados"
                : "Gerencie as solicitações de adoção"}
            </p>
          </header>

          <div className="flex max-[735px]:flex-col gap-6 overflow-hidden min-[735px]:max-h-[555px] justify-center max-[735px]:items-center">
            <motion.section
              className="w-full lg:w-5/12 flex flex-col bg-white rounded-lg shadow-lg overflow-hidden max-w-[500px] max-[735px]:max-h-[45vh]"
              variants={listSectionVariants}
              initial="initial"
              animate="animate"
              transition={listSectionVariants.transition}
            >
              <div className="p-6 border-b flex-shrink-0">
                <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800">
                  <FaHeart className="text-red-500" />
                  {getTitle}
                  {type === "advertiser" && (
                    <Button
                      intent={"plus"}
                      onClick={() => setIsOpen(true)}
                      className="ml-auto"
                    >
                      <FaPlus color="white" size={20} />
                    </Button>
                  )}
                </h2>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                {sortedform.length > 0 ? (
                  <AnimatePresence>
                    {sortedform.map((dog, index) => (
                      <motion.div
                        key={dog.petId}
                        variants={dogItemVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={getDogItemTransition(index)}
                        className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                          selectedDog?.petId === dog.petId
                            ? "border-indigo-500 bg-indigo-50 shadow-sm"
                            : "border-gray-200 hover:border-indigo-300"
                        }`}
                        onClick={() => setSelectedDog(dog)}
                      >
                        <div className="flex items-center gap-3">
                          <Image
                            src={
                              isValidUrl(dog.fotoUrl)
                                ? dog.fotoUrl
                                : "/defaultdog.png"
                            }
                            alt={dog.nome}
                            width={48}
                            height={48}
                            className="rounded-full object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-800 truncate">
                              {dog.nome}
                            </h3>
                            <p className="text-sm text-gray-500 truncate">
                              {dog.raca} • {dog.idade} anos
                            </p>
                          </div>
                          <div>{getStatusBadge(dog)}</div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>
                      {type === "adopter"
                        ? "Você ainda não adotou nenhum cachorro."
                        : "Nenhuma solicitação pendente."}
                    </p>
                  </div>
                )}
              </div>
            </motion.section>

            <motion.section
              className="w-full max-w-[500px] flex flex-col min-h-[555px] bg-white rounded-lg  shadow-lg overflow-y-auto"
              variants={detailSectionVariants}
              initial="initial"
              animate="animate"
              transition={detailSectionVariants.transition}
            >
              {selectedDog ? (
                <div className="p-8 flex flex-col h-full">
                  <div className="flex gap-8 flex-wrap max-[900px]:flex-col items-center mb-4">
                    <Image
                      src={
                        isValidUrl(selectedDog.fotoUrl + "")
                          ? selectedDog.fotoUrl + ""
                          : "/defaultdog.png"
                      }
                      alt={selectedDog.nome}
                      className="w-48 h-48 rounded-lg object-cover shadow-md"
                      loading="lazy"
                      width={192}
                      height={192}
                    />
                    <div className="flex flex-col gap-2 flex-1 w-full">
                      <h2 className="text-3xl font-bold text-[var(--brown)] mb-2">
                        {selectedDog.nome}
                      </h2>
                      <div className="flex flex-col gap-4 text-gray-600 text-sm">
                        <div className="flex items-center gap-2">
                          <FaCalendarAlt />
                          <span>{selectedDog.idade} anos</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaMapMarkerAlt />
                          <span>{selectedDog.localizacao}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-700 mb-3">
                      {type === "adopter"
                        ? "Sobre o cachorro"
                        : "Informações do formulário"}
                    </h3>

                    {type === "adopter" && (
                      <div className="w-full h-full">
                        <p className="text-gray-700">{selectedDog.descricao}</p>
                      </div>
                    )}

                    {type === "advertiser" && (
                      <>
                        {dogSelecionado ? (
                          <div className="flex flex-col gap-2 text-gray-700 text-sm">
                            {[
                              {
                                label: "Email",
                                value: dogSelecionado.email ?? "N/A",
                              },
                              {
                                label: "Telefone",
                                value: dogSelecionado.telefone ?? "N/A",
                              },
                              {
                                label: "Motivo",
                                value: dogSelecionado.motivo,
                              },
                              {
                                label: "Ambiente",
                                value: dogSelecionado.ambiente,
                              },
                              {
                                label: "Espaço externo",
                                value: dogSelecionado.espacoExterno
                                  ? "Sim"
                                  : "Não",
                              },
                              {
                                label: "Teve animais antes",
                                value: dogSelecionado.teveAnimaisAntes
                                  ? "Sim"
                                  : "Não",
                              },
                              {
                                label: "Ambiente seguro",
                                value: dogSelecionado.ambienteSeguro
                                  ? "Sim"
                                  : "Não",
                              },
                            ].map((item) => (
                              <div key={item.label}>
                                <strong>{item.label}:</strong> {item.value}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="w-full h-full justify-center items-center flex">
                            <p className="text-gray-700">
                              Nenhum formulário encontrado
                            </p>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  <div className="py-4 flex gap-4 justify-center">
                    {type === "adopter" &&
                      selectedDog.status === "pendente" && (
                        <Button
                          onClick={() =>
                            handleCancelAdoption(
                              selectedDog.petId ?? "",
                              dogSelecionado?.clientId ?? ""
                            )
                          }
                          intent="deny"
                        >
                          {cancelling ? "Cancelando" : "Cancelar Adoção"}
                        </Button>
                      )}

                    {type === "advertiser" &&
                      selectedDog.status === "pendente" && (
                        <>
                          <Button
                            intent="accept"
                            disabled={approving || denying}
                            onClick={() =>
                              handleApproveAdoption(
                                selectedDog.petId ?? "",
                                dogSelecionado!.clientId
                              )
                            }
                          >
                            {approving ? "Aprovando" : "Aprovar"}
                          </Button>
                          <Button
                            intent="deny"
                            disabled={approving || denying}
                            onClick={() =>
                              handleRejectAdoption(
                                selectedDog.petId ?? "",
                                dogSelecionado!.clientId
                              )
                            }
                          >
                            {denying ? "Rejeitando" : "Rejeitar"}
                          </Button>
                        </>
                      )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center h-full text-gray-400 p-8">
                  <p>
                    {type === "adopter"
                      ? "Selecione um cachorro para ver detalhes"
                      : "Selecione uma solicitação para ver detalhes"}
                  </p>
                </div>
              )}
            </motion.section>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdoptionPanel;
