package product

import (
	"context"
	"encoding/json"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	"main_service/config/grpc/proto/domain"
	"main_service/endpoints/auth/product"
	"main_service/util"
)

func (s *Service) Update(ctx context.Context, req *domain.Product) (*domain.Product, error) {
	// decode
	eReq := &product.UpdateProductRequest{}
	b, _ := json.Marshal(req)
	json.Unmarshal(b, &(eReq.Product))

	// handle
	product, err := s.Endpoints.UpdateProduct(ctx, eReq)
	if err != nil {
		e := err.(util.MyError)
		return nil, status.Errorf(codes.Code(e.ErrorCode), e.Error())
	}

	// encode
	resp := &domain.Product{}
	b, _ = json.Marshal(product)
	json.Unmarshal(b, resp)

	return resp, nil
}
