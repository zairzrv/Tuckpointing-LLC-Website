package com.tuckpointing.website.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // Who can see what
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/admin/**").authenticated()   // owners only
                .anyRequest().permitAll())                      // public pages, css, js, photos, APIs

            //login page
            .formLogin(form -> form
                .loginPage("/login")
                .defaultSuccessUrl("/admin", true)
                .permitAll())

            // Logging out sends the owner back to the home page
            .logout(logout -> logout
                .logoutSuccessUrl("/login?logout")
                .permitAll())

            // Admin forms (Thymeleaf) get the token automatically, so they stay protected.
            .csrf(csrf -> csrf.ignoringRequestMatchers("/api/estimates"));

        return http.build();
    }
}