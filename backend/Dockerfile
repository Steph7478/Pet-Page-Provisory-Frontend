FROM eclipse-temurin:17-jdk-alpine

# Diretório da aplicação
WORKDIR /app

# Copiando arquivos necessários
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

# Permissão e baixar dependências
RUN chmod +x mvnw
RUN ./mvnw dependency:go-offline

# Copiar o restante da aplicação
COPY src ./src

# Gerar o .jar sem rodar os testes
RUN ./mvnw clean package -DskipTests

# debug
RUN ls -la target

EXPOSE 8080

COPY target/patamansa-0.0.1-SNAPSHOT.jar app.jar

CMD ["java", "-Dspring.profiles.active=railway", "-jar", "app.jar"]



