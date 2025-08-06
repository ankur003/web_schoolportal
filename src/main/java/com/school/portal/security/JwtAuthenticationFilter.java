package com.school.portal.security;

import static com.school.portal.constants.JwtConstants.HEADER_STRING;
import static com.school.portal.constants.JwtConstants.TOKEN_PREFIX;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import com.school.portal.config.SchoolProperties;
import com.school.portal.enums.AcademicYear;
import com.school.portal.service.CustomUserDetails;
import com.school.portal.utils.LoggedInUserUtil;
import com.school.portal.utils.SchoolPortalUtils;
import com.school.portal.utils.TenantContext;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private TokenProvider jwtTokenUtil;
    
    @Autowired
    private SchoolProperties schoolProperties;

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
            throws IOException, ServletException {
        
        String header = req.getHeader(HEADER_STRING);
        String userAcademicYear = req.getHeader("user_academic_year");
        String schoolCodeHeader = req.getHeader("schoolCode");
        String username = null;
        String authToken = null;
        String schoolCode = null;

        // Handle school code for login requests
        if (req.getRequestURI().contains("login") && StringUtils.isNotBlank(schoolCodeHeader)) {
            try {
            	// Validate school code using SchoolProperties instead of enum
                if (!isValidSchoolCode(schoolCodeHeader)) {
                    throw new IllegalArgumentException("Invalid school code");
                }
                TenantContext.setCurrentSchoolCode(schoolCodeHeader);
            } catch (IllegalArgumentException e) {
                res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                res.setContentType("application/json");
                res.getWriter().write("{\"error\": \"Invalid school code: " + schoolCodeHeader + "\"}");
                return;
            }
        }

        if (header != null && header.startsWith(TOKEN_PREFIX)) {
            authToken = header.replace(TOKEN_PREFIX, "");
            try {
                username = jwtTokenUtil.getUsernameFromToken(authToken);
                schoolCode = jwtTokenUtil.getSchoolCodeFromToken(authToken);
                
                // Set school code in tenant context for database routing
                if (StringUtils.isNotBlank(schoolCode)) {
                    TenantContext.setCurrentSchoolCode(schoolCode);
                }
            } catch (Exception e) {
                logger.error("Authentication Failed. Username or Password not valid.");
            }
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            if (Boolean.TRUE.equals(jwtTokenUtil.validateToken(authToken, userDetails))) {
                UsernamePasswordAuthenticationToken authentication = jwtTokenUtil.getAuthentication(authToken, userDetails);
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(req));
                logger.info("authenticated user " + username + ", setting security context");
                SecurityContextHolder.getContext().setAuthentication(authentication);

                if (!"GET".equalsIgnoreCase(req.getMethod()) &&
                    !SchoolPortalUtils.getCurrentAcademicYear().equalsIgnoreCase(userAcademicYear)) {
                    res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                    res.setContentType("application/json");
                    res.getWriter().write("{\"error\": \"Save or edit functionalities are not allowed in old academic years.\"}");
                    return;
                } else if (StringUtils.isBlank(userAcademicYear)) {
                    res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                    res.setContentType("application/json");
                    res.getWriter().write("{\"error\": \"missing header academic year.\"}");
                    return;
                }

                addLoginUserAcademicYear(userAcademicYear, userDetails);
            }
        }

        try {
            chain.doFilter(req, res);
        } finally {
            // Clean up tenant context after request processing
            TenantContext.clear();
        }
    }

    private void addLoginUserAcademicYear(String userAcademicYear, UserDetails userDetails) {
        if (userDetails instanceof CustomUserDetails) {
            String userUuid = ((CustomUserDetails) userDetails).getUserUuid();
            LoggedInUserUtil.setLoginUserAcadmicYear(userUuid, AcademicYear.valueOf(userAcademicYear));
        }
    }
    
    private boolean isValidSchoolCode(String schoolCode) {
        return schoolProperties.getCodes() != null && 
               schoolProperties.getCodes().containsKey(schoolCode);
    }
}
