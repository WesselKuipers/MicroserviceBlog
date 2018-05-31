package nl.fontys.microserviceblog.controller;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import nl.fontys.microserviceblog.dao.BlogEntryRepository;
import nl.fontys.microserviceblog.model.BlogEntry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.DELETE;
import java.util.Collection;
import java.util.Optional;

@RestController
@CrossOrigin
public class BlogController {
    private final BlogEntryRepository blogEntryRepository;

    @Autowired
    BlogController(BlogEntryRepository blogEntryRepository) {
        this.blogEntryRepository = blogEntryRepository;
    }

    @GetMapping
    private Collection<BlogEntry> getBlogEntries() {
        return this.blogEntryRepository.findAll();
    }

    @GetMapping(path = "/{blogId}")
    private ResponseEntity getBlogEntry(@PathVariable long blogId) {
        Optional<BlogEntry> blogEntry = this.blogEntryRepository.findById(blogId);

        if (blogEntry.isPresent()) {
            return ResponseEntity.ok(blogEntry.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping()
    private ResponseEntity createBlogEntry(@RequestBody BlogEntry entry, @RequestHeader("Authentication") String bearer) {
        String token = bearer.replace("Bearer ", "");
        Claims claims = Jwts.parser().setSigningKey("secret").parseClaimsJws(token).getBody();
        int id = Integer.parseInt(claims.get("authorId").toString());

        if (id != entry.getAuthorId()) {
            return ResponseEntity.unprocessableEntity().build();
        }

        return ResponseEntity.ok(this.blogEntryRepository.save(entry));
    }

    @PutMapping
    private ResponseEntity updateBlogEntry(@RequestBody BlogEntry entry, @RequestHeader("Authentication") String bearer) {
        String token = bearer.replace("Bearer ", "");
        Claims claims = Jwts.parser().setSigningKey("secret").parseClaimsJws(token).getBody();
        int id = Integer.parseInt(claims.get("authorId").toString());

        if (id != entry.getAuthorId()) {
            return ResponseEntity.unprocessableEntity().build();
        }

        return ResponseEntity.ok(this.blogEntryRepository.save(entry));
    }

    @DeleteMapping
    private ResponseEntity deleteBlogEntry(@RequestBody BlogEntry entry, @RequestHeader("Authentication") String bearer) {
        String token = bearer.replace("Bearer ", "");
        Claims claims = Jwts.parser().setSigningKey("secret").parseClaimsJws(token).getBody();
        int id = Integer.parseInt(claims.get("authorId").toString());

        if (id != entry.getAuthorId()) {
            return ResponseEntity.unprocessableEntity().build();
        }

        blogEntryRepository.delete(entry);
        return ResponseEntity.ok().build();
    }
}
