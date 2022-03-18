# Hibernate

## Conf SpringBoot

Update base de donnée automatique :
````yaml
spring:
  jpa:
    hibernate:
      ddl-auto: update
````
## Liquibase
Plugin maven : ``liquibase-maven-plugin``

# Hibernate Envers

Permet d'auditer les tables. 

Dépendance :
```xml
<dependency>
    <groupId>org.hibernate</groupId>
    <artifactId>hibernate-envers</artifactId>
    <version>${hibernate.version}</version>
</dependency>
```
Table auditée :
```Java
@Entity
@Table(name = "person")
@Audited(withModifiedFlag = true)
public class Person implements Serializable {}
```