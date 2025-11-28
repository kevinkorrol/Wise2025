package currency

type Currency int

const (
	EUR Currency = iota
	DOLLAR
	ZAR
)

type Money struct {
	Sum      float64
	Currency Currency
}
