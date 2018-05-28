package nl.fontys.microserviceblog.dao;

import nl.fontys.microserviceblog.model.BlogEntry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogEntryRepository extends JpaRepository<BlogEntry, Long> {

}
