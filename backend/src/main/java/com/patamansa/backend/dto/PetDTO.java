package com.patamansa.backend.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;


@Setter
@Getter
public class PetDTO {

    @NotNull(message = "O nome é obrigatório")
    @Size(min = 2, max = 50, message = "O nome deve ter entre 2 e 50 caracteres")
    private String nome;
    private String tipo;
    private String raca;
    private String porte;
    private String idade;
    private String descricao;
    private String fotoUrl;
    private String status;
    private String localizacao;

    @JsonProperty("ownerId")
    private Long ownerId;
}

