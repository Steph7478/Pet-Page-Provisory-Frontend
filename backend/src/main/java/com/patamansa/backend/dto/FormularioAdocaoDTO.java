package com.patamansa.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class FormularioAdocaoDTO {
    private String email;
    private String telefone;
    private String motivo;
    private String ambiente;
    private boolean espacoExterno;
    private boolean animaisAntes;
    private boolean ambienteSeguro;
    private String localizacao;

    private Long petId;

    @JsonProperty("clientId")
    private Long clientId;

    public FormularioAdocaoDTO(String localizacao) {
        this.localizacao = localizacao;
    }

    public String getEmail() {
        return email;
    }

    public String getTelefone() {
        return telefone;
    }

    public String getMotivo() {
        return motivo;
    }

    public String getAmbiente() {
        return ambiente;
    }

    public boolean isEspacoExterno() {
        return espacoExterno;
    }

    public boolean isAnimaisAntes() {
        return animaisAntes;
    }

    public boolean isAmbienteSeguro() {
        return ambienteSeguro;
    }

    public Long getPetId() {
        return petId;
    }

    public Long getClientId() {
        return clientId;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public void setMotivo(String motivo) {
        this.motivo = motivo;
    }

    public void setAmbiente(String ambiente) {
        this.ambiente = ambiente;
    }

    public void setEspacoExterno(boolean espacoExterno) {
        this.espacoExterno = espacoExterno;
    }

    public void setAnimaisAntes(boolean animaisAntes) {
        this.animaisAntes = animaisAntes;
    }

    public void setAmbienteSeguro(boolean ambienteSeguro) {
        this.ambienteSeguro = ambienteSeguro;
    }

    public void setPetId(Long petId) {
        this.petId = petId;
    }

    public void setClientId(Long clientId) {
        this.clientId = clientId;
    }

    public String getLocalizacao() {
        return localizacao;
    }

    public void setLocalizacao(String localizacao) {
        this.localizacao = localizacao;
    }

}
