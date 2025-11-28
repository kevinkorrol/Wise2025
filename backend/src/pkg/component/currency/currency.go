package currency

type Currency int

const (
	EUR Currency = iota
)

type Money struct {
	Sum      float64
	Currency Currency
}
