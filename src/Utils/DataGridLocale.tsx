export const GridLocale = {
  columnMenuLabel: 'Chức năng',
  columnMenuShowColumns: 'Hiển thị cột',
  columnMenuFilter: 'Bộ lọc',
  columnMenuHideColumn: 'Ẩn cột',
  columnMenuUnsort: 'Bỏ sắp xếp',
  columnMenuSortAsc: 'Sắp xếp tăng dần',
  columnMenuSortDesc: 'Sắp xếp giảm dần',
  columnsPanelTextFieldLabel: 'Lọc cột theo tên',
  columnsPanelTextFieldPlaceholder: 'Tên cột',
  columnsPanelDragIconLabel: 'sắp xếp thứ tự cột',
  columnsPanelShowAllButton: 'Hiện tất',
  columnsPanelHideAllButton: 'Ẩn tất',
  filterPanelAddFilter: 'Thêm bọ lọc',
  filterPanelDeleteIconLabel: 'Xóa',
  filterPanelOperators: 'So sánh',
  filterPanelOperatorAnd: 'Và',
  filterPanelOperatorOr: 'Hoặc',
  filterPanelColumns: 'Cột',
  filterPanelInputLabel: 'Giá trị',
  filterPanelInputPlaceholder: 'Giá trị lọc',

  // Filter operators text
  filterOperatorContains: 'có chứa',
  filterOperatorEquals: 'bằng',
  filterOperatorStartsWith: 'bắt đầu',
  filterOperatorEndsWith: 'kết thúc',
  filterOperatorIs: 'là',
  filterOperatorNot: 'không là',
  filterOperatorAfter: 'đằng sau',
  filterOperatorOnOrAfter: 'trước hoặc sau',
  filterOperatorBefore: 'đằng trước',
  filterOperatorOnOrBefore: 'trùng hoặc trước',
  filterOperatorIsEmpty: 'trống',
  filterOperatorIsNotEmpty: 'không trống',
   columnHeaderFiltersTooltipActive: (count: number) =>
    count !== 1 ? `${count} bộ lọc` : `${count} bộ lọc`,
  columnHeaderFiltersLabel: 'Hiển thị bộ lọc',
  columnHeaderSortIconLabel: 'Sắp xếp',

  // Filter values text
  filterValueAny: 'any',
  filterValueTrue: 'true',
  filterValueFalse: 'false',
  footerRowSelected: (count: number) =>
    count !== 1
      ? `${count.toLocaleString()} dòng được chọn`
      : `${count.toLocaleString()} dòng được chọn`,
  footerTotalVisibleRows: (visibleCount: number, totalCount: number) =>
    `${visibleCount.toLocaleString()} Của ${totalCount.toLocaleString()}`,
}