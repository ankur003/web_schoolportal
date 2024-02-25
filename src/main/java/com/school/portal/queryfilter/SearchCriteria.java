package com.school.portal.queryfilter;

import java.io.Serializable;

import com.school.portal.enums.SearchOperation;

/**
 * 
 *
 * @author Ankur Bansala
 */

public class SearchCriteria implements Serializable {

	private static final long serialVersionUID = -3578134587210596625L;

	private String key;

	private transient Object value;

	private SearchOperation operation;

	public SearchCriteria(String key, Object value, SearchOperation operation) {
		this.key = key;
		this.value = value;
		this.operation = operation;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public Object getValue() {
		return value;
	}

	public void setValue(Object value) {
		this.value = value;
	}

	public SearchOperation getOperation() {
		return operation;
	}

	public void setOperation(SearchOperation operation) {
		this.operation = operation;
	}
}