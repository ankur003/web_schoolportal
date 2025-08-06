package com.school.portal.config;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableTransactionManagement
public class DynamicDataSourceConfig {
	
	 @Autowired
	 private SchoolProperties schoolProperties;
	
	@Bean
	@Primary
	public DataSource primaryDataSource() {
		Set<String> vv = schoolProperties.getCodes().keySet();
		String firstSchoolCode = vv.iterator().next();
		return createDataSource(firstSchoolCode);
	}

    @Bean
    public AbstractRoutingDataSource dynamicDataSource() {
        DynamicRoutingDataSource dataSource = new DynamicRoutingDataSource();
        Map<Object, Object> targetDataSources = new HashMap<>();
        
        // Create data sources for all configured school codes
        for (String schoolCode : schoolProperties.getCodes().keySet()) {
            targetDataSources.put(schoolCode, createDataSource(schoolCode));
        }
        
        dataSource.setTargetDataSources(targetDataSources);
        dataSource.setDefaultTargetDataSource(primaryDataSource());
        return dataSource;
    }

    private DataSource createDataSource(String schoolCode) {
        SchoolProperties.SchoolDetail schoolDetail = schoolProperties.getSchoolDetail(schoolCode);
        if (schoolDetail == null) {
            throw new IllegalArgumentException("School code not configured: " + schoolCode);
        }
        
        DataSourceBuilder<?> dataSourceBuilder = DataSourceBuilder.create();
        dataSourceBuilder.driverClassName("com.mysql.cj.jdbc.Driver");
        dataSourceBuilder.url(schoolDetail.getDatabaseUrl());
        dataSourceBuilder.username(schoolDetail.getUsername());
        dataSourceBuilder.password(schoolDetail.getPassword());
        return dataSourceBuilder.build();
    }

    @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory(EntityManagerFactoryBuilder builder) {
        return builder
                .dataSource(dynamicDataSource())
                .packages("com.school.portal.domain")
                .persistenceUnit("dynamicPU")
                .properties(hibernateProperties())
                .build();
    }

    @Bean
    public PlatformTransactionManager transactionManager(EntityManagerFactory entityManagerFactory) {
        return new JpaTransactionManager(entityManagerFactory);
    }

    private Map<String, Object> hibernateProperties() {
        Map<String, Object> hibernateProperties = new HashMap<>();
        hibernateProperties.put("hibernate.physical_naming_strategy", DataSourcePhysicalNamingStrategy.class.getName());
        return hibernateProperties;
    }
}
