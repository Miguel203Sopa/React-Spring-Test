package com.project.service;

import com.project.entity.Producto;

import java.util.List;

public interface ProductoService {

    List<Producto> listProduct();

    Producto searchById(Long id);

    Producto save (Producto producto);

    Producto update(Long id,Producto producto);

    void remove(Long id);
}
