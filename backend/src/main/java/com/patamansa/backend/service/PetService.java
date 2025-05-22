package com.patamansa.backend.service;

import org.springframework.stereotype.Service;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbEnhancedClient;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbTable;
import software.amazon.awssdk.enhanced.dynamodb.TableSchema;
import com.patamansa.backend.model.Pet;
import software.amazon.awssdk.enhanced.dynamodb.Expression;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class PetService {

    private final DynamoDbTable<Pet> petTable;
    private final DynamoDbEnhancedClient dynamoDbEnhancedClient;

    public PetService(DynamoDbEnhancedClient dynamoDbEnhancedClient) {
        this.dynamoDbEnhancedClient = dynamoDbEnhancedClient;
        this.petTable = dynamoDbEnhancedClient.table("Pets", TableSchema.fromBean(Pet.class));
    }

    public List<Pet> findByStatus(String status) {
        List<Pet> resultado = new ArrayList<>();

        // Expression.builder()	Define a expressão de filtro (como um WHERE do SQL)
        Expression filtro = Expression.builder()
                .expression("status = :status")
                //Map.of(":status", ...)	Define os valores usados no filtro
                .expressionValues(Map.of(":status", AttributeValue.fromS(status)))
                .build();

        // Busca na tabela
        petTable.scan(r -> r.filterExpression(filtro))
                .items()
                .forEach(resultado::add);

        return resultado;
    }

}
