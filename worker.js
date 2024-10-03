importScripts('https://cdnjs.cloudflare.com/ajax/libs/mathjs/10.0.0/math.min.js');

self.onmessage = function(e) {
    const { data, compressionRate } = e.data;
    const signalLength = data.length;

    // 使用 math.js 的 DCT
    const dctCoefficients = math.dct(data);

    // 保留前 k 個 DCT 係數
    const k = Math.floor(signalLength * compressionRate);
    const compressedSignal = new Array(signalLength).fill(0);
    for (let i = 0; i < k; i++) {
        compressedSignal[i] = dctCoefficients[i];
    }

    // 使用 math.js 的 IDCT 重建信號
    const reconstructedSignal = math.idct(compressedSignal);

    // 將結果傳回主執行緒
    self.postMessage({ reconstructedSignal: reconstructedSignal });
};
