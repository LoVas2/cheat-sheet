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

# Lazy Collections

Si on veut récupérer des données en lazy d'un objet, on peut :

### Utiliser les Entity Graphs

Annoter une requête avec `@EntityGraph` fetch en mode eage fetch les attributs de l'entité:

```java
public interface UserRepository extends JpaRepository<User, Long> {

    @EntityGraph(attributePaths = "permissions")
    Optional<User> findDetailedByUsername(String username);

    Optional<User> findSummaryByUsername(String username);
}
```

### VS Utiliser Hibernate.initialize()

```java
@Override
@Transactional(readOnly = true)
public Optional<User> findOne(String username) {
    Optional<User> user = userRepository.findByUsername(username);
    user.ifPresent(u -> Hibernate.initialize(u.getPermissions()));
        
    return user;
}
```
Moins recommandé car rajoute une requête SQL à la BDD
```sql
> select u.id, u.username from users u where u.username=?
> select p.user_id, p.permissions from user_permissions p where p.user_id=?
```
### Autres solutions

#### JPQL
```java
Query q = this.em.createQuery("SELECT o FROM Order o JOIN FETCH o.items i WHERE o.id = :id");
q.setParameter("id", orderId);
newOrder = (Order) q.getSingleResult();
```

# Autocommit

In auto-commit mode, each SQL statement is treated as a transaction and is automatically committed right after it is executed. This, in turn, puts a lot of pressure on the database.

# Isolations

## 🔍 Common Concurrency Anomalies

| Anomaly              | Description                                                                 |
|----------------------|-----------------------------------------------------------------------------|
| **Dirty Read**       | A transaction reads uncommitted changes from another transaction.           |
| **Non-repeatable Read** | A transaction reads the same row twice and gets different values.         |
| **Phantom Read**     | A transaction reads rows with a condition, then sees new rows added later. |

---

## 🛡️ Isolation Levels and Their Guarantees

| Isolation Level      | Dirty Reads | Non-repeatable Reads | Phantom Reads |
|----------------------|-------------|-----------------------|----------------|
| **READ UNCOMMITTED** | ✅ Yes      | ✅ Yes                | ✅ Yes         |
| **READ COMMITTED**   | ❌ No       | ✅ Yes                | ✅ Yes         |
| **REPEATABLE READ**  | ❌ No       | ❌ No                 | ✅ Yes         |
| **SERIALIZABLE**     | ❌ No       | ❌ No                 | ❌ No          |

> 🔥 `SERIALIZABLE` is the most strict and safe, but also the most expensive in terms of performance.

---

## 🧪 Practical Examples

### Dirty Read (READ UNCOMMITTED)
```sql
-- Tx1
UPDATE users SET balance = 1000 WHERE id = 1;

-- Tx2
SELECT balance FROM users WHERE id = 1; -- Sees 1000, not yet committed

-- Tx1
ROLLBACK;
```
- Pb: Tx2 a récupéré une valeur erronée

### Non-repeatable Read (READ COMMITTED)
```sql
-- Tx1
SELECT name FROM users WHERE id = 1; -- "Alice"

-- Tx2
UPDATE users SET name = 'Bob' WHERE id = 1;
COMMIT;

-- Tx1
SELECT name FROM users WHERE id = 1; -- "Bob"
```

### Phantom Read (REPEATABLE READ)

```sql
-- Tx1
SELECT * FROM users WHERE age > 30; -- 2 rows

-- Tx2
INSERT INTO users (name, age) VALUES ('Tom', 35);
COMMIT;

-- Tx1
SELECT * FROM users WHERE age > 30; -- 3 rows
```

## 🛠️ Default Transaction Isolation Levels by Database

| Database           | Default Isolation Level   |
|--------------------|----------------------------|
| **PostgreSQL**     | `READ COMMITTED`           |
| **MySQL (InnoDB)** | `REPEATABLE READ`          |
| **Oracle**         | `READ COMMITTED`           |
| **SQL Server**     | `READ COMMITTED`           |
| **H2** (in-memory) | `READ COMMITTED`           |