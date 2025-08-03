package com.school.portal.service;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class CustomUserDetails implements UserDetails {

	/**
	 * 
	 */
	private static final long serialVersionUID = -6559288706076356776L;
	private String username;
	private String password;
	private String userUuid;
	private Collection<? extends GrantedAuthority> authorities;

	public CustomUserDetails(String username, String password, String userUuid,
			Collection<? extends GrantedAuthority> authorities) {
		this.username = username;
		this.password = password;
		this.userUuid = userUuid;
		this.authorities = authorities;
	}

	public String getUserUuid() {
		return userUuid;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return username;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
}
