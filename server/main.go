package main

import (
	"encoding/json"
	"flag"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

type Staff struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
	Post string `json:"post"`
}

type Customer struct {
	ID           int    `json:"id"`
	Name         string `json:"name"`
	Organization string `json:"org"`
}

type Product struct {
	ID          int     `json:"id"`
	Name        string  `json:"name"`
	Description string  `json:"description"`
	Price       float32 `json:"price"`
}

var (
	products  []Product
	staffs    []Staff
	customers []Customer
)

func main() {
	bindAddress := flag.String("addr", ":8080", "Port to run server on")
	flag.Parse()
	l := log.New(os.Stdout, "service-api", log.LstdFlags)
	router := mux.NewRouter()

	// Seed data
	products = append(products, Product{1, "Transportation", "Service providing transportation from point a to b.", 1233}, Product{2, "Communication", "Communication service between consumers.", 3421}, Product{3, "Banking", "Providing monetary services.", 1221})
	staffs = append(staffs, Staff{1, "John Doe", "CEO"}, Staff{2, "Neo", "CTO"})
	customers = append(customers, Customer{1, "Clint Eastwood", "clint corporation"}, Customer{2, "Po", "po foundation"}, Customer{3, "Viggo Mortensen", "AHV pvt ltd."})

	router.HandleFunc("/products", getProducts).Methods("GET")
	router.HandleFunc("/products/{id}", getProduct).Methods("GET")
	router.HandleFunc("/products", createProduct).Methods("POST")
	router.HandleFunc("/products/{id}", updateProduct).Methods("PUT")
	router.HandleFunc("/products/{id}", deleteProduct).Methods("DELETE")

	router.HandleFunc("/staffs", getStaffs).Methods("GET")
	router.HandleFunc("/customers", getCustomers).Methods("GET")

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173"},
		AllowCredentials: true,
	})

	handler := c.Handler(router)

	log.Fatal(http.ListenAndServe(*bindAddress, handler))
	l.Println("Starting server on port ", *bindAddress)
}

func getProducts(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(products)
}

func getStaffs(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(staffs)
}

func getCustomers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(customers)
}

func getProduct(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	id, err := strconv.Atoi(params["id"])
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	for _, product := range products {
		if product.ID == id {
			json.NewEncoder(w).Encode(product)
			return
		}
	}
	w.WriteHeader(http.StatusNotFound)
}

func createProduct(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var product Product
	err := json.NewDecoder(r.Body).Decode(&product)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	product.ID = len(products) + 1
	products = append(products, product)
	json.NewEncoder(w).Encode(product)
}

func updateProduct(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	id, err := strconv.Atoi(params["id"])
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	var updatedProduct Product
	err = json.NewDecoder(r.Body).Decode(&updatedProduct)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	for i, product := range products {
		if product.ID == id {
			products[i].Name = updatedProduct.Name
			products[i].Description = updatedProduct.Description
			json.NewEncoder(w).Encode(products[i])
			return
		}
	}

	w.WriteHeader(http.StatusNotFound)
}

func deleteProduct(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	id, err := strconv.Atoi(params["id"])
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	for i, product := range products {
		if product.ID == id {
			products = append(products[:i], products[i+1:]...)
			json.NewEncoder(w).Encode(product)
			return
		}
	}

	w.WriteHeader(http.StatusNotFound)
}
