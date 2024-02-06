package com.school.portal.config;

import java.util.HashMap;
import java.util.Map;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;

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

import com.school.portal.enums.AcademicYear;

@Configuration
@EnableTransactionManagement
public class DynamicDataSourceConfig {

    @Bean
    @Primary
    public DataSource primaryDataSource() {
    	DataSourceBuilder<?> dataSourceBuilder = DataSourceBuilder.create();
        dataSourceBuilder.driverClassName("com.mysql.cj.jdbc.Driver");
        dataSourceBuilder.url("jdbc:mysql://blgzvsgk8gc0lmrukbvp-mysql.services.clever-cloud.com:3306/blgzvsgk8gc0lmrukbvp?createDatabaseIfNotExist=true&useSSL=false");
        dataSourceBuilder.username("umh4poimxymgqvs5");
        dataSourceBuilder.password("uRrQS3mksTGnni7xKK5k");
        return dataSourceBuilder.build();
    }

    @Bean
    public DataSource secondaryDataSource() {
    	DataSourceBuilder<?> dataSourceBuilder = DataSourceBuilder.create();
        dataSourceBuilder.driverClassName("com.mysql.cj.jdbc.Driver");
        dataSourceBuilder.url("jdbc:mysql://blgzvsgk8gc0lmrukbvp-mysql.services.clever-cloud.com:3306/2blgzvsgk8gc0lmrukbvp?createDatabaseIfNotExist=true&useSSL=false");
        dataSourceBuilder.username("umh4poimxymgqvs5");
        dataSourceBuilder.password("uRrQS3mksTGnni7xKK5k");
        return dataSourceBuilder.build();

    }

    @Bean
    public AbstractRoutingDataSource dynamicDataSource() {
        DynamicRoutingDataSource dataSource = new DynamicRoutingDataSource();

        Map<Object, Object> targetDataSources = new HashMap<>();
        targetDataSources.put(AcademicYear.YEAR_2022_2023, primaryDataSource());
        targetDataSources.put(AcademicYear.YEAR_2021_2022, secondaryDataSource());

        dataSource.setTargetDataSources(targetDataSources);
        dataSource.setDefaultTargetDataSource(primaryDataSource());

        return dataSource;
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
    
    private Map<String, ?> hibernateProperties() {
        Map<String, Object> hibernateProperties = new HashMap<>();
        hibernateProperties.put("hibernate.physical_naming_strategy", DataSourcePhysicalNamingStrategy.class.getName());
        return hibernateProperties;
    }
}