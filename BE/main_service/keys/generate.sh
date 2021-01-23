#!/bin/sh

CA_PASS="1234"
SERVER_PASS="4321"
CLIENT_PASS="5678"

###################### Server ######################
# Generate CA key:
openssl genrsa -des3 -out ca.key -passout pass:$CA_PASS 4096

# Generate CA certificate:
openssl req -new -x509 -days 3650 -key ca.key -out ca.crt -passin pass:$CA_PASS -subj "/C=VN/ST=HCM/L=HCM/O=HDT Ltd/OU=HTD Ltd/CN=fotra.com"

# Generate server key:
openssl genrsa -des3 -out server.key -passout pass:$SERVER_PASS 4096

# Generate server signing request:
openssl req -new -key server.key -out server.csr -passin pass:$SERVER_PASS -subj "/C=VN/ST=HCM/L=HCM/O=HDT Ltd/OU=HTD Ltd/CN=fotra.com"

# Self-sign server certificate:
openssl x509 -req -days 365 -in server.csr -CA ca.crt -CAkey ca.key -set_serial 01 -out server.crt -passin pass:$CA_PASS

# Remove passphrase from the server key:
openssl rsa -in server.key -out server.key -passin pass:$SERVER_PASS

###################### Client ######################
# Generate client key:
openssl genrsa -des3 -out client.key -passout pass:$CLIENT_PASS 4096

# Generate client signing request:
openssl req -new -key client.key -out client.csr -passin pass:$CLIENT_PASS -subj "/C=VN/ST=HCM/L=HCM/O=HDT Ltd/OU=HTD Ltd/CN=fotra.com"

# Self-sign client certificate:
openssl x509 -req -days 3650 -in client.csr -CA ca.crt -CAkey ca.key -set_serial 01 -out client.crt -passin pass:$CA_PASS

# Remove passphrase from the client key:
openssl rsa -in client.key -out client.key -passin pass:$CLIENT_PASS
