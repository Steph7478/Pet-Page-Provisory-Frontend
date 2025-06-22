package com.patamansa.backend.service;

import com.patamansa.backend.dto.PetDTO;
import com.patamansa.backend.model.Pet;
import com.patamansa.backend.model.StatusPet;
import com.patamansa.backend.model.User;
import com.patamansa.backend.repository.PetRepository;
import com.patamansa.backend.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PetService {

    private final PetRepository petRepository;
    private final UserRepository userRepository;

    public PetService(PetRepository petRepository, UserRepository userRepository) {
        this.petRepository = petRepository;
        this.userRepository = userRepository;
    }

    public Pet save(PetDTO dto) {
        Pet pet = new Pet();

        pet.setNome(dto.getNome());
        pet.setTipo(dto.getTipo());
        pet.setRaca(dto.getRaca());
        pet.setPorte(dto.getPorte());
        pet.setIdade(dto.getIdade());
        pet.setDescricao(dto.getDescricao());
        pet.setFotoUrl(dto.getFotoUrl());
        pet.setStatus(StatusPet.valueOf(dto.getStatus()));
        pet.setLocalizacao(dto.getLocalizacao());

        User owner;

        if (dto.getOwnerId() != null) {
            owner = userRepository.findById(dto.getOwnerId())
                    .orElseThrow(() -> new RuntimeException("Usuário (owner) não encontrado com ID: " + dto.getOwnerId()));
        } else {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String email = authentication.getName();

            owner = userRepository.findByEmail(email)
                    .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));
        }

        pet.setOwner(owner);

        return petRepository.save(pet);
    }

    public List<Pet> findAll() {
        return petRepository.findAll();
    }

    public Optional<Pet> findById(Long id) {
        return petRepository.findById(id);
    }
}

