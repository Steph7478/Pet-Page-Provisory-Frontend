package com.patamansa.backend.model;

public enum Role {
    Anunciante,
    Adotante;

    //ignorar maiúsculas e minusculas
    public static Role fromString(String value) {
        for (Role role : Role.values()) {
            if (role.name().equalsIgnoreCase(value)) {
                return role;
            }
        }
        throw new IllegalArgumentException("Invalid role: " + value);
    }
}

