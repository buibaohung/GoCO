package system

import (
	"context"

	"org_service/config/grpc/client"
	pbSystem "org_service/config/grpc/proto/service/main/system"
)

type pgSystemRepository struct {
	grpcClient *client.GrpcClient
}

// NewPGSystemRepository .
func NewPGSystemRepository(grpcClient *client.GrpcClient) SystemRepository {
	return pgSystemRepository{grpcClient}
}

func (r pgSystemRepository) NextID(ctx context.Context, table string) (string, error) {
	resp, err := r.grpcClient.System.NextID(ctx, &pbSystem.NextIDRequest{Table: table})
	if err != nil {
		return "", err
	}

	return resp.GetId(), nil
}
