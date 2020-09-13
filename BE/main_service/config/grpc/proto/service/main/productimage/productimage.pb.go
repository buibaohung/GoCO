// Code generated by protoc-gen-go. DO NOT EDIT.
// source: service/main/productimage/productimage.proto

package productimage

import (
	context "context"
	fmt "fmt"
	math "math"

	domain "main_service/config/grpc/proto/domain"

	proto "github.com/golang/protobuf/proto"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.ProtoPackageIsVersion3 // please upgrade the proto package

type GetByProductIDRequest struct {
	ProductId            string   `protobuf:"bytes,1,opt,name=product_id,json=productId,proto3" json:"product_id,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *GetByProductIDRequest) Reset()         { *m = GetByProductIDRequest{} }
func (m *GetByProductIDRequest) String() string { return proto.CompactTextString(m) }
func (*GetByProductIDRequest) ProtoMessage()    {}
func (*GetByProductIDRequest) Descriptor() ([]byte, []int) {
	return fileDescriptor_d123e2d269ba0a1f, []int{0}
}

func (m *GetByProductIDRequest) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_GetByProductIDRequest.Unmarshal(m, b)
}
func (m *GetByProductIDRequest) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_GetByProductIDRequest.Marshal(b, m, deterministic)
}
func (m *GetByProductIDRequest) XXX_Merge(src proto.Message) {
	xxx_messageInfo_GetByProductIDRequest.Merge(m, src)
}
func (m *GetByProductIDRequest) XXX_Size() int {
	return xxx_messageInfo_GetByProductIDRequest.Size(m)
}
func (m *GetByProductIDRequest) XXX_DiscardUnknown() {
	xxx_messageInfo_GetByProductIDRequest.DiscardUnknown(m)
}

var xxx_messageInfo_GetByProductIDRequest proto.InternalMessageInfo

func (m *GetByProductIDRequest) GetProductId() string {
	if m != nil {
		return m.ProductId
	}
	return ""
}

type GetByProductIDResponse struct {
	ProductImages        []*domain.ProductImage `protobuf:"bytes,1,rep,name=product_images,json=productImages,proto3" json:"product_images,omitempty"`
	XXX_NoUnkeyedLiteral struct{}               `json:"-"`
	XXX_unrecognized     []byte                 `json:"-"`
	XXX_sizecache        int32                  `json:"-"`
}

func (m *GetByProductIDResponse) Reset()         { *m = GetByProductIDResponse{} }
func (m *GetByProductIDResponse) String() string { return proto.CompactTextString(m) }
func (*GetByProductIDResponse) ProtoMessage()    {}
func (*GetByProductIDResponse) Descriptor() ([]byte, []int) {
	return fileDescriptor_d123e2d269ba0a1f, []int{1}
}

func (m *GetByProductIDResponse) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_GetByProductIDResponse.Unmarshal(m, b)
}
func (m *GetByProductIDResponse) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_GetByProductIDResponse.Marshal(b, m, deterministic)
}
func (m *GetByProductIDResponse) XXX_Merge(src proto.Message) {
	xxx_messageInfo_GetByProductIDResponse.Merge(m, src)
}
func (m *GetByProductIDResponse) XXX_Size() int {
	return xxx_messageInfo_GetByProductIDResponse.Size(m)
}
func (m *GetByProductIDResponse) XXX_DiscardUnknown() {
	xxx_messageInfo_GetByProductIDResponse.DiscardUnknown(m)
}

var xxx_messageInfo_GetByProductIDResponse proto.InternalMessageInfo

func (m *GetByProductIDResponse) GetProductImages() []*domain.ProductImage {
	if m != nil {
		return m.ProductImages
	}
	return nil
}

func init() {
	proto.RegisterType((*GetByProductIDRequest)(nil), "service.main.productimage.GetByProductIDRequest")
	proto.RegisterType((*GetByProductIDResponse)(nil), "service.main.productimage.GetByProductIDResponse")
}

func init() {
	proto.RegisterFile("service/main/productimage/productimage.proto", fileDescriptor_d123e2d269ba0a1f)
}

var fileDescriptor_d123e2d269ba0a1f = []byte{
	// 203 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0xe2, 0xd2, 0x29, 0x4e, 0x2d, 0x2a,
	0xcb, 0x4c, 0x4e, 0xd5, 0xcf, 0x4d, 0xcc, 0xcc, 0xd3, 0x2f, 0x28, 0xca, 0x4f, 0x29, 0x4d, 0x2e,
	0xc9, 0xcc, 0x4d, 0x4c, 0x4f, 0x45, 0xe1, 0xe8, 0x15, 0x14, 0xe5, 0x97, 0xe4, 0x0b, 0x49, 0x42,
	0x55, 0xeb, 0x81, 0x54, 0xeb, 0x21, 0x2b, 0x90, 0x12, 0x4e, 0xc9, 0x07, 0x1b, 0x01, 0xa1, 0x20,
	0xea, 0x95, 0xcc, 0xb8, 0x44, 0xdd, 0x53, 0x4b, 0x9c, 0x2a, 0x03, 0x20, 0x2a, 0x3d, 0x5d, 0x82,
	0x52, 0x0b, 0x4b, 0x53, 0x8b, 0x4b, 0x84, 0x64, 0xb9, 0xb8, 0xa0, 0xba, 0xe3, 0x33, 0x53, 0x24,
	0x18, 0x15, 0x18, 0x35, 0x38, 0x83, 0x38, 0xa1, 0x22, 0x9e, 0x29, 0x4a, 0xa1, 0x5c, 0x62, 0xe8,
	0xfa, 0x8a, 0x0b, 0xf2, 0xf3, 0x8a, 0x53, 0x85, 0xac, 0xb9, 0xf8, 0xe0, 0x1a, 0x41, 0xf6, 0x16,
	0x4b, 0x30, 0x2a, 0x30, 0x6b, 0x70, 0x1b, 0x89, 0xe8, 0x41, 0x2d, 0x86, 0x69, 0x01, 0x49, 0x06,
	0xf1, 0x16, 0x20, 0xf1, 0x8a, 0x8d, 0x5a, 0x19, 0xb9, 0x78, 0x90, 0xe5, 0x85, 0x4a, 0xb9, 0xf8,
	0x50, 0xed, 0x11, 0x32, 0xd0, 0xc3, 0xe9, 0x45, 0x3d, 0xac, 0x5e, 0x91, 0x32, 0x24, 0x41, 0x07,
	0xc4, 0x13, 0x4e, 0x7c, 0x51, 0x3c, 0xc8, 0xca, 0x92, 0xd8, 0xc0, 0xa1, 0x65, 0x0c, 0x08, 0x00,
	0x00, 0xff, 0xff, 0x12, 0xd6, 0x44, 0x72, 0x8d, 0x01, 0x00, 0x00,
}

// Reference imports to suppress errors if they are not otherwise used.
var _ context.Context
var _ grpc.ClientConn

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
const _ = grpc.SupportPackageIsVersion4

// ProductImageClient is the client API for ProductImage service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://godoc.org/google.golang.org/grpc#ClientConn.NewStream.
type ProductImageClient interface {
	GetByProductID(ctx context.Context, in *GetByProductIDRequest, opts ...grpc.CallOption) (*GetByProductIDResponse, error)
}

type productImageClient struct {
	cc *grpc.ClientConn
}

func NewProductImageClient(cc *grpc.ClientConn) ProductImageClient {
	return &productImageClient{cc}
}

func (c *productImageClient) GetByProductID(ctx context.Context, in *GetByProductIDRequest, opts ...grpc.CallOption) (*GetByProductIDResponse, error) {
	out := new(GetByProductIDResponse)
	err := c.cc.Invoke(ctx, "/service.main.productimage.ProductImage/GetByProductID", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// ProductImageServer is the server API for ProductImage service.
type ProductImageServer interface {
	GetByProductID(context.Context, *GetByProductIDRequest) (*GetByProductIDResponse, error)
}

// UnimplementedProductImageServer can be embedded to have forward compatible implementations.
type UnimplementedProductImageServer struct {
}

func (*UnimplementedProductImageServer) GetByProductID(ctx context.Context, req *GetByProductIDRequest) (*GetByProductIDResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetByProductID not implemented")
}

func RegisterProductImageServer(s *grpc.Server, srv ProductImageServer) {
	s.RegisterService(&_ProductImage_serviceDesc, srv)
}

func _ProductImage_GetByProductID_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GetByProductIDRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ProductImageServer).GetByProductID(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/service.main.productimage.ProductImage/GetByProductID",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ProductImageServer).GetByProductID(ctx, req.(*GetByProductIDRequest))
	}
	return interceptor(ctx, in, info, handler)
}

var _ProductImage_serviceDesc = grpc.ServiceDesc{
	ServiceName: "service.main.productimage.ProductImage",
	HandlerType: (*ProductImageServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "GetByProductID",
			Handler:    _ProductImage_GetByProductID_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "service/main/productimage/productimage.proto",
}
