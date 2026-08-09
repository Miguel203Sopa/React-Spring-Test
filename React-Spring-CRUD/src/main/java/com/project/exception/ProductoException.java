package com.project.exception;

public class ProductoException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public ProductoException() { super();}

    public ProductoException(String message) { super(message);}

    public ProductoException(String message, Throwable cause) { super(message, cause); }
}
