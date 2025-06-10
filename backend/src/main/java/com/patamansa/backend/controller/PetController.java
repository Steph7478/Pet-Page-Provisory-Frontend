package com.patamansa.backend.controller;

import com.patamansa.backend.dto.PetDTO;
import com.patamansa.backend.model.Pet;
import com.patamansa.backend.repository.PetRepository;
import com.patamansa.backend.service.PetService;
import com.patamansa.backend.model.StatusPet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/pets")
public class PetController {

    @Autowired
    private PetService petService;

    @Autowired
    private PetRepository petRepository;

    @PostMapping
    public ResponseEntity<Pet> criarPet(@RequestBody PetDTO dto) {
        Pet novoPet = petService.save(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoPet);
    }

    @GetMapping
    public List<Pet> listarPets() {
        return petService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pet> buscarPorID(@PathVariable Long id) {
        Pet pet = petService.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pet não encontrado"));
        return ResponseEntity.ok(pet);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<String> atualizarStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String status = body.get("status");

        Pet pet = petRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pet não encontrado"));

        StatusPet novoStatus = StatusPet.fromString(status);
        pet.setStatus(novoStatus);
        petRepository.save(pet);

        return ResponseEntity.ok("Status atualizado para " + novoStatus);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarPet(@PathVariable Long id) {
        if (!petRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Pet não encontrado");
        }

        petRepository.deleteById(id);
        return ResponseEntity.noContent().build(); // 204
    }
}
