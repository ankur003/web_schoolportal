package com.school.portal.security;

import com.school.portal.enums.AcademicYear;
import com.school.portal.service.CustomUserDetails;
import com.school.portal.utils.LoggedInUserUtil;
import com.school.portal.utils.SchoolPortalUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;

import static com.school.portal.constants.JwtConstants.HEADER_STRING;
import static com.school.portal.constants.JwtConstants.TOKEN_PREFIX;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private TokenProvider jwtTokenUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
            throws IOException, ServletException {
        String header = req.getHeader (HEADER_STRING);
        String userAcademicYear = req.getHeader ("user_academic_year");
        String username = null;
        String authToken = null;

        if ((Boolean.FALSE.equals (req.getRequestURI ().contains ("login"))) && (
                StringUtils.isBlank (userAcademicYear) || Arrays.stream (AcademicYear.values ())
                        .noneMatch (year -> year.name ().equalsIgnoreCase (userAcademicYear)))) {

            res.setStatus (HttpServletResponse.SC_BAD_REQUEST);
            res.setContentType ("application/json");
            String error = StringUtils.isBlank (userAcademicYear) ? "Missing required header: user_academic_year"
                    : "Invalid academic year: " + userAcademicYear;
            res.getWriter ().write ("{\"error\": \"" + error + "\"}");
            return;
        }

        if (header != null && header.startsWith (TOKEN_PREFIX)) {
            authToken = header.replace (TOKEN_PREFIX, "");
            try {
                username = jwtTokenUtil.getUsernameFromToken (authToken);
            } catch (Exception e) {
                logger.error ("Authentication Failed. Username or Password not valid.");
            }
        }
        if (username != null && SecurityContextHolder.getContext ().getAuthentication () == null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername (username);
            if (Boolean.TRUE.equals (jwtTokenUtil.validateToken (authToken, userDetails))) {
                UsernamePasswordAuthenticationToken authentication = jwtTokenUtil.getAuthentication (authToken,
                        userDetails);
                authentication.setDetails (new WebAuthenticationDetailsSource ().buildDetails (req));
                logger.info ("authenticated user " + username + ", setting security context");
                SecurityContextHolder.getContext ().setAuthentication (authentication);

                if (!"GET".equalsIgnoreCase (req.getMethod ()) &&
                        !SchoolPortalUtils.getCurrentAcademicYear ().equalsIgnoreCase (userAcademicYear)) {

                    res.setStatus (HttpServletResponse.SC_BAD_REQUEST);
                    res.setContentType ("application/json");
                    res.getWriter ().write ("{\"error\": \"Save or edit functionalities are not allowed in old academic years.\"}");
                    return; // short-circuit the filter chain
                }

                addLoginUserAcademicYear (userAcademicYear, userDetails);
            }
        }
        chain.doFilter (req, res);
    }

    private void addLoginUserAcademicYear(String userAcademicYear, UserDetails userDetails) {
        if (userDetails instanceof CustomUserDetails) {
            String userUuid = ((CustomUserDetails) userDetails).getUserUuid ();
            LoggedInUserUtil.setLoginUserAcadmicYear (userUuid, AcademicYear.valueOf (userAcademicYear));
        }
    }
}