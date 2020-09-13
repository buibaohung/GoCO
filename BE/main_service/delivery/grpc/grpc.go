package grpc

import (
	"crypto/tls"
	"net"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"

	event_pb "main_service/config/grpc/proto/service/main/event"
	facility_pb "main_service/config/grpc/proto/service/main/facility"
	product_pb "main_service/config/grpc/proto/service/main/product"
	productitem_pb "main_service/config/grpc/proto/service/main/productitem"
	system_pb "main_service/config/grpc/proto/service/main/system"
	"main_service/delivery/grpc/server/event"
	"main_service/delivery/grpc/server/facility"
	"main_service/delivery/grpc/server/product"
	"main_service/delivery/grpc/server/productitem"
	"main_service/delivery/grpc/server/system"
	"main_service/endpoints"
	"main_service/util"
)

func NewServer(e endpoints.Endpoints) error {
	port := util.GetEnv("GRPC_PORT", "50052")

	lis, err := net.Listen("tcp", ":"+port)
	if err != nil {
		return err
	}

	cert, err := tls.LoadX509KeyPair("keys/server.crt", "keys/server.key")
	if err != nil {
		return err
	}

	grpcServer := grpc.NewServer(
		grpc.UnaryInterceptor(e.AuthMiddlewares.GRPCAuth),
		grpc.Creds(credentials.NewServerTLSFromCert(&cert)),
	)

	product_pb.RegisterProductServer(grpcServer, &product.Service{
		Endpoints:       e.Auth.Product,
		PublicEndpoints: e.Public,
	})
	productitem_pb.RegisterProductItemServer(grpcServer, &productitem.Service{Endpoints: e.Auth.ProductItem})
	event_pb.RegisterEventServer(grpcServer, &event.Service{Endpoints: e.Auth.Event})
	system_pb.RegisterSystemServer(grpcServer, &system.Service{Endpoints: e.System})
	facility_pb.RegisterFacilityServer(grpcServer, &facility.Service{Endpoints: e.Public.Facility})

	err = grpcServer.Serve(lis)
	if err != nil {
		return err
	}

	return nil
}
