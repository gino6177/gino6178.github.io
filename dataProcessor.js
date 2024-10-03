self.onmessage = function(e) {
    const csvData = e.data;
    const rows = csvData.split('\n');
    
    // 解析 CSV 文件，提取第三列數據 (velocity(m/s))
    const data = rows.map(row => {
        const values = row.split(',');
        return parseFloat(values[2]); // 提取第三列數據
    }).filter(value => !isNaN(value)); // 過濾無效數據

    // 降采样：假设降采样到 1/10 的数据
    const downsampleFactor = 10; // 降采樣因子
    const downsampledData = data.filter((_, index) => index % downsampleFactor === 0);

    // 將降采样后的数据返回給主執行緒
    self.postMessage(downsampledData);
};
