package com.git.myworkspace.contact;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.git.myworkspace.lib.TextProcesser;

@RestController
public class ContactController {

	private ContactRepository repo;

	@Autowired
	public ContactController(ContactRepository repo) {
		this.repo = repo;
	}

	@GetMapping(value = "/contacts")
	public List<Contact> getContacts() throws InterruptedException {
		return repo.findAll();

	}

	@PostMapping(value = "/contacts")
	public Contact addContact(@RequestBody Contact contact, HttpServletResponse res) throws InterruptedException {

		if (TextProcesser.isEmptyText(contact.getName()) || TextProcesser.isEmptyText(contact.getPhone())
				|| TextProcesser.isEmptyText(contact.getEmail()) || TextProcesser.isEmptyText(contact.getMemo())) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		Contact contactItem = Contact.builder().name(contact.getName()).phone(contact.getPhone())
				.email(contact.getEmail()).memo(contact.getMemo()).createdTime(new Date().getTime()).build();

		Contact contactSaved = repo.save(contactItem);

		res.setStatus(HttpServletResponse.SC_CREATED);

		return contactSaved;

	}

	@DeleteMapping(value = "/contacts/{id}")
	public boolean removeContact(@PathVariable Long id, HttpServletResponse res) throws InterruptedException {


		Optional<Contact> contact = repo.findById(id);
		if (contact.isEmpty()) { 
			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			return false;
		}

		repo.deleteById(id);

		return true;
	}

	@PutMapping(value = "/contacts/{id}")
	public Contact modifyContact(@PathVariable long id, @RequestBody Contact contact, HttpServletResponse res)
			throws InterruptedException {

		Optional<Contact> contactItem = repo.findById(id);

		if (contactItem.isEmpty()) { 
			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			return null;
		}

		if (TextProcesser.isEmptyText(contact.getName()) || TextProcesser.isEmptyText(contact.getPhone())
				|| TextProcesser.isEmptyText(contact.getEmail()) || TextProcesser.isEmptyText(contact.getMemo())) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		Contact contactToSave = contactItem.get();

		contactItem.get().setName(contact.getName());
		contactItem.get().setPhone(contact.getPhone());
		contactItem.get().setEmail(contact.getEmail());
		contactItem.get().setMemo(contact.getMemo());

		Contact contactSaved = repo.save(contactToSave);

		return contactSaved;
	}

}