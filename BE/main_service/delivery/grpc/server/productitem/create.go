package productitem

import (
	"context"
	"encoding/json"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	"main_service/config/grpc/proto/domain"
	"main_service/endpoints/auth/product_item"
	"main_service/util"
)

func (s *Service) Create(ctx context.Context, req *domain.ProductItem) (*domain.ProductItem, error) {
	// decode
	eReq := &product_item.CreateProductItemRequest{}

	b, _ := json.Marshal(req)
	json.Unmarshal(b, &(eReq.ProductItem))

	// handle
	productItem, err := s.Endpoints.CreateProductItem(ctx, eReq)
	if err != nil {
		e := err.(util.MyError)
		return nil, status.Errorf(codes.Code(e.ErrorCode), e.Error())
	}

	// encode
	resp := &domain.ProductItem{}
	b, _ = json.Marshal(productItem)
	json.Unmarshal(b, resp)

	return resp, nil
}
