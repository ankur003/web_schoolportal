package com.school.portal.queryfilter;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.school.portal.enums.SearchOperation;

/**
 * 
 *
 * @author Ankur Bansala
 */

public class GenericSpesification<T> implements Specification<T> {

	private static final long serialVersionUID = 1900581010229669687L;

	private List<SearchCriteria> searchCriteriaList;

	public GenericSpesification() {
		this.searchCriteriaList = new ArrayList<>();
	}

	public void add(SearchCriteria criteria) {
		searchCriteriaList.add(criteria);
	}
	
	public List<SearchCriteria> getSearchCriteriaList() {
		return searchCriteriaList;
	}

	public void setSearchCriteriaList(List<SearchCriteria> searchCriteriaList) {
		this.searchCriteriaList = searchCriteriaList;
	}

	@Override
	public Predicate toPredicate(Root<T> root, CriteriaQuery<?> query, CriteriaBuilder builder) {

		// create a new predicate list
		List<Predicate> predicates = new ArrayList<>();

		// add add criteria to predicates
		for (SearchCriteria criteria : searchCriteriaList) {
			if (criteria.getOperation().equals(SearchOperation.GREATER_THAN)) {
				predicates.add(builder.greaterThan(root.get(criteria.getKey()), criteria.getValue().toString()));
			} else if (criteria.getOperation().equals(SearchOperation.LESS_THAN)) {
				predicates.add(builder.lessThan(root.get(criteria.getKey()), criteria.getValue().toString()));
			} else if (criteria.getOperation().equals(SearchOperation.GREATER_THAN_EQUAL)) {
				predicates.add(builder.greaterThanOrEqualTo(root.get(criteria.getKey()), criteria.getValue().toString()));
			} else if (criteria.getOperation().equals(SearchOperation.LESS_THAN_EQUAL)) {
				predicates.add(builder.lessThanOrEqualTo(root.get(criteria.getKey()), criteria.getValue().toString()));
			} else if (criteria.getOperation().equals(SearchOperation.NOT_EQUAL)) {
				predicates.add(builder.notEqual(root.get(criteria.getKey()), criteria.getValue()));
			} else if (criteria.getOperation().equals(SearchOperation.EQUAL)) {
				predicates.add(builder.equal(root.get(criteria.getKey()), criteria.getValue()));
			} else if (criteria.getOperation().equals(SearchOperation.MATCH)) {
				predicates.add(builder.like(builder.lower(root.get(criteria.getKey())),"%" + criteria.getValue().toString().toLowerCase() + "%"));
			} else if (criteria.getOperation().equals(SearchOperation.MATCH_END)) {
				predicates.add(builder.like(builder.lower(root.get(criteria.getKey())),criteria.getValue().toString().toLowerCase() + "%"));
			}
		}
		return builder.and(predicates.toArray(new Predicate[0]));
	}
}