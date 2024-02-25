package com.school.portal.utils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ModelMapperUtil {
	
	private ModelMapperUtil() {
		//
	}
	
	public static Map<String, Object> getpaginationResponse(ModelMapper beanMapper, Page<?> pageData, Class<?> clazz) {
		List<?> data = mapList(beanMapper, pageData.getContent(), clazz);
		final Map<String, Object> responseMap = new HashMap<>();
		responseMap.put("data", data);
		responseMap.put("count", pageData.getTotalElements());
		responseMap.put("page", pageData.getTotalPages());
		return responseMap;
	}
	
	public static <S, T> List<T> mapList(ModelMapper modelMapper, List<S> source, Class<T> targetClass) {
	    return source
	      .stream()
	      .map(element -> modelMapper.map(element, targetClass))
	      .collect(Collectors.toList());
	}
	
	public static ResponseEntity<Object> map(ModelMapper modelMapper, Object data, Class<?> clazz) {
		return ResponseEntity.status(HttpStatus.OK).body(modelMapper.map(data, clazz));
	}

}
