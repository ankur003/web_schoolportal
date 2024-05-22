package com.school.portal;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DatabaseService {

    @Autowired
  private EntityManager entityManager;

    @Transactional
    public void deleteTable(String tableName) {
        try {
			Query query = entityManager.createNativeQuery("DROP TABLE " + tableName);
			query.executeUpdate();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }
}