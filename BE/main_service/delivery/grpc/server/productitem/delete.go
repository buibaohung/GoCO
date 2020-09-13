package productitem

import (
	"context"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	"main_service/config/grpc/proto/domain"
	pbProductItem "main_service/config/grpc/proto/service/main/productitem"
	"main_service/endpoints/auth/product_item"
	"main_service/util"
)

func (s *Service) Delete(ctx context.Context, req *pbProductItem.DeleteRequest) (*domain.Response, error) {
	// decode
	eReq := &product_item.DeleteProductItemRequest{ProductItemID: req.ProductItemId}

	// handle
	_, err := s.Endpoints.DeleteProductItem(ctx, eReq)
	if err != nil {
		e := err.(util.MyError)
		return nil, status.Errorf(codes.Code(e.ErrorCode), e.Error())
	}

	// encode
	resp := &domain.Response{Status: 1}
	return resp, nil
}
