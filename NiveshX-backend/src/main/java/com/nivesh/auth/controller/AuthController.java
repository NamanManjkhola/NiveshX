package com.nivesh.auth.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nivesh.auth.dto.AuthResponse;
import com.nivesh.auth.dto.LoginRequest;
import com.nivesh.auth.dto.RegisterRequest;
import com.nivesh.auth.service.AuthService;
// import com.nivesh.auth.service.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth")
// @RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;
    public AuthController(AuthService authService) {
        this.authService = authService;
    }
    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        String response=authService.login(request);
        return new AuthResponse(response);
        // return res;
    }

    @PostMapping("/register")
    public AuthResponse register(@RequestBody RegisterRequest request) {
        System.out.print(request.getEmail());
        String token = authService.register(request);
        return new AuthResponse(token);
    }

}

