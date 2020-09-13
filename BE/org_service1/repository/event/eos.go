package event

import (
	"context"
	"encoding/json"
	"org_service/config/grpc/client"
	"org_service/config/grpc/proto/domain"
	pbEOS "org_service/config/grpc/proto/service/eos"
	"org_service/model"
)

type eosEventRepository struct {
	grpcClient *client.GrpcClient
}

// NewEOSEventRepository .
func NewEOSEventRepository(grpcClient *client.GrpcClient) EventRepository {
	return eosEventRepository{grpcClient}
}

func (r eosEventRepository) Create(ctx context.Context, event *model.Event) (*model.Event, error) {
	pbEvent := &domain.Event{}
	b, _ := json.Marshal(event)
	json.Unmarshal(b, pbEvent)
	pbEvent.CreatedAt = event.CreatedAt.Unix()
	pbEvent.SoldAt = event.SoldAt.Unix()

	_, err := r.grpcClient.EOS.NewEvent(ctx, &pbEOS.NewEventRequest{
		Event: pbEvent,
		EosAccount: &domain.EosAccount{
			Name:       client.EOSName,
			PrivateKey: client.EOSPrivKey,
		},
	})

	return event, err
}
