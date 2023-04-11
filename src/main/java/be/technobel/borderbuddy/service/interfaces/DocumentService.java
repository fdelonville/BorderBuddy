package be.technobel.borderbuddy.service.interfaces;

import be.technobel.borderbuddy.model.dto.DocumentDTO;

public interface DocumentService {
    void create();
    DocumentDTO getOne();
}
