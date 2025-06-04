const dataRates = {
    FINKAN: 160,
    BAED: 113,
    ABM: 953,
};

const units = [
    { unit: 'TB', divisor: 1024 ** 4 },
    { unit: 'GB', divisor: 1024 ** 3 },
    { unit: 'MB', divisor: 1024 ** 2 },
    { unit: 'KB', divisor: 1024 },
    { unit: 'B', divisor: 1 }
];


export function calculateDataSize(n, model, type, isStr = true) {
    const totalBytes = n * dataRates[model];
    let selectedUnit: any;

    if (type == 'AUTO') {
        // 找到合适的单位
        selectedUnit = units[4]; // 默认B单位
        for (const unit of units) {
            if (totalBytes >= unit.divisor) {
                selectedUnit = unit;
                break;
            }
        }
    } else {
        selectedUnit = units.find(it => it.unit == type)
    }

    // 计算数值并格式化
    const value = totalBytes / selectedUnit.divisor;
    let formatted = value.toFixed(2)

    return isStr ? `${formatted} ${selectedUnit.unit}` : formatted;
}

export function calculateDataMapSize(dataGroup, type, isStr = true) {
    const ABM_size = dataGroup['ABM'] ? dataGroup['ABM'] * dataRates['ABM'] : 0;
    const FINKA_size = dataGroup['FINKAN'] ? dataGroup['FINKAN'] * dataRates['FINKAN'] : 0;
    const BAED_size = dataGroup['BAED'] ? dataGroup['BAED'] * dataRates['BAED'] : 0;

    const totalBytes = ABM_size + FINKA_size + BAED_size;
    console.log(totalBytes)
    let selectedUnit: any;

    if (type == 'AUTO') {
        // 找到合适的单位
        selectedUnit = units[4]; // 默认B单位
        for (const unit of units) {
            if (totalBytes >= unit.divisor) {
                selectedUnit = unit;
                break;
            }
        }
    } else {
        selectedUnit = units.find(it => it.unit == type)
    }

    // 计算数值并格式化
    const value = totalBytes / selectedUnit.divisor;
    let formatted = value.toFixed(2)

    return isStr ? `${formatted} ${selectedUnit.unit}` : formatted;

}