package com.example.demo.repositories;

import com.example.demo.models.Category;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface CategoryRepository extends MongoRepository<Category,String> {
    Optional<Category> findById(ObjectId id);
    Optional<Category> findByName(String name);
}
