import { fetchData } from "../api/dataService";

class DataController {
  constructor(model) {
    this.model = model;

    this.SHEET_LENGTH_METERS = 1;
    this.MIN_SCREWS_PER_SHEET = 4;
    this.PIPE_WIDTH_MM_TO_M = 1000;
  }

  async initialize() {
    const data = await fetchData("data");
    const config = await fetchData("config");
    this.model.setData(data);
    this.model.setConfig(config);
  }

  calculate(values, groupedData, config) {
    const { width, length, sheet, pipe, frameType, material } = values;

    const selectedSheet = groupedData.list?.find((item) => item.name === sheet);
    const selectedPipe = groupedData.pipe?.find((item) => item.name === pipe);
    const selectedFix = groupedData.fix?.[0];
    const frameConfig = config?.find(
      (item) => item.type === "frame" && item.key === frameType
    );
    const fixConfig = config?.find(
      (item) => item.type === "fix" && item.key === material
    );

    if (!selectedSheet || !selectedPipe || !frameConfig || !fixConfig) {
      throw new Error("Не найдена конфигурация для выбранных параметров");
    }

    const sheetArea = selectedSheet.width * this.SHEET_LENGTH_METERS;
    const totalArea = width * length;
    const sheetsCount = Math.ceil(totalArea / sheetArea);
    const totalSheetsArea = sheetsCount * sheetArea;

    const pipeWidthM = selectedPipe.width / this.PIPE_WIDTH_MM_TO_M;
    const maxStep = frameConfig.step;

    const calculatePipes = (size) => {
      const availableSpace = size - pipeWidthM;
      const stepsCount = Math.ceil(availableSpace / (maxStep + pipeWidthM));
      const actualStep = availableSpace / stepsCount - pipeWidthM;
      const pipesCount = stepsCount + 1;

      return {
        pipesCount,
        totalLength: pipesCount * size,
        actualStep,
        effectiveLength: pipesCount * size - pipeWidthM * (pipesCount - 1),
      };
    };

    const lengthPipes = calculatePipes(length);
    const widthPipes = calculatePipes(width);
    const totalPipesEffective =
      lengthPipes.effectiveLength + widthPipes.effectiveLength;

    const minFixCount = sheetsCount * this.MIN_SCREWS_PER_SHEET;
    const areaFixCount = Math.ceil(totalArea * fixConfig.value);
    const fixCount = Math.max(minFixCount, areaFixCount);

    return {
      materials: {
        sheet: {
          ...selectedSheet,
          count: sheetsCount,
          areaPerUnit: sheetArea,
          totalArea: totalSheetsArea,
        },
        pipe: {
          ...selectedPipe,
          count: totalPipesEffective,
          widthMeters: pipeWidthM,
        },
        fix: {
          ...selectedFix,
          count: fixCount,
        },
      },
      dimensions: {
        width,
        length,
        totalArea,
      },
      construction: {
        cellSize: {
          width: widthPipes.actualStep,
          length: lengthPipes.actualStep,
        },
        pipes: {
          lengthDirection: lengthPipes,
          widthDirection: widthPipes,
        },
      },
      totals: {
        sheets: +(sheetsCount * selectedSheet.price).toFixed(2),
        pipes: +(totalPipesEffective * selectedPipe.price).toFixed(2),
        fixes: +(fixCount * selectedFix.price).toFixed(2),
        overall: +(
          sheetsCount * selectedSheet.price +
          totalPipesEffective * selectedPipe.price +
          fixCount * selectedFix.price
        ).toFixed(2),
      },
    };
  }
}

export default DataController;
