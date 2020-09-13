FROM golang:1.12-alpine as builder
RUN apk update && apk add --no-cache git make g++ ca-certificates tzdata && update-ca-certificates
WORKDIR /location_service
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go mod verify
RUN make build

FROM alpine:3.10
RUN adduser -D -g '' appuser
WORKDIR /app
COPY --from=builder /usr/share/zoneinfo /usr/share/zoneinfo
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=builder /location_service/bin/server/main ./server
COPY --from=builder /location_service/config/database/db.sql ./db.sql

ENV DB_FILE db.sql

USER appuser

CMD ["/app/server"]