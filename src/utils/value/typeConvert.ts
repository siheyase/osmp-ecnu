export function datasetToModel(datasetName) {
  switch (datasetName) {
    case 'default of credit card clients':
      return 'FINKAN';
    case 'SHL2 TA0_600519_202401-202402_defreg':
      return 'ABM';
    case 'elliptic':
      return 'BAED';
    default:
      return '';
  }
}

export function modelToShow(modelName) {
  switch (modelName) {
    case 'FINKAN':
      return '关系表格数据';
    case 'ABM':
      return '时序数据';
    case 'BAED':
      return '图数据';
    default:
      return '';
  }
}
