package ru.vorobev.tasker.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.ObjectUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import ru.vorobev.tasker.service.JwtService;

import java.io.IOException;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class AuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;


    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
        String jwt;
        String username;
        System.out.println("Header" + authHeader);
        if (ObjectUtils.isEmpty(authHeader) || !authHeader.startsWith("Bearer ")){
            filterChain.doFilter(request,response);
            return;
        }
        jwt = authHeader.substring(7);

        username = jwtService.extractUsername(jwt);
        System.out.println("USER : "+username);
        if(!ObjectUtils.isEmpty(username) && ObjectUtils.isEmpty(SecurityContextHolder.getContext().getAuthentication())) {
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
            System.out.println("userDetails " + userDetails);
            if (jwtService.isTokenValid(jwt,userDetails)){
                System.out.println("VAILD");
                UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                );
                token.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(token);
            }
        }

        filterChain.doFilter(request,response);
    }
}
