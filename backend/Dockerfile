FROM eclipse-temurin:22-jdk
WORKDIR /app
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src
RUN ./mvnw package -DskipTests
ENTRYPOINT ["java","-jar","target/sounds-0.0.1-SNAPSHOT.jar"]
