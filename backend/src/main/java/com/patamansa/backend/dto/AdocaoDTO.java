package com.patamansa.backend.dto;
import java.util.List;


public class AdocaoDTO {
    private Long idCliente;
    private List<Long> idsPets;

    public Long getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(Long idCliente) {
        this.idCliente = idCliente;
    }

    public List<Long> getIdsPets() {
        return idsPets;
    }

    public void setIdsPets(List<Long> idsPets) {
        this.idsPets = idsPets;
    }
}
