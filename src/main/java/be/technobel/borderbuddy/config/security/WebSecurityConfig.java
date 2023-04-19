package be.technobel.borderbuddy.config.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class WebSecurityConfig {

    @Bean
    public PasswordEncoder encoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtAuthFilter jwtAuthFilter) throws Exception {
        http.csrf().disable();
        http.httpBasic().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        http.authorizeHttpRequests(
                registry ->
                        registry
                                .requestMatchers(HttpMethod.GET,"/api/month/**").authenticated()
                                .requestMatchers(HttpMethod.POST,"/api/month/**").authenticated()
                                .requestMatchers(HttpMethod.GET,"/api/day/**").authenticated()
                                .requestMatchers(HttpMethod.POST,"/api/day/**").authenticated()
                                .requestMatchers(HttpMethod.GET,"/api/file/**").authenticated()
                                .requestMatchers(HttpMethod.POST,"/api/file/**").authenticated()
                                .requestMatchers(HttpMethod.POST,"/api/auth/login").anonymous()
                                .requestMatchers(HttpMethod.POST,"/api/register").anonymous()
                                .anyRequest().permitAll()
        );
        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
