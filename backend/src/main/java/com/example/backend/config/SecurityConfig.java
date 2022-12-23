package com.example.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity security) throws Exception{
        security = security.cors().and().csrf().disable();

        // Set session management to stateless
        security = security
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and();

        // Set permissions on endpoints
        security.authorizeRequests()
                // Our public endpoints, secured endpoints and then open everything else that is static resource stuff
                .antMatchers(HttpMethod.GET, "/api/config-props").permitAll()
                .antMatchers(HttpMethod.GET, "/actuator/health").permitAll()
                .antMatchers("/actuator**").authenticated()
                .antMatchers("/api/**").authenticated()
                .antMatchers(HttpMethod.GET, "/**").permitAll();
    }
}
