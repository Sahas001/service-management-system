client:
	cd client && npm run dev
server:
	cd server && go run main.go

.PHONY: client server
