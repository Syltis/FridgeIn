package com.fridgein.kris.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    /**
     * Configuration for Spring Security
     *
     * TODO Set up proper security and login
     *
     * @param httpSecurity  Allows configuring web based security for specific http-requests.
     * @throws Exception  regular ol'exception
     */
    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {

        // For now we allow full access
        httpSecurity.authorizeRequests().antMatchers("/").permitAll();
        httpSecurity.authorizeRequests().antMatchers("/resources/**").permitAll();
        httpSecurity.csrf().disable();
    }
}
