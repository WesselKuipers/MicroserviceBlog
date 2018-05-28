package nl.fontys.microserviceblog.dao;

import nl.fontys.microserviceblog.model.Author;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorRepository extends JpaRepository<Author, Long> {
}
