package com.school.portal.dto;

import java.util.List;

public class BaseResponseModel<T> {

	/** The count. */
	private Long count;

	/** The pages. */
	private Long pages = 1L;

	/** The data. */
	private List<T> data;

	/**
	 * Gets the count.
	 *
	 * @return the count
	 */
	public Long getCount() {
		return count;
	}

	/**
	 * Sets the count.
	 *
	 * @param count the new count
	 */
	public void setCount(final Long count) {
		this.count = count;
	}

	/**
	 * Gets the pages.
	 *
	 * @return the pages
	 */
	public Long getPages() {
		return pages;
	}

	/**
	 * Sets the pages.
	 *
	 * @param pages the new pages
	 */
	public void setPages(final Long pages) {
		this.pages = pages;
	}

	/**
	 * Gets the data.
	 *
	 * @return the data
	 */
	public List<T> getData() {
		return data;
	}

	/**
	 * Sets the data.
	 *
	 * @param data the new data
	 */
	public void setData(final List<T> data) {
		this.data = data;
	}

}
