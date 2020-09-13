package product

import (
	"context"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	"main_service/config/grpc/proto/domain"
	pbProduct "main_service/config/grpc/proto/service/main/product"
	"main_service/endpoints/auth/product"
	"main_service/util"
)

func (s *Service) Delete(ctx context.Context, req *pbProduct.DeleteRequest) (*domain.Response, error) {
	// decode
	eReq := &product.DeleteProductRequest{}
	eReq.ProductID = req.ProductId

	// handle
	_, err := s.Endpoints.DeleteProduct(ctx, eReq)
	if err != nil {
		e := err.(util.MyError)
		return nil, status.Errorf(codes.Code(e.ErrorCode), e.Error())
	}

	// encode
	resp := &domain.Response{Status: 1}
	return resp, nil
}
