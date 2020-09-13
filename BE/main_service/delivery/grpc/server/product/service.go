package product

import (
	pbProduct "main_service/config/grpc/proto/service/main/product"
	"main_service/endpoints/auth/product"
	"main_service/endpoints/public"
)

type Service struct {
	pbProduct.UnimplementedProductServer
	Endpoints       product.Endpoints
	PublicEndpoints public.Endpoints
}
