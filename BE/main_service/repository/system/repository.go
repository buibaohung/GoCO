package system

type SystemRepository interface {
	NextID(string) (string, error)
}
