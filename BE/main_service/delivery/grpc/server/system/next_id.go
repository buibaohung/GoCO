package system

import (
	"context"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	pbSystem "main_service/config/grpc/proto/service/main/system"
	"main_service/endpoints/system"
	"main_service/util"
)

func (s *Service) NextID(ctx context.Context, req *pbSystem.NextIDRequest) (*pbSystem.NextIDResponse, error) {
	// decode
	eReq := &system.NextIDRequest{Table: req.Table}

	// handle
	r, err := s.Endpoints.NextID(ctx, eReq)
	if err != nil {
		e := err.(util.MyError)
		return nil, status.Errorf(codes.Code(e.ErrorCode), e.Error())
	}
	nextID := r.(system.NextIDResponse)

	// encode
	resp := &pbSystem.NextIDResponse{Id: nextID.ID}
	return resp, nil
}
