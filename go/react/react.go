package react

import "fmt"

type ReactorContext struct{}

type CellContext struct {
	value         int
	preValue      int
	computedCells []*CellContext // cells which will computed base on this cell
	dependCell1   *CellContext   // first depend cell for a computed cell
	dependCell2   *CellContext   // second depend cell for a computed cell
	computeFunc1  func(int) int
	computeFunc2  func(int, int) int
	callback      []*CellCallback
}

type CellCallback struct {
	cb   func(int)
	cell *CellContext
}

func (c *CellContext) Value() int {
	return c.value
}

func updateComputedValue(c *CellContext) {
	var newValue int
	for _, cell := range c.computedCells {
		if cell.dependCell2 != nil {
			newValue = cell.computeFunc2(cell.dependCell1.value, cell.dependCell2.value)
		} else {
			newValue = cell.computeFunc1(cell.dependCell1.value)
		}
		cell.preValue = cell.value
		cell.value = newValue
	}
	// breadth first for computed cells
	for _, cell := range c.computedCells {
		updateComputedValue(cell)
	}
}

func triggerCallback(c *CellContext) {
	fmt.Printf("preValue=%v value=%v callbacks=%v\n", c.preValue, c.value, len(c.callback))
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

func (c *CellContext) SetValue(v int) {
	c.preValue = c.value
	c.value = v
	updateComputedValue(c)
	triggerCallback(c)
}

func (c *CellContext) AddCallback(cb func(int)) Canceler {
	cellCb := CellCallback{cb, c}
	c.callback = append(c.callback, &cellCb)
	return Canceler(&cellCb)
}

func (cellCb *CellCallback) Cancel() {
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

func New() Reactor {
	return &ReactorContext{}
}

func (r *ReactorContext) CreateInput(v int) InputCell {
	ci := CellContext{}
	ci.value = v
	ci.preValue = ci.value
	return &ci
}

func (r *ReactorContext) CreateCompute1(c Cell, computeFunc func(int) int) ComputeCell {
	newCi := CellContext{}
	newCi.dependCell1 = c.(*CellContext)
	newCi.computeFunc1 = computeFunc
	newCi.value = computeFunc(newCi.dependCell1.value)
	newCi.preValue = newCi.value
	newCi.dependCell1.computedCells = append(newCi.dependCell1.computedCells, &newCi)
	return &newCi
}

func (r *ReactorContext) CreateCompute2(c1 Cell, c2 Cell, computeFunc func(int, int) int) ComputeCell {
	newCi := CellContext{}
	newCi.dependCell1 = c1.(*CellContext)
	newCi.dependCell2 = c2.(*CellContext)
	newCi.computeFunc2 = computeFunc
	newCi.dependCell1.computedCells = append(newCi.dependCell1.computedCells, &newCi)
	newCi.dependCell2.computedCells = append(newCi.dependCell2.computedCells, &newCi)
	newCi.value = computeFunc(newCi.dependCell1.value, newCi.dependCell2.value)
	newCi.preValue = newCi.value
	return &newCi
}
