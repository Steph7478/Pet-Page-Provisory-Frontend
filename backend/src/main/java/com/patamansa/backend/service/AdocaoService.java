package com.patamansa.backend.service;

import com.patamansa.backend.dto.AdocaoDTO;
import com.patamansa.backend.model.Adocao;
import com.patamansa.backend.model.Pet;
import com.patamansa.backend.model.StatusPet;
import com.patamansa.backend.model.User;
import com.patamansa.backend.repository.AdocaoRepository;
import com.patamansa.backend.repository.PetRepository;
import com.patamansa.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdocaoService {

    @Autowired
    private AdocaoRepository adocaoRepository;

    @Autowired
    private PetRepository petRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public void registrarAdocao(AdocaoDTO dto) {
        User cliente = userRepository.findById(dto.getIdCliente())
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        for (Long petId : dto.getIdsPets()) {
            Pet pet = petRepository.findById(petId)
                    .orElseThrow(() -> new RuntimeException("Pet não encontrado com id: " + petId));

            Adocao adocao = new Adocao();
            adocao.setCliente(cliente);
            adocao.getPets().add(pet);

            pet.setStatus(StatusPet.Pendente);
            petRepository.save(pet);
            adocaoRepository.save(adocao);
        }
    }
    public AdocaoDTO buscarPorId(Long id) {
        Adocao adocao = adocaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Adoção não encontrada com ID: " + id));

        AdocaoDTO dto = new AdocaoDTO();
        dto.setIdCliente(adocao.getCliente().getId());

        List<Long> ids = adocao.getPets().stream()
                .map(Pet::getId)
                .toList();
        dto.setIdsPets(ids);

        return dto;
    }
}
