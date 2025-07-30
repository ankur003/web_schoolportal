package com.school.portal.queryfilter;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.From;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

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
	    List<Predicate> predicates = new ArrayList<>();

	    for (SearchCriteria criteria : searchCriteriaList) {
	        Path<?> path;

	        if (criteria.getKey().contains(".")) {
	            String[] keys = criteria.getKey().split("\\.");
	            From<?, ?> join = root;
	            for (int i = 0; i < keys.length - 1; i++) {
	                join = join.join(keys[i], JoinType.LEFT);  // Use JoinType.INNER if required
	            }
	            path = join.get(keys[keys.length - 1]);
	        } else {
	            path = root.get(criteria.getKey());
	        }

	        switch (criteria.getOperation()) {
	        case MATCH:
	            predicates.add(builder.like(
	                builder.lower(path.as(String.class)),
	                "%" + criteria.getValue().toString().toLowerCase() + "%"
	            ));
	            break;

	        case EQUAL:
	            predicates.add(builder.equal(path, criteria.getValue()));
	            break;

	        case NOT_EQUAL:
	            predicates.add(builder.notEqual(path, criteria.getValue()));
	            break;

	        case GREATER_THAN:
	            predicates.add(builder.greaterThan(path.as(String.class), criteria.getValue().toString()));
	            break;

	        case LESS_THAN:
	            predicates.add(builder.lessThan(path.as(String.class), criteria.getValue().toString()));
	            break;

	    }

	    }

	    return builder.and(predicates.toArray(new Predicate[0]));
	}

}