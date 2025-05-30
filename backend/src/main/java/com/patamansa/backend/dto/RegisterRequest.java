package com.patamansa.backend.dto;

public class RegisterRequest {
    private String userEmail;
    private String password;
    private String role; // o papel do usuário (ADMIN ou ADOTANTE)

    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}
