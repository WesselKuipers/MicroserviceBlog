package nl.fontys.microserviceblog.controller;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import nl.fontys.microserviceblog.dao.AuthorRepository;
import nl.fontys.microserviceblog.model.Author;
import nl.fontys.microserviceblog.model.Credentials;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
public class AuthorController {
    private final AuthorRepository authorRepository;

    @Autowired
    AuthorController(AuthorRepository authorRepository) {
        this.authorRepository = authorRepository;
    }

    @GetMapping
    private Collection<Author> getAuthors() {
        return this.authorRepository.findAll();
    }

    @GetMapping(path = "/{authorId}")
    private ResponseEntity getBlogEntry(@PathVariable long authorId) {
        Optional<Author> author = this.authorRepository.findById(authorId);

        if (author.isPresent()) {
            return ResponseEntity.ok(author.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping()
    private Author createAuthor(@RequestBody Author entry) {
        return this.authorRepository.save(entry);
    }

    @PutMapping
    private Author updateAuthor(@RequestBody Author entry) {
        return this.authorRepository.save(entry);
    }

    @DeleteMapping
    private ResponseEntity deleteAuthor(@RequestBody Author entry) {
        authorRepository.delete(entry);
        return ResponseEntity.ok().build();
    }

    @PostMapping(path = "/authenticate")
    private ResponseEntity authenticate(@RequestBody Credentials credentials) {
        List<Author> authors = authorRepository.findAll();

        for(Author author : authors) {
            if (author.getPassword().equals(credentials.getPassword()) && author.getName().equals(credentials.getUsername())) {
                String token = Jwts.builder().setSubject(credentials.getUsername()).claim("username", credentials.getUsername()).claim("authorId", author.getId()).signWith(SignatureAlgorithm.HS512, "secret").compact();
                String json = "{\"token\": \""+token+"\", \"authorId\": "+author.getId()+", \"username\": \""+author.getName()+"\"}";

                return ResponseEntity.ok(json);
            }
        }
        return ResponseEntity.notFound().build();
    }
}
