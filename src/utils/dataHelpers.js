export const prepareFormProps = (groupedData, config) => {
  const getConfigByType = (type) => config.filter((c) => c.type === type);

  return {
    materials: [
      ...new Set(groupedData.list?.map((item) => item.material) || []),
    ],
    sheets: groupedData.list || [],
    pipes: groupedData.pipe || [],
    fixes: groupedData.fix || [],
    configGetters: {
      getSizeConfig: () => getConfigByType("size"),
      getFrameConfigs: () => getConfigByType("frame"),
      getFixConfigs: () => getConfigByType("fix"),
    },
  };
};
