package com.project.service;
import com.project.entity.Producto;
import com.project.exception.ProductoException;
import com.project.repository.ProductoRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductoService{

    private final ProductoRepository repository;

    public ProductServiceImpl(ProductoRepository repository) {
        this.repository = repository;
    }


    @Override
    public List<Producto> listProduct() {
        return repository.findAll();
    }

    @Override
    public Producto searchById(Long id) {
        return repository.findById(id).orElseThrow( () -> new ProductoException("Producto no encontrado"));
    }

    @Override

    public Producto save(Producto producto){
        try{
            Producto newProducto = new Producto();
            Date now = new Date();

            newProducto.setName(producto.getName());
            newProducto.setPrice(producto.getPrice());
            newProducto.setCreatedAt(now);
            newProducto.setUpdatedAt(null); // no es necesario pero necesito dejarlo null para no perderme
            return repository.save(newProducto);
        } catch (ProductoException e) {
            throw new ProductoException(e.getMessage());
        }
    }

    @Override
    public Producto update(Long id, Producto producto) {
        try {
            Producto existente = searchById(id);
            Date now = new Date();

            existente.setName(producto.getName());
            existente.setPrice(producto.getPrice());
            //no llamo createAt ya que eso se mantiene fijo
            existente.setUpdatedAt(now);
            return repository.save(existente);
        }
        catch (ProductoException e) {
            throw new ProductoException(e.getMessage());
        }

    }

    @Override
    public void remove(Long id) {
        try {
            repository.deleteById(id);
        }
        catch (ProductoException e) {
            throw new ProductoException(e.getMessage());
        }
    }
}
