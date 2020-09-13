package client

import (
	"log"

	"google.golang.org/grpc"

	pbEOS "main_service/config/grpc/proto/service/eos"
	"main_service/util"
)

var client *grpcClient

type grpcClient struct {
	EOS pbEOS.EOSClient
}

func New() (*grpcClient, func()) {
	eosServHost := util.GetEnv("SERV_EOS_HOST", "localhost")
	eosServPort := util.GetEnv("SERV_EOS_PORT", "50051")

	connEOS, err := grpc.Dial(eosServHost+":"+eosServPort, grpc.WithInsecure())
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}

	client = &grpcClient{
		EOS: pbEOS.NewEOSClient(connEOS),
	}

	return client, func() {
		connEOS.Close()
	}
}

func GetClient() *grpcClient {
	return client
}
