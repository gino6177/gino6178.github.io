importScripts('https://cdnjs.cloudflare.com/ajax/libs/fft.js/0.3.0/fft.min.js');

self.onmessage = function(e) {
    const { data } = e.data;
    const windowSize = 128; // 每个STFT窗口的大小
    const hopSize = 64; // 窗口之间的重叠大小

    const fft = new FFT(windowSize);
    const stftData = [];

    for (let start = 0; start + windowSize <= data.length; start += hopSize) {
        const segment = data.slice(start, start + windowSize);
        const windowedSegment = applyWindow(segment);
        const fftResult = applyFFT(fft, windowedSegment);
        stftData.push(fftResult);
    }

    // 将计算结果传回主线程
    self.postMessage({ stftData, window
