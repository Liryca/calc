import { useState, useEffect } from "react";

export const useDataStore = (initialData) => {
  const [groupedData, setGroupedData] = useState({});

  const groupData = (data) => {
    return data.reduce((acc, item) => {
      if (!acc[item.type]) acc[item.type] = [];
      acc[item.type].push(item);
      return acc;
    }, {});
  };

  useEffect(() => {
    if (initialData && initialData.length > 0) {
      setGroupedData(groupData(initialData));
    }
  }, [initialData]);

  const getByType = (type) => groupedData[type] || [];
  const getMaterials = () => [
    ...new Set(groupedData.list?.map((item) => item.material)),
  ];

  return {
    groupedData,
    getByType,
    getMaterials,
    groupData,
  };
};
