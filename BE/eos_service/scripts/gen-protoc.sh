protoc-gen-grpc -I ../../protos --js_out=import_style=commonjs,binary:./proto --grpc_out=./proto ../../protos/domain/domain.proto
protoc-gen-grpc-ts -I ../../protos --ts_out=service=true:./proto ../../protos/domain/domain.proto

protoc-gen-grpc -I ../../protos --js_out=import_style=commonjs,binary:./proto --grpc_out=./proto ../../protos/service/eos/eos.proto
protoc-gen-grpc-ts -I ../../protos --ts_out=service=true:./proto ../../protos/service/eos/eos.proto