package client

import (
	"log"

	"golang.org/x/oauth2"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"
	"google.golang.org/grpc/credentials/oauth"

	pbEOS "org_service/config/grpc/proto/service/eos"
	pbEvent "org_service/config/grpc/proto/service/main/event"
	pbProduct "org_service/config/grpc/proto/service/main/product"
	pbProductItem "org_service/config/grpc/proto/service/main/productitem"
	pbSystem "org_service/config/grpc/proto/service/main/system"
	"org_service/util"
)

var client *GrpcClient

var EOSName string
var EOSPrivKey string

type GrpcClient struct {
	EOS         pbEOS.EOSClient
	Product     pbProduct.ProductClient
	ProductItem pbProductItem.ProductItemClient
	Event       pbEvent.EventClient
	System      pbSystem.SystemClient
}

func New() (*GrpcClient, func()) {
	// eos service
	EOSName = util.GetEnv("EOS_ACCOUNT_NAME", "awxqlxnpixsu")
	EOSPrivKey = util.GetEnv("EOS_PRIVATE_KEY", "5J1H3JVud4xRqoCQ2TLq8N2Q6eaqhiWdxK79U9LPwWJjesurRpu")

	eosServHost := util.GetEnv("SERV_EOS_HOST", "localhost")
	eosServPort := util.GetEnv("SERV_EOS_PORT", "50051")

	connEOS, err := grpc.Dial(eosServHost+":"+eosServPort, grpc.WithInsecure())
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}

	// product service
	mainServHost := util.GetEnv("SERV_MAIN_HOST", "localhost")
	mainServPort := util.GetEnv("SERV_MAIN_PORT", "50052")

	token := &oauth2.Token{
		AccessToken: EOSPrivKey,
	}
	perRPC := oauth.NewOauthAccess(token)
	creds, err := credentials.NewClientTLSFromFile("keys/server.crt", "fotra.com")
	if err != nil {
		log.Fatalf("failed to load credentials: %v", err)
	}
	opts := []grpc.DialOption{
		grpc.WithPerRPCCredentials(perRPC),
		grpc.WithTransportCredentials(creds),
	}

	connMain, err := grpc.Dial(mainServHost+":"+mainServPort, opts...)
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}

	client = &GrpcClient{
		EOS:         pbEOS.NewEOSClient(connEOS),
		Product:     pbProduct.NewProductClient(connMain),
		ProductItem: pbProductItem.NewProductItemClient(connMain),
		Event:       pbEvent.NewEventClient(connMain),
		System:      pbSystem.NewSystemClient(connMain),
	}

	return client, func() {
		connEOS.Close()
		connMain.Close()
	}
}

func GetClient() *GrpcClient {
	return client
}
