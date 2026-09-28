# Stage 1: Build Frontend (React + Vite)
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# Stage 2: Build Spring Boot JAR (Java 17 + Maven)
FROM maven:3.9-eclipse-temurin-17-alpine AS backend-builder
WORKDIR /app
COPY pom.xml ./
COPY src ./src
# Copy compiled frontend static assets from Stage 1
COPY --from=frontend-builder /app/src/main/resources/static ./src/main/resources/static
RUN mvn clean package -DskipTests

# Stage 3: Ultra-lightweight JRE 17 Runtime for Free Tier
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
EXPOSE 8080
ENV PORT=8080
# Limit memory to 384MB so it comfortably fits within 512MB free tiers (Render/Koyeb)
ENV JAVA_OPTS="-Xmx384m -Xms128m -XX:+UseG1GC"
COPY --from=backend-builder /app/target/*.jar app.jar
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
