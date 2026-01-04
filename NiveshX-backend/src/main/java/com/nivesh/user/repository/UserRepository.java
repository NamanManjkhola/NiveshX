package com.nivesh.user.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.nivesh.user.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query(value = "SELECT * FROM public.\"User\" WHERE email = :email", nativeQuery = true)
    Optional<User> findUserByEmail(@Param("email") String email);
    
}
