# Stage 1: Build the static binary
FROM golang:1.24 AS builder

# Set module-aware mode and working dir
ENV CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=amd64

WORKDIR /src

# Copy go.mod and go.sum first for efficient caching (if present)
COPY src/go.mod ./
RUN if [ -f go.mod ]; then go mod download; fi

# Copy the rest of the source
COPY src .

# Build the binary (adjust -o name and main package path as needed)
RUN go build -ldflags="-s -w" -o /app/main ./cmd/batchtransfer

# Stage 2: Minimal runtime using scratch
FROM scratch

# Copy binary from builder
COPY --from=builder /app/main /app/main

# Expose port if your app listens on one (optional)
EXPOSE 8080

# Set a non-root user ID (scratch has no /etc/passwd; use numeric UID)
USER 1000

# Command
ENTRYPOINT ["/app/main"]