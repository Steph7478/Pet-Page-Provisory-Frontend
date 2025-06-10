package com.patamansa.backend.model;

import java.util.Arrays;

public enum StatusPet {
    Adotado,
    Disponivel,
    Pendente;

    public static StatusPet fromString(String value) {
        return Arrays.stream(values())
                .filter(s -> s.name().equalsIgnoreCase(value))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Status inválido: " + value));
    }
}
