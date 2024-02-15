package com.school.portal.utils;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.TreeMap;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.BooleanUtils;
import org.dozer.Mapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.school.portal.domain.User;
import com.school.portal.dto.BaseResponseModel;
import com.school.portal.enums.ErrorCode;
import com.school.portal.enums.ResponseCode;

public class ResponseBuilder {

	private ResponseBuilder() {
		//
	}

	public static Map<String, Object> buildLoginResponse(String jwtToken, User user) {
		Map<String, Object> map = new HashMap<>();
		map.put("token", jwtToken);
		map.put("userName", user.getUsername());
		map.put("userType", user.getUserType());
		return map;
	}
	
	public static Map<String, Object> buildLoginFailedResponse() {
		Map<String, Object> map = new HashMap<>();
		map.put("message", "Incorrect username or password.");
		return map;
	}

	/**
	 * 
	 * @param httpStatus
	 * @param isError
	 * @param message
	 * @param errorCode
	 * @param responseObject
	 * @return
	 */
	public static ResponseEntity<Object> response(HttpStatus httpStatus, Boolean isError, String message,
			ErrorCode errorCode, ResponseCode responseCode) {

		Map<String, Object> map = new TreeMap<>();
		map.put("timestamp", new Date().getTime());
		map.put("httpStatus", httpStatus.value());
		map.put("isError", isError);

		if (isError) {
			Error error = new Error(message, errorCode, message);
			map.put("error", error);
			map.put("errorStatus", errorCode.value());
		}
		map.put("message", message);
		map.put("responseCode", responseCode.value());
		return new ResponseEntity<>(map, httpStatus);

	}

	/**
	 * 
	 * @param httpStatus
	 * @param isError
	 * @param message
	 * @param errorCode
	 * @param responseObject
	 * @param responseCode
	 * @return
	 */
	public static ResponseEntity<Object> response(HttpStatus httpStatus, Boolean isError, String message,
			ErrorCode errorCode, ResponseCode responseCode, Object responseObject) {
		Map<String, Object> map = new TreeMap<>();
		map.put("timestamp", new Date().getTime());
		map.put("status", httpStatus.value());
		map.put("isError", isError);
		if (isError) {
			Error error = new Error(message, errorCode, message);
			map.put("error", error);
			map.put("errorStatus", errorCode.value());
		}
		map.put("message", message);
		map.put("responseCode", responseCode.value());
		map.put("responseObject", responseObject);
		return new ResponseEntity<>(map, httpStatus);

	}

	public static <S, D> ResponseEntity<Object> getApiResponseWithPagination(final Mapper beanMapper,
			final List<S> dataDoaminClass, final Class<D> modelClass) {
		if (CollectionUtils.isNotEmpty(dataDoaminClass)) {
			final List<D> dataModels = DozerMapperUtil.mapCollection(beanMapper, dataDoaminClass, modelClass);
			final BaseResponseModel<D> baseResponseModel = mapToBaseResponseModel(dataModels, Long.MAX_VALUE,
					Long.valueOf(dataModels.size()));
			return ResponseEntity.ok(baseResponseModel);
		}
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}

	public static <S, D> ResponseEntity<Object> getApiBaseContentResponseAsList(final Mapper beanMapper,
			final List<S> dataDoaminClass, final Class<D> modelClass) {
		if (CollectionUtils.isNotEmpty(dataDoaminClass)) {
			final List<D> dataModels = DozerMapperUtil.mapCollection(beanMapper, dataDoaminClass, modelClass);
			return ResponseEntity.ok(dataModels);
		}
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}

	public static <S, D> ResponseEntity<Object> getApiBaseContentResponse(final Mapper beanMapper,
			final Class<S> dataDoaminClass, final Class<D> modelClass) {
		if (Objects.nonNull(dataDoaminClass)) {
			final D dataModels = beanMapper.map(dataDoaminClass, modelClass);
			return ResponseEntity.ok(dataModels);
		}
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}

	public static <T> BaseResponseModel<T> mapToBaseResponseModel(final List<T> object, final Long limit,
			final Long count) {
		final BaseResponseModel<T> baseResponseModel = new BaseResponseModel<>();
		baseResponseModel.setData(object);
		baseResponseModel.setCount(count);
		if (limit != null) {
			long pages = count / limit;
			if (count % limit > 0) {
				pages += 1;
			}
			baseResponseModel.setPages(pages == 0 ? 1 : pages);
		}
		return baseResponseModel;
	}

	public static ResponseEntity<Object> mapToBooleanContentResponse(Boolean isCreated, String keyName,
			String uniqueId) {
		if (BooleanUtils.isFalse(isCreated)) {
			return ResponseEntity.status(HttpStatus.NOT_MODIFIED).build();
		}
		Map<String, Object> map = new TreeMap<>();
		map.put(keyName, uniqueId);
		return ResponseEntity.status(HttpStatus.CREATED).body(map);
	}

	public static ResponseEntity<Object> mapToContentResponse(String keyName, String uniqueId) {
		Map<String, Object> map = new TreeMap<>();
		map.put(keyName, uniqueId);
		return ResponseEntity.status(HttpStatus.CREATED).body(map);
	}

	public static ResponseEntity<Object> buildCreatedRespnse(String keyName, String uuid) {
		Map<String, Object> map = new TreeMap<>();
		map.put(keyName, uuid);
		return ResponseEntity.status(HttpStatus.CREATED).body(map);
	}
	
	public static ResponseEntity<Object> buildServerErrorRespnse() {
		Map<String, Object> map = new TreeMap<>();
		map.put("error", "Something Went Wrong on the sever.");
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(map);
	}

}
