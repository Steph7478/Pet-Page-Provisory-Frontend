package com.patamansa.backend.service;

import com.patamansa.backend.dto.FormularioAdocaoDTO;
import com.patamansa.backend.model.FormularioAdocao;
import com.patamansa.backend.repository.FormularioAdocaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.patamansa.backend.repository.PetRepository;
import com.patamansa.backend.repository.UserRepository;
import com.patamansa.backend.model.Pet;
import com.patamansa.backend.model.User;


@Service
public class FormularioAdocaoService {

    @Autowired
    private FormularioAdocaoRepository repository;

    @Autowired
    private PetRepository petRepository;

    @Autowired
    private UserRepository userRepository;


    public void processarFormulario(FormularioAdocaoDTO dto) {
        FormularioAdocao entidade = new FormularioAdocao();

        Pet pet = petRepository.findById(dto.getPetId())
                .orElseThrow(() -> new RuntimeException("Pet não encontrado com ID: " + dto.getPetId()));

        User client = userRepository.findById(dto.getClientId())
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado com ID: " + dto.getClientId()));

        entidade.setEmail(dto.getEmail());
        entidade.setTelefone(dto.getTelefone());
        entidade.setMotivo(dto.getMotivo());
        entidade.setAmbiente(dto.getAmbiente());
        entidade.setEspacoExterno(dto.isEspacoExterno());
        entidade.setTeveAnimaisAntes(dto.isAnimaisAntes());
        entidade.setAmbienteSeguro(dto.isAmbienteSeguro());
        entidade.setClient(client);
        entidade.setPet(pet);

        repository.save(entidade);
    }
}
