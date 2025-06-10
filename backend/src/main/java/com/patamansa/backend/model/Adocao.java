package com.patamansa.backend.model;

import jakarta.persistence.Entity;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;

@Entity
public class Adocao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User cliente;

    @ManyToMany
    private List<Pet> pets = new ArrayList<>();

    private LocalDate dataAdocao = LocalDate.now();

    public Long getId() {
        return id;
    }

    public void setId (Long id) {
        this.id = id;
    }

    public User getCliente(){
        return cliente;
    }

    public void setCliente(User cliente) {
        this.cliente = cliente;
    }

    public Pet getPet () {
        return pet;
    }

    public void setPet (Pet pet) {
        this.pet =  pet;
    }

    public LocalDate getDataAdocao() {
        return dataAdocao;
    }

    public void setDataAdocao(LocalDate dataAdocao) {
        this.dataAdocao = dataAdocao;
    }
}
