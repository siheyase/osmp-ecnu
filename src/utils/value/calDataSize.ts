const dataRates = {
    FINKAN: 167.936,
    BAED: 167.936,
    ABM: 167.936
};

const units = [
    { unit: 'TB', divisor: 1024 ** 4 },
    { unit: 'GB', divisor: 1024 ** 3 },
    { unit: 'MB', divisor: 1024 ** 2 },
    { unit: 'KB', divisor: 1024 },
    { unit: 'B', divisor: 1 }
];


export function calculateDataSize(n, model, type, isStr = true) {
    if (n === 0) return '0 B'; // 处理n为0的情况
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
        .replace(/\.?0+$/, '') // 移除末尾的零
        .replace(/\.$/, '');   // 处理结尾的小数点

    return isStr ? `${formatted} ${selectedUnit.unit}` : formatted;
}