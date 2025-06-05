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

# Expõe a porta usada pela aplicação
EXPOSE 8080

# Copia o JAR final para o container
COPY target/app.jar app.jar

# Rodar o .jar diretamente com o profile definido pela variável de ambiente
CMD ["java", "-Dspring.profiles.active=${APP_PROFILE}", "-jar", "/app.jar"]

