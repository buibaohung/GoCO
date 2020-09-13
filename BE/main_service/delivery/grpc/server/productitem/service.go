package productitem

import (
	"main_service/config/grpc/proto/service/main/productitem"
	"main_service/endpoints/auth/product_item"
)

type Service struct {
	productitem.UnimplementedProductItemServer
	Endpoints product_item.Endpoints
}
