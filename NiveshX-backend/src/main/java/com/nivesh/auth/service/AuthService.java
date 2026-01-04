package com.nivesh.auth.service;

import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.nivesh.auth.dto.LoginRequest;
import com.nivesh.auth.dto.RegisterRequest;
import com.nivesh.common.enums.UserRole;
import com.nivesh.common.util.JwtUtil;
import com.nivesh.user.entity.User;
import com.nivesh.user.repository.UserRepository;

@Service
// @RequiredArgsConstructor
public class AuthService {

    private final  UserRepository userRepository;
    private final  PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    public AuthService(UserRepository userRepository,PasswordEncoder passwordEncoder,JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder=passwordEncoder;
        this.jwtUtil=jwtUtil;

    }
    public String login(LoginRequest request) {
        System.out.println(1);
        User user = userRepository.findUserByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found")); 
        System.out.println(user.getPassword()+" idw "+request.getPassword());
        if (!passwordEncoder.matches(request.getPassword(),user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        System.out.println(2);
        String token = jwtUtil.generateToken(user.getEmail());
        System.out.println(token);
        return (token);
    }

    public String register(RegisterRequest request) {

    // 1. Check if user already exists
    // System.out.print(request.getEmail());
    Optional<User> userDemo = userRepository.findUserByEmail(request.getEmail());

    if (userDemo.isPresent()) {
        throw new RuntimeException("Email already registered");
    }

    // 2. Create new user
    User user = new User();
    user.setEmail(request.getEmail());

    // 3. Encrypt password
    user.setPassword(passwordEncoder.encode(request.getPassword()));
    // user.setPassword(request.getPassword());

    // 4. Assign default role
    user.setRole(UserRole.USER);
    // 5. Save user
    userRepository.save(user);

    // 6. (Optional) Generate token after signup
    return jwtUtil.generateToken(user.getEmail());
}

}

