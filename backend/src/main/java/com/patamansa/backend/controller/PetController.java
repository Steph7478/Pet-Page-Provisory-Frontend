package com.patamansa.backend.controller;

import com.patamansa.backend.model.Pet;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/api/pets")
public class PetController {

    private List<Pet> pets = new ArrayList<>();

    @GetMapping
    public List<Pet> listarPets() {
        return pets;
    }

    @PostMapping
    public Pet criarPet(@RequestBody Pet pet) {
        pets.add(pet);
        return pet;
    }
}

