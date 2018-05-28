package nl.fontys.microserviceblog.controller;

import nl.fontys.microserviceblog.dao.BlogEntryRepository;
import nl.fontys.microserviceblog.model.BlogEntry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.DELETE;
import java.util.Collection;
import java.util.Optional;

@RestController
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
    private BlogEntry createBlogEntry(@RequestBody BlogEntry entry) {
        return this.blogEntryRepository.save(entry);
    }

    @PutMapping
    private BlogEntry updateBlogEntry(@RequestBody BlogEntry entry) {
        return this.blogEntryRepository.save(entry);
    }

    @DeleteMapping
    private ResponseEntity deleteBlogEntry(@RequestBody BlogEntry entry) {
        blogEntryRepository.delete(entry);
        return ResponseEntity.ok().build();
    }
}
