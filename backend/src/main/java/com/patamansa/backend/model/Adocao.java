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

    @JoinColumn(name = "cliente_id")
    @ManyToOne
    private User cliente;

    @ManyToMany(cascade = CascadeType.PERSIST)
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

    public List<Pet> getPets() {
        return pets;
    }

    public void setPets(List<Pet> pets) {
        this.pets = pets;
    }

    public LocalDate getDataAdocao() {
        return dataAdocao;
    }

    public void setDataAdocao(LocalDate dataAdocao) {
        this.dataAdocao = dataAdocao;
    }
}
