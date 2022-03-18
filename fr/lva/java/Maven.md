# Packaging

After executing the ``mvn package`` command, we can find the built JAR file spring-boot-artifacts-2.jar under the target directory. Let's check the content of the created JAR file:

```
$ jar tf target/spring-boot-artifacts-2.jar
META-INF/
META-INF/MANIFEST.MF
com/
com/baeldung/
com/baeldung/demo/
application.yml
com/baeldung/demo/DemoApplication.class
com/baeldung/demo/DemoRestController.class
META-INF/maven/...
```

As we can see in the output above, the JAR file created by the mvn package command contains only the resources and compiled Java classes from our project's source.

We can use this JAR file as a dependency in another project. However, we cannot execute the JAR file using java -jar JAR_FILE even if it's a Spring Boot application. This is because the runtime dependencies are not bunded. For example, we don't have a servlet container to start the web context.

To start our Spring Boot application using the simple java -jar command, we need to build a fat JAR. The Spring Boot Maven Plugin can help us with that.

Configuration :
````xml
<build>
    <finalName>${project.artifactId}</finalName>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
            <!-- Add execution if we want to use it during mvn lifecycle (during mvn package phase) -->
            <executions>
                <execution>
                    <goals>
                        <goal>repackage</goal>
                    </goals>
                </execution>
            </executions>
        </plugin>
    </plugins>
</build>
````
The ``spring-boot:repackage`` goal takes the existing JAR or WAR archive as the source and repackages all the project runtime dependencies inside the final artifact together with project classes. In this way, the repackaged artifact is executable using the command line ``java -jar JAR_FILE.jar.``

In the repackaged JAR file, we have not only the compiled Java classes from our project but also all the runtime libraries that are needed to start our Spring Boot application. For example, an embedded tomcat library is packaged into the BOOT-INF/lib directory.