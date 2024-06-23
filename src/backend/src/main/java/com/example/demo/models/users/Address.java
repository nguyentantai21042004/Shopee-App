package com.example.demo.models.users;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;

@AllArgsConstructor
@Getter
@Setter
@Document(collection = "addresses")
public class Address {
    @Id
    private String id;

    private String street;

    private String ward;

    private String district;

    @NotBlank(message = "city is required")
    private String city;
}