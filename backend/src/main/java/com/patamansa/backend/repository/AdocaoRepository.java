package com.patamansa.backend.repository;

import com.patamansa.backend.model.Adocao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdocaoRepository extends JpaRepository<Adocao, Long> {
    List<Adocao> findByClienteId(Long clienteId);
}



