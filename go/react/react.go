package react

import "fmt"

type reactorContext struct{}

type cellContext struct {
	value         int
	preValue      int
	computedCells []*cellContext // cells which will computed base on this cell
	computeFunc   func() int
	callback      []*cellCallback
}

type cellCallback struct {
	cb   func(int)
	cell *cellContext
}

func (c *cellContext) Value() int {
	return c.value
}

func updateComputedValue(c *cellContext) {
	for _, cell := range c.computedCells {
		cell.preValue = cell.value
		cell.value = cell.computeFunc()
	}
	// breadth first for computed cells
	for _, cell := range c.computedCells {
		updateComputedValue(cell)
	}
}

func triggerCallback(c *cellContext) {
	if c.preValue != c.value {
		c.preValue = c.value
		for _, cb := range c.callback {
			cb.cb(c.value)
		}
	}

	for _, cell := range c.computedCells {
		triggerCallback(cell)
	}
}

func (c *cellContext) SetValue(v int) {
	c.preValue = c.value
	c.value = v
	updateComputedValue(c)
	triggerCallback(c)
}

func (c *cellContext) AddCallback(cb func(int)) Canceler {
	cellCb := cellCallback{cb, c}
	c.callback = append(c.callback, &cellCb)
	return Canceler(&cellCb)
}

func (cellCb *cellCallback) Cancel() {
	idx := -1
	cbLen := len(cellCb.cell.callback)
	if cbLen <= 0 {
		fmt.Println("callback is empty")
		return
	}
	for i, cb := range cellCb.cell.callback {
		if cb == cellCb {
			idx = i
			break
		}
	}
	if idx < 0 {
		fmt.Println("callback do not exist")
		return
	}
	cellCb.cell.callback[idx] = cellCb.cell.callback[cbLen-1]
	cellCb.cell.callback = cellCb.cell.callback[:cbLen-1]
}

// New reactor
func New() Reactor {
	return &reactorContext{}
}

func (r *reactorContext) CreateInput(v int) InputCell {
	ci := cellContext{}
	ci.value = v
	ci.preValue = ci.value
	return &ci
}

func (r *reactorContext) CreateCompute1(c Cell, computeFunc func(int) int) ComputeCell {
	f := func() int {
		return computeFunc(c.Value())
	}
	newCi := cellContext{}
	newCi.computeFunc = f
	newCi.value = f()
	newCi.preValue = newCi.value
	inputCell := c.(*cellContext)
	inputCell.computedCells = append(inputCell.computedCells, &newCi)
	return &newCi
}

func (r *reactorContext) CreateCompute2(c1 Cell, c2 Cell, computeFunc func(int, int) int) ComputeCell {
	f := func() int {
		return computeFunc(c1.Value(), c2.Value())
	}
	newCi := cellContext{}
	newCi.computeFunc = f
	newCi.value = f()
	newCi.preValue = newCi.value
	inputCell1 := c1.(*cellContext)
	inputCell2 := c2.(*cellContext)
	inputCell1.computedCells = append(inputCell1.computedCells, &newCi)
	inputCell2.computedCells = append(inputCell2.computedCells, &newCi)
	return &newCi
}
