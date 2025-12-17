package com.codedifferently.lesson25.repository;

import java.util.List;

import com.codedifferently.lesson25.models.LibraryUserModel;

public interface LibraryUserRepository {
  List<LibraryUserModel> findAll();
}