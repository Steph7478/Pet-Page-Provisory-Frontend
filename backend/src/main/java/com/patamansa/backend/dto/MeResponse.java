package com.patamansa.backend.dto;

public record MeResponse(String username,
                         String[] roles,
                         String provider) {}

