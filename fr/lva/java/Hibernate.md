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

# OSIV

- Par défaut Open Session in View
- Cela veut dire, qu'une session BDD est ouverte dès qu'une requête HTTP arrive sur le serveur et la ferme à la fin
- Conséquences : 
  - Les objets LAZY sont accessibles mêmes en dehors de l'annotation @Transactionnal
  - La connection à la BDD est conservée et est impactée par les appels externes ou autres
    Here’s what happens while the OSIV is enabled:

Exemple :
```java
@Override
public Optional<User> findOne(String username) {
    Optional<User> user = userRepository.findByUsername(username);
    if (user.isPresent()) {
        // remote call
    }

    return user;
}
```
1. Une session est créé lorsque la requête arrive au serveur. Cette session n'utilise pas encore de connection
2. Lorsqu'on appelle le ``findByUsername``, la session récupère une connection depuis le pool
3. Si jamais, le remote call est lent la connection sera toujours associé à la session et ne sera pas libérée pour d'autres besoins
4. Le pool de connection peut vite devenir saturé