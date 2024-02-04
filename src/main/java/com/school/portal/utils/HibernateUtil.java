package com.school.portal.utils;
import java.util.EnumSet;
import java.util.HashMap;
import java.util.Map;

import javax.sql.DataSource;

import org.hibernate.boot.Metadata;
import org.hibernate.boot.MetadataSources;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.AvailableSettings;
import org.hibernate.cfg.Environment;
import org.hibernate.tool.hbm2ddl.SchemaExport;
import org.hibernate.tool.schema.TargetType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.school.portal.domain.MasterClass;
import com.school.portal.domain.MasterSection;
import com.school.portal.domain.Role;
import com.school.portal.domain.User;

@Component
public class HibernateUtil {
	
	@Autowired
	DataSource dataSource;

    /**
     * Generates database create commands for the specified entities using Hibernate native API, SchemaExport.
     * Creation commands are exported into the create.sql file.
     */
    public void generateSchema() {
        Map<String, DataSource> settings = new HashMap<>();
        settings.put(AvailableSettings.DATASOURCE, dataSource);

        StandardServiceRegistry serviceRegistry = new StandardServiceRegistryBuilder().applySettings(settings).build();

        MetadataSources metadataSources = new MetadataSources(serviceRegistry);
        metadataSources.addAnnotatedClass(User.class);
        metadataSources.addAnnotatedClass(Role.class);
        metadataSources.addAnnotatedClass(MasterSection.class);
        metadataSources.addAnnotatedClass(MasterClass.class);
        Metadata metadata = metadataSources.buildMetadata();

        SchemaExport schemaExport = new SchemaExport();
        schemaExport.setFormat(true);
        schemaExport.createOnly(EnumSet.of(TargetType.DATABASE), metadata);
    }
}