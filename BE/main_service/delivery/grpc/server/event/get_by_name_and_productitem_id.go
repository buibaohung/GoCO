package event

import (
	"context"
	"encoding/json"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	"main_service/config/grpc/proto/domain"
	pbEvent "main_service/config/grpc/proto/service/main/event"
	"main_service/endpoints/auth/event"
	"main_service/model"
	"main_service/util"
)

func (s *Service) GetByNameAndProductItemID(ctx context.Context, req *pbEvent.GetByNameAndProductItemIDRequest) (*pbEvent.GetByNameAndProductItemIDResponse, error) {
	// decode
	eReq := &event.GetByNameAndProductItemIDRequest{
		Name:          model.EventType(req.Name),
		ProductItemID: req.ProductItemId,
	}

	// handle
	r, err := s.Endpoints.GetByNameAndProductItemID(ctx, eReq)
	if err != nil {
		e := err.(util.MyError)
		return nil, status.Errorf(codes.Code(e.ErrorCode), e.Error())
	}
	events := r.([]model.Event)

	// encode
	resp := &pbEvent.GetByNameAndProductItemIDResponse{}
	for _, event := range events {
		pbEvent := &domain.Event{}

		b, _ := json.Marshal(event)
		json.Unmarshal(b, &pbEvent)

		resp.Events = append(resp.Events, pbEvent)
	}

	return resp, nil
}
