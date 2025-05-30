package com.patamansa.backend.controller;

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

@RestController
@RequestMapping("/api/pets")
public class PetController {

    @Autowired
    private PetService petService;

    @Autowired
    private PetRepository petRepository;

    // ✅ CORRIGIDO: Removido setId manual, o JPA cuida disso com @GeneratedValue
    @PostMapping
    public Pet criarPet(@RequestBody Pet pet) {
        return petService.save(pet);
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

    @PutMapping("/{id}/status")
    public ResponseEntity<Pet> atualizarStatus(@PathVariable Long id, @RequestParam StatusPet status) {
        Pet pet = petRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pet não encontrado"));

        pet.setStatus(status);
        petRepository.save(pet);
        return ResponseEntity.ok(pet);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarPet(@PathVariable Long id) {
        if (!petRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Pet não encontrado");
        }

        petRepository.deleteById(id);
        return ResponseEntity.noContent().build(); // 204 - No Content
    }
}
